export type ProductKey = 'organic_pad' | 'commercial_pad' | 'cloth_pad' | 'tampon'

export interface ProductData {
  label: string
  color: string
  scores: {
    safety: number       // Biology: bacterial growth (lower = better, normalized 0-10)
    chemistry: number    // Chemistry: pH neutrality, no additives (0-10)
    performance: number  // Physics: absorbency, wicking speed, leakage (0-10)
    environment: number  // ESS: decomposition, CO2 footprint (0-10)
  }
  details: {
    safety: string
    chemistry: string
    performance: string
    environment: string
  }
}

export const products: Record<ProductKey, ProductData> = {
  organic_pad: {
    label: 'Organic Pad',
    color: '#4ade80',
    scores: {
      safety: 8.2,
      chemistry: 9.1,
      performance: 7.4,
      environment: 8.8,
    },
    details: {
      safety: 'Placeholder — bacterial colony count after 24h exposure',
      chemistry: 'Placeholder — pH ~6.8, no starch additives detected',
      performance: 'Placeholder — absorbency capacity (mL), wicking time (s)',
      environment: 'Placeholder — mass loss after 14 days, CO₂ per use',
    },
  },
  commercial_pad: {
    label: 'Commercial Pad',
    color: '#60a5fa',
    scores: {
      safety: 6.5,
      chemistry: 5.8,
      performance: 8.6,
      environment: 3.4,
    },
    details: {
      safety: 'Placeholder — bacterial colony count after 24h exposure',
      chemistry: 'Placeholder — pH ~5.2, starch additives detected',
      performance: 'Placeholder — absorbency capacity (mL), wicking time (s)',
      environment: 'Placeholder — mass loss after 14 days, CO₂ per use',
    },
  },
  cloth_pad: {
    label: 'Reusable Cloth Pad',
    color: '#f97316',
    scores: {
      safety: 7.1,
      chemistry: 8.4,
      performance: 6.9,
      environment: 9.5,
    },
    details: {
      safety: 'Placeholder — bacterial colony count after 24h exposure',
      chemistry: 'Placeholder — pH ~7.0, no additives',
      performance: 'Placeholder — absorbency capacity (mL), wicking time (s)',
      environment: 'Placeholder — reusable, lowest CO₂ per use lifecycle',
    },
  },
  tampon: {
    label: 'Tampon',
    color: '#a78bfa',
    scores: {
      safety: 5.9,
      chemistry: 6.7,
      performance: 8.1,
      environment: 4.2,
    },
    details: {
      safety: 'Placeholder — bacterial colony count after 24h exposure',
      chemistry: 'Placeholder — pH ~5.8, bleaching agents detected',
      performance: 'Placeholder — absorbency capacity (mL), insertion comfort',
      environment: 'Placeholder — mass loss after 14 days, CO₂ per use',
    },
  },
}

export const axes = [
  { key: 'safety',      label: 'Safety',      description: 'Bacterial growth under simulated conditions (Biology)' },
  { key: 'chemistry',   label: 'Chemistry',   description: 'pH neutrality and absence of harmful additives (Chemistry)' },
  { key: 'performance', label: 'Performance', description: 'Absorbency, wicking speed, leakage resistance (Physics)' },
  { key: 'environment', label: 'Environment', description: 'Decomposition rate and CO₂ footprint per use (ESS)' },
] as const

export type AxisKey = typeof axes[number]['key']
