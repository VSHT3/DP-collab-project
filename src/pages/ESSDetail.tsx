import { Link } from "react-router-dom";
import {
  SimpleBars,
  type SimpleBarDatum,
} from "../components/charts/simple-bars";
import { subjects } from "../data/sciences";
import { products } from "../data/products";

const subject = subjects.find((s) => s.slug === "environment")!;

const productEnvIssues = [
  { key: "always_platinum", label: "Always Platinum Pad", type: "Disposable pad", issue: "Plastic waste, landfill accumulation, resource use" },
  { key: "ria_pad", label: "Ria Ultra Pad", type: "Disposable pad", issue: "Plastic layers and packaging waste" },
  { key: "naturella_pad", label: "Naturella Pad", type: "Disposable pad", issue: "Plastic waste, packaging waste" },
  { key: "jessa_cotton", label: "Jessa Cotton Pad", type: "Disposable cotton pad", issue: "Less synthetic materials but still single-use waste" },
  { key: "ria_tampon", label: "Ria Tampon", type: "Disposable tampon", issue: "Cotton production, packaging waste" },
  { key: "ob_tampon", label: "o.b. Tampon", type: "Disposable tampon", issue: "Lower plastic than pads, but still single-use" },
  { key: "jessa_cloth", label: "Jessa Cloth Pad", type: "Reusable cloth pad", issue: "Water and energy for washing, but much less waste overall" },
] as const;

const surveyData: SimpleBarDatum[] = [
  { name: "Regular tampons", value: 47, color: "#e8738a" },
  { name: "Sanitary pads", value: 46, color: "#f4a0b1" },
  { name: "Panty liners", value: 43, color: "#e8738a" },
  { name: "Super tampons", value: 33, color: "#f4a0b1" },
  { name: "Menstrual cups", value: 19, color: "#e8738a" },
  { name: "Period underwear", value: 19, color: "#f4a0b1" },
  { name: "Combo (not together)", value: 16, color: "#e8738a" },
  { name: "None", value: 4, color: "#cbd5e1" },
  { name: "Don't know / prefer not", value: 2, color: "#cbd5e1" },
  { name: "Other", value: 1, color: "#cbd5e1" },
];

export default function ESSDetail() {
  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/sciences"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-rose-500 transition-colors mb-8"
        >
          ← Sciences
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{subject.emoji}</span>
            <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">
              Sciences & Methodology
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-950 mb-3">
            {subject.label}
          </h1>
          <p className="text-lg text-rose-500 font-medium italic whitespace-nowrap">
            {subject.rq}
          </p>
        </div>

        <div className="space-y-8">
          {/* Chart + Waste Stats side by side */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                Menstrual Product Usage Survey (n = 7,394)
              </h2>
              <SimpleBars
                data={surveyData}
                height={380}
                domain={[0, 50]}
                yAxisLabel="Percentage (%) of participants"
              />
              <p className="text-xs text-slate-500 mt-14 text-center">
                Source: Harvard Apple Women's Health Study
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-6">
                Waste by the Numbers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-rose-50 rounded-xl p-5 text-center">
                  <p className="text-4xl font-bold text-rose-500">80.85B</p>
                  <p className="text-sm text-slate-600 mt-1">
                    products per menstrual cycle (global estimate)
                  </p>
                </div>
                <div className="bg-rose-50 rounded-xl p-5 text-center">
                  <p className="text-4xl font-bold text-rose-500">4.3B</p>
                  <p className="text-sm text-slate-600 mt-1">
                    disposable products used annually in the UK alone
                  </p>
                </div>
                <div className="bg-rose-50 rounded-xl p-5 text-center">
                  <p className="text-4xl font-bold text-rose-500">800</p>
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
                    products on beaches worldwide annually
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold text-emerald-600">100K</p>
                  <p className="text-sm text-slate-600 mt-1">
                    marine animals killed each year
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Procedure */}
          <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
              Procedure
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-base text-slate-700">
              {subject.methodology.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Key Metric */}
          <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
              Key Metric
            </h2>
            <p className="text-base text-slate-800">{subject.metric}</p>
          </div>

          {/* Per-Product Environmental Issues */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-8 py-5 bg-rose-50">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Environmental Issues by Product
              </h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-3 text-left font-semibold text-slate-600">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Main Environmental Issues</th>
                </tr>
              </thead>
              <tbody>
                {productEnvIssues.map((p, i) => {
                  const pr = products[p.key as keyof typeof products];
                  return (
                    <tr key={p.key} className={i % 2 === 0 ? "" : "bg-slate-50/50"}>
                      <td className="px-5 py-3">
                        <Link
                          to={`/products/${p.key}`}
                          className="flex items-center gap-2 text-slate-900 font-medium hover:text-rose-500 transition-colors"
                        >
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: pr.color }} />
                          {p.label}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{p.type}</td>
                      <td className="px-4 py-3 text-slate-700 leading-relaxed">{p.issue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Where It Goes + Solutions side by side */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                Where Does It All Go?
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Most disposable menstrual products end up in landfills, where
                synthetic materials and plastics take approximately 800 years to
                fully decompose. Annually, 18,000 products wash up on beaches
                worldwide, contributing to the death of approximately 100,000
                marine animals — seabirds, fish, turtles, and mammals — due to
                plastics and chemicals. An additional 2 billion items are flushed
                down UK toilets each year, causing plumbing blockages and
                contaminating municipal wastewater systems. Used products cannot
                be recycled due to mixed synthetic and natural materials combined
                with hygiene risks.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4">
                What Can We Do?
              </h2>
              <ul className="space-y-2 text-base text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Use menstrual cups
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Use reusable pads (washable pads)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Use period pants
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Put used items in general waste, never flush
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Choose applicator-free tampons (reduces plastic pollution)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Choose organic products (cotton products)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
