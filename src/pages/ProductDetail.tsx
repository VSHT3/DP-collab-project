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
        <p className="text-slate-600 text-lg">Product not found.</p>
        <Link to="/products" className="text-rose-500 text-base mt-3 inline-block hover:underline font-medium">
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
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="text-base text-slate-600 hover:text-rose-500 transition-all duration-200 mb-10 inline-block font-medium">
          ← Back to Products
        </Link>

        {/* Header */}
        <div className="flex items-start gap-10 mb-14">
          <div className="w-72 flex-shrink-0">
            <img
              src={product.image}
              alt={product.label}
              className="w-full rounded-xl shadow-md"
            />
          </div>
          <div className="flex-1 pt-6">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-widest block mb-2">
              {product.brand} · {productTypeLabels[product.type]}
            </span>
            <h1 className="text-5xl font-bold text-slate-950 mb-3">{product.label}</h1>
            {product.price !== null
              ? <p className="text-xl text-slate-700 font-medium">€{product.price.toFixed(2)} per pack</p>
              : <p className="text-base text-slate-600 mt-2">Price TBD</p>
            }
            <div className="mt-6 flex items-center gap-3">
              <span className="w-4 h-4 rounded-full" style={{ background: product.color }} />
              <span className="text-sm font-medium text-slate-700">{productTypeLabels[product.type]}</span>
            </div>
          </div>
        </div>

        {/* Radar + Quick Stats side by side */}
        <div className="grid grid-cols-3 gap-8 mb-14">
          {/* Radar chart - takes 2/3 */}
          <div className="col-span-2 border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-1">Score Profile</h2>
            {hasAnyPendingScore && (
              <p className="text-sm text-amber-600 mb-4 font-medium">Axes with no data yet are shown as 0</p>
            )}
            <ResponsiveContainer width="100%" height={480}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 15, fill: '#334155', fontWeight: 600 }} />
                <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 13, fill: '#475569' }} />
                <Radar
                  dataKey="score"
                  stroke={product.color}
                  fill={product.color}
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick stats - takes 1/3 */}
          <div className="space-y-4">
            {axes.map(({ key, label, description }) => (
              <div key={key} className="border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">{label}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">{description}</p>
                  </div>
                  <span className={`text-lg font-bold ml-4 flex-shrink-0 ${
                    product.scores[key] === null ? 'text-slate-400' : 'text-slate-900'
                  }`}>
                    {product.scores[key] !== null ? product.scores[key]!.toFixed(1) : '—'}
                  </span>
                </div>
                <p className="text-base text-slate-700 leading-relaxed">{product.details[key]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Absorption rate trials */}
        {product.absorptionRateTrials && (
          <div className="border border-slate-200 rounded-2xl p-8 shadow-sm mb-14">
            <h2 className="text-xl font-bold text-slate-950 mb-4">Absorption Rate — Raw Trials</h2>
            <div className="grid grid-cols-4 gap-6">
              {product.absorptionRateTrials.map((t, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm text-slate-600 font-medium mb-1">Trial {i + 1}</p>
                  <p className="text-2xl font-bold text-slate-900">{t.toFixed(2)} s</p>
                </div>
              ))}
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium mb-1">Average</p>
                <p className="text-2xl font-bold text-slate-900">{product.absorptionRate!.toFixed(2)} s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
