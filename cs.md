# Computer Science Contribution

The CS role does not generate new experimental data — it validates, combines, and stress-tests data from other disciplines to produce a defensible answer to the research question.

## 1. Statistical Significance of Physics Data

The Physics lab produced 3 trials per product for absorption rate. CS can compute:

- Means and standard deviations for each product
- 95% confidence intervals
- Pairwise t-tests between products

This determines whether differences like "Always absorbs fastest" are statistically significant or within measurement noise. Without this, rankings could be random.

## 2. Sensitivity / Uncertainty Analysis

Most scores (biology safety, chemistry, environment) are qualitative assessments, not measurements. CS can model how much the final product ranking shifts when those scores vary by ±1 point.

Example: if adjusting the Jessa cloth environmentalImpact score from 2 to 3 changes its ranking, the recommendation is fragile. If changing it from 2 to 8 keeps the ranking the same, it is robust.

This reveals which axes actually drive the final recommendation and which are placeholders.

## 3. Multi-Criteria Decision Analysis (MCDA)

The scoring system is a formal decision-support method:

- Raw data normalized to 0–10 scale per axis
- LowerBetter / higherBetter inversion applied
- Weighted sum model: Σ (weight × score) / totalWeight

Documenting this as MCDA using the Weighted Sum Model is a legitimate CS methodology contribution — it formalizes how qualitative and quantitative data from 5 disciplines combine into one answer.

## 4. Interactive Correlation Explorer

Already implemented in DataResults. Users can plot any two axes against each other to discover relationships:

- "Do faster-absorbing products cost more?"
- "Are safer products also less environmentally harmful?"
- "Which products are Pareto-optimal across multiple axes?"

This helps answer the RQ by revealing trade-offs between competing objectives.

## 5. Recommendation Tool

The Recommend page implements the weighted scoring system interactively. Users adjust per-axis weights based on personal priorities. CS contribution: formalizing the weighting algorithm, implementing real-time recalculation, and ensuring the output is mathematically sound.

## 6. Data Visualization

- Radar charts (Bklit) for multi-dimensional comparison
- Bar charts (SimpleBars) for single-axis comparison
- Scatter plots for correlation
- Comparison tables with sortable columns

All built with custom SVG components. The visual layer makes complex multi-axis data comprehensible at a glance.

## 7. Cross-Axis Correlation Analysis

Pearson r computed across all 12 normalised metric pairs (safety, chemistry, capacity, rate, performance, environment, cost, tssRisk, skinIrritation, chemicalExposure, environmentalImpact, annualCost). Trivial inverse correlations (e.g. Environment ↔ environmentalImpact at r = −1.00, where one is the normalised inverse of the other) are excluded.

| Relationship | r | Interpretation |
|---|---|---|
| Safety ↔ Chemistry | +0.86 | Strong positive. Biologically safer products are also chemically safer. Organic and cloth pads win both dimensions; tampons score poorly on both. No trade-off — cleaner products are safer across the board. |
| Chemistry ↔ Skin Irritation | +0.80 | Strong positive. Products with lower chemical exposure also cause less skin irritation. The organic cotton pad leads both axes. |
| Safety ↔ TSS Risk | −0.98 | Near-perfect inverse. The safety score is partly derived from TSS risk, so this is expected rather than discovered. |
| Performance ↔ Annual Cost | +0.71 | Moderate positive. Higher-performing products cost more per year. The best physics performers (Naturella, Always Platinum) are among the most expensive annually. |
| Performance ↔ Environment | −0.62 | Moderate negative. Better physics performance correlates with worse environmental impact. A genuine trade-off between absorption performance and sustainability. |
| Capacity ↔ Rate | −0.51 | Moderate negative. Products with high absorption capacity tend to absorb slowly. Naturella holds 16.0 g/g but takes 44.2 s per 5 mL — Always Platinum absorbs in 7.8 s but holds only 7.1 g/g. A fundamental physical trade-off in the product design. |
| Cost ↔ Environment | +0.69 | Moderate positive. Lower annual cost correlates with better environmental scores. The reusable cloth pad anchors both extremes. |
| Safety ↔ Rate | +0.26 | Weak. Safety and absorption speed are essentially independent. No trade-off — a safe product can also absorb quickly. |
| Safety ↔ Capacity | +0.01 | Negligible. Safety and absorption capacity are completely independent. Safe products are not handicapped on capacity. |

### Key takeaway

Two real trade-offs emerge from the data: **performance vs. environment** and **capacity vs. rate**. Everything else either aligns (safety with chemistry, chemistry with skin comfort) or is independent (safety with both physics metrics). An ideal product would resolve the capacity-rate paradox through novel materials and the performance-environment trade-off through biodegradability — exactly the design goals stated in the Proposed Improved Product on the Conclusions page.

## Summary

CS ties together Physics (hard data), Biology (qualitative risk levels), Chemistry (qualitative exposure), ESS (qualitative impact + statistics), and Cost (real prices) into one coherent, defensible answer. The core CS question: *given incomplete and mixed-quality data from 5 disciplines, what is the most honest and useful way to answer the RQ?*
