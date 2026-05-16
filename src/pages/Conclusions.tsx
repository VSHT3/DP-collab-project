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
          Summary conclusions and proposed improved product. Content will be
          updated once all experimental data is collected and analysed.
        </p>
      </div>

      {/* Per-axis winners */}
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          {
            label: "Safest (Biology)",
            value: "TBD",
            note: "Pending bacterial colony data",
          },
          {
            label: "Chemically Safest",
            value: "TBD",
            note: "Pending pH and additive data",
          },
          {
            label: "Best Performance",
            value: "Naturella Pad",
            note: "Highest absorption: 16.0 g/g",
          },
          {
            label: "Most Sustainable",
            value: "TBD",
            note: "Pending decomposition data",
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
            {value === "TBD" && (
              <p className="text-sm text-rose-500 mt-3 font-medium">
                ⚠ Awaiting experimental data
              </p>
            )}
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
        <p className="text-base text-slate-700 leading-relaxed">
          Physics data shows commercial pads (especially Naturella) absorb
          significantly more fluid per gram than cloth pads. However, absorption
          rate tells a different story — Always Platinum absorbed 5 mL in just
          7.76 seconds (rank 1), while Naturella took 44.23 seconds (rank 7).
          Full cross-axis conclusions will be drawn once Biology, Chemistry, and
          ESS experiments are complete.
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
            "Organic cotton top layer (safety + chemistry: low bacteria, neutral pH, no synthetic fibres against skin)",
            "High-absorbency polymer core (performance: maximum capacity like Naturella, but with faster wicking like Always)",
            "Biodegradable outer shell (environment: reduced decomposition time vs polyethylene film)",
            "Reusable or compostable packaging (environment: lower CO₂ footprint)",
            "No fragrance additives or chlorine bleaching (chemistry: eliminate dioxin and phthalate risks)",
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-500 mt-0.5">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-rose-500 mt-6 font-medium">
          ⚠ This section will be refined once all experimental data is
          collected.
        </p>
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
                "Minimize bacterial growth through breathable, natural-fibre materials",
            },
            {
              axis: "Chemistry",
              detail:
                "Neutral pH, zero harmful additives, no chlorine bleaching or synthetic fragrances",
            },
            {
              axis: "Physics",
              detail:
                "Balance high absorption capacity with absorption rate for comfort and reliability",
            },
            {
              axis: "Environment",
              detail:
                "Biodegradable components, minimal packaging, reusable options where feasible",
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
