# AGENTS.md

## Commands

```bash
npm run dev      # dev server at localhost:5173
npm run build    # tsc && vite build — tsc failures block the build
npm run preview  # serve dist/ locally
```

No test suite, no linter. Verification = `npm run build` (catches type errors).

## Architecture

Static SPA. No backend, no API. All data hardcoded.

**Single source of truth: `src/data/products.ts`**
- Types: `ProductKey`, `ProductData`, `AxisKey`, `SubMetricKey`
- `products` — scores (0–10), raw sub-metrics, labels for all **7** products (`naturella_pad`, `always_platinum`, `ria_pad`, `ria_tampon`, `ob_tampon`, `jessa_cotton`, `jessa_cloth`)
- `axes` — 6 eval dimensions: safety, chemistry, capacity, rate, performance, environment
- `mainAxes` — 4 composite scores: safety, chemistry, performance, environment
- `subMetrics` — 8 raw measurements (colonyCount, ph, tssRisk, skinIrritation, capacity, rate, massLoss, co2e) normalized 0–10 for radar
- `brandCoverage`, `galleryImages`, `productTypeRankings` also exported here
- **Data updates: change only this file.** All charts, tables, recommendation tool read it directly.

**Routes** (`src/App.tsx`):

| Path | Component |
|---|---|
| `/` | `Home` |
| `/sciences` | `Sciences` |
| `/products` | `Products` |
| `/products/:id` | `ProductDetail` |
| `/data` | `DataResults` |
| `/recommend` | `Recommend` |
| `/conclusions` | `Conclusions` |
| `/about` | `About` |

Note: `src/pages/Methodology.tsx` exists but has **no route** — not accessible in the app.

**Key page details:**
- `DataResults` — Recharts radar + bar charts + comparison table + correlation explorer. Uses `NaN` for missing radar data (creates visual gaps, not center-collapse).
- `Recommend` — `computeScores()` at line 13: `score = Σ (weight[axis] / totalWeight) × scores[axis]`. Pure client-side.
- `Conclusions` — per-axis winners + proposed improved product (placeholder text).

**Styling:** Tailwind v3. Rose accent (`rose-500` = `#e8738a`, custom palette in `tailwind.config.js`). Slate text. Font: Inter. No CSS modules.

**Routing:** React Router v6, flat. `ScrollToTop` component resets scroll on every navigation.

## TypeScript gotchas

`tsconfig.json` has `strict: true` + `noUnusedLocals: true` + `noUnusedParameters: true`. Any unused import or variable fails `tsc`. Remove unused imports when editing.

## Deployment

Production hosted on Vercel from `main` branch. This is the dev branch — changes reach prod via merge to `main`.
