import { Link } from 'react-router-dom'
import { subjects } from '../data/sciences'
import { products } from '../data/products'

const subject = subjects.find(s => s.slug === 'physics')!

const capacityData = [
  { key: 'naturella_pad',     dryMass: 3,  wetMass: 51, fluidPoured: 48, fluidAbsorbed: 48, capacity: 16.0, rank: 1 },
  { key: 'always_platinum',   dryMass: 6,  wetMass: 74, fluidPoured: 68, fluidAbsorbed: 68, capacity: 11.3, rank: 2 },
  { key: 'ria_pad',           dryMass: 5,  wetMass: 48, fluidPoured: 43, fluidAbsorbed: 43, capacity: 8.6,  rank: 3 },
  { key: 'ob_tampon',         dryMass: 3,  wetMass: 27, fluidPoured: 24, fluidAbsorbed: 24, capacity: 8.0,  rank: 4 },
  { key: 'ria_tampon',        dryMass: 3,  wetMass: 27, fluidPoured: 24, fluidAbsorbed: 24, capacity: 8.0,  rank: 4 },
  { key: 'jessa_cotton',      dryMass: 4,  wetMass: 35, fluidPoured: 32, fluidAbsorbed: 31, capacity: 7.8,  rank: 5 },
  { key: 'jessa_cloth',       dryMass: 16, wetMass: 56, fluidPoured: 44, fluidAbsorbed: 40, capacity: 2.5,  rank: 6 },
]

const typeRanking = [
  { type: 'Commercial pads',     rank: 1 },
  { type: 'Tampons',             rank: 2 },
  { type: 'Organic pads',        rank: 3 },
  { type: 'Reusable cloth pads', rank: 4 },
]

const absorptionData = [
  { key: 'naturella_pad',     trials: [42.27, 44.63, 45.78] as const, avg: 44.23, volume: '5 mL', rank: 7 },
  { key: 'always_platinum',   trials: [6.89,  8.65,  7.74]  as const, avg: 7.76,  volume: '5 mL', rank: 1 },
  { key: 'ria_pad',           trials: [13.35, 13.72, 14.13] as const, avg: 13.73, volume: '5 mL', rank: 5 },
  { key: 'ria_tampon',        trials: [13.48, 11.70, 13.02] as const, avg: 12.73, volume: '5 mL', rank: 4 },
  { key: 'ob_tampon',         trials: [12.77, 14.61, 14.84] as const, avg: 14.07, volume: '5 mL', rank: 6 },
  { key: 'jessa_cotton',      trials: [10.48, 7.73,  7.60]  as const, avg: 8.60,  volume: '5 mL', rank: 2 },
  { key: 'jessa_cloth',       trials: [8.87,  10.87, 10.52] as const, avg: 10.08, volume: '5 mL', rank: 3 },
]

function rankBadge(rank: number) {
  if (rank === 1) return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">{rank}</span>
  return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">{rank}</span>
}

function ProcedureCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 sm:mb-4">{title}</h2>
      <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700">
        {steps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  )
}

export default function PhysicsDetail() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/sciences"
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-500 hover:text-rose-500 transition-colors mb-6 sm:mb-8"
        >
          ← Sciences
        </Link>

        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="text-2xl sm:text-3xl">{subject.emoji}</span>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase">Sciences & Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-2 sm:mb-3">{subject.label}</h1>
          <p className="text-base sm:text-lg text-rose-500 font-medium italic max-w-3xl">{subject.rq}</p>
        </div>

        <div className="space-y-6 sm:space-y-8">

          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 sm:mb-3">Key Metric</h2>
            <p className="text-sm sm:text-base text-slate-800">{subject.metric}</p>
          </div>

          {/* Materials */}
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 sm:mb-4">Materials</h2>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-slate-700">
              <li>4 product types (7 products total: 3 commercial pads, 1 organic pad, 1 reusable cloth pad, 2 tampons)</li>
              <li>Digital scale (±0.01 g)</li>
              <li>Stopwatch (phone)</li>
              <li>Paper towels / A4 paper</li>
              <li>Stirring rod</li>
              <li>100 mL measuring cylinder</li>
              <li>Beaker</li>
              <li>Syringe</li>
              <li>Tap water</li>
              <li>Glycerol</li>
              <li>Red food colouring</li>
            </ul>
          </div>

          {/* Fluid Preparation */}
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 sm:mb-4">Fluid Preparation</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-3">Blood-mimicking fluid based on published viscosity research (water + glycerol, 6:4 ratio).</p>
            <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700">
              <li>Pour 60 mL water into the measuring cylinder</li>
              <li>Add 40 mL glycerol (ratio 6:4)</li>
              <li>Add 2–3 drops of red food colouring</li>
              <li>Stir with stirring rod until well mixed</li>
              <li>Pour the prepared fluid from the measuring cylinder into the beaker</li>
            </ol>
          </div>

          {/* Experiment 1: Capacity */}
          <ProcedureCard
            title="Experiment 1 — Absorption Capacity"
            steps={[
              "Place a paper towel on your workspace",
              "Weigh the dry product and record as Dry mass (g)",
              "Place the product flat on the paper towel",
              "Slowly pour simulated fluid using syringe onto the centre of the product",
              "Stop pouring when fully saturated (fluid starts to pool on surface or run off edges)",
              "Record total volume poured in mL (1 mL fluid ≈ 1 g)",
              "Carefully lift the wet product — let excess drip for 5 seconds",
              "Weigh the wet product and record as Wet mass (g)",
              "Repeat for all 7 products; clean workspace",
            ]}
          />

          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-rose-50/30">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 sm:mb-3">Calculation</h2>
            <p className="text-sm sm:text-base text-slate-700 font-mono mb-1">Fluid absorbed (g) = Wet mass (g) − Dry mass (g)</p>
            <p className="text-sm sm:text-base text-slate-700 font-mono">Absorption capacity (g/g) = Fluid absorbed (g) ÷ Dry mass (g)</p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 sm:px-8 py-4 sm:py-5 bg-rose-50">
              <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Capacity Data</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Higher capacity (g/g) is better — more fluid per gram of product.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-3 sm:px-5 py-2.5 sm:py-3 text-left font-semibold text-slate-600">Product</th>
                    <th className="px-2 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Dry mass (g)</th>
                    <th className="px-2 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Wet mass (g)</th>
                    <th className="px-2 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Fluid poured (mL)</th>
                    <th className="px-2 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Fluid abs. (g)</th>
                    <th className="px-2 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Capacity (g/g)</th>
                    <th className="px-3 sm:px-5 py-2.5 sm:py-3 text-center font-semibold text-slate-600">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {capacityData.map((p, i) => {
                    const pr = products[p.key as keyof typeof products]
                    return (
                      <tr key={p.key} className={`border-t border-slate-100 ${i % 2 === 0 ? '' : 'bg-slate-50/50'} hover:bg-slate-50 transition-colors`}>
                        <td className="px-3 sm:px-5 py-2.5 sm:py-3">
                          <Link to={`/products/${p.key}`} className="flex items-center gap-2 text-slate-900 font-medium hover:text-rose-500 transition-colors">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: pr.color }} />
                            {pr.label}
                          </Link>
                        </td>
                        <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right tabular-nums text-slate-700">{p.dryMass}</td>
                        <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right tabular-nums text-slate-700">{p.wetMass}</td>
                        <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right tabular-nums text-slate-700">{p.fluidPoured}</td>
                        <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right tabular-nums text-slate-700">{p.fluidAbsorbed}</td>
                        <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right tabular-nums text-slate-900 font-semibold">{p.capacity.toFixed(1)}</td>
                        <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-center">{rankBadge(p.rank)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 sm:px-8 py-4 sm:py-5 bg-rose-50">
              <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Product Type Ranking — Average Capacity</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-3 sm:px-5 py-2.5 sm:py-3 text-left font-semibold text-slate-600">Product Type</th>
                    <th className="px-3 sm:px-5 py-2.5 sm:py-3 text-center font-semibold text-slate-600">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {typeRanking.map((t, i) => (
                    <tr key={t.type} className={`border-t border-slate-100 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                      <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-slate-700">{t.type}</td>
                      <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-center">{rankBadge(t.rank)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Experiment 2: Rate */}
          <ProcedureCard
            title="Experiment 2 — Absorption Rate"
            steps={[
              "Place the product flat on a paper towel",
              "Measure exactly 5 mL of simulated fluid in the measuring cylinder",
              "Pour simulated fluid using syringe onto the centre of the product",
              "Start stopwatch immediately upon pouring",
              "Stop stopwatch when fluid is fully absorbed (no shiny/wet surface visible)",
              "Record time in seconds",
              "Repeat 3 times per product for an average; clean workspace",
            ]}
          />

          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm bg-rose-50/30">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 sm:mb-3">Calculation</h2>
            <p className="text-sm sm:text-base text-slate-700 font-mono">Average time (s) = (Trial 1 + Trial 2 + Trial 3) ÷ 3</p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 sm:px-8 py-4 sm:py-5 bg-rose-50">
              <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Absorption Rate Data</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Time for 5 mL of simulated fluid to fully absorb. Lower time is better.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-3 sm:px-5 py-2.5 sm:py-3 text-left font-semibold text-slate-600">Product</th>
                    <th className="px-2 sm:px-3 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Trial 1 (s)</th>
                    <th className="px-2 sm:px-3 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Trial 2 (s)</th>
                    <th className="px-2 sm:px-3 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Trial 3 (s)</th>
                    <th className="px-2 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-slate-600">Avg (s)</th>
                    <th className="px-2 sm:px-3 py-2.5 sm:py-3 text-center font-semibold text-slate-600">Volume</th>
                    <th className="px-3 sm:px-5 py-2.5 sm:py-3 text-center font-semibold text-slate-600">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {absorptionData.map((p, i) => {
                    const pr = products[p.key as keyof typeof products]
                    return (
                      <tr key={p.key} className={`border-t border-slate-100 ${i % 2 === 0 ? '' : 'bg-slate-50/50'} hover:bg-slate-50 transition-colors`}>
                        <td className="px-3 sm:px-5 py-2.5 sm:py-3">
                          <Link to={`/products/${p.key}`} className="flex items-center gap-2 text-slate-900 font-medium hover:text-rose-500 transition-colors">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: pr.color }} />
                            {pr.label}
                          </Link>
                        </td>
                        <td className="px-2 sm:px-3 py-2.5 sm:py-3 text-right tabular-nums text-slate-700">{p.trials[0].toFixed(2)}</td>
                        <td className="px-2 sm:px-3 py-2.5 sm:py-3 text-right tabular-nums text-slate-700">{p.trials[1].toFixed(2)}</td>
                        <td className="px-2 sm:px-3 py-2.5 sm:py-3 text-right tabular-nums text-slate-700">{p.trials[2].toFixed(2)}</td>
                        <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right tabular-nums text-slate-900 font-semibold">{p.avg.toFixed(2)}</td>
                        <td className="px-2 sm:px-3 py-2.5 sm:py-3 text-center text-slate-600">{p.volume}</td>
                        <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-center">{rankBadge(p.rank)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Experiment 3: Leakage Pressure */}
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 sm:mb-3">Experiment 3 — Leakage Pressure</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 italic">Optional — for stronger analysis. Data not yet collected.</p>
            <p className="text-sm sm:text-base text-slate-700 mb-3 sm:mb-4">
              Measures how much weight a saturated product can withstand before leaking — simulating real-world pressure during wear.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700">
              <li>Put on gloves</li>
              <li>Saturate product with 10 mL of simulated fluid (pour onto centre)</li>
              <li>Place flat board on the desk; put a book under one edge (tilt ~10–15°)</li>
              <li>Place dry paper towels at the lower edge of the board</li>
              <li>Place saturated product on board, with its lower edge touching the paper towel</li>
              <li>Add a small weight (e.g. 100–200 g) gently onto the centre of the product</li>
              <li>Wait 5 seconds; check if fluid has reached the paper towel</li>
              <li>If no leak, add more weight (increase by 100–200 g each time)</li>
              <li>Repeat until fluid first appears on the paper towel</li>
              <li>Record total mass (g) of all weights added at that moment</li>
              <li>Repeat 3 times per product with a new saturated pad; skip tampons (not applicable)</li>
            </ol>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 sm:mb-3">Key Insight</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Physics was the only subject with hands-on laboratory testing. Commercial pads (Naturella, Always) absorb the most fluid per gram due to superabsorbent polymers (SAP), but Naturella absorbed by far the most (16.0 g/g) while also being the slowest to absorb (44.23 s). Always Platinum offered the best balance — second-highest capacity (11.3 g/g) with the fastest absorption rate (7.76 s). Reusable cloth pads had the lowest capacity per gram but are reusable, fundamentally changing the usage equation.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
