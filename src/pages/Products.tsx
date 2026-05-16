import { Link } from 'react-router-dom'
import { products, productTypeLabels, brandCoverage, type ProductKey, type ProductType } from '../data/products'

const typeOrder: ProductType[] = ['commercial', 'organic', 'cloth', 'tampon']

function ScoreCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-slate-400">—</span>
  return <span className="font-medium text-slate-800">{value.toFixed(1)}</span>
}

export default function Products() {
  const byType = typeOrder.map(type => ({
    type,
    label: productTypeLabels[type],
    keys: (Object.keys(products) as ProductKey[]).filter(k => products[k].type === type),
  }))

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-500 uppercase">Products</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Products Tested</h1>
        <p className="text-slate-600 max-w-2xl">
          Seven branded products across four categories. Scores on 0–10 scale (higher = better).
          Axes with no data yet show —.
        </p>
      </div>

      <div className="space-y-12">
        {byType.map(({ type, label, keys }) => (
          <section key={type}>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{label}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {keys.map(k => {
                const p = products[k]
                return (
                  <Link
                    key={k}
                    to={`/products/${k}`}
                    className="border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-rose-300 hover:bg-rose-50/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{p.brand}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-4">{p.label}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Safety</p>
                        <ScoreCell value={p.scores.safety} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Chemistry</p>
                        <ScoreCell value={p.scores.chemistry} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Performance</p>
                        <ScoreCell value={p.scores.performance} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Environment</p>
                        <ScoreCell value={p.scores.environment} />
                      </div>
                    </div>
                    {p.price !== null && (
                      <p className="text-xs text-slate-600 mt-3">€{p.price.toFixed(2)}</p>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Brand Coverage Matrix */}
      <section className="mt-16">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Brand Coverage</h2>
        <p className="text-sm text-slate-600 mb-6 max-w-2xl">
          Which brands offer which product types. Our study covers 5 brands across all four categories.
        </p>
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Brand</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600">Tampons</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600">Organic Pads</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600">Commercial Pads</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600">Cloth Pads</th>
              </tr>
            </thead>
            <tbody>
              {brandCoverage.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                  <td className="px-5 py-3 font-medium text-slate-900">{row.brand}</td>
                  <td className="px-4 py-3 text-center">{row.tampon ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-300">—</span>}</td>
                  <td className="px-4 py-3 text-center">{row.organic ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-300">—</span>}</td>
                  <td className="px-4 py-3 text-center">{row.commercial ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-300">—</span>}</td>
                  <td className="px-4 py-3 text-center">{row.cloth ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-300">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
