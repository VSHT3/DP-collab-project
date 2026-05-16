import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell,
  ScatterChart, Scatter,
} from 'recharts'
import { products, axes, type ProductKey, type AxisKey } from '../data/products'

const productKeys = Object.keys(products) as ProductKey[]

function fmt(v: number | null): string {
  return v === null ? '—' : v.toFixed(1)
}

function fmtRate(v: number | null): string {
  return v === null ? '—' : `${v.toFixed(2)} s`
}

function Stats({ axisKey }: { axisKey: AxisKey }) {
  const values = productKeys.map(k => products[k].scores[axisKey]).filter((v): v is number => v !== null)
  if (values.length === 0) return <span className="text-slate-500 text-sm">no data</span>
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const min = Math.min(...values)
  const max = Math.max(...values)
  const std = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length)
  return (
    <div className="text-sm space-y-0.5">
      <div className="flex gap-3">
        <span className="text-slate-600">mean</span><span className="font-medium text-slate-900">{mean.toFixed(2)}</span>
        <span className="text-slate-600">min</span><span className="font-medium text-slate-900">{min.toFixed(1)}</span>
        <span className="text-slate-600">max</span><span className="font-medium text-slate-900">{max.toFixed(1)}</span>
        <span className="text-slate-600">σ</span><span className="font-medium text-slate-900">{std.toFixed(2)}</span>
      </div>
      <div className="text-slate-500">n = {values.length} of {productKeys.length}</div>
    </div>
  )
}

function pearsonR(xs: number[], ys: number[]): number {
  const n = xs.length
  if (n < 2) return 0
  const mx = xs.reduce((a, b) => a + b, 0) / n
  const my = ys.reduce((a, b) => a + b, 0) / n
  const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0)
  const dx = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0))
  const dy = Math.sqrt(ys.reduce((s, y) => s + (y - my) ** 2, 0))
  return dx === 0 || dy === 0 ? 0 : num / (dx * dy)
}

export default function DataResults() {
  const [sortAxis, setSortAxis] = useState<AxisKey>('performance')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [visibleProducts, setVisibleProducts] = useState<Set<ProductKey>>(new Set(['naturella_pad', 'jessa_cotton']))
  const [xAxis, setXAxis] = useState<AxisKey>('performance')
  const [yAxis, setYAxis] = useState<AxisKey>('environment')

  function toggleProduct(k: ProductKey) {
    setVisibleProducts(prev => {
      const next = new Set(prev)
      if (next.has(k)) { next.delete(k) } else { next.add(k) }
      return next
    })
  }

  function handleSort(key: AxisKey) {
    if (key === sortAxis) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortAxis(key)
      setSortDir('desc')
    }
  }

  const visibleKeys = productKeys.filter(k => visibleProducts.has(k))

  const radarData = axes.map(({ key, label }) => ({
    axis: label,
    ...Object.fromEntries(visibleKeys.map(k => [k, products[k].scores[key] ?? 0])),
  }))

  const sortedKeys = [...productKeys].sort((a, b) => {
    const va = products[a].scores[sortAxis] ?? -1
    const vb = products[b].scores[sortAxis] ?? -1
    return sortDir === 'desc' ? vb - va : va - vb
  })

  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">Data & Results</span>
        <h1 className="text-4xl font-bold text-slate-950 mt-2 mb-3">Findings</h1>
        <p className="text-lg text-slate-700 max-w-3xl">
          All scores 0–10 (higher = better). Physics data is real; other axes pending.
          Pending axes shown as — or 0 in charts.
        </p>
      </div>

      {/* Product toggle legend */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {productKeys.map(k => (
          <button
            key={k}
            onClick={() => toggleProduct(k)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
              visibleProducts.has(k)
                ? 'border-transparent text-white'
                : 'border-slate-300 text-slate-600 bg-white hover:border-rose-300'
            }`}
            style={visibleProducts.has(k) ? { background: products[k].color } : {}}
          >
            {products[k].label}
          </button>
        ))}
      </div>

      {/* Radar */}
      <div className="border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-950 mb-1">Overall Comparison</h2>
        <p className="text-base text-slate-700 mb-6">Radar chart across all six axes. Toggle products above.</p>
        <ResponsiveContainer width="100%" height={480}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 15, fill: '#334155', fontWeight: 600 }} />
            <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 13, fill: '#475569' }} />
            {visibleKeys.map(k => (
              <Radar
                key={k}
                name={products[k].label}
                dataKey={k}
                stroke={products[k].color}
                fill={products[k].color}
                fillOpacity={0.12}
                strokeWidth={2}
                isAnimationActive={false}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Per-axis bar charts */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        {axes.map(({ key, label, description }) => {
          const barData = productKeys.map(k => ({
            name: products[k].label,
            score: products[k].scores[key] ?? 0,
            fill: products[k].color,
            pending: products[k].scores[key] === null,
          }))
          const hasPending = barData.some(d => d.pending)
          return (
            <div key={key} className="border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950 mb-1">{label}</h3>
              <p className="text-sm text-slate-700 mb-1">{description}</p>
              {hasPending && <p className="text-sm text-amber-600 mb-3 font-medium">Pending axes shown as 0</p>}
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} angle={-30} textAnchor="end" />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#475569' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #f1f5f9', fontSize: 13 }}
                    formatter={(v: number, _: string, entry: { payload?: { pending?: boolean } }) =>
                      [entry.payload?.pending ? 'Pending' : (v as number).toFixed(1), label]
                    }
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.pending ? '#e2e8f0' : entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        })}
      </div>

      {/* Rankings table */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-10">
        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Rankings</span>
          <span className="text-sm text-slate-600">Click axis header to sort</span>
        </div>
        <table className="w-full text-base">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-slate-800">Product</th>
              {axes.map(a => (
                <th
                  key={a.key}
                  onClick={() => handleSort(a.key)}
                  className="px-5 py-4 text-center font-bold text-slate-800 cursor-pointer hover:text-rose-500 select-none transition-colors duration-200"
                >
                  {a.label}
                  {sortAxis === a.key && (
                    <span className="ml-1 text-rose-500">{sortDir === 'desc' ? '↓' : '↑'}</span>
                  )}
                </th>
              ))}
              <th className="px-5 py-4 text-center font-bold text-slate-800">Rate (s/5 mL)</th>
              <th className="px-5 py-4 text-center font-bold text-slate-800">€ Price</th>
            </tr>
          </thead>
          <tbody>
            {sortedKeys.map((k, i) => (
              <tr key={k} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-6 py-4 font-medium text-slate-950">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: products[k].color }} />
                    {products[k].label}
                  </div>
                </td>
                {axes.map(a => (
                  <td key={a.key} className={`px-5 py-4 text-center text-base ${
                    a.key === sortAxis ? 'font-bold text-slate-950' : 'text-slate-700'
                  }`}>
                    {fmt(products[k].scores[a.key])}
                  </td>
                ))}
                <td className="px-5 py-4 text-center text-slate-700">{fmtRate(products[k].absorptionRate)}</td>
                <td className="px-5 py-4 text-center text-slate-700">{products[k].price !== null ? `€${products[k].price.toFixed(2)}` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistical summary */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-slate-50">
          <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Statistical Summary</span>
        </div>
        <table className="w-full text-base">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-slate-800">Axis</th>
              <th className="px-5 py-4 text-center font-bold text-slate-800">Statistics</th>
            </tr>
          </thead>
          <tbody>
            {axes.map(({ key, label }, i) => (
              <tr key={key} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-6 py-4 font-medium text-slate-900">{label}</td>
                <td className="px-4 py-3"><Stats axisKey={key} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Correlation scatter */}
      <div className="border border-slate-200 rounded-2xl p-8 shadow-sm mt-10">
        <h2 className="text-xl font-bold text-slate-950 mb-1">Correlation Explorer</h2>
        <p className="text-base text-slate-700 mb-6">
          Select two axes to visualise their relationship across all products.
          Each dot is one product. Only products with data on both axes are shown.
        </p>

        <div className="flex gap-8 mb-6 flex-wrap">
          {(['x', 'y'] as const).map(axis => (
            <div key={axis}>
              <label className="text-sm font-bold text-slate-800 uppercase tracking-wider block mb-2">
                {axis.toUpperCase()} Axis
              </label>
              <div className="flex gap-2 flex-wrap">
                {axes.map(a => {
                  const hasData = productKeys.some(k => products[k].scores[a.key] !== null)
                  const selected = axis === 'x' ? xAxis === a.key : yAxis === a.key
                  return (
                    <button
                      key={a.key}
                      disabled={!hasData}
                      onClick={() => axis === 'x' ? setXAxis(a.key) : setYAxis(a.key)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                        selected
                          ? 'bg-rose-500 text-white border-rose-500'
                          : hasData
                            ? 'border-slate-300 text-slate-700 hover:border-rose-300'
                            : 'border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {a.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {(() => {
          const scatterData = productKeys
            .filter(k => products[k].scores[xAxis] !== null && products[k].scores[yAxis] !== null)
            .map(k => ({
              x: products[k].scores[xAxis]!,
              y: products[k].scores[yAxis]!,
              name: products[k].label,
              color: products[k].color,
            }))

          if (scatterData.length < 2) {
            return (
              <div className="h-64 flex items-center justify-center text-slate-600 text-base">
                Not enough data yet — select axes with collected data
              </div>
            )
          }

          const r = pearsonR(scatterData.map(d => d.x), scatterData.map(d => d.y))

          return (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 10]}
                    name={axes.find(a => a.key === xAxis)?.label}
                    tick={{ fontSize: 12, fill: '#475569' }}
                    label={{ value: axes.find(a => a.key === xAxis)?.label, position: 'insideBottom', offset: -10, fontSize: 13, fill: '#334155' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0, 10]}
                    name={axes.find(a => a.key === yAxis)?.label}
                    tick={{ fontSize: 12, fill: '#475569' }}
                    label={{ value: axes.find(a => a.key === yAxis)?.label, angle: -90, position: 'insideLeft', offset: 10, fontSize: 13, fill: '#334155' }}
                  />
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload?.length) return null
                      const d = payload[0].payload as { name: string; x: number; y: number }
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg p-3 text-base shadow-lg">
                          <p className="font-bold text-slate-950 mb-1">{d.name}</p>
                          <p className="text-slate-700">{axes.find(a => a.key === xAxis)?.label}: {d.x.toFixed(1)}</p>
                          <p className="text-slate-700">{axes.find(a => a.key === yAxis)?.label}: {d.y.toFixed(1)}</p>
                        </div>
                      )
                    }}
                  />
                  <Scatter
                    data={scatterData}
                    shape={(props: { cx?: number; cy?: number; payload?: { color: string } }) => (
                      <circle cx={props.cx} cy={props.cy} r={7} fill={props.payload?.color ?? '#e11d48'} fillOpacity={0.85} stroke="white" strokeWidth={1.5} />
                    )}
                  />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-sm text-slate-600 mt-3">
                Pearson r = <strong className="text-slate-900">{r.toFixed(3)}</strong>
                {' · '}{scatterData.length} products with data on both axes
              </p>
            </>
          )
        })()}
      </div>
    </div>
  </div>
  )
}
