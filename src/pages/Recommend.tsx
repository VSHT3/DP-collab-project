import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, axes, type ProductKey, type AxisKey } from '../data/products'

type Weights = Record<AxisKey, number>

const defaultWeights: Weights = {
  safety: 5,
  chemistry: 5,
  performance: 5,
  environment: 5,
}

function computeScores(weights: Weights): { key: ProductKey; score: number; hasPending: boolean }[] {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 1
  const productKeys = Object.keys(products) as ProductKey[]
  return productKeys
    .map(key => {
      const hasPending = axes.some(a => products[key].scores[a.key] === null)
      const score = axes.reduce((sum, axis) => {
        return sum + (weights[axis.key] / totalWeight) * (products[key].scores[axis.key] ?? 0)
      }, 0)
      return { key, score, hasPending }
    })
    .sort((a, b) => b.score - a.score)
}

export default function Recommend() {
  const [weights, setWeights] = useState<Weights>(defaultWeights)
  const [submitted, setSubmitted] = useState(false)

  const ranked = computeScores(weights)
  const winner = ranked[0]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Recommendation Tool</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Find Your Best Product</h1>
        <p className="text-slate-500">
          Drag the sliders to reflect what matters most to you. The tool ranks all
          seven products based on our research data.
        </p>
        <p className="text-xs text-amber-500 mt-2">
          Only Physics (Performance) data is collected so far. Pending axes are treated as 0 and marked with *.
        </p>
      </div>

      <div className="border border-slate-100 rounded-2xl p-7 mb-8">
        <h2 className="font-semibold text-slate-900 mb-6">Set Your Priorities</h2>
        <div className="space-y-6">
          {axes.map(({ key, label, description }) => (
            <div key={key}>
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <span className="text-sm font-medium text-slate-800">{label}</span>
                  <span className="ml-2 text-xs text-slate-400">{description}</span>
                </div>
                <span className="text-sm font-semibold text-rose-500 w-4 text-right">
                  {weights[key]}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={weights[key]}
                onChange={e => {
                  setWeights(w => ({ ...w, [key]: Number(e.target.value) }))
                  setSubmitted(false)
                }}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-xs text-slate-300 mt-0.5">
                <span>Not important</span>
                <span>Most important</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="mt-8 w-full py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-colors"
        >
          Show My Recommendation
        </button>
      </div>

      {submitted && (
        <div className="space-y-4">
          <div
            className="rounded-2xl p-7 text-white"
            style={{ background: products[winner.key].color }}
          >
            <p className="text-sm font-semibold opacity-80 mb-1">Best match for you</p>
            <h2 className="text-2xl font-bold mb-1">{products[winner.key].label}</h2>
            <p className="text-sm opacity-80">{products[winner.key].brand}</p>
            <p className="text-sm opacity-80 mt-2">
              Weighted score: {winner.score.toFixed(2)} / 10
              {winner.hasPending && ' *'}
            </p>
          </div>

          {winner.hasPending && (
            <p className="text-xs text-amber-500 px-1">
              * Score includes axes with pending data (treated as 0). Results will improve as more data is collected.
            </p>
          )}

          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Ranking</span>
            </div>
            {ranked.map(({ key, score, hasPending }, i) => (
              <div key={key} className="flex items-center justify-between px-5 py-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 text-sm font-semibold w-5">{i + 1}</span>
                  <span className="w-3 h-3 rounded-full" style={{ background: products[key].color }} />
                  <div>
                    <span className="text-sm font-medium text-slate-800">{products[key].label}</span>
                    {hasPending && <span className="text-xs text-amber-400 ml-1">*</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${(score / 10) * 100}%`, background: products[key].color }}
                    />
                  </div>
                  <span className="text-sm text-slate-500 w-10 text-right">{score.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-slate-100 rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              Score Breakdown — {products[winner.key].label}
            </h3>
            <div className="space-y-3">
              {axes.map(({ key, label }) => {
                const rawScore = products[winner.key].scores[key]
                const weight = weights[key]
                const isPending = rawScore === null
                return (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{label}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 text-xs">
                        score {isPending ? '— (pending)' : rawScore.toFixed(1)} × priority {weight}
                      </span>
                      <span className="font-medium text-slate-800 w-12 text-right">
                        {isPending ? '—' : (rawScore * weight).toFixed(1)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <Link to="/products" className="text-sm text-rose-500 hover:underline">
              View all products →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
