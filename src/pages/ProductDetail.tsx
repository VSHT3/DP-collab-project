import { useParams, Link } from 'react-router-dom'
import { products, axes, productTypeLabels, type ProductKey } from '../data/products'
import { RadarChart as BklitRadarChart } from "../components/charts/radar-chart"
import { RadarGrid } from "../components/charts/radar-grid"
import { RadarAxis } from "../components/charts/radar-axis"
import { RadarLabels } from "../components/charts/radar-labels"
import { RadarArea } from "../components/charts/radar-area"
import { RadarTooltip } from "../components/charts/radar-tooltip"

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

  const bklitData = [{
    label: product.label,
    color: product.color,
    values: Object.fromEntries(axes.map(a => [a.key, product.scores[a.key] ?? 0])),
  }]

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
            {product.price !== null && product.sizes.length > 0 && (
              <p className="text-sm text-slate-500 mt-1">
                €{(product.price / product.sizes.reduce((sum, s) => sum + s.pads, 0)).toFixed(2)} per unit · {product.subMetrics.annualCost !== null ? `~€${product.subMetrics.annualCost.toFixed(0)}/year` : ''} (based on ~22 uses × 13 cycles/year)
              </p>
            )}
            {product.sizes.length > 0 && (
              <div className="mt-4 space-y-1">
                {product.sizes.map(s => (
                  <div key={s.label} className="flex items-center gap-3 text-sm">
                    <span className="text-slate-600 font-medium min-w-[100px]">{s.label}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 7 }, (_, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-slate-300"
                          style={i < s.absorbency ? { background: product.color, borderColor: product.color } : {}}
                        />
                      ))}
                    </div>
                    <span className="text-slate-500">{s.pads} pad{s.pads !== 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            )}
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
            <div className="flex justify-center">
              <BklitRadarChart data={bklitData} metrics={axes.map(a => ({ key: a.key, label: a.label }))} size={460}>
                <RadarGrid />
                <RadarAxis />
                <RadarLabels offset={30} fontSize={13} />
                <RadarArea index={0} />
                <RadarTooltip />
              </BklitRadarChart>
            </div>
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
        {product.absorptionRateTrials && product.absorptionRate !== null && (
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
                <p className="text-2xl font-bold text-slate-900">{product.absorptionRate.toFixed(2)} s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
