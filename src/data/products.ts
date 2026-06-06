export type ProductKey =
  | "naturella_pad"
  | "always_platinum"
  | "ria_pad"
  | "ria_tampon"
  | "ob_tampon"
  | "jessa_cotton"
  | "jessa_cloth";

export type ProductType = "organic" | "commercial" | "cloth" | "tampon";

export interface ProductSize {
  label: string;
  absorbency: number;
  pads: number;
}

export interface ProductData {
  label: string;
  brand: string;
  type: ProductType;
  price: number | null;
  color: string;
  image: string;
  scores: {
    safety: number | null;
    chemistry: number | null;
    capacity: number | null;
    rate: number | null;
    performance: number | null;
    environment: number | null;
    cost: number | null;
  };
  details: {
    safety: string;
    chemistry: string;
    capacity: string;
    rate: string;
    performance: string;
    environment: string;
    cost: string;
  };
  subMetrics: {
    tssRisk: number | null;
    skinIrritation: number | null;
    chemicalExposure: number | null;
    annualCost: number | null;
  };
  absorptionRate: number | null;
  absorptionRateRank: number | null;
  absorptionRateTrials: [number, number, number] | null;
  sizes: ProductSize[];
}

export const products: Record<ProductKey, ProductData> = {
    naturella_pad: {
    label: "Naturella Pad",
    brand: "Naturella",
    type: "commercial",
    price: 3.59,
    color: "#2d8a4e",
    image: "/pictures/products/naturella.jpeg",
    scores: {
      safety: 5.0,
      chemistry: 4.0,
      capacity: 10.0,
      rate: 1.75,
      performance: 5.88,
      environment: null,
      cost: null,
    },
    details: {
      safety: "Moderate bacterial growth — synthetic topsheet traps moisture, creating warm humid microenvironment for bacterial proliferation (Clue, 2024; FDA Guidance, 2025)",
      chemistry: "Moderate chemical exposure — contains fragrance with phthalates (endocrine disruptors linked to hormone disruption and fertility effects); VOCs and parabens from synthetic materials and adhesives (Brookings, 2024; Marcelis et al., 2021; PubMed 41666673)",
      capacity: "Absorption capacity: 16.0 g/g (rank 1 of 7)",
      rate: "Absorption rate: 44.23 s/5 mL (rank 7 of 7)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 5.0,
      chemicalExposure: 5,
      annualCost: null,
    },
    absorptionRate: 44.23,
    absorptionRateRank: 7,
    absorptionRateTrials: [42.27, 44.63, 45.78],
    sizes: [{ label: "3 Maxi", absorbency: 6, pads: 14 }],
  },
  always_platinum: {
    label: "Always Platinum Pad",
    brand: "Always",
    type: "commercial",
    price: 3.79,
    color: "#4a7dc4",
    image: "/pictures/products/always plat.jpeg",
    scores: {
      safety: 5.0,
      chemistry: 4.0,
      capacity: 7.1,
      rate: 10.0,
      performance: 8.55,
      environment: null,
      cost: null,
    },
    details: {
      safety: "Moderate bacterial growth — polyethylene/polypropylene topsheet traps moisture against skin surface, creating warm moist environment (Clue, 2024)",
      chemistry: "Medium chemical exposure — plastics and superabsorbent polymers release VOCs and microplastics; phthalates and parabens from synthetic materials; endocrine disruptor risk (Colorado University, 2026; ScienceDirect S0890623818302259)",
      capacity: "Absorption capacity: 11.3 g/g (rank 2 of 7)",
      rate: "Absorption rate: 7.76 s/5 mL (rank 1 of 7)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 5.0,
      chemicalExposure: 5,
      annualCost: null,
    },
    absorptionRate: 7.76,
    absorptionRateRank: 1,
    absorptionRateTrials: [6.89, 8.65, 7.74],
    sizes: [{ label: "3 Super Extra", absorbency: 5, pads: 12 }],
  },
  ria_pad: {
    label: "Ria Ultra Pad",
    brand: "Ria",
    type: "commercial",
    price: 3.69,
    color: "#3a9b9b",
    image: "/pictures/products/ria ultra.jpeg",
    scores: {
      safety: 5.0,
      chemistry: 3.5,
      capacity: 5.4,
      rate: 5.65,
      performance: 5.53,
      environment: null,
      cost: null,
    },
    details: {
      safety: "Moderate bacterial growth — external wear avoids vaginal introduction but synthetic materials retain surface moisture (Clue, 2024)",
      chemistry: "Medium-high chemical exposure — budget product with less ingredient transparency; synthetic materials likely contain VOCs, phthalates, and endocrine-disrupting additives; minimal disclosure of chemical composition (Brookings, 2024)",
      capacity: "Absorption capacity: 8.6 g/g (rank 3 of 7)",
      rate: "Absorption rate: 13.73 s/5 mL (rank 5 of 7)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 5.0,
      chemicalExposure: 5,
      annualCost: null,
    },
    absorptionRate: 13.73,
    absorptionRateRank: 5,
    absorptionRateTrials: [13.35, 13.72, 14.13],
    sizes: [{ label: "Normal Plus", absorbency: 4, pads: 18 }],
  },
  ria_tampon: {
    label: "Ria Tampon",
    brand: "Ria",
    type: "tampon",
    price: 2.39,
    color: "#b5569e",
    image: "/pictures/products/ria tampon.jpeg",
    scores: {
      safety: 2.5,
      chemistry: 2.5,
      capacity: 5.0,
      rate: 6.1,
      performance: 5.55,
      environment: null,
      cost: null,
    },
    details: {
      safety: "Highest bacterial growth risk — internal use introduces oxygen into vagina, promoting S. aureus proliferation; associated with Toxic Shock Syndrome (TSS) (Clue, 2024; Schlievert & Blomster, 1983)",
      chemistry: "High chemical exposure — vaginal epithelial tissue absorbs chemicals more readily than skin, amplifying risk from heavy metals (Pb, As, Cd) detected in all tested tampon brands; dioxins from chlorine bleaching; rayon fibers (Shearston et al., 2024; Colorado University, 2026; Le Monde, 2024)",
      capacity:
        "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with o.b. Tampon)",
      rate: "Absorption rate: 12.73 s/5 mL (rank 4 of 7)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 5,
      skinIrritation: 4.0,
      chemicalExposure: 7.5,
      annualCost: null,
    },
    absorptionRate: 12.73,
    absorptionRateRank: 4,
    absorptionRateTrials: [13.48, 11.7, 13.02],
    sizes: [{ label: "Normal", absorbency: 3, pads: 16 }],
  },
  ob_tampon: {
    label: "o.b. Tampon",
    brand: "o.b.",
    type: "tampon",
    price: 4.45,
    color: "#7c6db8",
    image: "/pictures/products/ob.jpeg",
    scores: {
      safety: 2.5,
      chemistry: 3.0,
      capacity: 5.0,
      rate: 5.52,
      performance: 5.26,
      environment: null,
      cost: null,
    },
    details: {
      safety: "Highest bacterial growth risk — internal use introduces oxygen for S. aureus; TSS association (Clue, 2024; CDC)",
      chemistry: "High chemical exposure — vaginal epithelial tissue absorbs chemicals more readily than skin; heavy metals (Pb, As, Cd) in all tested brands; dioxins from bleaching; no plastic applicator reduces chemical load vs. applicator tampons (Shearston et al., 2024; Le Monde, 2024)",
      capacity:
        "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with Ria Tampon)",
      rate: "Absorption rate: 14.07 s/5 mL (rank 6 of 7)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 5,
      skinIrritation: 4.0,
      chemicalExposure: 7.5,
      annualCost: null,
    },
    absorptionRate: 14.07,
    absorptionRateRank: 6,
    absorptionRateTrials: [12.77, 14.61, 14.84],
    sizes: [{ label: "Normal", absorbency: 3, pads: 16 }],
  },
  jessa_cotton: {
    label: "Jessa Cotton Pad",
    brand: "Jessa",
    type: "organic",
    price: 3.95,
    color: "#c97d3a",
    image: "/pictures/products/jessa cotton.jpeg",
    scores: {
      safety: 7.5,
      chemistry: 8.0,
      capacity: 4.9,
      rate: 9.02,
      performance: 6.96,
      environment: null,
      cost: null,
    },
    details: {
      safety: "Lower bacterial growth — organic cotton is breathable, reduces moisture retention; external use eliminates vaginal bacterial introduction (Clue, 2024)",
      chemistry: "Low chemical exposure — organic-style product with no fragrance, synthetic dyes, or chlorine bleaching; eliminates VOC, phthalate, and endocrine disruptor exposure (Brookings, 2024; FDA Guidance, 2025)",
      capacity: "Absorption capacity: 7.8 g/g (rank 6 of 7)",
      rate: "Absorption rate: 8.60 s/5 mL (rank 2 of 7)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 7.5,
      chemicalExposure: 2,
      annualCost: null,
    },
    absorptionRate: 8.6,
    absorptionRateRank: 2,
    absorptionRateTrials: [10.48, 7.73, 7.6],
    sizes: [{ label: "Normal", absorbency: 4, pads: 14 }],
  },
  jessa_cloth: {
    label: "Jessa Cloth Pad",
    brand: "Jessa",
    type: "cloth",
    price: 2.15,
    color: "#c94d58",
    image: "/pictures/products/jessa nature.jpeg",
    scores: {
      safety: 8.5,
      chemistry: 6.5,
      capacity: 1.6,
      rate: 7.7,
      performance: 4.65,
      environment: null,
      cost: null,
    },
    details: {
      safety: "Variable bacterial growth — natural cotton cloth is highly breathable; external use; risk depends on washing hygiene and drying conditions (Clue, 2024; Healthline, 2022)",
      chemistry: "Variable chemical exposure — natural cotton with no synthetic additives; PFAS risk from chemical leak-proof layers (25% of reusable pads found with PFAS — Wicks et al., 2025); detergent residue possible (Time, 2023)",
      capacity:
        "Absorption capacity: 2.5 g/g (rank 7 of 7). Reusable — low capacity by design.",
      rate: "Absorption rate: 10.08 s/5 mL (rank 3 of 7)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 7.5,
      chemicalExposure: 5,
      annualCost: null,
    },
    absorptionRate: 10.08,
    absorptionRateRank: 3,
    absorptionRateTrials: [8.87, 10.87, 10.52],
    sizes: [{ label: "Normal", absorbency: 4, pads: 1 }],
  },
};

// -- Recompute composite scores from sub-metrics --
// Safety = avg of tssRisk (lowerBetter) + skinIrritation (higher = better, use as-is)
// Chemistry = chemicalExposure normalized (lowerBetter: less exposure = higher score)
// Performance = avg of capacity + rate (both already scores)

const __allKeys = Object.keys(products) as ProductKey[]

function __vals(k: keyof ProductData['subMetrics']): number[] {
  return __allKeys.map(pk => products[pk].subMetrics[k]).filter((v): v is number => v !== null)
}

function __norm(val: number | null, vals: number[], lowerBetter: boolean): number {
  if (val === null) return 0
  const nums = vals.filter(v => v !== null)
  if (nums.length < 2) return val as number
  const mn = Math.min(...nums)
  const mx = Math.max(...nums)
  if (mn === mx) return 5
  const raw = (val - mn) / (mx - mn)
  return lowerBetter ? (1 - raw) * 10 : raw * 10
}

const __tssVals = __vals('tssRisk')
const __chemVals = __vals('chemicalExposure')

for (const _k of __allKeys) {
  const _p = products[_k]

  // Safety: avg of tssRisk (lowerBetter) + skinIrritation (higher = better)
  const tss = __norm(_p.subMetrics.tssRisk, __tssVals, true)
  const skin = _p.subMetrics.skinIrritation ?? 0
  _p.scores.safety = parseFloat(((tss + skin) / 2).toFixed(2))

  // Chemistry: chemicalExposure (lowerBetter: less exposure = higher score)
  _p.scores.chemistry = parseFloat(__norm(_p.subMetrics.chemicalExposure, __chemVals, true).toFixed(2))

  // Performance: avg of capacity + rate (already scores)
  _p.scores.performance = parseFloat((((_p.scores.capacity ?? 0) + (_p.scores.rate ?? 0)) / 2).toFixed(2))
}

// Annual cost: compute first so cost normalization sees all values
const USES_PER_YEAR = 286
const CLOTH_PADS_PER_SET = 6
const CLOTH_LIFESPAN_YEARS = 3
for (const _k of __allKeys) {
  const _p = products[_k]
  const totalPads = _p.sizes.reduce((s, sz) => s + sz.pads, 0)
  if (_p.price !== null && totalPads > 0) {
    if (_p.type === 'cloth') {
      _p.subMetrics.annualCost = parseFloat(((_p.price * CLOTH_PADS_PER_SET / CLOTH_LIFESPAN_YEARS).toFixed(2)))
    } else {
      _p.subMetrics.annualCost = parseFloat(((_p.price / totalPads * USES_PER_YEAR).toFixed(2)))
    }
  }
}

// Cost score + detail: second pass, now annualCost is set for all products
const __annualVals = __vals('annualCost')
for (const _k of __allKeys) {
  const _p = products[_k]
  _p.scores.cost = __norm(_p.subMetrics.annualCost, __annualVals, true)

  const annualDisplay = _p.subMetrics.annualCost !== null ? `€${_p.subMetrics.annualCost.toFixed(0)}` : '—'
  if (_p.type === 'cloth') {
    _p.details.cost = `€${_p.price?.toFixed(2) ?? '?'} per pad · ~€${(_p.price! * CLOTH_PADS_PER_SET).toFixed(0)} for a set of ${CLOTH_PADS_PER_SET} · ${annualDisplay}/year (amortised over ${CLOTH_LIFESPAN_YEARS} years). Based on ~22 uses per cycle × 13 cycles/year.`
  } else {
    const totalPads = _p.sizes.reduce((s, sz) => s + sz.pads, 0)
    const perUnit = _p.price !== null && totalPads > 0 ? (_p.price / totalPads).toFixed(2) : '—'
    _p.details.cost = `€${perUnit} per pad · ${annualDisplay}/year (based on ~22 products per cycle × 13 cycles/year).`
  }
}

export const axes = [
  {
    key: "safety",
    label: "Safety",
    description: "Bacterial growth under simulated conditions (Biology)",
  },
  {
    key: "chemistry",
    label: "Chemistry",
    description: "pH neutrality and absence of harmful additives (Chemistry)",
  },
  {
    key: "capacity",
    label: "Absorption Capacity",
    description: "Fluid held per gram of dry product (Physics Exp 1)",
  },
  {
    key: "rate",
    label: "Absorption Rate",
    description: "Time to absorb 5 mL of simulated fluid (Physics Exp 2)",
  },
  {
    key: "performance",
    label: "Performance",
    description: "Composite of capacity and rate scores (Physics)",
  },
  {
    key: "environment",
    label: "Environment",
    description: "Decomposition rate and CO₂ footprint per use (ESS)",
  },
  {
    key: "cost",
    label: "Cost",
    description: "Annual cost based on ~22 products per cycle × 13 cycles/year",
  },
] as const;

export type AxisKey = (typeof axes)[number]["key"];

export const mainAxes = axes.filter((a) =>
  ["safety", "chemistry", "performance", "environment", "cost"].includes(a.key),
);

export const subMetrics = [
  {
    key: "tssRisk" as const,
    label: "TSS Safety",
    description: "Freedom from Toxic Shock Syndrome risk (Biology, inverted)",
    unit: "score",
    lowerBetter: true,
  },
  {
    key: "skinIrritation" as const,
    label: "Skin Comfort",
    description: "Low dermatitis risk from materials (Biology, already inverted: higher = better)",
    unit: "score",
    lowerBetter: false,
  },
  {
    key: "chemicalExposure" as const,
    label: "Chemical Safety",
    description: "Low exposure to VOCs, phthalates, heavy metals, bleaching residues (Chemistry, inverted: higher = safer)",
    unit: "score",
    lowerBetter: true,
  },
  {
    key: "capacity" as const,
    label: "Absorption Capacity",
    description: "Fluid held per gram of dry product (Physics Exp 1)",
    unit: "g/g",
    lowerBetter: false,
  },
  {
    key: "rate" as const,
    label: "Absorption Rate",
    description: "Time to absorb 5 mL (Physics Exp 2, seconds)",
    unit: "s/5 mL",
    lowerBetter: true,
  },
  {
    key: "annualCost" as const,
    label: "Annual Cost",
    description: "Estimated yearly spend based on 22 products/cycle × 13 cycles/year",
    unit: "€",
    lowerBetter: true,
  },
];

export type SubMetricKey = (typeof subMetrics)[number]["key"];

export const productTypeLabels: Record<ProductType, string> = {
  organic: "Organic Pad",
  commercial: "Commercial Pad",
  cloth: "Reusable Cloth Pad",
  tampon: "Tampon",
};

const galleryOrder = [
  7, 2, 14, 5, 11, 1, 16, 9, 3, 13, 6, 17, 4, 10, 15, 8, 12, 18, 19, 20, 21,
];
export const galleryImages: string[] = [
  ...galleryOrder.map(
    (n) =>
      `/pictures/lab-${String(n).padStart(2, "0")}${n >= 18 ? ".jpeg" : ".jpg"}`,
  ),
  "/pictures/anicka.jpeg",
  "/pictures/ela.jpeg",
];

export const brandCoverage = [
  {
    brand: "Ria",
    tampon: true,
    organic: false,
    commercial: true,
    cloth: false,
  },
  {
    brand: "Always",
    tampon: false,
    organic: false,
    commercial: true,
    cloth: false,
  },
  {
    brand: "o.b.",
    tampon: true,
    organic: false,
    commercial: false,
    cloth: false,
  },
  {
    brand: "Naturella",
    tampon: false,
    organic: false,
    commercial: true,
    cloth: false,
  },
  {
    brand: "Jessa",
    tampon: false,
    organic: true,
    commercial: false,
    cloth: true,
  },
] as const;

export const productTypeRankings = [
  { type: "commercial" as ProductType, label: "Commercial Pads", rank: 1 },
  { type: "tampon" as ProductType, label: "Tampons", rank: 2 },
  { type: "organic" as ProductType, label: "Organic Pads", rank: 3 },
  { type: "cloth" as ProductType, label: "Reusable Cloth Pads", rank: 4 },
];
