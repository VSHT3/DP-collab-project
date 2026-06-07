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

## Summary

CS ties together Physics (hard data), Biology (qualitative risk levels), Chemistry (qualitative exposure), ESS (qualitative impact + statistics), and Cost (real prices) into one coherent, defensible answer. The core CS question: *given incomplete and mixed-quality data from 5 disciplines, what is the most honest and useful way to answer the RQ?*
