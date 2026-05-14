export type ProductKey =
  | 'naturella_pad'
  | 'always_platinum'
  | 'ria_pad'
  | 'ria_tampon'
  | 'ob_tampon'
  | 'jessa_cotton'
  | 'jessa_cloth'

export type ProductType = 'organic' | 'commercial' | 'cloth' | 'tampon'

export interface ProductData {
  label: string
  brand: string
  type: ProductType
  price: number | null
  color: string
  scores: {
    safety: number | null
    chemistry: number | null
    performance: number | null
    environment: number | null
  }
  details: {
    safety: string
    chemistry: string
    performance: string
    environment: string
  }
}

export const products: Record<ProductKey, ProductData> = {
  naturella_pad: {
    label: 'Naturella Pad',
    brand: 'Naturella',
    type: 'commercial',
    price: null,
    color: '#34d399',
    scores: { safety: null, chemistry: null, performance: 10.0, environment: null },
    details: {
      safety: 'Pending — bacterial colony count after 24h exposure',
      chemistry: 'Pending — pH measurement and additive detection',
      performance: 'Absorption capacity: 16.0 g/g (rank 1 of 7)',
      environment: 'Pending — mass loss after 14 days, CO₂e per use',
    },
  },
  always_platinum: {
    label: 'Always Platinum',
    brand: 'Always',
    type: 'commercial',
    price: null,
    color: '#60a5fa',
    scores: { safety: null, chemistry: null, performance: 7.1, environment: null },
    details: {
      safety: 'Pending — bacterial colony count after 24h exposure',
      chemistry: 'Pending — pH measurement and additive detection',
      performance: 'Absorption capacity: 11.3 g/g (rank 2 of 7)',
      environment: 'Pending — mass loss after 14 days, CO₂e per use',
    },
  },
  ria_pad: {
    label: 'Ria Ultra Pad',
    brand: 'Ria',
    type: 'commercial',
    price: null,
    color: '#22d3ee',
    scores: { safety: null, chemistry: null, performance: 5.4, environment: null },
    details: {
      safety: 'Pending — bacterial colony count after 24h exposure',
      chemistry: 'Pending — pH measurement and additive detection',
      performance: 'Absorption capacity: 8.6 g/g (rank 3 of 7)',
      environment: 'Pending — mass loss after 14 days, CO₂e per use',
    },
  },
  ria_tampon: {
    label: 'Ria Tampon',
    brand: 'Ria',
    type: 'tampon',
    price: null,
    color: '#e879f9',
    scores: { safety: null, chemistry: null, performance: 5.0, environment: null },
    details: {
      safety: 'Pending — bacterial colony count after 24h exposure',
      chemistry: 'Pending — pH measurement and additive detection',
      performance: 'Absorption capacity: 8.0 g/g (rank 4 of 7)',
      environment: 'Pending — mass loss after 14 days, CO₂e per use',
    },
  },
  ob_tampon: {
    label: 'ob Tampon',
    brand: 'ob',
    type: 'tampon',
    price: null,
    color: '#a78bfa',
    scores: { safety: null, chemistry: null, performance: 5.0, environment: null },
    details: {
      safety: 'Pending — bacterial colony count after 24h exposure',
      chemistry: 'Pending — pH measurement and additive detection',
      performance: 'Absorption capacity: 8.0 g/g (rank 4 of 7)',
      environment: 'Pending — mass loss after 14 days, CO₂e per use',
    },
  },
  jessa_cotton: {
    label: 'Jessa Cotton Pad',
    brand: 'Jessa',
    type: 'organic',
    price: null,
    color: '#fb923c',
    scores: { safety: null, chemistry: null, performance: 4.9, environment: null },
    details: {
      safety: 'Pending — bacterial colony count after 24h exposure',
      chemistry: 'Pending — pH measurement and additive detection',
      performance: 'Absorption capacity: 7.8 g/g (rank 5 of 7)',
      environment: 'Pending — mass loss after 14 days, CO₂e per use',
    },
  },
  jessa_cloth: {
    label: 'Jessa Cloth Pad',
    brand: 'Jessa',
    type: 'cloth',
    price: null,
    color: '#f43f5e',
    scores: { safety: null, chemistry: null, performance: 1.6, environment: null },
    details: {
      safety: 'Pending — bacterial colony count after 24h exposure',
      chemistry: 'Pending — pH measurement and additive detection',
      performance: 'Absorption capacity: 2.5 g/g (rank 6 of 7). Reusable — low capacity by design.',
      environment: 'Pending — expected to score highest due to reusable lifecycle',
    },
  },
}

export const axes = [
  { key: 'safety',      label: 'Safety',      description: 'Bacterial growth under simulated conditions (Biology)' },
  { key: 'chemistry',   label: 'Chemistry',   description: 'pH neutrality and absence of harmful additives (Chemistry)' },
  { key: 'performance', label: 'Performance', description: 'Absorbency capacity and wicking speed (Physics)' },
  { key: 'environment', label: 'Environment', description: 'Decomposition rate and CO₂ footprint per use (ESS)' },
] as const

export type AxisKey = typeof axes[number]['key']

export const productTypeLabels: Record<ProductType, string> = {
  organic:    'Organic Pad',
  commercial: 'Commercial Pad',
  cloth:      'Reusable Cloth Pad',
  tampon:     'Tampon',
}

export const galleryImages: string[] = Array.from({ length: 17 }, (_, i) =>
  `/pictures/lab-${String(i + 1).padStart(2, '0')}.jpg`
)
