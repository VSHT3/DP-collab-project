import { useState } from 'react'
import { Link } from 'react-router-dom'

interface AccordionCardProps {
  emoji: string
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function AccordionCard({ emoji, title, children, defaultOpen }: AccordionCardProps) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  const id = title.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between px-8 py-5 text-left bg-white hover:bg-slate-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-inset"
      >
        <h2 className="text-lg font-bold text-slate-950 flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          {title}
        </h2>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={id}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-8 pb-6 pt-2 border-t border-slate-100">
          {children}
        </div>
      </div>
    </div>
  )
}

function RiskBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    low: 'bg-emerald-100 text-emerald-800',
    'low-moderate': 'bg-lime-100 text-lime-800',
    moderate: 'bg-orange-100 text-orange-800',
    'moderate-high': 'bg-rose-100 text-rose-800',
    high: 'bg-red-100 text-red-800',
  }
  const cls = styles[level.toLowerCase()] ?? 'bg-slate-100 text-slate-800'
  return (
    <span className={`inline-block px-4 py-1.5 text-sm font-bold uppercase rounded-full ${cls}`}>
      {level}
    </span>
  )
}

function BrandCard({ name, type, risk, note, color }: { name: string; type: string; risk: string; note: string; color: string }) {
  return (
    <div className="border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: color }} />
        <div>
          <div className="font-bold text-slate-950">{name}</div>
          <div className="text-xs text-slate-500">{type}</div>
        </div>
      </div>
      <RiskBadge level={risk} />
      <p className="text-sm text-slate-700 mt-3 leading-relaxed">{note}</p>
    </div>
  )
}

export default function ChemistryDetail() {
  return (
    <div className="px-8 lg:px-24 py-16">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/sciences"
          className="inline-flex items-center gap-1 text-base text-slate-600 hover:text-rose-500 transition-colors mb-8"
        >
          ← Sciences
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">⚗️</span>
            <span className="text-base font-semibold tracking-widest text-rose-500 uppercase">
              Sciences & Methodology
            </span>
          </div>
          <h1 className="text-5xl font-bold text-slate-950 mb-3">Chemistry</h1>
          <p className="text-xl text-rose-500 font-medium italic max-w-4xl">
            Which product type has the most neutral pH and fewest harmful chemical additives?
          </p>
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Why TSS risk is higher for tampons</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white hover:bg-rose-50/30 transition-colors duration-200">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🧵</span>
                <div>
                  <h3 className="font-bold text-slate-950 mb-1">Absorbent materials</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Cotton and rayon in tampons create a warm, moist environment that is ideal for bacterial growth, including Staphylococcus aureus.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white hover:bg-rose-50/30 transition-colors duration-200">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">💨</span>
                <div>
                  <h3 className="font-bold text-slate-950 mb-1">Oxygen introduced during insertion</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Unlike external products, tampons carry air into the vaginal canal. Oxygen helps Staphylococcus aureus produce TSST-1 toxins.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white hover:bg-rose-50/30 transition-colors duration-200">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">⏱️</span>
                <div>
                  <h3 className="font-bold text-slate-950 mb-1">Long wear time</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Wearing a tampon for 4 to 8 hours allows bacterial toxins to accumulate. Changing every 4 hours significantly reduces risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white hover:bg-rose-50/30 transition-colors duration-200">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">📊</span>
                <div>
                  <h3 className="font-bold text-slate-950 mb-1">Higher absorbency = higher risk</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Super and super-plus tampons are associated with increased TSS risk. Always use the lowest absorbency that meets your flow needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Chemical risk categories</h2>

          <AccordionCard emoji="🧪" title="Endocrine disruptors (phthalates, parabens, BPA)">
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Endocrine disruptors interfere with hormone systems, potentially affecting fertility, development, and increasing cancer risk. They are found especially in fragranced menstrual products.
              </p>
              <p>
                Phthalates are used to retain scent in fragrances. Parabens act as preservatives. BPA lines some plastic applicators. All three can mimic or block natural hormones even at low doses.
              </p>
              <p>
                A 2024 study detected multiple phthalates in commercial pads and tampons across European brands, with higher concentrations in fragranced products (PubMed 41666673).
              </p>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/41666673/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-medium transition-colors"
              >
                PubMed study →
              </a>
            </div>
          </AccordionCard>

          <AccordionCard emoji="💨" title="Phthalates & VOCs">
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Volatile organic compounds (VOCs) such as toluene and xylene are released from plastic components, adhesives, and fragrances in menstrual products. These compounds are linked to hormone disruption, respiratory irritation, and systemic toxicity.
              </p>
              <p>
                Research published in the Journal of Obstetrics and Gynaecology found phthalates in the majority of tested menstrual products, with fragranced pads showing the highest concentrations. Toluene was detected in several synthetic-fibre products.
              </p>
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S0890623818302259"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-medium transition-colors"
              >
                Phthalates study →
              </a>
            </div>
          </AccordionCard>

          <AccordionCard emoji="⚙️" title="Heavy metals (lead, arsenic)">
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                A 2024 investigation detected toxic metals including lead, arsenic, and cadmium in tampons from multiple major brands. These metals can accumulate in the body over time and are associated with neurological, cardiovascular, and reproductive toxicity.
              </p>
              <p>
                Because vaginal tissue absorbs chemicals directly into the bloodstream (bypassing digestive metabolism), even trace metal concentrations in menstrual products are a concern for chronic exposure.
              </p>
              <a
                href="https://www.lemonde.fr/en/environment/article/2024/07/12/toxic-metals-found-in-tampons_6682209_114.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-medium transition-colors"
              >
                Summary article (Le Monde) →
              </a>
            </div>
          </AccordionCard>

          <AccordionCard emoji="🧫" title="PFAS (forever chemicals)">
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Per- and polyfluoroalkyl substances (PFAS) are added to leak-proof layers in some reusable and disposable products. Known as forever chemicals, they persist in the environment and the human body for years.
              </p>
              <p>
                PFAS exposure is linked to kidney cancer, thyroid disruption, immune suppression, and reduced fertility. A 2023 study found PFAS in a quarter of tested reusable menstrual products.
              </p>
              <a
                href="https://time.com/6254060/pfas-period-chemicals-underwear-tampons/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-medium transition-colors"
              >
                PFAS overview (Time) →
              </a>
            </div>
          </AccordionCard>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Brand risk assessment</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <BrandCard
              name="Jessa"
              type="Organic-style cotton, no fragrance"
              risk="Low"
              note="Organic-style cotton without added fragrance. Fewer synthetic additives and lower chemical load overall."
              color="#2d8a4e"
            />
            <BrandCard
              name="Naturella"
              type="Contains soothing lotion"
              risk="Moderate"
              note="Marketed as soothing lotion rather than fragrance, but lotion additives can still contain chemical components that may act as irritants or endocrine disruptors. Slower absorption rate due to lotion layer."
              color="#4a7dc4"
            />
            <BrandCard
              name="Always"
              type="Plastics + superabsorbent polymers"
              risk="Moderate"
              note="Synthetic materials, superabsorbent polymers (SAP), and adhesives can release VOCs. Plastics contribute to microplastic exposure. Fragrance variants add phthalate risk."
              color="#3a9b9b"
            />
            <BrandCard
              name="Ria"
              type="Budget brand, limited transparency"
              risk="Moderate-high"
              note="Less ingredient transparency compared to major brands. Likely higher proportion of synthetic materials. Tampon variants carry additional internal absorption risks."
              color="#b5569e"
            />
          </div>
        </div>

        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-950 text-lg mb-3 text-center">Key takeaway</h3>
          <p className="text-base text-slate-700 text-center leading-relaxed max-w-3xl mx-auto">
            Internal products (tampons) carry inherently higher chemical risk because vaginal tissue absorbs substances more readily than external skin. Choosing unscented products with natural fibres and transparent ingredient lists reduces exposure. The safest choice is a product with no fragrance, no superabsorbent polymers, and verified low heavy metal content.
          </p>
        </div>
      </div>
    </div>
  )
}
