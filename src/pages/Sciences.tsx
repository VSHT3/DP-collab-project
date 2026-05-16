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
    details: 'Bacterial growth analysis examines how different product materials and chemical treatments affect microbial proliferation. Products with antimicrobial treatments or more breathable materials may show lower colony counts, while those with synthetic additives could promote bacterial growth.',
  },
  {
    emoji: '⚗️',
    label: 'Chemistry',
    rq: 'Which product type has the most neutral pH and fewest harmful chemical additives?',
    methodology: [
      'Identified base materials: cellulose (wood pulp), cotton, rayon, synthetic fibres (polyester, polypropylene)',
      'Examined superabsorbent components: sodium polyacrylate polymer structure and absorption mechanism',
      'Investigated additives and treatments: bleaching agents, fragrance compounds, adhesives, dyes',
      'Tested for trace chemical residues: dioxins, phthalates, possible pesticide residues',
      'Analysed structural layers: top sheet, absorbent core, back sheet — polymers in each',
      'Measured pH using calibrated digital pH meter',
      'Performed iodine-starch test for starch additives',
      'Conducted spot tests for chlorine bleaching agents',
      'Repeated measurements n = 3 per product',
    ],
    metric: 'pH value (target: 5.5–7.0), binary presence of additives, material classification',
    status: 'pending' as const,
    details: 'Chemical analysis covers the full composition chain — from base fibres (natural vs synthetic) through superabsorbent polymers (sodium polyacrylate) to trace residues (dioxins from bleaching, phthalates from fragrances). Each structural layer is examined separately since the top sheet contacts skin directly while the core contains the highest concentration of SAP.',
  },
  {
    emoji: '📐',
    label: 'Physics',
    rq: 'Which product type absorbs the most fluid per gram of dry mass, and how quickly?',
    methodology: [
      'Weighed each product dry (digital scale, ±0.01 g precision)',
      'Prepared simulated fluid: 90 mL water + 10 mL corn syrup + food colouring (1:9 ratio)',
      'Slowly poured fluid until saturation, recorded total volume',
      'Let excess drip for 5 seconds, then weighed wet product',
      'Calculated absorption capacity = (wet mass − dry mass) / dry mass',
      'Measured absorption rate: timed 5 mL fluid absorption with stopwatch',
      'Repeated trials n = 3 per product for both experiments',
    ],
    metric: 'Absorption capacity (g/g), absorption rate (s/5 mL)',
    status: 'collected' as const,
    details: 'Two physics experiments were conducted. Experiment 1 measured total absorption capacity — how much fluid each product holds relative to its own weight. Experiment 2 measured absorption rate — how quickly 5 mL of simulated fluid is fully absorbed. Both metrics are essential: capacity determines how long a product lasts, rate determines comfort during use.',
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
      'Analysed non-biodegradable materials: plastics, synthetic fibres, SAP residues',
      'Researched sustainable alternatives and eco-friendly materials',
    ],
    metric: '% mass loss over 14 days; CO₂ equivalent (g CO₂e) per use',
    status: 'pending' as const,
    details: 'Environmental impact is assessed through decomposition rate (how quickly products break down in soil) and lifecycle CO₂ footprint (manufacturing, transport, disposal). Single-use products with plastic components and synthetic polymers persist in landfills for decades, while reusable cloth pads and organic cotton alternatives offer significantly lower per-use environmental cost.',
  },
]

export default function Sciences() {
  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">Sciences & Methodology</span>
        <h1 className="text-4xl font-bold text-slate-950 mt-2 mb-3">How We Tested</h1>
        <p className="text-lg text-slate-700 max-w-3xl">
          Each axis represents an independent subject investigation. Products tested:
          Always Platinum, Ria Ultra Pad, Ria Tampon, o.b. Tampon, Naturella Pad,
          Jessa Cotton Pad, Jessa Cloth Pad.
        </p>
      </div>

      <div className="space-y-8">
        {subjects.map(({ emoji, label, rq, methodology, metric, status, details }) => (
          <div key={label} className="border border-slate-200 rounded-2xl p-8 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <h2 className="text-xl font-bold text-slate-950">{label}</h2>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                status === 'collected'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {status === 'collected' ? 'Data collected' : 'Pending'}
              </span>
            </div>

            <p className="text-base text-rose-500 font-medium mb-4 italic">{rq}</p>

            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Procedure</h3>
            <ol className="list-decimal list-inside space-y-1.5 text-base text-slate-700 mb-4">
              {methodology.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <div className="bg-slate-50 rounded-lg px-4 py-2 inline-block mb-4">
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Key metric: </span>
              <span className="text-base text-slate-800">{metric}</span>
            </div>

            <p className="text-base text-slate-700 leading-relaxed border-t border-slate-200 pt-4">{details}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
