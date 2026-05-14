# Site Overhaul Design — 2026-05-14

IB Collaborative Science Project: Comparing Menstrual Products

## Goals

Evolve the existing SPA to:
- Replace 4 generic product placeholders with 7 real branded products
- Add rich data analysis (rankings, stats, correlation)
- Redesign Home for visual impact and clear narrative
- Fill in About Us, Sciences/Methodology, and product catalog pages
- Maintain clean, polished UX that reinforces the scientific credibility of the project

## Data Model (`src/data/products.ts`)

### New types

```ts
export type ProductType = 'organic' | 'commercial' | 'cloth' | 'tampon'

export interface ProductData {
  label: string         // "Always Platinum"
  brand: string         // "Always"
  type: ProductType
  price: number | null  // null until data collected
  color: string
  scores: {
    safety: number | null       // Biology — null until data collected
    chemistry: number | null    // Chemistry — null until data collected
    performance: number | null  // Physics — real data available
    environment: number | null  // ESS — null until data collected
  }
  details: {
    safety: string
    chemistry: string
    performance: string
    environment: string
  }
}
```

### 7 products (keys)

| Key | Label | Brand | Type | Performance (g/g) | Rank |
|---|---|---|---|---|---|
| `always_platinum` | Always Platinum | Always | commercial | 11.3 | 2 |
| `ria_pad` | Ria Ultra Pad | Ria | commercial | 8.6 | 3 |
| `ria_tampon` | Ria Tampon | Ria | tampon | 8.0 | 4 |
| `ob_tampon` | ob Tampon | ob | tampon | 8.0 | 4 |
| `naturella_pad` | Naturella Pad | Naturella | commercial | 16.0 | 1 |
| `jessa_cotton` | Jessa Cotton Pad | Jessa | organic | 7.8 | 5 |
| `jessa_cloth` | Jessa Cloth Pad | Jessa | cloth | 2.5 | 6 |

All non-performance scores are `null` until remaining experiments complete.

Performance scores in `products.ts` are stored as normalized 0–10 values. The raw absorption capacity (g/g) from the docx must be normalized: `score = (raw / 16.0) * 10` where 16.0 is the max observed (Naturella). Apply this to all 7 products before storing. Raw g/g values shown in detail text only.

## Navigation

Navbar links (7):
```
Home | Sciences | Products | Data & Results | Recommendation Tool | Conclusions | About Us
```

Routes:
```
/                → Home
/sciences        → Sciences (merged with Methodology content)
/products        → Product catalog
/products/:id    → Product detail
/data            → Data & Results
/recommend       → Recommendation Tool
/conclusions     → Conclusions
/about           → About Us
```

`/methodology` route removed (content merged into `/sciences`).

## Pages

### Home (`/`)

Section order (top → bottom):

1. **Hero** — title "Comparing Menstrual Products", subtitle, two CTAs: "View Results" → `/data`, "Find My Product" → `/recommend`
2. **Lab Photos Gallery** — masonry grid using all images from `pictures/`. Lazy-loaded. Click opens CSS modal lightbox overlay (no external library).
3. **Research Question** — amber callout box. Text: placeholder RQ until confirmed by team.
4. **Four Research Axes** — 2×2 grid of cards. Each card: emoji, subject name, one-line description, guiding question. Cards are `<Link to="/sciences">`.
5. **Find Your Product CTA** — full-width rose banner: "Want the most suitable pad for yourself?" → button links to `/recommend`.

Remove existing "Products Tested" section (replaced by `/products` catalog).

### Sciences (`/sciences`)

Merged Sciences + Methodology page. Header section, then 4 static subject cards:

Each card contains:
- Subject name + emoji
- Research question for that axis
- Methodology summary (from docx — Biology, Chemistry, Physics, ESS descriptions)
- Status badge: "Data collected" (Physics only) or "Pending"

No sub-routes. No links to `/sciences/:subject`.

### Products (`/products` + `/products/:id`)

**Catalog page** (`/products`):
- 4 sections, one per type (Organic, Commercial, Cloth, Tampon)
- Each section: section heading + product cards in a row
- Card: product name, brand badge, performance score (real), other scores shown as "—" if null, price shown as "—" if null

**Detail page** (`/products/:id`):
- Product name, brand, type badge, price (or "Price TBD")
- Radar chart for this product's scores (null axes shown as 0 with "data pending" note)
- Per-axis detail text
- "← Back to Products" link

### Data & Results (`/data`)

Five analysis panels, all driven by `products.ts`:

1. **Radar chart** — all 7 products overlaid. Toggle individual products on/off. Null scores render as 0 with visual indicator.
2. **Bar charts** — one per axis, all 7 products ranked. Physics bar chart shows real data; others show "pending" state.
3. **Rankings table** — sortable by any axis column. Rows = products, columns = axes + overall. Null = "—".
4. **Statistical summary** — computed from non-null scores only: mean, min, max, std deviation per axis. Shown as a clean stat row.
5. **Correlation scatter plot** — axis selectors for X and Y. Each dot = one product (colored by type). Tooltip: product name + both scores. Pearson r shown. Disabled axes shown greyed out with "data pending".

### Recommendation Tool (`/recommend`)

Works identically to current tool but with 7 products instead of 4. Null scores treated as 0 in weighted ranking (with asterisk noting pending data).

### Conclusions (`/conclusions`)

Keep existing structure. Add:
- "Our Conceptual Product" card — brand name TBD placeholder, describes optimal design based on findings across axes.

### About Us (`/about`)

Team grid — 5 members:
- Hui Ru Yang
- Anna Udicova
- Ela Sabolova
- Milana Golubkova
- Alexander Hvezdon Stefko

Each card: name, subject role, photo placeholder. Layout: responsive grid, 2–3 per row.

## UX Principles

- **Data pending = visible, not hidden.** Null scores shown as "—" or greyed bars, never silently omitted. Users trust the site more when it's honest about completeness.
- **Physics data is real — lead with it.** Performance rankings on the catalog and data pages should be prominent.
- **Rose accent palette stays.** `rose-500` = `#e8738a` per existing Tailwind config.
- **No loading states needed** — static SPA, all data in-memory.
- **Masonry gallery** — use CSS columns (no JS library needed) for the photo grid on Home.

## Files Changed

| File | Change |
|---|---|
| `src/data/products.ts` | Replace 4 products with 7; add `brand`, `type`, `price` fields; allow `null` scores |
| `src/App.tsx` | Add `/products`, `/products/:id` routes; remove `/methodology` |
| `src/components/Navbar.tsx` | 7 new links; remove Methodology, add Sciences + Products |
| `src/pages/Home.tsx` | Full redesign per layout B |
| `src/pages/Sciences.tsx` | Merge methodology content; expand axis cards |
| `src/pages/DataResults.tsx` | Add rankings table, stat summary, correlation scatter |
| `src/pages/Recommend.tsx` | Update to handle null scores and 7 products |
| `src/pages/Conclusions.tsx` | Add conceptual product placeholder card |
| `src/pages/About.tsx` | Add team grid |
| `src/pages/Products.tsx` | New — catalog page |
| `src/pages/ProductDetail.tsx` | New — detail page |
| `src/pages/Methodology.tsx` | Delete (content merged into Sciences) |

## Out of Scope

- Brand name / own product design (TBD — to be added when decided)
- Biology, Chemistry, ESS experimental data (to be filled into `products.ts` when collected)
- Prices (to be filled into `products.ts` when collected)
- Sciences sub-pages per subject
- Absorption rate and leakage experiment data (Experiments 2 & 3 from docx)
