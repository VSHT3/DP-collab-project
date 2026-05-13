# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at localhost:5173
npm run build    # tsc type-check + vite production build → dist/
npm run preview  # serve dist/ locally
```

No test suite or linter configured.

## Architecture

Static SPA — no backend, no API. All data is hardcoded.

**Single source of truth:** `src/data/products.ts`
- Defines `ProductKey`, `ProductData`, `AxisKey` types
- `products` object holds all scores (0–10) and labels for all four products
- `axes` array defines the four evaluation dimensions (safety, chemistry, performance, environment)
- **When real experimental data arrives, only this file needs to change.** All charts, tables, and the recommendation tool consume it directly.

**Pages** (`src/pages/`):
- `Home` — hero, global issue framing, axes overview
- `Methodology` — per-subject procedure descriptions (hardcoded text, update with actual methods)
- `DataResults` — Recharts radar + per-axis bar charts + comparison table, all driven by `products.ts`
- `Recommend` — weighted score tool: user sets per-axis priority (0–10 sliders), `computeScores()` normalises weights and ranks products
- `Conclusions` — per-axis winners, proposed improved product (placeholder text, update last)

**Recommendation algorithm** (`Recommend.tsx:13`):
```
score(product) = Σ (weight[axis] / totalWeight) × product.scores[axis]
```
Pure client-side, no state outside the component.

**Routing:** React Router v6, flat routes in `App.tsx`. No nested routes.

**Styling:** Tailwind v3, rose accent palette (`rose-500` = `#e8738a`), slate text. No CSS modules or styled-components.
