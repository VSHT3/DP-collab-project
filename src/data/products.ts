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
  scores: {
    safety: number | null;
    chemistry: number | null;
    performance: number | null;
    environment: number | null;
  };
  details: {
    safety: string;
    chemistry: string;
    performance: string;
    environment: string;
  };
  absorptionRate: number | null;
  absorptionRateRank: number | null;
}

export const products: Record<ProductKey, ProductData> = {
  naturella_pad: {
    label: "Naturella Pad",
    brand: "Naturella",
    type: "commercial",
    price: 3.59,
    color: "#34d399",
    scores: {
      safety: null,
      chemistry: null,
      performance: 10.0,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      performance: "Absorption capacity: 16.0 g/g (rank 1 of 7)",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 44.23,
    absorptionRateRank: 7,
  },
  always_platinum: {
    label: "Always Platinum",
    brand: "Always",
    type: "commercial",
    price: 3.79,
    color: "#60a5fa",
    scores: {
      safety: null,
      chemistry: null,
      performance: 7.1,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      performance: "Absorption capacity: 11.3 g/g (rank 2 of 7)",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 7.76,
    absorptionRateRank: 1,
  },
  ria_pad: {
    label: "Ria Ultra Pad",
    brand: "Ria",
    type: "commercial",
    price: 3.69,
    color: "#22d3ee",
    scores: {
      safety: null,
      chemistry: null,
      performance: 5.4,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      performance: "Absorption capacity: 8.6 g/g (rank 3 of 7)",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 13.73,
    absorptionRateRank: 5,
  },
  ria_tampon: {
    label: "Ria Tampon",
    brand: "Ria",
    type: "tampon",
    price: 2.39,
    color: "#e879f9",
    scores: {
      safety: null,
      chemistry: null,
      performance: 5.0,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      performance:
        "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with o.b. Tampon)",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 12.73,
    absorptionRateRank: 4,
  },
  ob_tampon: {
    label: "o.b. Tampon",
    brand: "o.b.",
    type: "tampon",
    price: 4.45,
    color: "#a78bfa",
    scores: {
      safety: null,
      chemistry: null,
      performance: 5.0,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      performance:
        "Absorption capacity: 8.0 g/g (rank 4–5 of 7, tied with Ria Tampon)",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 14.07,
    absorptionRateRank: 6,
  },
  jessa_cotton: {
    label: "Jessa Cotton Pad",
    brand: "Jessa",
    type: "organic",
    price: 3.95,
    color: "#fb923c",
    scores: {
      safety: null,
      chemistry: null,
      performance: 4.9,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      performance: "Absorption capacity: 7.8 g/g (rank 6 of 7)",
      environment: "Pending — mass loss after 14 days, CO₂e per use",
    },
    absorptionRate: 8.6,
    absorptionRateRank: 2,
  },
  jessa_cloth: {
    label: "Jessa Cloth Pad",
    brand: "Jessa",
    type: "cloth",
    price: 2.15,
    color: "#f43f5e",
    scores: {
      safety: null,
      chemistry: null,
      performance: 1.6,
      environment: null,
    },
    details: {
      safety: "Pending — bacterial colony count after 24h exposure",
      chemistry: "Pending — pH measurement and additive detection",
      performance:
        "Absorption capacity: 2.5 g/g (rank 7 of 7). Reusable — low capacity by design.",
      environment:
        "Pending — expected to score highest due to reusable lifecycle",
    },
    absorptionRate: 10.08,
    absorptionRateRank: 3,
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
    key: "performance",
    label: "Performance",
    description: "Absorbency capacity and wicking speed (Physics)",
  },
  {
    key: "environment",
    label: "Environment",
    description: "Decomposition rate and CO₂ footprint per use (ESS)",
  },
] as const;

export type AxisKey = (typeof axes)[number]["key"];

export const productTypeLabels: Record<ProductType, string> = {
  organic: "Organic Pad",
  commercial: "Commercial Pad",
  cloth: "Reusable Cloth Pad",
  tampon: "Tampon",
};

const galleryOrder = [
  7, 2, 14, 5, 11, 1, 16, 9, 3, 13, 6, 17, 4, 10, 15, 8, 12,
];
export const galleryImages: string[] = galleryOrder.map(
  (n) => `/pictures/lab-${String(n).padStart(2, "0")}.jpg`,
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
