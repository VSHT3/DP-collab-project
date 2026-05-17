import { Link } from 'react-router-dom'
import { products, productTypeLabels, brandCoverage, axes, type ProductKey, type ProductType, type ProductSize } from '../data/products'

const typeOrder: ProductType[] = ['commercial', 'organic', 'cloth', 'tampon']

const typeDescriptions: Record<ProductType, string> = {
  commercial: 'Standard disposable pads with synthetic absorbent cores and plastic backing. Designed for maximum fluid retention.',
  organic: 'Disposable pads made primarily from organic cotton. Free from synthetic fragrances and chlorine bleaching.',
  cloth: 'Reusable washable pads made from fabric layers. Lower absorption capacity by design but significantly more sustainable.',
  tampon: 'Inserted cotton/rayon plugs that absorb fluid internally. Compact and discreet but limited by insertion volume.',
}

function ScoreCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-slate-400">—</span>
  return <span className="font-medium text-slate-800">{value.toFixed(1)}</span>
}

function SizeDots({ size, color }: { size: ProductSize; color: string }) {
  const maxAbsorbency = 7
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-slate-600 font-medium min-w-[100px]">{size.label}</span>
      <div className="flex gap-1">
        {Array.from({ length: maxAbsorbency }, (_, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full border border-slate-300"
            style={i < size.absorbency ? { background: color, borderColor: color } : {}}
          />
        ))}
      </div>
      <span className="text-slate-500">{size.pads} pad{size.pads !== 1 ? 's' : ''}</span>
    </div>
  )
}

export default function Products() {
  const byType = typeOrder.map(type => ({
    type,
    label: productTypeLabels[type],
    keys: (Object.keys(products) as ProductKey[]).filter(k => products[k].type === type),
  }))

  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">Products</span>
        <h1 className="text-4xl font-bold text-slate-950 mt-2 mb-3">Products Tested</h1>
        <p className="text-lg text-slate-700 max-w-3xl">
          Seven branded products across four categories. Scores on 0–10 scale (higher = better).
          Axes with no data yet show —.
        </p>
      </div>

      <div className="space-y-12">
        {byType.map(({ type, label, keys }) => (
          <section key={type}>
            <h2 className="text-xl font-bold text-slate-950 mb-1">{label}</h2>
            <p className="text-base text-slate-600 mb-4">{typeDescriptions[type]}</p>
            <div className="space-y-6">
              {keys.map(k => {
                const p = products[k]
                return (
                  <Link
                    key={k}
                    to={`/products/${k}`}
                    className="group border border-slate-200 rounded-2xl shadow-sm hover:border-rose-300 hover:bg-rose-50/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 overflow-hidden"
                  >
                    <div className="flex">
                      <div className="w-48 flex-shrink-0">
                        <img
                          src={p.image}
                          alt={p.label}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 p-6 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{p.brand}</span>
                          {p.price !== null && (
                            <span className="text-sm font-semibold text-slate-700 ml-auto">€{p.price.toFixed(2)}</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{p.label}</h3>
                        {p.sizes.length > 0 && (
                          <div className="mb-4 space-y-1">
                            {p.sizes.map(s => (
                              <SizeDots key={s.label} size={s} color={p.color} />
                            ))}
                          </div>
                        )}
                        {p.price !== null && p.sizes.length > 0 && (
                          <p className="text-xs text-slate-500 mb-3">
                            €{(p.price / p.sizes.reduce((sum, s) => sum + s.pads, 0)).toFixed(2)} per pad
                          </p>
                        )}
                        <div className="grid grid-cols-6 gap-x-6 gap-y-2 text-sm">
                          {axes.map(({ key, label }) => (
                            <div key={key} className="min-w-0">
                              <p className="text-xs text-slate-500 mb-0.5 whitespace-nowrap">{label}</p>
                              <ScoreCell value={p.scores[key]} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Brand Coverage Matrix */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-slate-950 mb-4">Brand Coverage</h2>
        <p className="text-base text-slate-700 mb-6 max-w-3xl">
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
  </div>
  )
}
