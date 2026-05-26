export interface Subject {
  slug: string
  emoji: string
  label: string
  rq: string
  methodology: string[]
  metric: string
  details: string
}

export const subjects: Subject[] = [
  {
    slug: 'biology',
    emoji: '🧫',
    label: 'Biology',
    rq: 'Which product type produces the least bacterial growth after exposure to simulated menstrual fluid?',
    methodology: [
      'Reviewed published literature on bacterial proliferation on menstrual product materials',
      'Analysed studies on Staphylococcus aureus growth in relation to tampon absorbency and oxygen introduction',
      'Examined research on TSS incidence rates by product type and absorbency level',
      'Compared bacterial colony data from published studies using simulated menstrual fluid exposure',
      'Synthesised findings across multiple peer-reviewed sources to assign risk levels per product',
    ],
    metric: 'Colony-forming units (CFU) per cm² (from published literature)',
    details:
      'Based on published literature: bacterial growth analysis examines how different product materials and chemical treatments affect microbial proliferation. Tampons carry the highest risk because internal use introduces oxygen into the vagina, supporting Staphylococcus aureus growth and potentially causing Toxic Shock Syndrome (TSS). Pads create a warm, moist external environment during prolonged wear but do not carry TSS risk. Products with higher synthetic content or chemical additives may create environments more conducive to bacterial growth, while natural fibres and breathable designs may inhibit it.',
  },
  {
    slug: 'chemistry',
    emoji: '⚗️',
    label: 'Chemistry',
    rq: 'Which product type has the most neutral pH and fewest harmful chemical additives?',
    methodology: [
      'Reviewed published literature on chemical composition of menstrual products',
      'Analysed studies detecting heavy metals (Pb, As, Cd) in tampons across multiple brands',
      'Examined research on VOCs, phthalates, and endocrine disruptors in fragranced products',
      'Investigated published findings on PFAS in reusable and leak-proof menstrual products',
      'Compared dioxin exposure from chlorine-bleached vs. unbleached products',
      'Synthesised ingredient disclosure data from manufacturers and independent lab testing',
      'Assigned risk levels based on chemical exposure severity and absorption pathway (internal vs. external)',
    ],
    metric: 'Risk level (Low/Moderate/High) based on published chemical exposure data',
    details:
      'Based on published literature: chemical analysis covers the full composition chain — from base fibres (natural vs synthetic) through superabsorbent polymers (sodium polyacrylate) to trace residues (dioxins from bleaching, phthalates from fragrances). Each structural layer is examined separately since the top sheet contacts skin directly while the core contains the highest concentration of SAP. For tampons, chemical risk is amplified because vaginal epithelial tissue absorbs chemicals more readily than external skin, making internal products inherently higher risk for the same chemical load (PubMed 41666673).',
  },
  {
    slug: 'physics',
    emoji: '📐',
    label: 'Physics',
    rq: 'Which product type absorbs the most fluid per gram of dry mass, and how quickly?',
    methodology: [
      'Weighed each product dry (digital scale, ±0.01 g precision)',
      'Prepared simulated fluid: 40 mL glycerin + 60 mL water + food colouring (4:6 ratio)',
      'Slowly poured fluid until saturation, recorded total volume',
      'Let excess drip for 5 seconds, then weighed wet product',
      'Calculated absorption capacity = (wet mass − dry mass) / dry mass',
      'Measured absorption rate: timed 5 mL fluid absorption with stopwatch',
      'Repeated trials n = 3 per product for both experiments',
    ],
    metric: 'Absorption capacity (g/g), absorption rate (s/5 mL)',
    details:
      'Hands-on laboratory experiment (the only subject with physical testing): two physics experiments were conducted in the school lab. Experiment 1 measured total absorption capacity — how much fluid each product holds relative to its own weight. Experiment 2 measured absorption rate — how quickly 5 mL of simulated fluid is fully absorbed. Both metrics are essential: capacity determines how long a product lasts, rate determines comfort during use.',
  },
  {
    slug: 'environment',
    emoji: '🌱',
    label: 'Environmental Science',
    rq: 'Which product type decomposes fastest and has the smallest CO₂ footprint per use?',
    methodology: [
      'Reviewed published lifecycle assessment (LCA) data for menstrual products',
      'Analysed studies on decomposition rates of plastic, cotton, rayon, and blended materials',
      'Examined research on PFAS persistence in reusable products and environmental contamination',
      'Compared CO₂e emissions per use across single-use and reusable product categories',
      'Synthesised findings from peer-reviewed environmental impact studies',
      'Assigned scores based on biodegradability, carbon footprint, and long-term environmental persistence',
    ],
    metric: '% mass loss over 14 days; CO₂ equivalent (g CO₂e) per use (from published literature)',
    details:
      'Based on published literature: environmental impact is assessed through decomposition rate (how quickly products break down in soil) and lifecycle CO₂ footprint (manufacturing, transport, disposal). Single-use products with plastic components and synthetic polymers persist in landfills for decades, while reusable cloth pads and organic cotton alternatives offer significantly lower per-use environmental cost.',
  },
]
