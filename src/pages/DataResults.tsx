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
  if (values.length === 0) return <span className="text-slate-400 text-xs">no data</span>
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const min = Math.min(...values)
  const max = Math.max(...values)
  const std = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length)
  return (
    <div className="text-xs space-y-0.5">
      <div className="flex gap-3">
        <span className="text-slate-500">mean</span><span className="font-medium text-slate-800">{mean.toFixed(2)}</span>
        <span className="text-slate-500">min</span><span className="font-medium text-slate-800">{min.toFixed(1)}</span>
        <span className="text-slate-500">max</span><span className="font-medium text-slate-800">{max.toFixed(1)}</span>
        <span className="text-slate-500">σ</span><span className="font-medium text-slate-800">{std.toFixed(2)}</span>
      </div>
      <div className="text-slate-400">n = {values.length} of {productKeys.length}</div>
    </div>
  )
}

function StatsRate() {
  const values = productKeys.map(k => products[k].absorptionRate).filter((v): v is number => v !== null)
  if (values.length === 0) return <span className="text-slate-400 text-xs">no data</span>
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const min = Math.min(...values)
  const max = Math.max(...values)
  const std = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length)
  return (
    <div className="text-xs space-y-0.5">
      <div className="flex gap-3">
        <span className="text-slate-500">mean</span><span className="font-medium text-slate-800">{mean.toFixed(2)} s</span>
        <span className="text-slate-500">min</span><span className="font-medium text-slate-800">{min.toFixed(2)} s</span>
        <span className="text-slate-500">max</span><span className="font-medium text-slate-800">{max.toFixed(2)} s</span>
        <span className="text-slate-500">σ</span><span className="font-medium text-slate-800">{std.toFixed(2)}</span>
      </div>
      <div className="text-slate-400">n = {values.length} of {productKeys.length}</div>
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
  const [visibleProducts, setVisibleProducts] = useState<Set<ProductKey>>(new Set(productKeys))
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
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-500 uppercase">Data & Results</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Findings</h1>
        <p className="text-slate-600 max-w-2xl">
          All scores 0–10 (higher = better). Physics data is real; other axes pending.
          Pending axes shown as — or 0 in charts.
        </p>
      </div>

      {/* Product toggle legend */}
      <div className="flex flex-wrap gap-3 mb-10">
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
      <div className="border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="font-semibold text-slate-900 mb-1">Overall Comparison</h2>
        <p className="text-sm text-slate-500 mb-6">Radar chart across all four axes. Toggle products above.</p>
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 13, fill: '#64748b' }} />
            <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            {visibleKeys.map(k => (
              <Radar
                key={k}
                name={products[k].label}
                dataKey={k}
                stroke={products[k].color}
                fill={products[k].color}
                fillOpacity={0.12}
                strokeWidth={2}
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
              <h3 className="font-semibold text-slate-900 mb-1">{label}</h3>
              <p className="text-xs text-slate-500 mb-1">{description}</p>
              {hasPending && <p className="text-xs text-amber-400 mb-3">Pending axes shown as 0</p>}
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} angle={-30} textAnchor="end" />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
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

      {/* Absorption rate bar chart */}
      <div className="border border-slate-200 rounded-2xl p-6 shadow-sm mb-10">
        <h3 className="font-semibold text-slate-900 mb-1">Absorption Rate (5 mL)</h3>
        <p className="text-xs text-slate-500 mb-1">Time for 5 mL of simulated fluid to be fully absorbed. Lower is better.</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={productKeys.map(k => ({
              name: products[k].label,
              rate: products[k].absorptionRate ?? 0,
              fill: products[k].color,
              rank: products[k].absorptionRateRank,
            }))}
            margin={{ top: 0, right: 0, left: -20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} angle={-30} textAnchor="end" />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} label={{ value: 'Seconds', angle: -90, position: 'insideLeft', offset: 0, fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
              formatter={(v: number) => [`${v.toFixed(2)} s`, 'Absorption Rate']}
            />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {productKeys.map((k, i) => (
                <Cell key={i} fill={products[k].color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rankings table */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-10">
        <div className="px-5 py-3 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Rankings</span>
          <span className="text-xs text-slate-500">Click axis header to sort</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-slate-500">Product</th>
              {axes.map(a => (
                <th
                  key={a.key}
                  onClick={() => handleSort(a.key)}
                  className="px-4 py-3 text-center font-semibold text-slate-600 cursor-pointer hover:text-rose-500 select-none transition-colors duration-200"
                >
                  {a.label}
                  {sortAxis === a.key && (
                    <span className="ml-1 text-rose-500">{sortDir === 'desc' ? '↓' : '↑'}</span>
                  )}
                </th>
              ))}
              <th className="px-4 py-3 text-center font-semibold text-slate-600">Rate (s/5 mL)</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-600">€ Price</th>
            </tr>
          </thead>
          <tbody>
            {sortedKeys.map((k, i) => (
              <tr key={k} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-5 py-3 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: products[k].color }} />
                    {products[k].label}
                  </div>
                </td>
                {axes.map(a => (
                  <td key={a.key} className={`px-4 py-3 text-center ${
                    a.key === sortAxis ? 'font-semibold text-slate-900' : 'text-slate-600'
                  }`}>
                    {fmt(products[k].scores[a.key])}
                  </td>
                ))}
                <td className="px-4 py-3 text-center text-slate-600">{fmtRate(products[k].absorptionRate)}</td>
                <td className="px-4 py-3 text-center text-slate-600">{products[k].price !== null ? `€${products[k].price.toFixed(2)}` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistical summary */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 bg-slate-50">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Statistical Summary</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-slate-500">Axis</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-500">Statistics</th>
            </tr>
          </thead>
          <tbody>
            {axes.map(({ key, label }, i) => (
              <tr key={key} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-5 py-3 font-medium text-slate-800">{label}</td>
                <td className="px-4 py-3"><Stats axisKey={key} /></td>
              </tr>
            ))}
            <tr className="bg-slate-50/50">
              <td className="px-5 py-3 font-medium text-slate-800">Absorption Rate</td>
              <td className="px-4 py-3"><StatsRate /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Correlation scatter */}
      <div className="border border-slate-200 rounded-2xl p-6 shadow-sm mt-10">
        <h2 className="font-semibold text-slate-900 mb-1">Correlation Explorer</h2>
        <p className="text-sm text-slate-500 mb-6">
          Select two axes to visualise their relationship across all products.
          Each dot is one product. Only products with data on both axes are shown.
        </p>

        <div className="flex gap-6 mb-6 flex-wrap">
          {(['x', 'y'] as const).map(axis => (
            <div key={axis}>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
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
              <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
                Not enough data yet — select axes with collected data
              </div>
            )
          }

          const r = pearsonR(scatterData.map(d => d.x), scatterData.map(d => d.y))

          return (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 10]}
                    name={axes.find(a => a.key === xAxis)?.label}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    label={{ value: axes.find(a => a.key === xAxis)?.label, position: 'insideBottom', offset: -10, fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0, 10]}
                    name={axes.find(a => a.key === yAxis)?.label}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    label={{ value: axes.find(a => a.key === yAxis)?.label, angle: -90, position: 'insideLeft', offset: 10, fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload?.length) return null
                      const d = payload[0].payload as { name: string; x: number; y: number }
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg p-3 text-sm shadow-lg">
                          <p className="font-semibold text-slate-900 mb-1">{d.name}</p>
                          <p className="text-slate-600">{axes.find(a => a.key === xAxis)?.label}: {d.x.toFixed(1)}</p>
                          <p className="text-slate-600">{axes.find(a => a.key === yAxis)?.label}: {d.y.toFixed(1)}</p>
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
              <p className="text-xs text-slate-500 mt-3">
                Pearson r = <strong className="text-slate-800">{r.toFixed(3)}</strong>
                {' · '}{scatterData.length} products with data on both axes
              </p>
            </>
          )
        })()}
      </div>
    </div>
  )
}
