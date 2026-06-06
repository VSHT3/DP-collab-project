# Data Authenticity Report: `src/data/products.ts`

## Data sources cross-referenced
1. **`.docx` Physics tables** — the only primary/experimental data
2. **Sciences detail pages** — BiologyDetail, ChemistryDetail, ESSDetail (literature-based)

---

## PHYSICS — EXPERIMENTAL DATA (from .docx)

### Absorption Capacity (g/g) — ✅ VERIFIED
The `.docx` Table 3 provides measured dry mass, wet mass, fluid absorbed, and capacity. The `products.ts` capacity scores are normalized 0–10 from these docx values (÷ max=16 × 10):

| Product | Docx (g/g) | Docx Rank | products.ts Score | Normalized | Match |
|---|---|---|---|---|---|
| Naturella Pad | 16.0 | 1st | 10.0 | 16/16×10 = 10.0 | ✅ |
| Always Platinum | 11.3 | 2nd | 7.1 | 11.3/16×10 = 7.06 | ✅ |
| Ria Ultra Pad | 8.6 | 3rd | 5.4 | 8.6/16×10 = 5.375 | ✅ |
| Ria Tampon | 8.0 | 4th | 5.0 | 8/16×10 = 5.0 | ✅ |
| o.b. Tampon | 8.0 | 4th | 5.0 | 8/16×10 = 5.0 | ✅ |
| Jessa Cotton | 7.8 | 5th | 4.9 | 7.8/16×10 = 4.875 | ✅ |
| Jessa Cloth | 2.5 | 6th | 1.6 | 2.5/16×10 = 1.56 | ✅ |

**Verdict:** Capacity data is OUR work. Accurately normalised from measured lab values.

### Dry mass (g) — ❌ MISSING from products.ts
The `.docx` records dry mass: o.b.=3g, Ria tampon=3g, Ria pad=5g, Always=6g, Naturella=3g, Jessa cotton=4g, Jessa cloth=16g. Not stored in `products.ts`.

### Absorption Rate (s/5mL) — ✅ VERIFIED
The `.docx` Table 2 (updated) contains all trial data, averages, and rankings. Every value in `products.ts` matches exactly:

| Product | Docx Avg | Docx Trials | Docx Rank | products.ts Match? |
|---|---|---|---|---|
| o.b. Tampon | 14.07s | 12.77, 14.61, 14.84 | 6th | ✅ |
| Ria Tampon | 12.73s | 13.48, 11.70, 13.02 | 4th | ✅ |
| Ria Ultra Pad | 13.73s | 13.35, 13.72, 14.13 | 5th | ✅ |
| Always Platinum | 7.76s | 6.89, 8.65, 7.74 | 1st | ✅ |
| Naturella Pad | 44.23s | 42.27, 44.63, 45.78 | 7th | ✅ |
| Jessa Cotton | 8.60s | 10.48, 7.73, 7.60 | 2nd | ✅ |
| Jessa Cloth | 10.08s | 8.87, 10.87, 10.52 | 3rd | ✅ |

**Verdict:** All absorption rate data — trials, averages, ranks, and the derived `scores.rate` — is our experimental work. Note: the docx observes "Always fragrance is the strongest" (chemistry observation).

### Fluid preparation protocol — ❌ WRONG
- **Docx**: 90mL water + 10mL corn syrup (ratio **9:1**)
- **sciences.ts**: "40 mL glycerin + 60 mL water" (ratio **4:6**)

These are fundamentally different recipes. The sciences.ts version describes a glycerin-based fluid that we never used.

---

## BIOLOGY — QUALITATIVE RISK DATA (from BiologyDetail)

### Chemical exposure risk
BiologyDetail assigns qualitative risk levels per product:
| Product | BiologyDetail | products.ts safety score |
|---|---|---|
| Naturella | Moderate (VOCs/fragrance) | 5.0 |
| Always Platinum | Moderate (VOCs/phthalates/SAP) | 5.0 |
| Ria Ultra Pad | Moderate (VOCs/phthalates) | 5.0 |
| Ria Tampon | Mod-Higher (metals+residues) | 2.5 |
| o.b. Tampon | Mod-Higher (metals+residues) | 2.5 |
| Jessa Cotton | Lower, not zero | 7.5 |
| Jessa Cloth | Variable (PFAS) | 8.5 |

The **relative ranking** aligns (tampons worst, Jessa best) but the **numerical scores are fabricated** — BiologyDetail uses qualitative risk levels (Low/Moderate/High), not numbers.

### TSS risk
BiologyDetail: "Not a concern" for all pads, "Present" for tampons.
- products.ts `tssRisk` subMetric: pads=0, tampons=10 — directionally correct but the "10" value is arbitrary.

### Bacterial growth
BiologyDetail: Moderate (external pads), Higher (internal tampons), Lower (cotton), Variable (cloth).
- products.ts `colonyCount`: 420, 400, 380, 720, 680, 180, 120 — all fabricated numbers.

### Skin irritation
BiologyDetail: Moderate (fragrance/plastic), Low-Mod (tampons), Low (cotton).
- products.ts `skinIrritation`: 5.0, 5.0, 5.0, 4.0, 4.0, 7.5, 7.5 — fabricated numbers.

### pH
No pH data exists in BiologyDetail or the docx. All pH values in products.ts (6.0–7.2) are fabricated.

**Verdict:** BiologyDetail contains qualitative risk assessments (our literature review). All quantitative subMetrics (`colonyCount`, `tssRisk`, `skinIrritation`, `ph`) are AI-fabricated. The resulting `scores.safety` and `scores.chemistry` are computed from fake numbers.

---

## CHEMISTRY — QUALITATIVE DATA (from ChemistryDetail)

| Brand | ChemistryDetail Risk | products.ts chemistry score |
|---|---|---|
| Jessa | Low | 8.0 |
| Naturella | Moderate | 4.0 |
| Always | Moderate | 4.0 |
| Ria | Moderate-high | 3.5 (pad) / 2.5 (tampon) |

Relative ranking matches, but the chemistry score is derived from the fabricated pH values — the numbers themselves are arbitrary.

**Verdict:** Qualitative risk from ChemistryDetail is our literature review work. The numerical chemistry scores are AI-generated.

---

## ESS / ENVIRONMENT — STATISTICAL DATA (from ESSDetail)

### Survey data — ✅ VERIFIED
The bar chart data (regular tampons=47%, pads=46%, etc.) is from Harvard Apple Women's Health Study — correctly cited. Not numerical product-level data.

### Waste statistics — ✅ VERIFIED
80.85B/cycle, 4.3B UK/year, 800 years decomposition, 2B flushed UK, 18,000 beach items, 100K marine deaths — all from cited sources in ESSDetail.

### Product-level environment scores — ❌ FABRICATED
products.ts environment scores are computed from `massLoss` and `co2e` subMetrics:

| Product | massLoss (%) | co2e (g) | env score |
|---|---|---|---|
| Naturella | 10 | 10.0 | 2.0 |
| Always | 8 | 10.5 | 2.0 |
| Ria Pad | 12 | 8.0 | 2.5 |
| Ria Tampon | 30 | 4.0 | 4.0 |
| o.b. Tampon | 32 | 3.0 | 4.5 |
| Jessa Cotton | 50 | 5.0 | 6.5 |
| Jessa Cloth | 60 | 0.3 | 9.5 |

None of these mass loss or CO₂e numbers appear in ESSDetail or the docx. They are **fabricated**.

**Verdict:** Page-level statistics are real. Product-level environmental metrics are AI-generated.

---

## STRUCTURAL DATA

### Product types & brands — ✅ LARGELY CORRECT
| Data | Source | Match |
|---|---|---|
| 7 products across 5 brands | products.ts | Docx mentions "3 brands, each 3-4 types" — we expanded scope beyond docx |
| Commercial pads: Naturella, Always, Ria | products.ts | ✅ Real products |
| Tampons: Ria, o.b. | products.ts | ✅ Real products |
| Organic: Jessa Cotton | products.ts | ✅ Real product |
| Cloth: Jessa Cloth | products.ts | ✅ Real product |
| `productTypeRankings` | products.ts | ✅ Matches docx Table 4 exactly |

### Prices — ? UNVERIFIED
Prices (€2.15–€4.45) look plausible but no source exists in any project data. Could be real retail prices or fabricated.

### Sizes / absorbency / pads per pack — ? UNVERIFIED
Size labels, absorbency ratings, and pads-per-pack counts have no source in the docx or sciences pages. Could be from actual packaging inspection or fabricated.

### `brandCoverage` — ✅ CORRECT
Matches the known products. Docx mentions "3 brands" originally but we expanded.

### Annual cost calculation — ⚠️ PARTIALLY VERIFIED
The formula (22 products/cycle × 13 cycles/year) and cloth amortization logic are project assumptions, not sourced data. The resulting `scores.cost` depends on the unverified prices.

---

## SUMMARY TABLE

| Data Field | Source | Status |
|---|---|---|
| `scores.capacity` | Docx Table 3 (our lab) | ✅ OUR WORK |
| `absorptionRate` / `scores.rate` | Docx Table 2 (our lab) | ✅ OUR WORK |
| `absorptionRateTrials` | Docx Table 2 (our lab) | ✅ OUR WORK |
| `absorptionRateRank` | Docx Table 2 (our lab) | ✅ OUR WORK |
| `scores.performance` | Derived from capacity+rate | ✅ BOTH INPUTS ARE OUR WORK |
| `scores.safety` | Derived from fake subMetrics | ❌ COMPUTED FROM FAKE DATA |
| `scores.chemistry` | Derived from fake pH | ❌ COMPUTED FROM FAKE DATA |
| `scores.environment` | Derived from fake massLoss+co2e | ❌ COMPUTED FROM FAKE DATA |
| `scores.cost` | Formula applied to prices | ⚠️ FORMULA OK, PRICES UNVERIFIED |
| `subMetrics.colonyCount` | Nowhere | ❌ FABRICATED |
| `subMetrics.ph` | Nowhere | ❌ FABRICATED |
| `subMetrics.tssRisk` | Nowhere | ❌ FABRICATED |
| `subMetrics.skinIrritation` | Nowhere | ❌ FABRICATED |
| `subMetrics.massLoss` | Nowhere | ❌ FABRICATED |
| `subMetrics.co2e` | Nowhere | ❌ FABRICATED |
| `subMetrics.annualCost` | Computed from prices | ⚠️ DEPENDS ON UNVERIFIED PRICES |
| `details.*` (text) | Mixed | ⚠️ SOME LIT REVIEW, SOME FABRICATED |
| `price` | Unknown | ❓ UNVERIFIED |
| `sizes` | Unknown | ❓ UNVERIFIED |
| `productTypeRankings` | Docx Table 4 | ✅ OUR WORK |
| `brandCoverage` | Product knowledge | ✅ CORRECT |
| `axes` / `mainAxes` / `subMetrics` defs | Project design | ✅ OUR FRAMEWORK |

---

## BOTTOM LINE

**Only two sets of fields across all 7 products are backed by our actual experimental data: `scores.capacity` and `absorptionRate`/`scores.rate` (both from Physics lab, docx Tables 1 & 2).** The resulting `scores.performance` is therefore also grounded in our work.

Everything else — all biology scores, chemistry scores, environment scores, absorption rate data, sub-metrics, and pH values — is AI-generated placeholder data. The 5-axis radar charts and comparison tables on the site are built almost entirely on fabricated numbers.
