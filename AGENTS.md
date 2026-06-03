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
- `products` — 7 products (`naturella_pad`, `always_platinum`, `ria_pad`, `ria_tampon`, `ob_tampon`, `jessa_cotton`, `jessa_cloth`). Scores (0–10), raw sub-metrics, labels, details.
- `axes` — 7 eval dimensions: safety, chemistry, capacity, rate, performance, environment, cost
- `mainAxes` — 5 composite scores: safety, chemistry, performance, environment, cost
- `subMetrics` — 9 raw measurements (colonyCount, ph, tssRisk, skinIrritation, capacity, rate, massLoss, co2e, annualCost) normalized 0–10 for radar
- `brandCoverage`, `galleryImages`, `productTypeRankings` also exported here
- **Data updates: change only this file.** All charts, tables, recommendation tool read it directly.

**Routes** (`src/App.tsx`):

| Path | Component |
|---|---|
| `/` | `Home` |
| `/sciences` | `Sciences` |
| `/sciences/:slug` | `ScienceDetail` |
| `/products` | `Products` |
| `/products/:id` | `ProductDetail` |
| `/data` | `DataResults` |
| `/recommend` | `Recommend` |
| `/conclusions` | `Conclusions` |
| `/about` | `About` |

**Key page details:**
- `DataResults` — Recharts bar charts + comparison table + correlation explorer. Radar charts use Bklit UI (not Recharts).
- `Recommend` — `computeScores()` at line 17: `score = Σ (weight[axis] / totalWeight) × scores[axis]`. Pure client-side.
- `Conclusions` — per-axis winners + proposed improved product (placeholder text).

**Charts:** Bklit UI Radar Chart (`@bklit/radar-chart` via shadcn registry).
- Components in `src/components/charts/` — `radar-chart.tsx`, `radar-grid.tsx`, `radar-axis.tsx`, `radar-labels.tsx`, `radar-area.tsx`.
- Import pattern:
  ```tsx
  import { RadarChart } from "../components/charts/radar-chart"
  import { RadarGrid } from "../components/charts/radar-grid"
  import { RadarAxis } from "../components/charts/radar-axis"
  import { RadarLabels } from "../components/charts/radar-labels"
  import { RadarArea } from "../components/charts/radar-area"

  <RadarChart data={data} metrics={metrics} size={400}>
    <RadarGrid />
    <RadarAxis />
    <RadarLabels />
    {data.map((item, i) => <RadarArea key={item.label} index={i} />)}
  </RadarChart>
  ```
- **Scale:** Bklit expects 0–100, our scores are 0–10 → multiply by 10 before passing.
- **Data shape:** `{ label, color, values: { [metricKey]: number } }` (0–100).
- **Metrics shape:** `{ key, label }`.
- **CSS vars required in `src/index.css` `:root`:** `--chart-background`, `--chart-foreground`, `--chart-foreground-muted`, `--chart-label`, `--chart-grid`, `--border`, `--chart-1` through `--chart-5`. Missing vars make grid/axes invisible.
- `/radar-test` route exists for testing new chart configurations.

**Styling:** Tailwind v3. Rose accent (`rose-500` = `#e8738a`, custom palette in `tailwind.config.js`). Slate text. Font: Inter (Google Fonts via `index.html`). No CSS modules.

**Routing:** React Router v6, flat. `ScrollToTop` component resets scroll on every navigation.

## TypeScript gotchas

`tsconfig.json` has `strict: true` + `noUnusedLocals: true` + `noUnusedParameters: true`. Any unused import or variable fails `tsc`. Remove unused imports when editing.

## Deployment

Vercel (git push to `main` triggers auto-deploy). Standard Vite SPA — no config needed. `Dockerfile`, `nginx.conf`, `deploy.sh`, `DEPLOY_COOLIFY.md` are legacy.
