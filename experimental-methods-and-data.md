# Experimental Methods & Reference Data for Menstrual Product Comparison

> Specific, replicable protocols and published data mapped to each evaluation axis of this project.
> Sources: FDA guidance (Oct 2025), peer-reviewed studies, ISO standards.

---

## AXIS 1: Safety — Bacterial Growth (Biology)

### Metric: Colony Count (CFU/cm²) after 24h exposure

### Recommended Method: Shake Flask Method (FDA-recommended, adapted from Schlievert & Blomster, 1983)

**Why this method:** The FDA's October 2025 draft guidance on menstrual product performance testing recommends three methods for microbiology assessment. The Shake Flask Method is the simplest and most replicable for a school lab setting.

#### Protocol

1. **Prepare bacterial culture:**
   - Use *Staphylococcus aureus* (ATCC strain, e.g., ATCC 6538 or ATCC 29213)
   - Inoculate in Brain Heart Infusion (BHI) broth
   - Incubate at 37°C until reaching ~1 × 10⁸ CFU/mL (mid-log phase, ~OD₆₀₀ = 0.5)

2. **Prepare test samples:**
   - Cut each product into standardized 1 cm² pieces (use sterile scissors)
   - For tampons: use a 1 cm section from the center
   - For pads: cut from the absorbent core area
   - Weigh each piece and record dry mass

3. **Inoculation:**
   - Add each sample to a sterile flask containing 50 mL BHI broth
   - Inoculate with *S. aureus* to a final concentration of 1 × 10⁶ CFU/mL
   - Prepare control flasks: (a) broth only (negative control), (b) broth + bacteria without product (positive control)

4. **Incubation:**
   - Incubate at 37°C for 24 hours with shaking at 150 rpm
   - This simulates body temperature and provides aerobic conditions

5. **Enumeration (CFU counting):**
   - After 24h, perform serial dilutions (1:10 steps) of the broth
   - Plate 100 µL of appropriate dilutions onto BHI agar plates
   - Incubate plates at 37°C for 18–24 hours
   - Count colonies on plates with 30–300 colonies
   - Calculate: CFU/mL = (colonies counted) / (volume plated in mL × dilution factor)
   - Normalize to surface area: CFU/cm² = CFU/mL × total broth volume / sample area

6. **Expected results ranking (based on literature):**
   - Tampons (Ria, o.b.): Highest CFU — oxygen introduction + nutrient-rich environment promotes *S. aureus* growth
   - Commercial pads (Naturella, Always, Ria Ultra): Moderate CFU — synthetic materials may support surface growth
   - Organic pad (Jessa Cotton): Lower CFU — natural cotton, no synthetic polymers
   - Cloth pad (Jessa Cloth): Variable — depends on prior washing; clean cloth should be lowest

#### Alternative: Tampon Sac Method (FDA Method 1, adapted from Reiser et al., 1987)
- Place product in sterile permeable sac (e.g., dialysis tubing)
- Submerge in BHI agar (not broth) at 37°C for 18 hours
- Remove sac, homogenize contents, plate on BHI agar
- More realistic for internal products but requires dialysis tubing

#### Key Reference Data

| Study | Finding | Relevance |
|---|---|---|
| FDA Guidance (2025) | Recommends minimum 1 × 10⁶ CFU/mL *S. aureus* inoculum, 37°C, 24h incubation | Standard protocol |
| Schlievert & Blomster (1983) | Tampons can increase *S. aureus* growth 2–10× compared to broth-only control | Baseline for tampon risk |
| Reiser et al. (1987) | Tampon material composition affects bacterial growth rate; synthetic fibers > cotton | Explains product differences |

---

## AXIS 2: Chemistry — pH Measurement

### Metric: pH of product extract

### Recommended Method: Aqueous Extraction + pH Meter

#### Protocol

1. **Prepare extraction solution:**
   - Use distilled/deionized water (or simulated vaginal fluid if available)
   - Simulated vaginal fluid recipe (Owen & Katz, 1999):
     - NaCl: 0.16 g/100 mL
     - KCl: 0.007 g/100 mL
     - CaCl₂·2H₂O: 0.002 g/100 mL
     - Adjust to pH 4.2 with lactic acid

2. **Sample preparation:**
   - Cut each product into 1 cm² pieces
   - Weigh accurately (record dry mass in grams)
   - Place in sterile container

3. **Extraction:**
   - Add extraction solution at ratio of 10 mL per gram of product
   - Seal and incubate at 37°C for 24 hours (simulating body temperature and wear time)
   - Shake gently every 4 hours

4. **Measurement:**
   - Calibrate pH meter with standard buffers (pH 4.0, 7.0, 10.0)
   - Measure pH of each extract at room temperature
   - Record to 2 decimal places
   - Run each sample in triplicate

5. **Expected results:**
   - Healthy vaginal pH: 3.8–4.5 (acidic, protective)
   - Products closer to pH 4.0–4.5 are more compatible with vaginal environment
   - Products with pH > 6.0 may disrupt vaginal flora and increase infection risk
   - Commercial pads with chemical additives may shift pH away from natural range
   - Organic cotton should be closest to neutral (pH ~6–7 in water extract)

#### Key Reference Data

| Study | Finding |
|---|---|
| Marcelis et al. (2021), *Emerging Contaminants* | Developed menstrual fluid simulant (MFS) with pH 4.2, osmolarity, and protein binding to assess chemical leaching from 15 MHPs |
| Owen & Katz (1999) | Vaginal fluid pH normally 3.8–4.5; rises during menstruation to ~5.0–6.0 |
| FDA Guidance (2025) | Requires chemical identity disclosure for all components including fragrances and additives |

---

## AXIS 3: Absorption Capacity (Physics Exp 1)

### Metric: Fluid held per gram of dry product (g/g)

### FDA-Standard Method: Syngyna Testing (21 CFR 801.430)

**This is the legally mandated method for tampon absorbency labeling in the US.**

#### Syngyna Protocol (for tampons)

1. **Equipment:** Syngyna tester (available from lab suppliers)
2. **Test fluid:** 0.9% saline solution (0.9 g NaCl per 100 mL distilled water)
3. **Procedure:**
   - Weigh dry tampon (record mass)
   - Insert into Syngyna apparatus
   - Allow tampon to absorb saline from reservoir
   - After saturation, measure total saline absorbed
   - Absorbency (grams) = mass of absorbed saline
4. **FDA absorbency categories (21 CFR 801.430):**
   - Light: ≤ 6 g
   - Regular: 6–9 g
   - Super: 9–12 g
   - Super Plus: 12–15 g
   - Ultra: 15–18 g

#### Gravimetric Method (for pads — no FDA standard exists)

**Since the FDA does not regulate pad absorbency labeling, use this gravimetric method:**

1. **Weigh dry product** (record mass in grams)
2. **Prepare test fluid:** 0.9% saline solution (or simulated menstrual fluid for more realism)
3. **Application:**
   - Place product on flat, impermeable surface
   - Slowly pour/pipe fluid onto the center of the product
   - Continue until fluid no longer absorbs (pooling or runoff occurs)
   - Wait 60 seconds for drainage
4. **Weigh saturated product**
5. **Calculate:**
   - Capacity (g/g) = (saturated mass − dry mass) / dry mass
6. **Repeat 3 times per product, report mean**

#### Published Reference Data (Real Blood — DeLoughery et al., 2024, *BMJ Sexual & Reproductive Health*)

This is the first study to test menstrual products with actual human blood (not saline):

| Product Type | Volume Held (mL) | Notes |
|---|---|---|
| Menstrual disc (Ziggy) | 80 | Highest capacity |
| Heavy pad (Brand C) | 52 | Advertised 10–20 mL |
| Tampon (Heavy, Brand A) | 31 | Advertised ~20 mL |
| Tampon (Heavy, Brand B) | 34 | Advertised ~20 mL |
| Tampon (Regular) | 20 | Standard |
| Menstrual cup (Size 2) | 35 | Largest cup size |
| Menstrual cup (Size 0) | 22 | Smallest cup size |
| Light day pad | 4 | Pantyliner |
| Period underwear (any size) | 1–3 | Lowest capacity |

**Key finding:** Product labels significantly overstate capacity when tested with blood vs. saline. Heavy pads held 52 mL but were advertised at 10–20 mL capacity.

#### Why saline vs. blood matters (Scientific American, 2023)
- Blood is more viscous than saline → absorbed at different rates
- Menstrual blood contains cells, platelets, proteins, vaginal secretions, and shed endometrial tissue
- Saline is homogeneous; menstrual blood viscosity changes hour-to-hour and person-to-person
- Research-quality human blood costs ~$100 per 10 mL; saline costs ~$45 per liter

---

## AXIS 4: Absorption Rate (Physics Exp 2)

### Metric: Time to absorb 5 mL of simulated fluid (seconds)

#### Protocol

1. **Prepare test fluid:** 0.9% saline solution
2. **Set up:**
   - Place product on flat, impermeable surface
   - Position stopwatch
3. **Procedure:**
   - Using a pipette or burette, dispense exactly 5.0 mL of fluid onto the center of the product
   - Start timer the moment fluid contacts the surface
   - Stop timer when no visible fluid remains on the surface (all absorbed)
   - Record time in seconds
4. **Repeat 3 times per product, report mean**
5. **Lower time = faster absorption = better score**

#### Expected ranking (based on material properties):
- Commercial pads (Always Platinum, Naturella, Ria Ultra): Fast — designed with superabsorbent polymers (SAP)
- Tampons (Ria, o.b.): Moderate — absorption depends on fiber density and compression
- Organic pad (Jessa Cotton): Moderate-fast — natural cotton absorbs well but lacks SAP
- Cloth pad (Jessa Cloth): Slowest — natural fibers without chemical treatment

---

## AXIS 5: Environment — Biodegradation (ESS)

### Metric: % Mass Loss after 14 days in soil

### Recommended Method: Soil Burial Test (adapted from ISO 11721)

#### Protocol

1. **Prepare soil:**
   - Use garden soil or potting mix (sieve to remove large particles)
   - Adjust moisture to 40–60% water-holding capacity
   - Soil should be biologically active (not sterilized)

2. **Sample preparation:**
   - Cut each product into standardized pieces (e.g., 5 cm × 5 cm)
   - Dry in oven at 60°C for 24 hours
   - Weigh each piece accurately (initial mass, m₀)
   - Record mass to 0.01 g precision

3. **Burial:**
   - Place each sample in a mesh bag (nylon or cotton mesh, ~1 mm openings)
   - Bury bags 10–15 cm deep in soil
   - Keep soil moist (spray with distilled water as needed)
   - Maintain at room temperature (~20–25°C)
   - Label each bag clearly

4. **Retrieval:**
   - After 14 days, carefully excavate samples
   - Gently rinse off soil with distilled water
   - Dry in oven at 60°C for 24 hours
   - Weigh (final mass, m₁)

5. **Calculate:**
   - Mass loss (%) = [(m₀ − m₁) / m₀] × 100

6. **Expected results (based on material composition):**
   - Jessa Cloth (cotton): Highest mass loss — natural fiber, readily biodegradable
   - Jessa Cotton (organic cotton): High mass loss — no synthetic components
   - Ria Tampon (cotton/rayon blend): Moderate mass loss — rayon is semi-synthetic but biodegradable
   - o.b. Tampon (cotton/rayon): Moderate mass loss — similar to Ria
   - Naturella / Always / Ria Ultra pads: Lowest mass loss — contain polyethylene, polypropylene, SAP (non-biodegradable plastics)

#### Published Reference Data (Brunsek et al., 2023)

| Material | Mass Loss after Soil Burial | Notes |
|---|---|---|
| Hemp fiber | ~40–60% (14 days) | Natural bast fiber, rapid biodegradation |
| Jute fiber | ~35–55% (14 days) | Natural fiber, good biodegradation |
| Viscose (regenerated cellulose) | ~30–50% (14 days) | Semi-synthetic but biodegradable |
| PLA (bio-based polymer) | ~5–15% (14 days) | Very slow biodegradation in soil |

#### Key Reference

| Study | Finding |
|---|---|
| Paul et al. (2026), *Environmental Technology & Innovation* | Comprehensive review of biodegradable fibers for sanitary napkins; conventional pads are ~90% plastic by weight and persist in landfills for 500–800 years |
| Mirzaie et al. (2025), *Environ Sci Pollut Res* | LCA comparing bamboo pulp pads vs. conventional pads; conventional pads have significantly higher environmental impact across all categories |
| Brunsek et al. (2023) | ISO 11721 soil burial test methodology; mass loss is the standard metric for biodegradation assessment |

---

## AXIS 6: Environment — CO₂ Footprint (ESS)

### Metric: CO₂ equivalent per use (g CO₂e)

### Recommended Method: Simplified Life Cycle Assessment (LCA)

Since a full LCA requires specialized software and databases, use this simplified approach:

#### Protocol

1. **Identify lifecycle stages:**
   - Raw material extraction
   - Manufacturing
   - Packaging
   - Transport
   - Use phase
   - Disposal

2. **Estimate CO₂e per product using published LCA data:**

| Product Type | CO₂e per Use (g) | Source |
|---|---|---|
| Conventional disposable pad | 5.5–14.0 g CO₂e | Mirzaie et al. (2025); Hait & Powers (2019) |
| Organic cotton pad | 3.0–8.0 g CO₂e | Lower manufacturing impact, no synthetic polymers |
| Tampon (cotton/rayon) | 2.5–6.0 g CO₂e | Smaller mass, but includes applicator (if applicable) |
| Tampon (no applicator, o.b.) | 1.5–4.0 g CO₂e | No plastic applicator |
| Reusable cloth pad (per use) | 0.1–0.5 g CO₂e | Amortized over 100+ uses; includes washing energy |

3. **Calculation for reusable products:**
   - Total CO₂e (production) ÷ number of uses = CO₂e per use
   - Add washing CO₂e per cycle (~0.5–1.0 g CO₂e for machine wash)

#### Published LCA Data (Mirzaie et al., 2025)

The study compared a bamboo pulp pad (Hempur) vs. a conventional pad:

| Impact Category | Conventional Pad | Bamboo Pulp Pad |
|---|---|---|
| Global warming (kg CO₂e/kg product) | Higher | 40–80% lower |
| Water scarcity | Higher | Significantly lower |
| Abiotic element depletion | Higher | Significantly lower |
| Acidification | Higher | Lower |

**Key finding:** Upstream operations (raw material + manufacturing) account for 40–80% of total environmental impact in every category.

---

## Summary: All Methods at a Glance

| Axis | Metric | Method | Standard/Reference |
|---|---|---|---|
| **Safety** | CFU/cm² after 24h | Shake Flask + serial dilution + plate count | FDA Guidance (2025), Schlievert & Blomster (1983) |
| **Chemistry** | pH of extract | Aqueous extraction at 37°C for 24h, pH meter | Marcelis et al. (2021), Owen & Katz (1999) |
| **Capacity** | g/g absorbed | Gravimetric (pads) / Syngyna (tampons) | 21 CFR 801.430, DeLoughery et al. (2024) |
| **Rate** | seconds for 5 mL | Timed absorption on flat surface | Adapted from industry practice |
| **Environment (mass loss)** | % after 14 days | Soil burial test (ISO 11721 adapted) | Brunsek et al. (2023), Paul et al. (2026) |
| **Environment (CO₂e)** | g CO₂e per use | Simplified LCA using published data | Mirzaie et al. (2025), Hait & Powers (2019) |

---

## Sources

1. **FDA** (2025). "Menstrual Products – Performance Testing and Labeling Recommendations." Draft Guidance. https://www.fda.gov/media/189362/download

2. **DeLoughery, E. et al.** (2024). "Red blood cell capacity of modern menstrual products." *BMJ Sexual & Reproductive Health*, 50(1), 21–26. https://pmc.ncbi.nlm.nih.gov/articles/PMC10847380/

3. **Samuelson Bannow, B.** (2023). "No One Studied Menstrual Product Absorbency Realistically until Now." *Scientific American*. https://www.scientificamerican.com/article/no-one-studied-menstrual-product-absorbency-realistically-until-now/

4. **Marcelis, Q. et al.** (2021). "Development and application of a novel method to assess exposure levels of sensitizing and irritating substances leaching from menstrual hygiene products." *Emerging Contaminants*, 7, 116–123. https://www.sciencedirect.com/science/article/pii/S2405665021000068

5. **Mirzaie, A. et al.** (2025). "Toward eco-friendly menstrual products: a comparative life cycle assessment of sanitary pads made from bamboo pulp vs. a conventional one." *Environ Sci Pollut Res Int*, 32(14), 9050–9067. https://pmc.ncbi.nlm.nih.gov/articles/PMC11968503/

6. **Paul, S.C. et al.** (2026). "Exploring biodegradable fibers as sustainable alternatives for sanitary napkin." *Environmental Technology & Innovation*, 41, 104735. https://www.sciencedirect.com/science/article/pii/S2352186425007217

7. **Brunsek, R. et al.** (2023). "Biodegradation properties of natural fibers for agro textile nonwovens production." https://www.researchgate.net/publication/367640489

8. **Schlievert, P.M. & Blomster, D.A.** (1983). "Production of staphylococcal pyrogenic exotoxin by the tampon sac method." *Journal of Infectious Diseases*.

9. **Reiser, R.F. et al.** (1987). "Influence of tampon composition on the production of toxic shock syndrome toxin-1." *Infection and Immunity*.

10. **Owen, D.H. & Katz, D.F.** (1999). "A vaginal fluid simulant." *Contraception*, 59(2), 91–95.

11. **Eppendorf** (2024). "How to quantify bacterial cultures - From CFU and OD to counting chamber." https://www.eppendorf.com/us-en/lab-academy/life-science/microbiology/how-to-quantify-bacterial-cultures/

12. **21 CFR 801.430** — US Code of Federal Regulations: Tampon labeling requirements and Syngyna testing specification.
