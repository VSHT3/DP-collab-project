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
    details: 'Bacterial colony analysis reveals how product materials and chemical treatments influence microbial proliferation. Products with higher synthetic content or chemical additives may create environments more conducive to bacterial growth, while natural fibres and breathable designs may inhibit it.',
  },
  {
    subject: 'Chemistry',
    emoji: '⚗️',
    aim: 'Assess chemical composition with focus on pH and presence of starch additives or bleaching agents.',
    method: [
      'Identified base materials: cellulose (wood pulp), cotton, rayon, synthetic fibres (polyester, polypropylene)',
      'Examined superabsorbent components: sodium polyacrylate polymer structure and absorption mechanism',
      'Investigated additives and treatments: bleaching agents, fragrance compounds, adhesives, dyes',
      'Tested for trace chemical residues: dioxins, phthalates, possible pesticide residues',
      'Analysed structural layers: top sheet, absorbent core, back sheet — polymers in each',
      'Extracted product material with deionized water',
      'Measured pH using calibrated digital pH meter',
      'Performed iodine-starch test for starch additives',
      'Conducted spot tests for chlorine bleaching agents',
      'Repeated measurements n=3 per product',
    ],
    metric: 'pH value (target: 5.5–7.0), binary presence of additives, material classification',
    details: 'Full chemical composition analysis from base fibres through superabsorbent polymers to trace residues. Each structural layer examined separately — the top sheet contacts skin directly, the core contains the highest concentration of SAP (sodium polyacrylate), and the back sheet is typically polyethylene film.',
  },
  {
    subject: 'Physics',
    emoji: '📐',
    aim: 'Quantify mechanical performance: absorbency capacity, wicking speed, and absorption rate.',
    method: [
      'Prepared simulated fluid: 90 mL water + 10 mL corn syrup + 2–3 drops red food colouring (1:9 ratio)',
      'Stirred until well mixed',
      'Experiment 1 — Absorption Capacity: weighed dry product, poured fluid until saturation, let drip 5s, weighed wet, calculated g/g',
      'Experiment 2 — Absorption Rate: measured time for exactly 5 mL fluid to be fully absorbed (no shiny surface visible)',
      'Experiment 3 — Leakage Pressure (optional): saturated product on tilted board (~10–15°), added weights until fluid reached paper towel',
      'Repeated trials n=3 per product for all experiments',
    ],
    metric: 'Absorbency ratio (g/g), absorption rate (s/5 mL), leakage resistance (g)',
    details: 'Three physics experiments. Capacity measures total fluid held per gram of product. Rate measures speed of absorption for 5 mL. Leakage pressure (optional) measures weight tolerance before leaking — skipped for tampons as the test design is not applicable.',
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
      'Analysed non-biodegradable materials: plastics, synthetic fibres, SAP residues',
      'Researched sustainable alternatives and eco-friendly materials',
    ],
    metric: '% mass loss over 14 days, CO₂ equivalent (g CO₂e) per use',
    details: 'Environmental impact assessed through decomposition rate and lifecycle CO₂ footprint. Single-use products with plastic components persist in landfills for decades. Reusable cloth pads and organic cotton alternatives offer significantly lower per-use environmental cost. Sustainable solutions include compostable materials, reduced packaging, and reusable product lines.',
  },
]

export default function Methodology() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-500 uppercase">Methodology</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">How We Tested</h1>
        <p className="text-slate-600 max-w-2xl">
          Each product was evaluated across four independent subject investigations.
          All experiments conducted in the school laboratory on 13–16 May.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map(({ subject, emoji, aim, method, metric, details }) => (
          <div key={subject} className="border border-slate-200 rounded-2xl p-7 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{emoji}</span>
              <h2 className="text-lg font-semibold text-slate-900">{subject}</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4 italic">{aim}</p>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Procedure</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 mb-4">
              {method.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <div className="bg-slate-50 rounded-lg px-4 py-2 inline-block mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Key metric: </span>
              <span className="text-sm text-slate-700">{metric}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{details}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
