import { useParams, Link } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { products, axes, productTypeLabels, type ProductKey } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products[id as ProductKey]

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-500">Product not found.</p>
        <Link to="/products" className="text-rose-500 text-sm mt-2 inline-block hover:underline">
          ← Back to Products
        </Link>
      </div>
    )
  }

  const radarData = axes.map(({ key, label }) => ({
    axis: label,
    score: product.scores[key] ?? 0,
    pending: product.scores[key] === null,
  }))

  const hasAnyPendingScore = axes.some(a => product.scores[a.key] === null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/products" className="text-sm text-slate-400 hover:text-rose-500 transition-colors mb-8 inline-block">
        ← Back to Products
      </Link>

      <div className="flex items-start gap-4 mb-10">
        <span className="w-4 h-4 rounded-full mt-1.5 flex-shrink-0" style={{ background: product.color }} />
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">
            {product.brand} · {productTypeLabels[product.type]}
          </span>
          <h1 className="text-3xl font-bold text-slate-900">{product.label}</h1>
          {product.price !== null
            ? <p className="text-slate-500 mt-1">€{product.price.toFixed(2)} per pack</p>
            : <p className="text-slate-400 text-sm mt-1">Price TBD</p>
          }
        </div>
      </div>

      {/* Radar */}
      <div className="border border-slate-100 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-slate-900 mb-1">Score Profile</h2>
        {hasAnyPendingScore && (
          <p className="text-xs text-amber-500 mb-4">Axes with no data yet are shown as 0</p>
        )}
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 13, fill: '#64748b' }} />
            <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Radar
              dataKey="score"
              stroke={product.color}
              fill={product.color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Details per axis */}
      <div className="space-y-4">
        {axes.map(({ key, label, description }) => (
          <div key={key} className="border border-slate-100 rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">{label}</h3>
                <p className="text-xs text-slate-400">{description}</p>
              </div>
              <span className={`text-sm font-bold ml-4 flex-shrink-0 ${
                product.scores[key] === null ? 'text-slate-300' : 'text-slate-800'
              }`}>
                {product.scores[key] !== null ? product.scores[key]!.toFixed(1) : '—'}
              </span>
            </div>
            <p className="text-sm text-slate-500">{product.details[key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
