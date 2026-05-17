import { productTypeRankings } from "../data/products";

export default function Conclusions() {
  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">
          Conclusions
        </span>
        <h1 className="text-4xl font-bold text-slate-950 mt-2 mb-3">
          What We Found
        </h1>
        <p className="text-lg text-slate-700 max-w-3xl">
          Summary conclusions drawn from experimental data and literature
          research across Biology, Chemistry, Physics, and Environmental Science.
        </p>
      </div>

      {/* Literature-backed health findings */}
      <div className="border border-slate-200 rounded-2xl p-8 shadow-sm mb-12">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
          Key Health Findings from Literature
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "TSS Risk",
              finding: "Tampons are the only product type associated with Toxic Shock Syndrome. Incidence is ~1 in 100,000, but all five pad products in this study carry zero TSS risk.",
              source: "Clue, 2024; CDC",
            },
            {
              title: "Heavy Metals",
              finding: "A 2024 study found lead in all 30 tampons tested, plus arsenic, cadmium, and mercury across 14 brands. Heavy metals are absorbed by cotton from soil.",
              source: "Shearston et al., Environment International, 2024",
            },
            {
              title: "PFAS in Reusables",
              finding: "33% of period underwear and 25% of reusable pads had intentionally added PFAS at parts-per-million levels — far above typical trace contamination.",
              source: "Wicks et al., EST Letters, 2025",
            },
            {
              title: "VOCs & Phthalates",
              finding: "Commercial pads contain volatile organic compounds and phthalates from fragrances, adhesives, and plastic packaging, linked to menstrual irregularities and cancer risk.",
              source: "Brookings Institution, 2024",
            },
          ].map(({ title, finding, source }) => (
            <div key={title} className="border-l-2 border-rose-300 pl-4">
              <p className="text-base font-bold text-slate-950 mb-1">{title}</p>
              <p className="text-base text-slate-700 mb-2">{finding}</p>
              <p className="text-sm text-slate-500 italic">{source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Per-axis winners */}
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          {
            label: "Safest (Biology)",
            value: "Organic & Cloth Pads",
            note: "External wear eliminates vaginal bacterial introduction. Natural fibres are more breathable, reducing surface moisture that promotes growth.",
          },
          {
            label: "Chemically Safest",
            value: "Organic Cotton Pad",
            note: "Free from synthetic fragrances, dyes, and chlorine bleaching. Eliminates VOC and phthalate exposure found in commercial pads.",
          },
          {
            label: "Best Performance",
            value: "Naturella Pad",
            note: "Highest absorption: 16.0 g/g. Always Platinum fastest rate: 7.76 s/5 mL.",
          },
          {
            label: "Most Sustainable",
            value: "Reusable Cloth Pad",
            note: "Near-zero per-use CO₂e when amortized over 100+ uses. Fully biodegradable — highest expected mass loss in soil burial test.",
          },
        ].map(({ label, value, note }) => (
          <div
            key={label}
            className="border border-slate-200 rounded-2xl p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              {label}
            </p>
            <p className="text-2xl font-bold text-slate-950 mb-1">{value}</p>
            <p className="text-base text-slate-700 italic">{note}</p>
          </div>
        ))}
      </div>

      {/* Product type rankings */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-12">
        <div className="px-6 py-4 bg-slate-50">
          <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Product Type Rankings (Physics)
          </span>
          <p className="text-sm text-slate-600 mt-1">
            Aggregated across all products within each category
          </p>
        </div>
        <table className="w-full text-base">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-left font-bold text-slate-800">
                Rank
              </th>
              <th className="px-6 py-4 text-left font-bold text-slate-800">
                Product Type
              </th>
              <th className="px-6 py-4 text-left font-bold text-slate-800">
                Assessment
              </th>
            </tr>
          </thead>
          <tbody>
            {productTypeRankings.map((row) => (
              <tr
                key={row.type}
                className={row.rank % 2 === 1 ? "" : "bg-slate-50/50"}
              >
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      row.rank === 1
                        ? "bg-emerald-100 text-emerald-700"
                        : row.rank === 2
                          ? "bg-blue-100 text-blue-700"
                          : row.rank === 3
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {row.rank}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-950">
                  {row.label}
                </td>
                <td className="px-6 py-4 text-slate-700">
                  {row.rank === 1 &&
                    "Highest absorption capacity overall. Commercial pads dominate capacity rankings."}
                  {row.rank === 2 &&
                    "Moderate absorption capacity. Consistent performance across brands."}
                  {row.rank === 3 &&
                    "Lower capacity than commercial pads but faster absorption rate in some cases."}
                  {row.rank === 4 &&
                    "Lowest capacity by design — reusable, washable, and environmentally sustainable."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overall finding */}
      <div className="bg-rose-50 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold text-slate-950 mb-3">
          Overall Finding
        </h2>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Physics data shows commercial pads (especially Naturella) absorb
          significantly more fluid per gram than cloth pads. However, absorption
          rate tells a different story — Always Platinum absorbed 5 mL in just
          7.76 seconds (rank 1), while Naturella took 44.23 seconds (rank 7).
        </p>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Literature research reveals a critical health tradeoff: tampons carry
          the highest bacterial growth risk and are the only product type
          associated with Toxic Shock Syndrome (TSS), caused by <em>Staphylococcus aureus</em> toxin release. A 2024 study detected 16 heavy metals — including lead, arsenic, and cadmium — across all 14 tampon brands tested (Shearston et al., <em>Environment International</em>). Meanwhile, a 2025 Notre Dame study found PFAS &quot;forever chemicals&quot; in 33% of reusable period products at parts-per-million levels (Wicks et al., <em>EST Letters</em>).
        </p>
        <p className="text-base text-slate-700 leading-relaxed">
          No single product excels across all four axes. The optimal choice depends on user priorities: performance (commercial pads), safety and chemistry (organic pads), or environmental impact (reusable cloth).
        </p>
      </div>

      {/* Proposed Improved Product */}
      <div className="border-2 border-rose-200 rounded-2xl p-8 shadow-sm mb-10">
        <h2 className="text-xl font-bold text-slate-950 mb-1">
          Proposed Improved Product
        </h2>
        <p className="text-base text-rose-500 mb-4 font-medium">
          Design based on our findings
        </p>
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Based on findings, an ideal product would combine:
        </p>
        <ul className="space-y-3 text-base text-slate-700">
          {[
            "Organic cotton top layer (safety + chemistry: low bacterial growth, no synthetic fibres against skin, no fragrance or dye exposure)",
            "High-absorbency polymer core (performance: maximum capacity like Naturella, but with faster wicking like Always Platinum)",
            "Biodegradable outer shell (environment: reduced decomposition time vs conventional polyethylene film)",
            "Reusable or compostable packaging (environment: lower CO₂ footprint per use)",
            "No fragrance additives or chlorine bleaching (chemistry: eliminates dioxin and phthalate risks found in commercial products)",
            "PFAS-free waterproofing if reusable (environment: avoids the 25–33% of reusable products found with intentionally added PFAS per Wicks et al., 2025)",
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-500 mt-0.5">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Our Conceptual Product */}
      <div className="border-2 border-slate-200 rounded-2xl p-8 bg-slate-50/50 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950 mb-1">
          Our Conceptual Product
        </h2>
        <p className="text-base text-slate-600 mb-4">
          Brand name TBD — designed by our team
        </p>
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          As part of this project, we are designing a conceptual menstrual
          product brand that applies the insights from all four research axes.
          Our product will prioritize:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            {
              axis: "Biology",
              detail:
                "Minimize bacterial growth through breathable, natural-fibre materials. External pad design eliminates TSS risk entirely — unlike tampons which introduce oxygen and promote S. aureus proliferation.",
            },
            {
              axis: "Chemistry",
              detail:
                "Neutral pH, zero harmful additives. No chlorine bleaching (avoids dioxins), no synthetic fragrances (avoids phthalates and VOCs), and no intentional PFAS in any waterproofing layer.",
            },
            {
              axis: "Physics",
              detail:
                "Balance high absorption capacity (target: ≥12 g/g) with fast absorption rate (target: ≤15 s/5 mL). Commercial pads set the benchmark; organic materials must compete.",
            },
            {
              axis: "Environment",
              detail:
                "Biodegradable components targeting ≥40% mass loss in 14-day soil burial. Minimal packaging. Reusable option with PFAS-free waterproofing to avoid the 25–33% contamination rate found in current products.",
            },
          ].map(({ axis, detail }) => (
            <div
              key={axis}
              className="border border-slate-200 rounded-xl p-5 bg-white"
            >
              <p className="text-sm font-bold text-rose-500 uppercase tracking-wider mb-1">
                {axis}
              </p>
              <p className="text-base text-slate-700">{detail}</p>
            </div>
          ))}
        </div>
        <p className="text-base text-slate-700 leading-relaxed">
          Details — including branding, materials sourcing, pricing strategy,
          and product specifications — will be added once the team finalises the
          concept.
        </p>
      </div>
    </div>
  </div>
  )
}
