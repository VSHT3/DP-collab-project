const subjects = [
  {
    emoji: '🧫',
    label: 'Biology',
    rq: 'Which product type produces the least bacterial growth after exposure to simulated menstrual fluid?',
    methodology: [
      'Prepared simulated menstrual fluid (SMF) using standardised protocol',
      'Applied equal volumes of SMF to each product sample',
      'Incubated at 37 °C for 24 hours',
      'Performed colony counts on nutrient agar plates',
      'Repeated trials n = 3 per product',
    ],
    metric: 'Colony-forming units (CFU) per cm²',
    status: 'pending' as const,
  },
  {
    emoji: '⚗️',
    label: 'Chemistry',
    rq: 'Which product type has the most neutral pH and fewest harmful chemical additives?',
    methodology: [
      'Extracted product material with deionised water',
      'Measured pH using calibrated digital pH meter',
      'Performed iodine-starch test for starch additives',
      'Conducted spot tests for chlorine bleaching agents',
      'Repeated measurements n = 3 per product',
    ],
    metric: 'pH value (target: 5.5–7.0), binary presence of additives',
    status: 'pending' as const,
  },
  {
    emoji: '📐',
    label: 'Physics',
    rq: 'Which product type absorbs the most fluid per gram of dry mass?',
    methodology: [
      'Weighed each product dry (digital scale, ±0.01 g precision)',
      'Slowly poured simulated fluid (90 mL water + 10 mL corn syrup + food colouring) until saturation',
      'Let excess drip for 5 seconds, then weighed wet product',
      'Calculated absorption capacity = (wet mass − dry mass) / dry mass',
      'Repeated trials n = 3 per product',
    ],
    metric: 'Absorption capacity (g of fluid per g of dry product)',
    status: 'collected' as const,
  },
  {
    emoji: '🌱',
    label: 'Environmental Science',
    rq: 'Which product type decomposes fastest and has the smallest CO₂ footprint per use?',
    methodology: [
      'Buried product samples in standardised soil at controlled moisture and temperature',
      'Measured mass loss at days 0, 7, and 14',
      'Calculated percentage mass loss over 14-day period',
      'Estimated CO₂ footprint using published lifecycle assessment data',
      'Compared on a per-use-equivalent basis',
    ],
    metric: '% mass loss over 14 days; CO₂ equivalent (g CO₂e) per use',
    status: 'pending' as const,
  },
]

export default function Sciences() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Sciences & Methodology</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">How We Tested</h1>
        <p className="text-slate-500 max-w-2xl">
          Each axis represents an independent subject investigation. Products tested:
          Always Platinum, Ria Ultra Pad, Ria Tampon, ob Tampon, Naturella Pad,
          Jessa Cotton Pad, Jessa Cloth Pad.
        </p>
      </div>

      <div className="space-y-8">
        {subjects.map(({ emoji, label, rq, methodology, metric, status }) => (
          <div key={label} className="border border-slate-100 rounded-2xl p-7">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <h2 className="text-lg font-semibold text-slate-900">{label}</h2>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                status === 'collected'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {status === 'collected' ? 'Data collected' : 'Pending'}
              </span>
            </div>

            <p className="text-sm text-rose-500 font-medium mb-4 italic">{rq}</p>

            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Procedure</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 mb-4">
              {methodology.map((step, i) => (
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
