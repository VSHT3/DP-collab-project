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
  };
  details: {
    safety: string;
    chemistry: string;
    capacity: string;
    rate: string;
    performance: string;
    environment: string;
  };
  subMetrics: {
    colonyCount: number | null;
    ph: number | null;
    massLoss: number | null;
    co2e: number | null;
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
    color: "#34d399",
    image: "/pictures/products/naturella.jpeg",
    scores: {
      safety: 5.0,
      chemistry: 4.0,
      capacity: 10.0,
      rate: 1.75,
      performance: 5.88,
      environment: 2.0,
    },
    details: {
      safety: "Moderate bacterial growth — synthetic topsheet traps moisture, creating warm humid microenvironment (Clue, 2024; FDA Guidance, 2025)",
      chemistry: "Contains VOCs and phthalates from synthetic materials, adhesives, and possible fragrance chemicals (Brookings, 2024; Marcelis et al., 2021)",
      capacity: "Absorption capacity: 16.0 g/g (rank 1 of 7)",
      rate: "Absorption rate: 44.23 s/5 mL (rank 7 of 7)",
      performance: "Composite of capacity (10.0) and rate (1.75): 5.88",
      environment: "~90% plastic by weight; 500–800 year decomposition; ~10 g CO₂e per use (Paul et al., 2026; Mirzaie et al., 2025)",
    },
    subMetrics: {
      colonyCount: 420,
      ph: 7.0,
      massLoss: 10,
      co2e: 10.0,
    },
    absorptionRate: 44.23,
    absorptionRateRank: 7,
    absorptionRateTrials: [42.27, 44.63, 45.78],
    sizes: [{ label: "3 Maxi", absorbency: 6, pads: 14 }],
  },
  always_platinum: {
    label: "Always Platinum",
    brand: "Always",
    type: "commercial",
    price: 3.79,
    color: "#60a5fa",
    image: "/pictures/products/always plat.jpeg",
    scores: {
      safety: 5.0,
      chemistry: 4.0,
      capacity: 7.1,
      rate: 10.0,
      performance: 8.55,
      environment: 2.0,
    },
    details: {
      safety: "Moderate bacterial growth — polyethylene/polypropylene topsheet traps moisture against skin surface (Clue, 2024)",
      chemistry: "Contains VOCs, phthalates, and synthetic polymers; plastic packaging may leach additional chemicals (Colorado University, 2026)",
      capacity: "Absorption capacity: 11.3 g/g (rank 2 of 7)",
      rate: "Absorption rate: 7.76 s/5 mL (rank 1 of 7)",
      performance: "Composite of capacity (7.1) and rate (10.0): 8.55",
      environment: "~90% plastic by weight; 500–800 year decomposition; ~10 g CO₂e per use (Paul et al., 2026)",
    },
    subMetrics: {
      colonyCount: 400,
      ph: 7.2,
      massLoss: 8,
      co2e: 10.5,
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
    color: "#22d3ee",
    image: "/pictures/products/ria ultra.jpeg",
    scores: {
      safety: 5.0,
      chemistry: 4.0,
      capacity: 5.4,
      rate: 5.65,
      performance: 5.53,
      environment: 2.5,
    },
    details: {
      safety: "Moderate bacterial growth — external wear avoids vaginal introduction but synthetic materials retain surface moisture (Clue, 2024)",
      chemistry: "Synthetic materials contain VOCs and phthalates; chemical additives from adhesives and dyes (Brookings, 2024)",
      capacity: "Absorption capacity: 8.6 g/g (rank 3 of 7)",
      rate: "Absorption rate: 13.73 s/5 mL (rank 5 of 7)",
      performance: "Composite of capacity (5.4) and rate (5.65): 5.53",
      environment: "High plastic content; slow decomposition (~12% mass loss in 14 days); ~8 g CO₂e per use (Brunsek et al., 2023)",
    },
    subMetrics: {
      colonyCount: 380,
      ph: 6.8,
      massLoss: 12,
      co2e: 8.0,
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
    color: "#e879f9",
    image: "/pictures/products/ria tampon.jpeg",
    scores: {
      safety: 2.5,
      chemistry: 2.5,
      capacity: 5.0,
      rate: 6.1,
      performance: 5.55,
      environment: 4.0,
    },
    details: {
      safety: "Highest bacterial growth risk — internal use introduces oxygen, promoting S. aureus proliferation; associated with TSS (Clue, 2024; Schlievert & Blomster, 1983)",
      chemistry: "Heavy metals detected in all tested tampon brands (Pb, As, Cd); dioxins from chlorine bleaching; rayon fibers (Shearston et al., 2024; Colorado University, 2026)",
      capacity:
        "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with o.b. Tampon)",
      rate: "Absorption rate: 12.73 s/5 mL (rank 4 of 7)",
      performance: "Composite of capacity (5.0) and rate (6.10): 5.55",
      environment: "Cotton/rayon blend; moderate biodegradation (~30% mass loss); ~4 g CO₂e per use (Brunsek et al., 2023)",
    },
    subMetrics: {
      colonyCount: 720,
      ph: 6.5,
      massLoss: 30,
      co2e: 4.0,
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
    color: "#a78bfa",
    image: "/pictures/products/ob.jpeg",
    scores: {
      safety: 2.5,
      chemistry: 3.0,
      capacity: 5.0,
      rate: 5.52,
      performance: 5.26,
      environment: 4.5,
    },
    details: {
      safety: "Highest bacterial growth risk — internal use introduces oxygen for S. aureus; TSS association (Clue, 2024; CDC)",
      chemistry: "Heavy metals (Pb, As, Cd) in all tested brands; dioxins from bleaching; no plastic applicator reduces chemical load vs. applicator tampons (Shearston et al., 2024)",
      capacity:
        "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with Ria Tampon)",
      rate: "Absorption rate: 14.07 s/5 mL (rank 6 of 7)",
      performance: "Composite of capacity (5.0) and rate (5.52): 5.26",
      environment: "Cotton/rayon blend; moderate biodegradation; no plastic applicator reduces CO₂e (~3 g CO₂e) (Mirzaie et al., 2025)",
    },
    subMetrics: {
      colonyCount: 680,
      ph: 6.5,
      massLoss: 32,
      co2e: 3.0,
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
    color: "#fb923c",
    image: "/pictures/products/jessa cotton.jpeg",
    scores: {
      safety: 7.5,
      chemistry: 8.0,
      capacity: 4.9,
      rate: 9.02,
      performance: 6.96,
      environment: 6.5,
    },
    details: {
      safety: "Lower bacterial growth — organic cotton is breathable, reduces moisture retention; external use eliminates vaginal bacterial introduction (Clue, 2024)",
      chemistry: "Organic cotton free from synthetic fragrances, dyes, and chlorine bleaching; eliminates VOC and phthalate exposure (Brookings, 2024; FDA Guidance, 2025)",
      capacity: "Absorption capacity: 7.8 g/g (rank 6 of 7)",
      rate: "Absorption rate: 8.60 s/5 mL (rank 2 of 7)",
      performance: "Composite of capacity (4.9) and rate (9.02): 6.96",
      environment: "Natural cotton biodegrades well (~50% mass loss); no synthetic polymers; ~5 g CO₂e per use (Paul et al., 2026)",
    },
    subMetrics: {
      colonyCount: 180,
      ph: 6.0,
      massLoss: 50,
      co2e: 5.0,
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
    color: "#f43f5e",
    image: "/pictures/products/jessa nature.jpeg",
    scores: {
      safety: 8.5,
      chemistry: 6.5,
      capacity: 1.6,
      rate: 7.7,
      performance: 4.65,
      environment: 9.5,
    },
    details: {
      safety: "Lowest bacterial growth — natural cotton cloth is highly breathable; external use; risk depends on washing hygiene (Clue, 2024; Healthline, 2022)",
      chemistry: "Natural cotton with no synthetic additives; PFAS risk if waterproofing layer is chemically treated (25% of reusable pads found with PFAS — Wicks et al., 2025); detergent residue possible",
      capacity:
        "Absorption capacity: 2.5 g/g (rank 7 of 7). Reusable — low capacity by design.",
      rate: "Absorption rate: 10.08 s/5 mL (rank 3 of 7)",
      performance: "Composite of capacity (1.6) and rate (7.70): 4.65",
      environment: "Reusable over 100+ cycles; ~0.3 g CO₂e per use (amortized); fully biodegradable cotton (~60% mass loss) (Mirzaie et al., 2025; Brunsek et al., 2023)",
    },
    subMetrics: {
      colonyCount: 120,
      ph: 6.2,
      massLoss: 60,
      co2e: 0.3,
    },
    absorptionRate: 10.08,
    absorptionRateRank: 3,
    absorptionRateTrials: [8.87, 10.87, 10.52],
    sizes: [{ label: "Normal", absorbency: 4, pads: 1 }],
  },
};

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
] as const;

export type AxisKey = (typeof axes)[number]["key"];

export const mainAxes = axes.filter((a) =>
  ["safety", "chemistry", "performance", "environment"].includes(a.key),
);

export const subMetrics = [
  {
    key: "colonyCount" as const,
    label: "Colony Count",
    description: "CFU per cm² after 24h (Biology)",
    unit: "CFU/cm²",
    lowerBetter: true,
  },
  {
    key: "ph" as const,
    label: "pH",
    description: "pH neutrality measurement (Chemistry)",
    unit: "pH",
    lowerBetter: false,
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
    description: "Time to absorb 5 mL (Physics Exp 2)",
    unit: "s/5 mL",
    lowerBetter: true,
  },
  {
    key: "massLoss" as const,
    label: "Mass Loss",
    description: "% mass loss over 14 days (ESS)",
    unit: "%",
    lowerBetter: false,
  },
  {
    key: "co2e" as const,
    label: "CO₂ Footprint",
    description: "CO₂ equivalent per use (ESS)",
    unit: "g CO₂e",
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
export const galleryImages: string[] = galleryOrder.map(
  (n) =>
    `/pictures/lab-${String(n).padStart(2, "0")}${n >= 18 ? ".jpeg" : ".jpg"}`,
);

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
