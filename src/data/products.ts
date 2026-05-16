export type ProductKey =
  | "naturella_pad"
  | "always_platinum"
  | "ria_pad"
  | "ria_tampon"
  | "ob_tampon"
  | "jessa_cotton"
  | "jessa_cloth";

export type ProductType = "organic" | "commercial" | "cloth" | "tampon";

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
  absorptionRate: number | null;
  absorptionRateRank: number | null;
  absorptionRateTrials: [number, number, number] | null;
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
      safety: null,
      chemistry: null,
      capacity: 10.0,
      rate: 1.75,
      performance: 5.88,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      capacity: "Absorption capacity: 16.0 g/g (rank 1 of 7)",
      rate: "Absorption rate: 44.23 s/5 mL (rank 7 of 7)",
      performance: "Composite of capacity (10.0) and rate (1.75): 5.88",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 44.23,
    absorptionRateRank: 7,
    absorptionRateTrials: [42.27, 44.63, 45.78],
  },
  always_platinum: {
    label: "Always Platinum",
    brand: "Always",
    type: "commercial",
    price: 3.79,
    color: "#60a5fa",
    image: "/pictures/products/always plat.jpeg",
    scores: {
      safety: null,
      chemistry: null,
      capacity: 7.1,
      rate: 10.0,
      performance: 8.55,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      capacity: "Absorption capacity: 11.3 g/g (rank 2 of 7)",
      rate: "Absorption rate: 7.76 s/5 mL (rank 1 of 7)",
      performance: "Composite of capacity (7.1) and rate (10.0): 8.55",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 7.76,
    absorptionRateRank: 1,
    absorptionRateTrials: [6.89, 8.65, 7.74],
  },
  ria_pad: {
    label: "Ria Ultra Pad",
    brand: "Ria",
    type: "commercial",
    price: 3.69,
    color: "#22d3ee",
    image: "/pictures/products/ria ultra.jpeg",
    scores: {
      safety: null,
      chemistry: null,
      capacity: 5.4,
      rate: 5.65,
      performance: 5.53,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      capacity: "Absorption capacity: 8.6 g/g (rank 3 of 7)",
      rate: "Absorption rate: 13.73 s/5 mL (rank 5 of 7)",
      performance: "Composite of capacity (5.4) and rate (5.65): 5.53",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 13.73,
    absorptionRateRank: 5,
    absorptionRateTrials: [13.35, 13.72, 14.13],
  },
  ria_tampon: {
    label: "Ria Tampon",
    brand: "Ria",
    type: "tampon",
    price: 2.39,
    color: "#e879f9",
    image: "/pictures/products/ria tampon.jpeg",
    scores: {
      safety: null,
      chemistry: null,
      capacity: 5.0,
      rate: 6.10,
      performance: 5.55,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      capacity: "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with o.b. Tampon)",
      rate: "Absorption rate: 12.73 s/5 mL (rank 4 of 7)",
      performance: "Composite of capacity (5.0) and rate (6.10): 5.55",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 12.73,
    absorptionRateRank: 4,
    absorptionRateTrials: [13.48, 11.70, 13.02],
  },
  ob_tampon: {
    label: "o.b. Tampon",
    brand: "o.b.",
    type: "tampon",
    price: 4.45,
    color: "#a78bfa",
    image: "/pictures/products/ob.jpeg",
    scores: {
      safety: null,
      chemistry: null,
      capacity: 5.0,
      rate: 5.52,
      performance: 5.26,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      capacity: "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with Ria Tampon)",
      rate: "Absorption rate: 14.07 s/5 mL (rank 6 of 7)",
      performance: "Composite of capacity (5.0) and rate (5.52): 5.26",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 14.07,
    absorptionRateRank: 6,
    absorptionRateTrials: [12.77, 14.61, 14.84],
  },
  jessa_cotton: {
    label: "Jessa Cotton Pad",
    brand: "Jessa",
    type: "organic",
    price: 3.95,
    color: "#fb923c",
    image: "/pictures/products/jessa cotton.jpeg",
    scores: {
      safety: null,
      chemistry: null,
      capacity: 4.9,
      rate: 9.02,
      performance: 6.96,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      capacity: "Absorption capacity: 7.8 g/g (rank 6 of 7)",
      rate: "Absorption rate: 8.60 s/5 mL (rank 2 of 7)",
      performance: "Composite of capacity (4.9) and rate (9.02): 6.96",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 8.6,
    absorptionRateRank: 2,
    absorptionRateTrials: [10.48, 7.73, 7.60],
  },
  jessa_cloth: {
    label: "Jessa Cloth Pad",
    brand: "Jessa",
    type: "cloth",
    price: 2.15,
    color: "#f43f5e",
    image: "/pictures/products/jessa nature.jpeg",
    scores: {
      safety: null,
      chemistry: null,
      capacity: 1.6,
      rate: 7.70,
      performance: 4.65,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      capacity: "Absorption capacity: 2.5 g/g (rank 7 of 7). Reusable — low capacity by design.",
      rate: "Absorption rate: 10.08 s/5 mL (rank 3 of 7)",
      performance: "Composite of capacity (1.6) and rate (7.70): 4.65",
      environment: "Pending — expected to score highest due to reusable lifecycle",
    },
    absorptionRate: 10.08,
    absorptionRateRank: 3,
    absorptionRateTrials: [8.87, 10.87, 10.52],
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

export const mainAxes = axes.filter(a =>
  ["safety", "chemistry", "performance", "environment"].includes(a.key),
);

export const productTypeLabels: Record<ProductType, string> = {
  organic: "Organic Pad",
  commercial: "Commercial Pad",
  cloth: "Reusable Cloth Pad",
  tampon: "Tampon",
};

const galleryOrder = [
  7, 2, 14, 5, 11, 1, 16, 9, 3, 13, 6, 17, 4, 10, 15, 8, 12, 18, 19, 20,
];
export const galleryImages: string[] = galleryOrder.map(
  (n) => `/pictures/lab-${String(n).padStart(2, "0")}${n >= 18 ? ".jpeg" : ".jpg"}`,
);

export const brandCoverage = [
  { brand: "Ria", tampon: true, organic: false, commercial: true, cloth: false },
  { brand: "Always", tampon: false, organic: false, commercial: true, cloth: false },
  { brand: "o.b.", tampon: true, organic: false, commercial: false, cloth: false },
  { brand: "Naturella", tampon: false, organic: false, commercial: true, cloth: false },
  { brand: "Jessa", tampon: false, organic: true, commercial: false, cloth: true },
] as const;

export const productTypeRankings = [
  { type: "commercial" as ProductType, label: "Commercial Pads", rank: 1 },
  { type: "tampon" as ProductType, label: "Tampons", rank: 2 },
  { type: "organic" as ProductType, label: "Organic Pads", rank: 3 },
  { type: "cloth" as ProductType, label: "Reusable Cloth Pads", rank: 4 },
];
