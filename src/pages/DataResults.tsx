import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell,
} from 'recharts'
import { products, axes, type ProductKey } from '../data/products'

const productKeys = Object.keys(products) as ProductKey[]

const radarData = axes.map(({ key, label }) => ({
  axis: label,
  ...Object.fromEntries(productKeys.map(k => [k, products[k].scores[key]])),
}))

export default function DataResults() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Data & Results</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Findings</h1>
        <p className="text-slate-500 max-w-2xl">
          All scores are on a 0–10 scale (higher = better). Data shown are placeholders
          pending final experimental results.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-10">
        {productKeys.map(k => (
          <div key={k} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: products[k].color }} />
            <span className="text-sm text-slate-600">{products[k].label}</span>
          </div>
        ))}
      </div>

      {/* Radar */}
      <div className="border border-slate-100 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-slate-900 mb-1">Overall Comparison</h2>
        <p className="text-sm text-slate-400 mb-6">Radar chart across all four axes</p>
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 13, fill: '#64748b' }} />
            <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            {productKeys.map(k => (
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
      <div className="grid sm:grid-cols-2 gap-6">
        {axes.map(({ key, label, description }) => {
          const barData = productKeys.map(k => ({
            name: products[k].label,
            score: products[k].scores[key],
            fill: products[k].color,
          }))
          return (
            <div key={key} className="border border-slate-100 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-1">{label}</h3>
              <p className="text-xs text-slate-400 mb-4">{description}</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #f1f5f9', fontSize: 13 }}
                    formatter={(v: number) => [v.toFixed(1), label]}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        })}
      </div>

      {/* Detail table */}
      <div className="mt-10 border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-slate-500">Product</th>
              {axes.map(a => (
                <th key={a.key} className="px-5 py-3 text-center font-semibold text-slate-500">{a.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productKeys.map((k, i) => (
              <tr key={k} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-5 py-3 font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: products[k].color }} />
                    {products[k].label}
                  </div>
                </td>
                {axes.map(a => (
                  <td key={a.key} className="px-5 py-3 text-center text-slate-600">
                    {products[k].scores[a.key].toFixed(1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
