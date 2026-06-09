import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products, axes, subMetrics, productTypeLabels, type ProductKey, type SubMetricKey } from '../data/products'
import { RadarChart as BklitRadarChart } from "../components/charts/radar-chart"
import { RadarGrid } from "../components/charts/radar-grid"
import { RadarAxis } from "../components/charts/radar-axis"
import { RadarLabels } from "../components/charts/radar-labels"
import { RadarArea } from "../components/charts/radar-area"
import { RadarTooltip } from "../components/charts/radar-tooltip"

const productKeys = Object.keys(products) as ProductKey[]

function getRaw(k: ProductKey, key: SubMetricKey): number | null {
  if (key === 'capacity') return products[k].capacityScore
  if (key === 'rate') return products[k].rateScore
  return products[k].subMetrics[key]
}

const lowerBetterKeys: SubMetricKey[] = ['tssRisk', 'chemicalExposure', 'environmentalImpact', 'annualCost']

function normVal(k: ProductKey, key: SubMetricKey): number {
  const vals = productKeys.map(pk => getRaw(pk, key)).filter((v): v is number => v !== null)
  const raw = getRaw(k, key)
  if (raw === null || vals.length < 2) return 0
  if (key === 'capacity' || key === 'rate' || key === 'skinIrritation') return raw
  const mn = Math.min(...vals)
  const mx = Math.max(...vals)
  if (mn === mx) return 5
  const r = (raw - mn) / (mx - mn)
  return lowerBetterKeys.includes(key) ? (1 - r) * 10 : r * 10
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products[id as ProductKey]

  const [chartSize, setChartSize] = useState<number | undefined>(480)

  useEffect(() => {
    const update = () => setChartSize(window.innerWidth < 640 ? undefined : 480)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

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
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="text-sm sm:text-base text-slate-600 hover:text-rose-500 transition-all duration-200 mb-6 sm:mb-10 inline-block font-medium">
          ← Back to Products
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 mb-10 sm:mb-14">
          <div className="w-full sm:w-72 flex-shrink-0">
            <img
              src={product.image}
              alt={product.label}
              className="w-full rounded-xl shadow-md"
            />
          </div>
          <div className="flex-1 pt-2 sm:pt-6">
            <span className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-widest block mb-1 sm:mb-2">
              {product.brand} · {productTypeLabels[product.type]}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-950 mb-2 sm:mb-3">{product.label}</h1>
            {product.price !== null
              ? <p className="text-lg sm:text-xl text-slate-700 font-medium">€{product.price.toFixed(2)} per pack</p>
              : <p className="text-base text-slate-600 mt-2">Price TBD</p>
            }
            {product.price !== null && product.sizes.length > 0 && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
          {/* Radar chart - takes 2/3 */}
          <div className="lg:col-span-2 border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-1 self-start">Score Profile</h2>
            {hasAnyPendingScore && (
              <p className="text-xs sm:text-sm text-amber-600 mb-4 font-medium self-start">Axes with no data yet are shown as 0</p>
            )}
            <BklitRadarChart data={bklitData} metrics={axes.map(a => ({ key: a.key, label: a.label }))} size={chartSize}>
              <RadarGrid />
              <RadarAxis />
              <RadarLabels offset={30} fontSize={13} />
              <RadarArea index={0} />
              <RadarTooltip />
            </BklitRadarChart>
          </div>

          {/* Specific measurements - takes 1/3 */}
          <div className="space-y-3">
            {subMetrics.map(({ key, label, description }) => {
              const val = normVal(productKeys.find(k => k === (id as ProductKey))!, key);
              return (
                <div key={key} className="border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="font-bold text-slate-950 text-sm">{label}</p>
                    <span className="text-sm font-bold text-slate-900 ml-2 flex-shrink-0">
                      {val.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Absorption rate trials */}
        {product.absorptionRateTrials && product.absorptionRate !== null && (
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-10 sm:mb-14">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-3 sm:mb-4">Absorption Rate — Raw Trials</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {product.absorptionRateTrials.map((t, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mb-1">Trial {i + 1}</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{t.toFixed(2)} s</p>
                </div>
              ))}
              <div className="text-center">
                <p className="text-xs sm:text-sm text-slate-600 font-medium mb-1">Average</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{product.absorptionRate.toFixed(2)} s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
