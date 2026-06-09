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
    comfort: number | null;
    performance: number | null;
    environment: number | null;
    cost: number | null;
  };
  details: {
    safety: string;
    comfort: string;
    performance: string;
    environment: string;
    cost: string;
  };
  subMetrics: {
    tssRisk: number | null;
    skinIrritation: number | null;
    chemicalExposure: number | null;
    environmentalImpact: number | null;
    annualCost: number | null;
  };
  capacityScore: number;
  rateScore: number;
  capacityRaw: number;
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
      safety: null,
      comfort: null,
      performance: null,
      environment: null,
      cost: null,
    },
    details: {
      safety:
        "Moderate safety risk — synthetic topsheet traps moisture creating bacterial growth conditions; contains fragrance with phthalates (endocrine disruptors) and VOCs from synthetic materials and adhesives (Clue, 2024; FDA Guidance, 2025; Brookings, 2024; Marcelis et al., 2021)",
      comfort:
        "Moderate skin comfort — synthetic topsheet and adhesives may cause contact dermatitis in sensitive individuals; fragrance adds irritation risk (Score: 5.0/10)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 5.0,
      chemicalExposure: 5,
      environmentalImpact: 8,
      annualCost: null,
    },
    capacityScore: 10.0,
    rateScore: 1.75,
    capacityRaw: 16.0,
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
      safety: null,
      comfort: null,
      performance: null,
      environment: null,
      cost: null,
    },
    details: {
      safety:
        "Moderate safety risk — polyethylene/polypropylene topsheet traps moisture creating bacterial growth environment; plastics and superabsorbent polymers release VOCs and microplastics; phthalates and parabens from synthetic materials (Clue, 2024; Colorado University, 2026; ScienceDirect S0890623818302259)",
      comfort:
        "Moderate skin comfort — synthetic plastic topsheet can feel less breathable; adhesives may irritate sensitive skin (Score: 5.0/10)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 5.0,
      chemicalExposure: 5,
      environmentalImpact: 8,
      annualCost: null,
    },
    capacityScore: 7.1,
    rateScore: 10.0,
    capacityRaw: 11.3,
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
      safety: null,
      comfort: null,
      performance: null,
      environment: null,
      cost: null,
    },
    details: {
      safety:
        "Moderate safety risk — external wear avoids vaginal bacterial introduction but synthetic materials retain surface moisture; budget product with less ingredient transparency, likely contains VOCs, phthalates, and endocrine-disrupting additives (Clue, 2024; Brookings, 2024)",
      comfort:
        "Moderate skin comfort — synthetic materials may cause irritation; minimal ingredient disclosure makes full assessment difficult (Score: 5.0/10)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 5.0,
      chemicalExposure: 5,
      environmentalImpact: 8,
      annualCost: null,
    },
    capacityScore: 5.4,
    rateScore: 5.65,
    capacityRaw: 8.6,
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
      safety: null,
      comfort: null,
      performance: null,
      environment: null,
      cost: null,
    },
    details: {
      safety:
        "Highest health risk — internal use introduces oxygen into vagina promoting S. aureus proliferation (TSS risk); vaginal epithelium absorbs chemicals more readily than skin; heavy metals (Pb, As, Cd) detected across tampon brands; dioxins from chlorine bleaching; rayon fibers amplify chemical exposure (Clue, 2024; Schlievert & Blomster, 1983; Shearston et al., 2024; Colorado University, 2026; Le Monde, 2024)",
      comfort:
        "Lower skin comfort — internal insertion can cause vaginal dryness and micro-abrasions; rayon fibers less soft than cotton (Score: 4.0/10)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 5,
      skinIrritation: 4.0,
      chemicalExposure: 7.5,
      environmentalImpact: 5,
      annualCost: null,
    },
    capacityScore: 5.0,
    rateScore: 6.1,
    capacityRaw: 8.0,
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
      safety: null,
      comfort: null,
      performance: null,
      environment: null,
      cost: null,
    },
    details: {
      safety:
        "Highest health risk — internal use introduces oxygen for S. aureus (TSS); vaginal epithelium absorbs chemicals more readily than skin; heavy metals (Pb, As, Cd) detected across tampon brands; dioxins from bleaching; no plastic applicator slightly reduces total chemical load vs applicator tampons (Clue, 2024; CDC; Shearston et al., 2024; Le Monde, 2024)",
      comfort:
        "Lower skin comfort — internal insertion can cause dryness; no applicator means more direct handling but less plastic contact (Score: 4.0/10)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 5,
      skinIrritation: 4.0,
      chemicalExposure: 7.5,
      environmentalImpact: 4,
      annualCost: null,
    },
    capacityScore: 5.0,
    rateScore: 5.52,
    capacityRaw: 8.0,
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
      safety: null,
      comfort: null,
      performance: null,
      environment: null,
      cost: null,
    },
    details: {
      safety:
        "Low health risk — organic cotton is breathable reducing bacterial growth; no fragrance, synthetic dyes or chlorine bleaching; eliminates VOC, phthalate, and endocrine disruptor exposure; external use avoids TSS risk entirely (Clue, 2024; Brookings, 2024; FDA Guidance, 2025)",
      comfort:
        "High skin comfort — organic cotton is naturally soft and breathable; no synthetic irritants, fragrances, or chemical residues; ideal for sensitive skin (Score: 7.5/10)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 7.5,
      chemicalExposure: 2,
      environmentalImpact: 6,
      annualCost: null,
    },
    capacityScore: 4.9,
    rateScore: 9.02,
    capacityRaw: 7.8,
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
      safety: null,
      comfort: null,
      performance: null,
      environment: null,
      cost: null,
    },
    details: {
      safety:
        "Variable health risk — natural cotton highly breathable with good bacterial profile; external use only so no TSS risk; PFAS risk from waterproof layers (25% of reusable pads contain PFAS — Wicks et al., 2025); safety depends heavily on washing hygiene and detergent choice (Clue, 2024; Healthline, 2022; Time, 2023)",
      comfort:
        "High skin comfort — natural cotton fabric is soft and breathable; no adhesives needed; comfortable for extended wear (Score: 7.5/10)",
      performance: "Computed from capacity and rate scores",
      environment: "",
      cost: "",
    },
    subMetrics: {
      tssRisk: 0,
      skinIrritation: 7.5,
      chemicalExposure: 5,
      environmentalImpact: 2,
      annualCost: null,
    },
    capacityScore: 1.6,
    rateScore: 7.7,
    capacityRaw: 2.5,
    absorptionRate: 10.08,
    absorptionRateRank: 3,
    absorptionRateTrials: [8.87, 10.87, 10.52],
    sizes: [{ label: "Normal", absorbency: 4, pads: 1 }],
  },
};

// -- Recompute composite scores from sub-metrics --
// Safety = avg of tssRisk_norm + chemicalExposure_norm (both lowerBetter: bodily harm)
// Comfort = skinIrritation as-is (already 0-10, higher = better)
// Performance = avg of capacityScore + rateScore (already scores)
// Environment = environmentalImpact normalized (lowerBetter: less impact = higher score)

const __allKeys = Object.keys(products) as ProductKey[];

function __vals(k: keyof ProductData["subMetrics"]): number[] {
  return __allKeys
    .map((pk) => products[pk].subMetrics[k])
    .filter((v): v is number => v !== null);
}

function __norm(
  val: number | null,
  vals: number[],
  lowerBetter: boolean,
): number {
  if (val === null) return 0;
  const nums = vals.filter((v) => v !== null);
  if (nums.length < 2) return val as number;
  const mn = Math.min(...nums);
  const mx = Math.max(...nums);
  if (mn === mx) return 5;
  const raw = (val - mn) / (mx - mn);
  return lowerBetter ? (1 - raw) * 10 : raw * 10;
}

const __tssVals = __vals("tssRisk");
const __chemVals = __vals("chemicalExposure");
const __envVals = __vals("environmentalImpact");

for (const _k of __allKeys) {
  const _p = products[_k];

  // Safety: avg of tssRisk (lowerBetter) + chemicalExposure (lowerBetter)
  const tss = __norm(_p.subMetrics.tssRisk, __tssVals, true);
  const chem = __norm(_p.subMetrics.chemicalExposure, __chemVals, true);
  _p.scores.safety = parseFloat(((tss + chem) / 2).toFixed(2));

  // Comfort: skinIrritation as-is (already 0-10, higher = better)
  _p.scores.comfort = parseFloat((_p.subMetrics.skinIrritation ?? 0).toFixed(2));

  // Environment: environmentalImpact (lowerBetter: less impact = higher score)
  _p.scores.environment = parseFloat(
    __norm(_p.subMetrics.environmentalImpact, __envVals, true).toFixed(2),
  );

  // Performance: avg of capacityScore + rateScore (already scores)
  _p.scores.performance = parseFloat(
    (((_p.capacityScore) + (_p.rateScore)) / 2).toFixed(2),
  );
}

// Annual cost: compute first so cost normalization sees all values
const USES_PER_YEAR = 286;
const CLOTH_PADS_PER_SET = 6;
const CLOTH_LIFESPAN_YEARS = 3;
for (const _k of __allKeys) {
  const _p = products[_k];
  const totalPads = _p.sizes.reduce((s, sz) => s + sz.pads, 0);
  if (_p.price !== null && totalPads > 0) {
    if (_p.type === "cloth") {
      _p.subMetrics.annualCost = parseFloat(
        ((_p.price * CLOTH_PADS_PER_SET) / CLOTH_LIFESPAN_YEARS).toFixed(2),
      );
    } else {
      _p.subMetrics.annualCost = parseFloat(
        ((_p.price / totalPads) * USES_PER_YEAR).toFixed(2),
      );
    }
  }
}

// Cost score + detail: second pass, now annualCost is set for all products
const __annualVals = __vals("annualCost");
for (const _k of __allKeys) {
  const _p = products[_k];
  _p.scores.cost = parseFloat(
    __norm(_p.subMetrics.annualCost, __annualVals, true).toFixed(2),
  );

  const annualDisplay =
    _p.subMetrics.annualCost !== null
      ? `€${_p.subMetrics.annualCost.toFixed(0)}`
      : "—";
  if (_p.type === "cloth") {
    _p.details.cost = `€${_p.price?.toFixed(2) ?? "?"} per pad · ~€${(_p.price! * CLOTH_PADS_PER_SET).toFixed(0)} for a set of ${CLOTH_PADS_PER_SET} · ${annualDisplay}/year (amortised over ${CLOTH_LIFESPAN_YEARS} years). Based on ~22 uses per cycle × 13 cycles/year.`;
  } else {
    const totalPads = _p.sizes.reduce((s, sz) => s + sz.pads, 0);
    const perUnit =
      _p.price !== null && totalPads > 0
        ? (_p.price / totalPads).toFixed(2)
        : "—";
    _p.details.cost = `€${perUnit} per pad · ${annualDisplay}/year (based on ~22 products per cycle × 13 cycles/year).`;
  }
}

export const axes = [
  {
    key: "safety",
    label: "Safety",
    description: "Health risk from TSS, bacterial growth, and chemical exposure (Biology, Chemistry)",
  },
  {
    key: "comfort",
    label: "Comfort",
    description: "Skin irritation potential, breathability, and material feel (Biology)",
  },
  {
    key: "performance",
    label: "Performance",
    description: "Composite of absorption capacity and rate from lab experiments (Physics)",
  },
  {
    key: "environment",
    label: "Environment",
    description: "Waste volume, plastic content, and reusability per product (ESS)",
  },
  {
    key: "cost",
    label: "Cost",
    description: "Annual cost based on ~22 products per cycle × 13 cycles per year (CS)",
  },
] as const;

export type AxisKey = (typeof axes)[number]["key"];

export const mainAxes = axes.filter((a) =>
  ["safety", "comfort", "performance", "environment", "cost"].includes(a.key),
);

export const subMetrics = [
  {
    key: "tssRisk" as const,
    label: "TSS Safety",
    description:
      "Freedom from Toxic Shock Syndrome risk (Biology, higher = better)",
    unit: "score",
    lowerBetter: true,
    compound: "safety" as const,
  },
  {
    key: "chemicalExposure" as const,
    label: "Chemical Safety",
    description:
      "Low exposure to VOCs, phthalates, heavy metals, bleaching residues (Chemistry, higher = safer)",
    unit: "score",
    lowerBetter: true,
    compound: "safety" as const,
  },
  {
    key: "skinIrritation" as const,
    label: "Skin Comfort",
    description:
      "Low dermatitis risk from materials (Biology, higher = better)",
    unit: "score",
    lowerBetter: false,
    compound: "comfort" as const,
  },
  {
    key: "environmentalImpact" as const,
    label: "Eco-Friendliness",
    description:
      "Low waste, biodegradability, and resource use (ESS, higher = better)",
    unit: "score",
    lowerBetter: true,
    compound: "environment" as const,
  },
  {
    key: "capacity" as const,
    label: "Absorption Capacity",
    description: "Fluid held per gram of dry product (Physics Exp 1)",
    unit: "g/g",
    lowerBetter: false,
    compound: "performance" as const,
  },
  {
    key: "rate" as const,
    label: "Absorption Rate",
    description: "Time to absorb 5 mL (Physics Exp 2, seconds)",
    unit: "s/5 mL",
    lowerBetter: true,
    compound: "performance" as const,
  },
  {
    key: "annualCost" as const,
    label: "Annual Cost",
    description:
      "Estimated yearly spend based on 22 products/cycle × 13 cycles/year",
    unit: "€",
    lowerBetter: true,
    compound: "cost" as const,
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
  "/pictures/milana.jpeg",
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
