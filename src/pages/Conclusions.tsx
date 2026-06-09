import { productTypeRankings, products, type ProductKey } from "../data/products";

function computeOverallScores(): { key: ProductKey; score: number; safety: number; comfort: number; performance: number; environment: number; cost: number }[] {
  const keys = Object.keys(products) as ProductKey[];
  return keys
    .map((key) => {
      const s = products[key].scores;
      const safety = s.safety ?? 0;
      const comfort = s.comfort ?? 0;
      const perf = s.performance ?? 0;
      const env = s.environment ?? 0;
      const cost = s.cost ?? 0;
      return {
        key,
        safety,
        comfort,
        performance: perf,
        environment: env,
        cost,
        score: parseFloat(((safety + comfort + perf + env + cost) / 5).toFixed(2)),
      };
    })
    .sort((a, b) => b.score - a.score);
}

export default function Conclusions() {
  const overall = computeOverallScores();
  const winner = overall[0];

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
      <div className="mb-8 sm:mb-12">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase">
          Conclusions
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 mt-1 sm:mt-2 mb-2 sm:mb-3">
          What We Found
        </h1>
        <p className="text-base sm:text-lg text-slate-700 max-w-3xl">
          Summary conclusions drawn from experimental data and literature
          research across Biology, Chemistry, Physics, and Environmental Science.
        </p>
      </div>

      {/* Overall Winner */}
      <div className="border-2 border-rose-200 rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12 bg-gradient-to-br from-rose-50 to-white shadow-sm">
        <p className="text-xs sm:text-sm font-bold text-rose-500 uppercase tracking-wider mb-2">
          Overall Winner
        </p>
        <p className="text-2xl sm:text-4xl font-bold text-slate-950 mb-2">
          {products[winner.key].label}
        </p>
        <p className="text-base sm:text-lg text-slate-600 mb-5 sm:mb-6">
          Weighted equally across all five evaluation axes: Safety, Comfort,
          Performance, Environment, and Cost.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6 sm:mb-8">
          {overall.map(({ key, safety, comfort, performance, environment: env, cost: costScore }) => (
            <div key={key} className="border border-slate-200 rounded-xl p-4 text-center shadow-sm">
              <span
                className="inline-block w-3 h-3 rounded-full mb-2"
                style={{ background: products[key].color }}
              />
              <p className="text-sm font-bold text-slate-950 mb-1">
                {products[key].label}
              </p>
              <p className="text-xs text-slate-500">
                S {safety.toFixed(1)} · C {comfort.toFixed(1)} · P {performance.toFixed(1)} · E {env.toFixed(1)} · € {costScore.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          The reusable cloth pad ranks highest overall due to perfect environment
          (10.0) and cost (10.0) scores plus strong safety (7.3) and comfort (7.5),
          outweighing its lower performance (4.7). The organic cotton pad follows
          closely as the best single-use option, with top safety (10.0) and high
          comfort (7.5). Commercial pads and tampons are dragged down by poor
          environment and cost scores despite competitive performance.
        </p>
      </div>

      {/* Literature-backed health findings */}
      <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 sm:mb-12">
        <h2 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 sm:mb-6">
          Key Health Findings from Literature
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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
              finding: "33% of period underwear and 25% of reusable pads had intentionally added PFAS at parts-per-million levels, far above typical trace contamination.",
              source: "Wicks et al., EST Letters, 2025",
            },
            {
              title: "VOCs & Phthalates",
              finding: "Commercial pads contain volatile organic compounds and phthalates from fragrances, adhesives, and plastic packaging, linked to menstrual irregularities and cancer risk.",
              source: "Brookings Institution, 2024",
            },
          ].map(({ title, finding, source }) => (
            <div key={title} className="border-l-2 border-rose-300 pl-4">
              <p className="text-sm sm:text-base font-bold text-slate-950 mb-1">{title}</p>
              <p className="text-sm sm:text-base text-slate-700 mb-2">{finding}</p>
              <p className="text-xs sm:text-sm text-slate-500 italic">{source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Impact Stats */}
      <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 sm:mb-12">
        <h2 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 sm:mb-6">
          Environmental Impact at Scale
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-rose-50 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-rose-500">80.85B</p>
            <p className="text-sm text-slate-600 mt-1">
              products per menstrual cycle globally
            </p>
          </div>
          <div className="bg-rose-50 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-rose-500">4.3B</p>
            <p className="text-sm text-slate-600 mt-1">
              disposable products used annually in the UK
            </p>
          </div>
          <div className="bg-rose-50 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-rose-500">~800</p>
            <p className="text-sm text-slate-600 mt-1">
              years to fully decompose in landfills
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-amber-600">2B</p>
            <p className="text-sm text-slate-600 mt-1">
              items flushed down UK toilets yearly
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-amber-600">18,000</p>
            <p className="text-sm text-slate-600 mt-1">
              products wash up on beaches annually worldwide
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-emerald-600">100K</p>
            <p className="text-sm text-slate-600 mt-1">
              marine animals killed by plastic debris each year
            </p>
          </div>
        </div>
      </div>

      {/* Product type rankings */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-8 sm:mb-12 overflow-x-auto">
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
                     "Lowest capacity by design, reusable, washable, and environmentally sustainable."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overall finding */}
      <div className="bg-rose-50 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-2 sm:mb-3">
          Overall Finding
        </h2>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Physics data shows commercial pads (especially Naturella) absorb
          significantly more fluid per gram than cloth pads. However, absorption
          rate tells a different story. Always Platinum absorbed 5 mL in just
          7.76 seconds (rank 1), while Naturella took 44.23 seconds (rank 7).
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
          Literature research reveals a critical health tradeoff: tampons carry
          the highest bacterial growth risk and are the only product type
          associated with Toxic Shock Syndrome (TSS), caused by <em>Staphylococcus aureus</em> toxin release. A 2024 study detected 16 heavy metals, including lead, arsenic, and cadmium, across all 14 tampon brands tested (Shearston et al., <em>Environment International</em>). Meanwhile, a 2025 Notre Dame study found PFAS &quot;forever chemicals&quot; in 33% of reusable period products at parts-per-million levels (Wicks et al., <em>EST Letters</em>).
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          No single product excels across all axes. The optimal choice depends on user priorities: performance (commercial pads), safety and comfort (organic pads), or environmental impact (reusable cloth).
        </p>
      </div>

      {/* Proposed Improved Product */}
      <div className="border-2 border-rose-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-1">
          Proposed Improved Product
        </h2>
        <p className="text-sm sm:text-base text-rose-500 mb-4 font-medium">
          Design based on our findings
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4 sm:mb-6">
          Based on findings, an ideal product would combine:
        </p>
        <ul className="space-y-3 text-sm sm:text-base text-slate-700">
          {[
            "Organic cotton top layer (safety + comfort: low bacterial growth, no synthetic fibres against skin, no fragrance or dye exposure)",
            "High-absorbency polymer core (performance: maximum capacity like Naturella, but with faster wicking like Always Platinum)",
            "Biodegradable outer shell (environment: reduced decomposition time vs conventional polyethylene film)",
            "Reusable or compostable packaging (environment: lower CO₂ footprint per use)",
            "No fragrance additives or chlorine bleaching (safety: eliminates dioxin and phthalate risks found in commercial products)",
            "PFAS-free waterproofing if reusable (environment: avoids the 25–33% of reusable products found with intentionally added PFAS per Wicks et al., 2025)",
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-500 mt-0.5">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
  )
}
