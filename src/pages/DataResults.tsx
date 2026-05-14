import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell,
} from 'recharts'
// Task 8 will use these — imported now to avoid a second edit round
// @ts-ignore – unused until Task 8 adds the scatter section
import type { ScatterChart as _ScatterChart, Scatter as _Scatter } from 'recharts'
import { products, axes, type ProductKey, type AxisKey } from '../data/products'

const productKeys = Object.keys(products) as ProductKey[]

function fmt(v: number | null): string {
  return v === null ? '—' : v.toFixed(1)
}

function Stats({ axisKey }: { axisKey: AxisKey }) {
  const values = productKeys.map(k => products[k].scores[axisKey]).filter((v): v is number => v !== null)
  if (values.length === 0) return <span className="text-slate-300 text-xs">no data</span>
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const min = Math.min(...values)
  const max = Math.max(...values)
  const std = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length)
  return (
    <div className="text-xs space-y-0.5">
      <div className="flex gap-3">
        <span className="text-slate-400">mean</span><span className="font-medium text-slate-700">{mean.toFixed(2)}</span>
        <span className="text-slate-400">min</span><span className="font-medium text-slate-700">{min.toFixed(1)}</span>
        <span className="text-slate-400">max</span><span className="font-medium text-slate-700">{max.toFixed(1)}</span>
        <span className="text-slate-400">σ</span><span className="font-medium text-slate-700">{std.toFixed(2)}</span>
      </div>
      <div className="text-slate-300">n = {values.length} of {productKeys.length}</div>
    </div>
  )
}

export default function DataResults() {
  const [sortAxis, setSortAxis] = useState<AxisKey>('performance')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [visibleProducts, setVisibleProducts] = useState<Set<ProductKey>>(new Set(productKeys))

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
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Data & Results</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Findings</h1>
        <p className="text-slate-500 max-w-2xl">
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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              visibleProducts.has(k)
                ? 'border-transparent text-white'
                : 'border-slate-200 text-slate-400 bg-white'
            }`}
            style={visibleProducts.has(k) ? { background: products[k].color } : {}}
          >
            {products[k].label}
          </button>
        ))}
      </div>

      {/* Radar */}
      <div className="border border-slate-100 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-slate-900 mb-1">Overall Comparison</h2>
        <p className="text-sm text-slate-400 mb-6">Radar chart across all four axes. Toggle products above.</p>
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
            <div key={key} className="border border-slate-100 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-1">{label}</h3>
              <p className="text-xs text-slate-400 mb-1">{description}</p>
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

      {/* Rankings table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden mb-10">
        <div className="px-5 py-3 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rankings</span>
          <span className="text-xs text-slate-400">Click axis header to sort</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-slate-500">Product</th>
              {axes.map(a => (
                <th
                  key={a.key}
                  onClick={() => handleSort(a.key)}
                  className="px-4 py-3 text-center font-semibold text-slate-500 cursor-pointer hover:text-rose-500 select-none"
                >
                  {a.label}
                  {sortAxis === a.key && (
                    <span className="ml-1 text-rose-400">{sortDir === 'desc' ? '↓' : '↑'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedKeys.map((k, i) => (
              <tr key={k} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-5 py-3 font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: products[k].color }} />
                    {products[k].label}
                  </div>
                </td>
                {axes.map(a => (
                  <td key={a.key} className={`px-4 py-3 text-center ${
                    a.key === sortAxis ? 'font-semibold text-slate-800' : 'text-slate-500'
                  }`}>
                    {fmt(products[k].scores[a.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistical summary */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 bg-slate-50">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Statistical Summary</span>
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
                <td className="px-5 py-3 font-medium text-slate-700">{label}</td>
                <td className="px-4 py-3"><Stats axisKey={key} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
