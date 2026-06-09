import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, mainAxes, type ProductKey, type AxisKey } from '../data/products'

type Weights = Record<AxisKey, number>

const defaultWeights: Weights = {
  safety: 5,
  chemistry: 5,
  capacity: 5,
  rate: 5,
  performance: 5,
  environment: 5,
  cost: 5,
}

function computeScores(weights: Weights): { key: ProductKey; score: number; hasPending: boolean }[] {
  const totalWeight = mainAxes.reduce((sum, a) => sum + weights[a.key], 0) || 1
  const productKeys = Object.keys(products) as ProductKey[]
  return productKeys
    .map(key => {
      const hasPending = mainAxes.some(a => products[key].scores[a.key] === null)
      const score = mainAxes.reduce((sum, axis) => {
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
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
      <div className="mb-8 sm:mb-10">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase">Recommendation Tool</span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 mt-1 sm:mt-2 mb-2 sm:mb-3">Find Your Best Product</h1>
        <p className="text-base sm:text-lg text-slate-700">
          Drag the sliders to reflect what matters most to you. The tool ranks all
          seven products based on our research data.
        </p>
        {ranked.some(r => r.hasPending) && (
          <p className="text-xs sm:text-sm text-amber-600 mt-2 font-medium">
            Some axes have pending data (treated as 0, marked with *).
          </p>
        )}
      </div>

      <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-4 sm:mb-6">Set Your Priorities</h2>
        <div className="space-y-5 sm:space-y-6">
          {mainAxes.map(({ key, label, description }) => (
            <div key={key}>
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <span className="text-sm sm:text-base font-semibold text-slate-900">{label}</span>
                  <span className="ml-2 text-xs sm:text-sm text-slate-600">{description}</span>
                </div>
                <span className="text-base font-bold text-rose-500 w-6 text-right">
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
                className="w-full accent-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
              />
              <div className="flex justify-between text-sm text-slate-500 mt-0.5">
                <span>Not important</span>
                <span>Most important</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="mt-8 w-full py-3.5 rounded-xl bg-rose-500 text-white font-semibold text-base hover:bg-rose-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          Show My Recommendation
        </button>
      </div>

      {submitted && (
        <div className="space-y-4">
          <div
            className="rounded-2xl p-6 sm:p-8 text-white"
            style={{ background: products[winner.key].color }}
          >
            <p className="text-sm sm:text-base font-semibold opacity-80 mb-1">Best match for you</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">{products[winner.key].label}</h2>
            <p className="text-sm sm:text-base opacity-80">{products[winner.key].brand}</p>
            <p className="text-sm sm:text-base opacity-80 mt-2">
              Weighted score: {winner.score.toFixed(2)} / 10
              {winner.hasPending && ' *'}
            </p>
          </div>

          {winner.hasPending && (
            <p className="text-sm text-amber-600 px-1 font-medium">
              * Score includes axes with pending data (treated as 0). Results will improve as more data is collected.
            </p>
          )}

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50">
              <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Full Ranking</span>
            </div>
            {ranked.map(({ key, score, hasPending }, i) => (
              <div key={key} className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-t border-slate-100 hover:bg-slate-50/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm sm:text-base font-bold w-6">{i + 1}</span>
                  <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full" style={{ background: products[key].color }} />
                  <div>
                    <span className="text-sm sm:text-base font-medium text-slate-900">{products[key].label}</span>
                    {hasPending && <span className="text-xs sm:text-sm text-amber-500 ml-1 font-medium">*</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 sm:w-40 bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${(score / 10) * 100}%`, background: products[key].color }}
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-800 w-12 text-right">{score.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-3 sm:mb-4">
              Score Breakdown — {products[winner.key].label}
            </h3>
            <div className="space-y-3">
              {(() => {
                const totalWeight = mainAxes.reduce((sum, a) => sum + weights[a.key], 0) || 1
                return mainAxes.map(({ key, label }) => {
                  const rawScore = products[winner.key].scores[key]
                  const weight = weights[key]
                  const isPending = rawScore === null
                  return (
                    <div key={key} className="flex items-center justify-between text-base">
                      <span className="text-slate-700 font-medium">{label}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-600 text-sm">
                          score {isPending ? '— (pending)' : rawScore.toFixed(1)} × {weight}/{totalWeight}
                        </span>
                        <span className="font-bold text-slate-950 w-12 text-right">
                          {isPending ? '—' : ((weight / totalWeight) * (rawScore ?? 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>

          <div className="text-center pt-2">
            <Link to="/products" className="text-base text-rose-500 hover:underline transition-colors duration-200 font-medium">
              View all products →
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}
