const sections = [
  {
    subject: 'Biology',
    emoji: '🧫',
    aim: 'Determine bacterial growth rates on each product type after exposure to simulated menstrual fluid.',
    method: [
      'Prepared simulated menstrual fluid (SMF) using standardized protocol',
      'Applied equal volumes of SMF to each product sample',
      'Incubated at 37°C for 24 hours',
      'Performed colony counts on nutrient agar plates',
      'Repeated trials n=3 per product',
    ],
    metric: 'Colony-forming units (CFU) per cm²',
  },
  {
    subject: 'Chemistry',
    emoji: '⚗️',
    aim: 'Assess chemical composition with focus on pH and presence of starch additives or bleaching agents.',
    method: [
      'Extracted product material with deionized water',
      'Measured pH using calibrated digital pH meter',
      'Performed iodine-starch test for starch additives',
      'Conducted spot tests for chlorine bleaching agents',
      'Repeated measurements n=3 per product',
    ],
    metric: 'pH value (target: 5.5–7.0), binary presence of additives',
  },
  {
    subject: 'Physics',
    emoji: '📐',
    aim: 'Quantify mechanical performance: absorbency capacity, wicking speed, and leakage resistance.',
    method: [
      'Measured dry mass of each product',
      'Added SMF at controlled rate (1 mL/s) until saturation',
      'Recorded wicking distance over time using grid paper',
      'Applied 5 kg pressure load for 1 minute; measured leakage',
      'Calculated absorbency = (wet mass − dry mass) / dry mass',
    ],
    metric: 'Absorbency ratio (g/g), wicking rate (mm/s), leakage (mL)',
  },
  {
    subject: 'ESS',
    emoji: '🌱',
    aim: 'Evaluate environmental impact via decomposition rate and estimated CO₂ footprint per use.',
    method: [
      'Buried samples in standardized soil at controlled moisture and temperature',
      'Measured mass loss at days 0, 7, and 14',
      'Calculated percentage mass loss over 14-day period',
      'Estimated CO₂ footprint using published lifecycle assessment data',
      'Compared on a per-use-equivalent basis',
    ],
    metric: '% mass loss over 14 days, CO₂ equivalent (g CO₂e) per use',
  },
]

export default function Methodology() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Methodology</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">How We Tested</h1>
        <p className="text-slate-500 max-w-2xl">
          Each product was evaluated across four independent subject investigations.
          All placeholders below will be replaced with actual experimental data.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map(({ subject, emoji, aim, method, metric }) => (
          <div key={subject} className="border border-slate-100 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{emoji}</span>
              <h2 className="text-lg font-semibold text-slate-900">{subject}</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4 italic">{aim}</p>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Procedure</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 mb-4">
              {method.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <div className="bg-slate-50 rounded-lg px-4 py-2 inline-block">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key metric: </span>
              <span className="text-sm text-slate-700">{metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
