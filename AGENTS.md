
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


#Behavioral guidelines
Tradeoff: Guidelines bias toward caution over speed. For trivial tasks, use judgment.
## 1. Think Before Coding
Before implementing:
State assumptions. If uncertain, ask.
Multiple interpretations → present them, don't pick silently.
Simpler approach exists → say so. Push back when warranted.
Unclear → name what’s confusing. Ask.
## 2. Simplicity First
Minimum code that solves problem. Nothing speculative.
No features beyond what was asked.
No abstractions for single-use code.
No unrequested “flexibility” or “configurability”.
No error handling for impossible scenarios.
200 lines when 50 works → rewrite.
## 3. Surgical Changes
Touch only what you must. Clean up only your own mess.
Editing existing code:
Don't "improve" adjacent code, comments, or formatting.
Don't refactor things not broken.
Match existing style.
Unrelated dead code → mention, don’t delete.
Your changes create orphans:
Remove imports/variables/functions YOUR changes made unused.
Don’t remove pre-existing dead code unless asked.
## 4. Goal-Driven Execution
Transform tasks to verifiable goals:
"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write test reproducing it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
Multi-step tasks, state brief plan:
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
