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
    rq: 'How do menstrual products compare across bacterial growth, chemical exposure, TSS risk, and skin irritation?',
    methodology: [
      'Reviewed published literature on chemical composition — VOCs, phthalates, heavy metals, PFAS, bleaching residues across product types',
      'Analysed studies on bacterial proliferation on menstrual product materials and Staphylococcus aureus growth in relation to tampon absorbency',
      'Examined research on TSS incidence rates by product type and absorbency level',
      'Reviewed dermatological literature on contact dermatitis from fragrances, adhesives, synthetic materials, and detergent residues',
      'Synthesised findings across multiple peer-reviewed sources to assign risk levels per product for each biological impact category',
    ],
    metric: 'Risk levels (Low/Moderate/High) from published literature across four biological impact categories',
    details:
      'Based on published literature (no hands-on experiment): four biological risk dimensions were assessed — chemical exposure (VOCs, phthalates, metals, PFAS, bleaching residues), bacterial growth (internal vs. external use), Toxic Shock Syndrome (tampon-specific), and skin irritation (fragrances, adhesives, synthetics, detergent). Tampons carry the highest bacterial and TSS risk because internal use introduces oxygen into the vagina. Pads differ mainly by breathability, fragrance content, and synthetic vs. natural materials. Cloth pads are variable depending on washing hygiene and PFAS in waterproof layers.',
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
      'Prepared simulated fluid: 90 mL water + 10 mL corn syrup + food colouring (9:1 ratio)',
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
    rq: 'What is the global scale of menstrual product waste, where does it go, and how can we reduce it?',
    methodology: [
      'Analysed global survey data on menstrual product usage: regular tampons 47%, sanitary pads 46%, panty liners 43%, super tampons 33%, menstrual cups 19%, period underwear 19% (n = 7,394)',
      'Estimated global waste volume: ~2.1 billion women aged 12–50 × ~5.5 products/day × 7 days = ~80.85 billion products per menstrual cycle (rough approximation)',
      'Cross-referenced with UK-specific data: 4.3 billion disposable menstrual products used annually in the UK alone',
      'Investigated disposal pathways: 2 billion items flushed down UK toilets yearly, causing plumbing blockages and ecosystem damage',
      'Researched decomposition timelines: menstrual products take approximately 800 years to fully break down in landfills',
      'Quantified environmental impact: 18,000 menstrual products wash up on beaches worldwide annually, contributing to ~100,000 marine animal deaths per year',
      'Evaluated waste-reduction alternatives: reusable pads, menstrual cups, period pants, applicator-free tampons, and organic cotton products',
    ],
    metric: 'Annual waste volume (billions); decomposition time (years); marine pollution count (items/year); recyclability',
    details:
      'Global survey data (n = 7,394) reveals usage patterns: regular tampons (47%), sanitary pads (46%), panty liners (43%), super-absorbent tampons (33%), menstrual cups (19%), period underwear (19%), combination use (16%), none (4%), and other (1%). An estimated 80.85 billion disposable products are used per menstrual cycle globally (rough estimate based on 2.1 billion menstruating women × ~38.5 products/cycle). More precise UK data shows 4.3 billion products used annually in a single country. Most end up in landfills, taking ~800 years to decompose. Annually, 2 billion items are flushed in UK toilets, and 18,000 wash up on beaches, killing ~100,000 marine animals. Used products cannot be recycled due to mixed synthetic/natural materials and hygiene concerns. Solutions: menstrual cups, reusable pads, period pants, applicator-free tampons, and organic cotton. Always dispose in general waste — never flush.',
  },
]
