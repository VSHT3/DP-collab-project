export default function Conclusions() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Conclusions</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">What We Found</h1>
        <p className="text-slate-500 max-w-2xl">
          Summary conclusions and proposed improved product. Content will be updated
          once all experimental data is collected and analysed.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          { label: 'Safest (Biology)',     value: 'TBD', note: 'Pending bacterial colony data' },
          { label: 'Chemically Safest',    value: 'TBD', note: 'Pending pH and additive data' },
          { label: 'Best Performance',     value: 'Naturella Pad', note: 'Highest absorption: 16.0 g/g' },
          { label: 'Most Sustainable',     value: 'TBD', note: 'Pending decomposition data' },
        ].map(({ label, value, note }) => (
          <div key={label} className="border border-slate-100 rounded-2xl p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-xl font-bold text-slate-900 mb-1">{value}</p>
            <p className="text-sm text-slate-500 italic">{note}</p>
            {value === 'TBD' && (
              <p className="text-xs text-rose-400 mt-3">⚠ Awaiting experimental data</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-rose-50 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Overall Finding</h2>
        <p className="text-slate-600 leading-relaxed">
          Physics data shows commercial pads (especially Naturella) absorb significantly
          more fluid per gram than cloth pads. Full cross-axis conclusions will be drawn
          once Biology, Chemistry, and ESS experiments are complete.
        </p>
      </div>

      <div className="border-2 border-rose-100 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Proposed Improved Product</h2>
        <p className="text-sm text-rose-400 mb-4">Design based on our findings</p>
        <p className="text-slate-600 leading-relaxed mb-6">
          Based on findings, an ideal product would combine:
        </p>
        <ul className="space-y-3 text-sm text-slate-600">
          {[
            'Organic cotton top layer (safety + chemistry: low bacteria, neutral pH)',
            'High-absorbency polymer core (performance: maximum absorbency)',
            'Biodegradable outer shell (environment: reduced decomposition time)',
            'Reusable or compostable packaging (environment: lower CO₂ footprint)',
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-rose-400 mt-6">
          ⚠ This section will be refined once all experimental data is collected.
        </p>
      </div>

      <div className="border-2 border-slate-100 rounded-2xl p-8 bg-slate-50/50">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Our Conceptual Product</h2>
        <p className="text-sm text-slate-400 mb-4">Brand name TBD — placeholder</p>
        <p className="text-slate-500 text-sm leading-relaxed">
          As part of this project, we are designing a conceptual menstrual product brand that
          applies the insights from all four research axes. Details — including branding, materials,
          and pricing — will be added once the team finalises the concept.
        </p>
      </div>
    </div>
  )
}
