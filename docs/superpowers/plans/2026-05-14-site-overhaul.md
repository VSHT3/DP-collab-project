# Site Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the IB Collaborative Science Project SPA from 4 generic product placeholders to 7 real branded products, with a redesigned Home page, merged Sciences/Methodology page, product catalog, and enriched Data & Results analysis panels.

**Architecture:** Static SPA with all data in `src/data/products.ts`. New pages added as React components in `src/pages/`. Lab photos copied to `public/pictures/` with clean filenames and served as static assets. All charts use Recharts; no new dependencies needed.

**Tech Stack:** React 18, TypeScript, React Router v6, Recharts, Tailwind CSS v3, Vite

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/data/products.ts` | Rewrite | 7 branded products, `null`-safe scores, normalized performance |
| `src/App.tsx` | Modify | Add `/products`, `/products/:id`; remove `/methodology` |
| `src/components/Navbar.tsx` | Rewrite | 7 links: Home, Sciences, Products, Data & Results, Recommendation Tool, Conclusions, About Us |
| `src/pages/Home.tsx` | Rewrite | Layout B: Hero → Gallery → RQ → Axes → CTA |
| `src/pages/Sciences.tsx` | Rewrite | Merged methodology content; 4 static cards with status badge |
| `src/pages/Products.tsx` | Create | Catalog grouped by type |
| `src/pages/ProductDetail.tsx` | Create | Per-product radar + details |
| `src/pages/DataResults.tsx` | Modify | Rankings table, statistical summary, correlation scatter |
| `src/pages/Recommend.tsx` | Modify | Null-safe scores, 7 products |
| `src/pages/Conclusions.tsx` | Modify | Add conceptual product card |
| `src/pages/About.tsx` | Rewrite | Team grid — 5 members |
| `src/pages/Methodology.tsx` | Delete | Content merged into Sciences |
| `public/pictures/` | Create | 17 lab photos with clean names (lab-01.jpg … lab-17.jpg) |
| `.gitignore` | Modify | Add `.superpowers/` |

---

## Task 1: Images + Data Model

**Files:**
- Create: `public/pictures/` (17 images)
- Rewrite: `src/data/products.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Copy and rename lab photos**

```bash
mkdir -p public/pictures
cp "pictures/Untitled.jpg"                                 public/pictures/lab-01.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.13.jpeg"   public/pictures/lab-02.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.13(1).jpeg" public/pictures/lab-03.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.13(2).jpeg" public/pictures/lab-04.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.14.jpeg"   public/pictures/lab-05.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.14(1).jpeg" public/pictures/lab-06.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.14(2).jpeg" public/pictures/lab-07.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.14(3).jpeg" public/pictures/lab-08.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.18.jpeg"   public/pictures/lab-09.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 16.27.18(1).jpeg" public/pictures/lab-10.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 17.13.22.jpeg"   public/pictures/lab-11.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 17.13.22(1).jpeg" public/pictures/lab-12.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 17.13.23.jpeg"   public/pictures/lab-13.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 17.13.23(1).jpeg" public/pictures/lab-14.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 17.13.23(2).jpeg" public/pictures/lab-15.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 17.13.23(3).jpeg" public/pictures/lab-16.jpg
cp "pictures/WhatsApp Image 2026-05-13 at 17.13.48.jpeg"   public/pictures/lab-17.jpg
ls public/pictures/ | wc -l   # should print 17
```

- [ ] **Step 2: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` (create if missing) and add:

```
.superpowers/
```

- [ ] **Step 3: Rewrite `src/data/products.ts`**

Performance scores normalized: `score = (raw_g_per_g / 16.0) * 10` where 16.0 is Naturella's max.

```typescript
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
    scores: {
      safety: null,
      chemistry: null,
      performance: 10.0,
      environment: null,
    },
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
    scores: {
      safety: null,
      chemistry: null,
      performance: 7.1,
      environment: null,
    },
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
    scores: {
      safety: null,
      chemistry: null,
      performance: 5.4,
      environment: null,
    },
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
    scores: {
      safety: null,
      chemistry: null,
      performance: 5.0,
      environment: null,
    },
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
    scores: {
      safety: null,
      chemistry: null,
      performance: 5.0,
      environment: null,
    },
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
    scores: {
      safety: null,
      chemistry: null,
      performance: 4.9,
      environment: null,
    },
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
    scores: {
      safety: null,
      chemistry: null,
      performance: 1.6,
      environment: null,
    },
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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add public/pictures/ src/data/products.ts .gitignore
git commit -m "feat: add real branded products data model and lab photos"
```

---

## Task 2: Routing and Navbar

**Files:**
- Modify: `src/App.tsx`
- Rewrite: `src/components/Navbar.tsx`

- [ ] **Step 1: Update `src/App.tsx`**

```typescript
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sciences from './pages/Sciences'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import DataResults from './pages/DataResults'
import Recommend from './pages/Recommend'
import Conclusions from './pages/Conclusions'
import About from './pages/About'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/sciences"     element={<Sciences />} />
          <Route path="/products"     element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/data"         element={<DataResults />} />
          <Route path="/recommend"    element={<Recommend />} />
          <Route path="/conclusions"  element={<Conclusions />} />
          <Route path="/about"        element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Create placeholder stubs for new pages** (so TypeScript doesn't complain before Tasks 5–6)

Create `src/pages/Products.tsx`:
```typescript
export default function Products() {
  return <div className="max-w-5xl mx-auto px-6 py-16"><h1>Products</h1></div>
}
```

Create `src/pages/ProductDetail.tsx`:
```typescript
export default function ProductDetail() {
  return <div className="max-w-5xl mx-auto px-6 py-16"><h1>Product Detail</h1></div>
}
```

- [ ] **Step 3: Rewrite `src/components/Navbar.tsx`**

```typescript
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',            label: 'Home' },
  { to: '/sciences',    label: 'Sciences' },
  { to: '/products',    label: 'Products' },
  { to: '/data',        label: 'Data & Results' },
  { to: '/recommend',   label: 'Recommendation Tool' },
  { to: '/conclusions', label: 'Conclusions' },
  { to: '/about',       label: 'About Us' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-center">
        <ul className="flex gap-1 flex-wrap">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: Delete `src/pages/Methodology.tsx`**

```bash
rm src/pages/Methodology.tsx
```

- [ ] **Step 5: Verify build**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/Navbar.tsx src/pages/Products.tsx src/pages/ProductDetail.tsx
git rm src/pages/Methodology.tsx
git commit -m "feat: update routing and navbar, remove methodology page"
```

---

## Task 3: Home Page Redesign

**Files:**
- Rewrite: `src/pages/Home.tsx`

Layout order: Hero → Gallery (masonry + lightbox) → Research Question → Four Axes (links to /sciences) → Find-Your-Product CTA.

- [ ] **Step 1: Rewrite `src/pages/Home.tsx`**

```typescript
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryImages } from '../data/products'

const axes = [
  { emoji: '🧫', title: 'Biology',   desc: 'Bacterial growth after exposure to simulated menstrual fluid', question: 'Which product is safest?' },
  { emoji: '⚗️', title: 'Chemistry', desc: 'pH levels and presence of starch additives or bleaching agents', question: 'Which is chemically safest?' },
  { emoji: '📐', title: 'Physics',   desc: 'Absorbency capacity and wicking speed under controlled conditions', question: 'Which performs best mechanically?' },
  { emoji: '🌱', title: 'ESS',       desc: 'Decomposition time (14 days) and CO₂ footprint per use', question: 'Which is most sustainable?' },
]

export default function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-20">
        <span className="inline-block text-xs font-semibold tracking-widest text-rose-400 uppercase mb-4">
          IB Collaborative Science Project
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
          Comparing Menstrual Products
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          A cross-disciplinary study examining organic pads, commercial pads,
          reusable cloth pads, and tampons through the lenses of Biology,
          Chemistry, Physics, and Environmental Science.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/data" className="px-5 py-2.5 rounded-lg bg-rose-500 text-white font-medium text-sm hover:bg-rose-600 transition-colors">
            View Results
          </Link>
          <Link to="/recommend" className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
            Find My Product
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-20">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">From the Lab</h2>
        <div style={{ columns: '3 200px', columnGap: '8px' }}>
          {galleryImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Lab photo ${i + 1}`}
              loading="lazy"
              onClick={() => setLightbox(src)}
              className="w-full mb-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity object-cover"
              style={{ breakInside: 'avoid' }}
            />
          ))}
        </div>
      </div>

      {/* Research Question */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-16">
        <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2">Research Question</h2>
        <p className="text-lg font-medium text-slate-900 leading-relaxed">
          Which type of menstrual product best minimizes health risks and environmental impact
          across biological, chemical, physical, and environmental dimensions?
        </p>
        <p className="text-xs text-amber-500 mt-3">Final wording to be confirmed by the team</p>
      </div>

      {/* Four Axes */}
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Our Four Research Axes</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {axes.map(({ emoji, title, desc, question }) => (
          <Link
            key={title}
            to="/sciences"
            className="border border-slate-100 rounded-xl p-6 hover:border-rose-100 hover:bg-rose-50/30 transition-colors block"
          >
            <div className="text-2xl mb-3">{emoji}</div>
            <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-3">{desc}</p>
            <p className="text-sm font-medium text-rose-500">{question}</p>
          </Link>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="bg-rose-500 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Want the most suitable pad for yourself?</h2>
        <p className="text-rose-100 mb-6 text-sm">
          Set your priorities across safety, chemistry, performance, and environment —
          our tool ranks all products for you.
        </p>
        <Link
          to="/recommend"
          className="inline-block bg-white text-rose-500 font-semibold px-6 py-3 rounded-xl hover:bg-rose-50 transition-colors text-sm"
        >
          Yes → Find My Product
        </Link>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Lab photo"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```

Open http://localhost:5173. Check:
- Hero renders with two CTAs
- Gallery shows 17 photos in masonry columns
- Clicking a photo opens the lightbox; clicking backdrop or × closes it
- RQ box shows in amber
- Axes cards link to `/sciences`
- Rose CTA banner at the bottom links to `/recommend`

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: redesign home page with gallery, RQ, and CTA banner"
```

---

## Task 4: Sciences Page (Merged)

**Files:**
- Rewrite: `src/pages/Sciences.tsx`

- [ ] **Step 1: Rewrite `src/pages/Sciences.tsx`**

```typescript
const subjects = [
  {
    emoji: '🧫',
    label: 'Biology',
    rq: 'Which product type produces the least bacterial growth after exposure to simulated menstrual fluid?',
    methodology: [
      'Prepared simulated menstrual fluid (SMF) using standardised protocol',
      'Applied equal volumes of SMF to each product sample',
      'Incubated at 37 °C for 24 hours',
      'Performed colony counts on nutrient agar plates',
      'Repeated trials n = 3 per product',
    ],
    metric: 'Colony-forming units (CFU) per cm²',
    status: 'pending' as const,
  },
  {
    emoji: '⚗️',
    label: 'Chemistry',
    rq: 'Which product type has the most neutral pH and fewest harmful chemical additives?',
    methodology: [
      'Extracted product material with deionised water',
      'Measured pH using calibrated digital pH meter',
      'Performed iodine-starch test for starch additives',
      'Conducted spot tests for chlorine bleaching agents',
      'Repeated measurements n = 3 per product',
    ],
    metric: 'pH value (target: 5.5–7.0), binary presence of additives',
    status: 'pending' as const,
  },
  {
    emoji: '📐',
    label: 'Physics',
    rq: 'Which product type absorbs the most fluid per gram of dry mass?',
    methodology: [
      'Weighed each product dry (digital scale, ±0.01 g precision)',
      'Slowly poured simulated fluid (90 mL water + 10 mL corn syrup + food colouring) until saturation',
      'Let excess drip for 5 seconds, then weighed wet product',
      'Calculated absorption capacity = (wet mass − dry mass) / dry mass',
      'Repeated trials n = 3 per product',
    ],
    metric: 'Absorption capacity (g of fluid per g of dry product)',
    status: 'collected' as const,
  },
  {
    emoji: '🌱',
    label: 'Environmental Science',
    rq: 'Which product type decomposes fastest and has the smallest CO₂ footprint per use?',
    methodology: [
      'Buried product samples in standardised soil at controlled moisture and temperature',
      'Measured mass loss at days 0, 7, and 14',
      'Calculated percentage mass loss over 14-day period',
      'Estimated CO₂ footprint using published lifecycle assessment data',
      'Compared on a per-use-equivalent basis',
    ],
    metric: '% mass loss over 14 days; CO₂ equivalent (g CO₂e) per use',
    status: 'pending' as const,
  },
]

export default function Sciences() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Sciences & Methodology</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">How We Tested</h1>
        <p className="text-slate-500 max-w-2xl">
          Each axis represents an independent subject investigation. Products tested:
          Always Platinum, Ria Ultra Pad, Ria Tampon, ob Tampon, Naturella Pad,
          Jessa Cotton Pad, Jessa Cloth Pad.
        </p>
      </div>

      <div className="space-y-8">
        {subjects.map(({ emoji, label, rq, methodology, metric, status }) => (
          <div key={label} className="border border-slate-100 rounded-2xl p-7">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <h2 className="text-lg font-semibold text-slate-900">{label}</h2>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                status === 'collected'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {status === 'collected' ? 'Data collected' : 'Pending'}
              </span>
            </div>

            <p className="text-sm text-rose-500 font-medium mb-4 italic">{rq}</p>

            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Procedure</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 mb-4">
              {methodology.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <div className="bg-slate-50 rounded-lg px-4 py-2 inline-block">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key metric: </span>
              <span className="text-sm text-slate-700">{metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/sciences`. Check:
- 4 cards render, each with RQ, procedure list, key metric
- Physics card shows green "Data collected" badge; others show grey "Pending"

- [ ] **Step 3: Commit**

```bash
git add src/pages/Sciences.tsx
git commit -m "feat: merge sciences and methodology into one page"
```

---

## Task 5: Products Catalog Page

**Files:**
- Rewrite: `src/pages/Products.tsx`

- [ ] **Step 1: Rewrite `src/pages/Products.tsx`**

```typescript
import { Link } from 'react-router-dom'
import { products, productTypeLabels, type ProductKey, type ProductType } from '../data/products'

const typeOrder: ProductType[] = ['commercial', 'organic', 'cloth', 'tampon']

function ScoreCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-slate-300">—</span>
  return <span className="font-medium text-slate-700">{value.toFixed(1)}</span>
}

export default function Products() {
  const byType = typeOrder.map(type => ({
    type,
    label: productTypeLabels[type],
    keys: (Object.keys(products) as ProductKey[]).filter(k => products[k].type === type),
  }))

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Products</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Products Tested</h1>
        <p className="text-slate-500 max-w-2xl">
          Seven branded products across four categories. Scores on 0–10 scale (higher = better).
          Axes with no data yet show —.
        </p>
      </div>

      <div className="space-y-12">
        {byType.map(({ type, label, keys }) => (
          <section key={type}>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{label}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {keys.map(k => {
                const p = products[k]
                return (
                  <Link
                    key={k}
                    to={`/products/${k}`}
                    className="border border-slate-100 rounded-2xl p-6 hover:border-rose-100 hover:bg-rose-50/20 transition-colors block"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{p.brand}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-4">{p.label}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Safety</p>
                        <ScoreCell value={p.scores.safety} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Chemistry</p>
                        <ScoreCell value={p.scores.chemistry} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Performance</p>
                        <ScoreCell value={p.scores.performance} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Environment</p>
                        <ScoreCell value={p.scores.environment} />
                      </div>
                    </div>
                    {p.price !== null && (
                      <p className="text-xs text-slate-400 mt-3">€{p.price.toFixed(2)}</p>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/products`. Check:
- 4 sections (Commercial, Organic, Cloth, Tampon)
- Commercial has 3 products (Naturella, Always Platinum, Ria Ultra Pad); Organic has 1 (Jessa Cotton); Cloth has 1 (Jessa Cloth); Tampon has 2 (ob, Ria)
- Performance scores show numbers; other axes show —
- Clicking a card navigates to `/products/[id]` (shows stub for now)

- [ ] **Step 3: Commit**

```bash
git add src/pages/Products.tsx
git commit -m "feat: add products catalog page grouped by type"
```

---

## Task 6: Product Detail Page

**Files:**
- Rewrite: `src/pages/ProductDetail.tsx`

- [ ] **Step 1: Rewrite `src/pages/ProductDetail.tsx`**

```typescript
import { useParams, Link } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { products, axes, productTypeLabels, type ProductKey } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products[id as ProductKey]

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-500">Product not found.</p>
        <Link to="/products" className="text-rose-500 text-sm mt-2 inline-block hover:underline">
          ← Back to Products
        </Link>
      </div>
    )
  }

  const radarData = axes.map(({ key, label }) => ({
    axis: label,
    score: product.scores[key] ?? 0,
    pending: product.scores[key] === null,
  }))

  const hasAnyPendingScore = axes.some(a => product.scores[a.key] === null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/products" className="text-sm text-slate-400 hover:text-rose-500 transition-colors mb-8 inline-block">
        ← Back to Products
      </Link>

      <div className="flex items-start gap-4 mb-10">
        <span className="w-4 h-4 rounded-full mt-1.5 flex-shrink-0" style={{ background: product.color }} />
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">
            {product.brand} · {productTypeLabels[product.type]}
          </span>
          <h1 className="text-3xl font-bold text-slate-900">{product.label}</h1>
          {product.price !== null
            ? <p className="text-slate-500 mt-1">€{product.price.toFixed(2)} per pack</p>
            : <p className="text-slate-400 text-sm mt-1">Price TBD</p>
          }
        </div>
      </div>

      {/* Radar */}
      <div className="border border-slate-100 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-slate-900 mb-1">Score Profile</h2>
        {hasAnyPendingScore && (
          <p className="text-xs text-amber-500 mb-4">Axes with no data yet are shown as 0</p>
        )}
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 13, fill: '#64748b' }} />
            <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Radar
              dataKey="score"
              stroke={product.color}
              fill={product.color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Details per axis */}
      <div className="space-y-4">
        {axes.map(({ key, label, description }) => (
          <div key={key} className="border border-slate-100 rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">{label}</h3>
                <p className="text-xs text-slate-400">{description}</p>
              </div>
              <span className={`text-sm font-bold ml-4 flex-shrink-0 ${
                product.scores[key] === null ? 'text-slate-300' : 'text-slate-800'
              }`}>
                {product.scores[key] !== null ? product.scores[key]!.toFixed(1) : '—'}
              </span>
            </div>
            <p className="text-sm text-slate-500">{product.details[key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/products/naturella_pad`. Check:
- Product name, brand, type display correctly
- Radar chart renders — Performance shows ~10, other axes show 0 with amber note
- 4 detail rows show, Performance row has real text and score 10.0, others show —
- Navigate to `/products/jessa_cloth` — performance shows 1.6
- Navigate to `/products/nonexistent` — shows "Product not found" with back link

- [ ] **Step 3: Commit**

```bash
git add src/pages/ProductDetail.tsx
git commit -m "feat: add product detail page with radar chart and axis breakdown"
```

---

## Task 7: DataResults — Rankings Table + Statistical Summary

**Files:**
- Modify: `src/pages/DataResults.tsx`

Replace the existing file entirely. The radar and bar charts are kept (updated for 7 products + null safety), rankings table and stat summary added. Correlation scatter added in Task 8.

- [ ] **Step 1: Rewrite `src/pages/DataResults.tsx`**

```typescript
import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell,
} from 'recharts'
import { products, axes, type ProductKey, type AxisKey } from '../data/products'

const productKeys = Object.keys(products) as ProductKey[]

function fmt(v: number | null): string {
  return v === null ? '—' : v.toFixed(1)
}

function Stats({ axisKey }: { axisKey: AxisKey }) {
  const values = productKeys.map(k => products[k].scores[axisKey]).filter((v): v is number => v !== null)
  if (values.length === 0) return <span className="text-slate-300 text-xs">no data</span>
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const min = Math.min(...values)
  const max = Math.max(...values)
  const std = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length)
  return (
    <div className="text-xs space-y-0.5">
      <div className="flex gap-3">
        <span className="text-slate-400">mean</span><span className="font-medium text-slate-700">{mean.toFixed(2)}</span>
        <span className="text-slate-400">min</span><span className="font-medium text-slate-700">{min.toFixed(1)}</span>
        <span className="text-slate-400">max</span><span className="font-medium text-slate-700">{max.toFixed(1)}</span>
        <span className="text-slate-400">σ</span><span className="font-medium text-slate-700">{std.toFixed(2)}</span>
      </div>
      <div className="text-slate-300">n = {values.length} of {productKeys.length}</div>
    </div>
  )
}

export default function DataResults() {
  const [sortAxis, setSortAxis] = useState<AxisKey>('performance')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [visibleProducts, setVisibleProducts] = useState<Set<ProductKey>>(new Set(productKeys))

  function toggleProduct(k: ProductKey) {
    setVisibleProducts(prev => {
      const next = new Set(prev)
      if (next.has(k)) { next.delete(k) } else { next.add(k) }
      return next
    })
  }

  function handleSort(key: AxisKey) {
    if (key === sortAxis) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortAxis(key)
      setSortDir('desc')
    }
  }

  const visibleKeys = productKeys.filter(k => visibleProducts.has(k))

  const radarData = axes.map(({ key, label }) => ({
    axis: label,
    ...Object.fromEntries(visibleKeys.map(k => [k, products[k].scores[key] ?? 0])),
  }))

  const sortedKeys = [...productKeys].sort((a, b) => {
    const va = products[a].scores[sortAxis] ?? -1
    const vb = products[b].scores[sortAxis] ?? -1
    return sortDir === 'desc' ? vb - va : va - vb
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Data & Results</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Findings</h1>
        <p className="text-slate-500 max-w-2xl">
          All scores 0–10 (higher = better). Physics data is real; other axes pending.
          Pending axes shown as — or 0 in charts.
        </p>
      </div>

      {/* Product toggle legend */}
      <div className="flex flex-wrap gap-3 mb-10">
        {productKeys.map(k => (
          <button
            key={k}
            onClick={() => toggleProduct(k)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              visibleProducts.has(k)
                ? 'border-transparent text-white'
                : 'border-slate-200 text-slate-400 bg-white'
            }`}
            style={visibleProducts.has(k) ? { background: products[k].color } : {}}
          >
            {products[k].label}
          </button>
        ))}
      </div>

      {/* Radar */}
      <div className="border border-slate-100 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-slate-900 mb-1">Overall Comparison</h2>
        <p className="text-sm text-slate-400 mb-6">Radar chart across all four axes. Toggle products above.</p>
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 13, fill: '#64748b' }} />
            <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            {visibleKeys.map(k => (
              <Radar
                key={k}
                name={products[k].label}
                dataKey={k}
                stroke={products[k].color}
                fill={products[k].color}
                fillOpacity={0.12}
                strokeWidth={2}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Per-axis bar charts */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        {axes.map(({ key, label, description }) => {
          const barData = productKeys.map(k => ({
            name: products[k].label,
            score: products[k].scores[key] ?? 0,
            fill: products[k].color,
            pending: products[k].scores[key] === null,
          }))
          const hasPending = barData.some(d => d.pending)
          return (
            <div key={key} className="border border-slate-100 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-1">{label}</h3>
              <p className="text-xs text-slate-400 mb-1">{description}</p>
              {hasPending && <p className="text-xs text-amber-400 mb-3">Pending axes shown as 0</p>}
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} angle={-30} textAnchor="end" />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #f1f5f9', fontSize: 13 }}
                    formatter={(v: number, _: string, entry: { payload: { pending: boolean } }) =>
                      [entry.payload.pending ? 'Pending' : v.toFixed(1), label]
                    }
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.pending ? '#e2e8f0' : entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        })}
      </div>

      {/* Rankings table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden mb-10">
        <div className="px-5 py-3 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rankings</span>
          <span className="text-xs text-slate-400">Click axis header to sort</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-slate-500">Product</th>
              {axes.map(a => (
                <th
                  key={a.key}
                  onClick={() => handleSort(a.key)}
                  className="px-4 py-3 text-center font-semibold text-slate-500 cursor-pointer hover:text-rose-500 select-none"
                >
                  {a.label}
                  {sortAxis === a.key && (
                    <span className="ml-1 text-rose-400">{sortDir === 'desc' ? '↓' : '↑'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedKeys.map((k, i) => (
              <tr key={k} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-5 py-3 font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: products[k].color }} />
                    {products[k].label}
                  </div>
                </td>
                {axes.map(a => (
                  <td key={a.key} className={`px-4 py-3 text-center ${
                    a.key === sortAxis ? 'font-semibold text-slate-800' : 'text-slate-500'
                  }`}>
                    {fmt(products[k].scores[a.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistical summary */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 bg-slate-50">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Statistical Summary</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-slate-500">Axis</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-500">Statistics</th>
            </tr>
          </thead>
          <tbody>
            {axes.map(({ key, label }, i) => (
              <tr key={key} className={i % 2 === 0 ? '' : 'bg-slate-50/50'}>
                <td className="px-5 py-3 font-medium text-slate-700">{label}</td>
                <td className="px-4 py-3"><Stats axisKey={key} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/data`. Check:
- Product toggle buttons work — toggling a product removes it from radar
- Radar renders 7 products; pending axes show as 0
- Bar charts: Performance bars are real data with colors, other axis bars are grey with "Pending" tooltip
- Rankings table sorts by Performance by default (↓); clicking another header re-sorts
- Statistical summary: Performance row shows real mean/min/max/σ; other rows show "no data"

- [ ] **Step 3: Commit**

```bash
git add src/pages/DataResults.tsx
git commit -m "feat: add sortable rankings table and statistical summary to data page"
```

---

## Task 8: DataResults — Correlation Scatter Plot

**Files:**
- Modify: `src/pages/DataResults.tsx` (add correlation section at bottom)

- [ ] **Step 1: Add Pearson r helper and scatter section**

Add this import at the top of `src/pages/DataResults.tsx`:

```typescript
import {
  ScatterChart, Scatter, XAxis as ScatterX, YAxis as ScatterY,
  CartesianGrid as ScatterGrid, Tooltip as ScatterTooltip, ResponsiveContainer as ScatterContainer,
} from 'recharts'
```

Wait — Recharts exports are not aliased; the same component names are used for both BarChart and ScatterChart sections. To avoid re-import conflicts, add these to the existing import block at the top:

```typescript
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell,
  ScatterChart, Scatter,
} from 'recharts'
```

Then add the following helpers and JSX **after** the statistical summary `</div>` at the bottom of the return statement (before the closing outer `</div>`):

Add helper function above the component (after the `Stats` function):

```typescript
function pearsonR(xs: number[], ys: number[]): number {
  const n = xs.length
  if (n < 2) return 0
  const mx = xs.reduce((a, b) => a + b, 0) / n
  const my = ys.reduce((a, b) => a + b, 0) / n
  const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0)
  const dx = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0))
  const dy = Math.sqrt(ys.reduce((s, y) => s + (y - my) ** 2, 0))
  return dx === 0 || dy === 0 ? 0 : num / (dx * dy)
}
```

Add state variables inside the `DataResults` component (alongside the existing `useState` calls):

```typescript
const [xAxis, setXAxis] = useState<AxisKey>('performance')
const [yAxis, setYAxis] = useState<AxisKey>('environment')
```

Add this JSX block after the statistical summary section (before the final closing `</div>`):

```tsx
{/* Correlation scatter */}
<div className="border border-slate-100 rounded-2xl p-6 mt-10">
  <h2 className="font-semibold text-slate-900 mb-1">Correlation Explorer</h2>
  <p className="text-sm text-slate-400 mb-6">
    Select two axes to visualise their relationship across all products.
    Each dot is one product. Only products with data on both axes are shown.
  </p>

  <div className="flex gap-6 mb-6 flex-wrap">
    {(['x', 'y'] as const).map(axis => (
      <div key={axis}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
          {axis.toUpperCase()} Axis
        </label>
        <div className="flex gap-2 flex-wrap">
          {axes.map(a => {
            const hasData = productKeys.some(k => products[k].scores[a.key] !== null)
            const selected = axis === 'x' ? xAxis === a.key : yAxis === a.key
            return (
              <button
                key={a.key}
                disabled={!hasData}
                onClick={() => axis === 'x' ? setXAxis(a.key) : setYAxis(a.key)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  selected
                    ? 'bg-rose-500 text-white border-rose-500'
                    : hasData
                      ? 'border-slate-200 text-slate-600 hover:border-rose-200'
                      : 'border-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                {a.label}
              </button>
            )
          })}
        </div>
      </div>
    ))}
  </div>

  {(() => {
    const scatterData = productKeys
      .filter(k => products[k].scores[xAxis] !== null && products[k].scores[yAxis] !== null)
      .map(k => ({
        x: products[k].scores[xAxis]!,
        y: products[k].scores[yAxis]!,
        name: products[k].label,
        color: products[k].color,
      }))

    if (scatterData.length < 2) {
      return (
        <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
          Not enough data yet — select axes with collected data
        </div>
      )
    }

    const r = pearsonR(scatterData.map(d => d.x), scatterData.map(d => d.y))

    return (
      <>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 10]}
              name={axes.find(a => a.key === xAxis)?.label}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              label={{ value: axes.find(a => a.key === xAxis)?.label, position: 'insideBottom', offset: -10, fontSize: 12, fill: '#64748b' }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 10]}
              name={axes.find(a => a.key === yAxis)?.label}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              label={{ value: axes.find(a => a.key === yAxis)?.label, angle: -90, position: 'insideLeft', offset: 10, fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip
              content={({ payload }) => {
                if (!payload?.length) return null
                const d = payload[0].payload as { name: string; x: number; y: number }
                return (
                  <div className="bg-white border border-slate-100 rounded-lg p-3 text-sm shadow">
                    <p className="font-semibold text-slate-800 mb-1">{d.name}</p>
                    <p className="text-slate-500">{axes.find(a => a.key === xAxis)?.label}: {d.x.toFixed(1)}</p>
                    <p className="text-slate-500">{axes.find(a => a.key === yAxis)?.label}: {d.y.toFixed(1)}</p>
                  </div>
                )
              }}
            />
            <Scatter
              data={scatterData}
              shape={(props: { cx?: number; cy?: number; payload?: { color: string } }) => (
                <circle cx={props.cx} cy={props.cy} r={7} fill={props.payload?.color ?? '#e11d48'} fillOpacity={0.85} stroke="white" strokeWidth={1.5} />
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-xs text-slate-400 mt-3">
          Pearson r = <strong className="text-slate-600">{r.toFixed(3)}</strong>
          {' · '}{scatterData.length} products with data on both axes
        </p>
      </>
    )
  })()}
</div>
```

- [ ] **Step 2: Verify in browser**

Navigate to `/data`, scroll to bottom. Check:
- Axis selector buttons render; only Performance is enabled (others greyed out with not-allowed cursor)
- Scatter chart shows "Not enough data yet" when a pending axis is selected for either X or Y
- With Performance on both axes: 7 dots appear; Pearson r = 1.000 (trivially)
- Dot tooltip shows product name and both scores on hover

- [ ] **Step 3: Commit**

```bash
git add src/pages/DataResults.tsx
git commit -m "feat: add correlation scatter plot with Pearson r to data page"
```

---

## Task 9: Recommend — Null-Safe Update

**Files:**
- Modify: `src/pages/Recommend.tsx`

The current code calls `.toFixed(1)` directly on scores that are now `number | null`. Fix the computation and rendering.

- [ ] **Step 1: Replace `src/pages/Recommend.tsx`**

```typescript
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, axes, type ProductKey, type AxisKey } from '../data/products'

type Weights = Record<AxisKey, number>

const defaultWeights: Weights = {
  safety: 5,
  chemistry: 5,
  performance: 5,
  environment: 5,
}

function computeScores(weights: Weights): { key: ProductKey; score: number; hasPending: boolean }[] {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 1
  const productKeys = Object.keys(products) as ProductKey[]
  return productKeys
    .map(key => {
      const hasPending = axes.some(a => products[key].scores[a.key] === null)
      const score = axes.reduce((sum, axis) => {
        return sum + (weights[axis.key] / totalWeight) * (products[key].scores[axis.key] ?? 0)
      }, 0)
      return { key, score, hasPending }
    })
    .sort((a, b) => b.score - a.score)
}

export default function Recommend() {
  const [weights, setWeights] = useState<Weights>(defaultWeights)
  const [submitted, setSubmitted] = useState(false)

  const ranked = computeScores(weights)
  const winner = ranked[0]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Recommendation Tool</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Find Your Best Product</h1>
        <p className="text-slate-500">
          Drag the sliders to reflect what matters most to you. The tool ranks all
          seven products based on our research data.
        </p>
        <p className="text-xs text-amber-500 mt-2">
          Only Physics (Performance) data is collected so far. Pending axes are treated as 0 and marked with *.
        </p>
      </div>

      <div className="border border-slate-100 rounded-2xl p-7 mb-8">
        <h2 className="font-semibold text-slate-900 mb-6">Set Your Priorities</h2>
        <div className="space-y-6">
          {axes.map(({ key, label, description }) => (
            <div key={key}>
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <span className="text-sm font-medium text-slate-800">{label}</span>
                  <span className="ml-2 text-xs text-slate-400">{description}</span>
                </div>
                <span className="text-sm font-semibold text-rose-500 w-4 text-right">
                  {weights[key]}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={weights[key]}
                onChange={e => {
                  setWeights(w => ({ ...w, [key]: Number(e.target.value) }))
                  setSubmitted(false)
                }}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-xs text-slate-300 mt-0.5">
                <span>Not important</span>
                <span>Most important</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="mt-8 w-full py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-colors"
        >
          Show My Recommendation
        </button>
      </div>

      {submitted && (
        <div className="space-y-4">
          <div
            className="rounded-2xl p-7 text-white"
            style={{ background: products[winner.key].color }}
          >
            <p className="text-sm font-semibold opacity-80 mb-1">Best match for you</p>
            <h2 className="text-2xl font-bold mb-1">{products[winner.key].label}</h2>
            <p className="text-sm opacity-80">{products[winner.key].brand}</p>
            <p className="text-sm opacity-80 mt-2">
              Weighted score: {winner.score.toFixed(2)} / 10
              {winner.hasPending && ' *'}
            </p>
          </div>

          {winner.hasPending && (
            <p className="text-xs text-amber-500 px-1">
              * Score includes axes with pending data (treated as 0). Results will improve as more data is collected.
            </p>
          )}

          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Ranking</span>
            </div>
            {ranked.map(({ key, score, hasPending }, i) => (
              <div key={key} className="flex items-center justify-between px-5 py-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 text-sm font-semibold w-5">{i + 1}</span>
                  <span className="w-3 h-3 rounded-full" style={{ background: products[key].color }} />
                  <div>
                    <span className="text-sm font-medium text-slate-800">{products[key].label}</span>
                    {hasPending && <span className="text-xs text-amber-400 ml-1">*</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${(score / 10) * 100}%`, background: products[key].color }}
                    />
                  </div>
                  <span className="text-sm text-slate-500 w-10 text-right">{score.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-slate-100 rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              Score Breakdown — {products[winner.key].label}
            </h3>
            <div className="space-y-3">
              {axes.map(({ key, label }) => {
                const rawScore = products[winner.key].scores[key]
                const weight = weights[key]
                const isPending = rawScore === null
                return (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{label}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 text-xs">
                        score {isPending ? '— (pending)' : rawScore!.toFixed(1)} × priority {weight}
                      </span>
                      <span className="font-medium text-slate-800 w-12 text-right">
                        {isPending ? '—' : ((rawScore!) * weight).toFixed(1)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <Link to="/products" className="text-sm text-rose-500 hover:underline">
              View all products →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/recommend`. Check:
- Amber note about pending data visible
- Sliders work; "Show My Recommendation" button triggers ranking
- Winner card shows product name, brand, score with * if pending
- Full ranking shows all 7 products with * on pending ones
- Score breakdown shows "— (pending)" for non-performance axes
- "View all products →" link goes to `/products`

- [ ] **Step 3: Commit**

```bash
git add src/pages/Recommend.tsx
git commit -m "feat: update recommendation tool for null scores and 7 products"
```

---

## Task 10: Conclusions + About Us

**Files:**
- Modify: `src/pages/Conclusions.tsx`
- Rewrite: `src/pages/About.tsx`

- [ ] **Step 1: Update `src/pages/Conclusions.tsx`**

Add the conceptual product card after the existing "proposed improved product" section. Replace the entire file:

```typescript
export default function Conclusions() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Conclusions</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">What We Found</h1>
        <p className="text-slate-500 max-w-2xl">
          Summary conclusions and proposed improved product. Content will be updated
          once all experimental data is collected and analysed.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          { label: 'Safest (Biology)',     value: 'TBD', note: 'Pending bacterial colony data' },
          { label: 'Chemically Safest',    value: 'TBD', note: 'Pending pH and additive data' },
          { label: 'Best Performance',     value: 'Naturella Pad', note: 'Highest absorption: 16.0 g/g' },
          { label: 'Most Sustainable',     value: 'TBD', note: 'Pending decomposition data' },
        ].map(({ label, value, note }) => (
          <div key={label} className="border border-slate-100 rounded-2xl p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-xl font-bold text-slate-900 mb-1">{value}</p>
            <p className="text-sm text-slate-500 italic">{note}</p>
            {value === 'TBD' && (
              <p className="text-xs text-rose-400 mt-3">⚠ Awaiting experimental data</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-rose-50 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Overall Finding</h2>
        <p className="text-slate-600 leading-relaxed">
          Physics data shows commercial pads (especially Naturella) absorb significantly
          more fluid per gram than cloth pads. Full cross-axis conclusions will be drawn
          once Biology, Chemistry, and ESS experiments are complete.
        </p>
      </div>

      <div className="border-2 border-rose-100 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Proposed Improved Product</h2>
        <p className="text-sm text-rose-400 mb-4">Design based on our findings</p>
        <p className="text-slate-600 leading-relaxed mb-6">
          Based on findings, an ideal product would combine:
        </p>
        <ul className="space-y-3 text-sm text-slate-600">
          {[
            'Organic cotton top layer (safety + chemistry: low bacteria, neutral pH)',
            'High-absorbency polymer core (performance: maximum absorbency)',
            'Biodegradable outer shell (environment: reduced decomposition time)',
            'Reusable or compostable packaging (environment: lower CO₂ footprint)',
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-rose-400 mt-6">
          ⚠ This section will be refined once all experimental data is collected.
        </p>
      </div>

      <div className="border-2 border-slate-100 rounded-2xl p-8 bg-slate-50/50">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Our Conceptual Product</h2>
        <p className="text-sm text-slate-400 mb-4">Brand name TBD — placeholder</p>
        <p className="text-slate-500 text-sm leading-relaxed">
          As part of this project, we are designing a conceptual menstrual product brand that
          applies the insights from all four research axes. Details — including branding, materials,
          and pricing — will be added once the team finalises the concept.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite `src/pages/About.tsx`**

```typescript
const team = [
  { name: 'Hui Ru Yang',            subject: 'Biology' },
  { name: 'Anna Udicova',           subject: 'Chemistry' },
  { name: 'Ela Sabolova',           subject: 'Environmental Science' },
  { name: 'Milana Golubkova',       subject: 'Physics' },
  { name: 'Alexander Hvezdon Stefko', subject: 'Computer Science' },
]

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">About</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">About Us</h1>
        <p className="text-slate-500 max-w-2xl">
          Five IB Diploma students from three disciplines, collaborating across subject
          boundaries to investigate a real-world health and sustainability challenge.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {team.map(({ name, subject }) => (
          <div key={name} className="border border-slate-100 rounded-2xl p-6">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-rose-300">
                {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{name}</h3>
            <p className="text-sm text-rose-500">{subject}</p>
          </div>
        ))}
      </div>

      <div className="bg-rose-50 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">About This Project</h2>
        <p className="text-slate-600 leading-relaxed">
          This IB Collaborative Science project investigates menstrual products across
          Biology, Chemistry, Physics, and Environmental Science. Seven branded products
          from three manufacturers were tested in a controlled school laboratory setting.
          The findings are presented here alongside an interactive recommendation tool.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Navigate to `/conclusions`:
- Performance winner shows "Naturella Pad" with real note
- Other winners show TBD with ⚠
- "Our Conceptual Product" card shows at the bottom with placeholder text

Navigate to `/about`:
- 5 team cards with initials avatar, name, and subject
- "About This Project" section below

- [ ] **Step 4: Final build check**

```bash
npx tsc --noEmit
npm run build
```

Expected: no TypeScript errors, build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Conclusions.tsx src/pages/About.tsx
git commit -m "feat: update conclusions with real data and add team about page"
```

---

## Done

All tasks complete. Run `npm run dev` and walk through each route:
- `/` — hero, gallery (17 photos), RQ, axes, CTA
- `/sciences` — 4 cards, Physics shows "Data collected"
- `/products` — 4 type sections, 7 product cards with performance scores
- `/products/naturella_pad` — radar (performance ~10), 4 axis cards
- `/data` — toggle legend, radar, bar charts, rankings table, stats, scatter
- `/recommend` — 7 products ranked, pending score notes
- `/conclusions` — Naturella as best performance, conceptual product placeholder
- `/about` — 5 team members
