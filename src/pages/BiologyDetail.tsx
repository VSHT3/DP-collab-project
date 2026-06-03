import { Link } from 'react-router-dom'

const columns = [
  { brand: 'Naturella', type: 'Pad' },
  { brand: 'Always', type: 'Platinum' },
  { brand: 'Ria Ultra', type: 'Pad' },
  { brand: 'Ria', type: 'Tampon' },
  { brand: 'o.b.', type: 'Tampon' },
  { brand: 'Jessa Cotton', type: 'Pad' },
  { brand: 'Jessa Cloth', type: 'Pad' },
]

const chemicalExposure = [
  { risk: 'Moderate', desc: 'VOCs/fragrance/adhesives', color: 'bg-orange-100' },
  { risk: 'Moderate', desc: 'VOCs/phthalates/SAP', color: 'bg-orange-100' },
  { risk: 'Moderate', desc: 'VOCs/phthalates', color: 'bg-orange-100' },
  { risk: 'Mod-Higher', desc: 'metals + residues', color: 'bg-rose-100' },
  { risk: 'Mod-Higher', desc: 'metals + residues', color: 'bg-rose-100' },
  { risk: 'Lower, not zero', desc: 'trace metals possible', color: 'bg-emerald-100' },
  { risk: 'Variable', desc: 'PFAS/waterproof layer', color: 'bg-yellow-100' },
]

const bacterialGrowth = [
  { risk: 'Moderate', desc: 'external, change often', color: 'bg-orange-100' },
  { risk: 'Moderate', desc: 'external, change often', color: 'bg-orange-100' },
  { risk: 'Moderate', desc: 'external, change often', color: 'bg-orange-100' },
  { risk: 'Higher', desc: 'internal, ≤8h', color: 'bg-rose-100' },
  { risk: 'Higher', desc: 'internal, clean hands', color: 'bg-rose-100' },
  { risk: 'Lower', desc: 'breathable cotton', color: 'bg-emerald-100' },
  { risk: 'Variable', desc: 'washing matters', color: 'bg-yellow-100' },
]

const tss = [
  { risk: 'Not a concern', desc: 'external pad', color: 'bg-emerald-100' },
  { risk: 'Not a concern', desc: 'external pad', color: 'bg-emerald-100' },
  { risk: 'Not a concern', desc: 'external pad', color: 'bg-emerald-100' },
  { risk: 'Present', desc: 'use lowest absorbency', color: 'bg-rose-100' },
  { risk: 'Present', desc: 'use lowest absorbency', color: 'bg-rose-100' },
  { risk: 'Not a concern', desc: 'external pad', color: 'bg-emerald-100' },
  { risk: 'Not a concern', desc: 'external pad', color: 'bg-emerald-100' },
]

const skinIrritation = [
  { risk: 'Moderate', desc: 'fragrance/plastic', color: 'bg-orange-100' },
  { risk: 'Moderate', desc: 'synthetics/adhesives', color: 'bg-orange-100' },
  { risk: 'Moderate', desc: 'synthetics', color: 'bg-orange-100' },
  { risk: 'Low-Mod', desc: 'applicator/friction', color: 'bg-yellow-100' },
  { risk: 'Low-Mod', desc: 'finger insertion', color: 'bg-yellow-100' },
  { risk: 'Low', desc: 'cotton/sensitive skin', color: 'bg-emerald-100' },
  { risk: 'Low*', desc: 'detergent caveat', color: 'bg-emerald-100' },
]

function BrandHeader() {
  return (
    <div className="grid grid-cols-7 gap-3 mb-4">
      {columns.map((c, i) => (
        <div key={i} className="text-center bg-slate-100 rounded-lg px-3 py-3">
          <div className="text-sm font-bold text-black">{c.brand}</div>
          <div className="text-xs text-black">{c.type}</div>
        </div>
      ))}
    </div>
  )
}

function RiskRow({ cells }: { cells: { risk: string; desc: string; color: string }[] }) {
  return (
    <div className="grid grid-cols-7 gap-3">
      {cells.map((c, i) => (
        <div key={i} className={`${c.color} rounded-lg px-3 py-4 text-center`}>
          <div className="text-sm font-bold text-black">{c.risk}</div>
          <div className="text-xs text-black italic leading-tight">{c.desc}</div>
        </div>
      ))}
    </div>
  )
}

function RiskPanel({ headerBg, emoji, title, cells }: { headerBg: string; emoji: string; title: string; cells: { risk: string; desc: string; color: string }[] }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6">
      <div className={`${headerBg} px-8 py-5`}>
        <h2 className="text-white font-bold text-base flex items-center gap-2">
          <span className="text-lg">{emoji}</span> {title}
        </h2>
      </div>
      <div className="p-8">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <BrandHeader />
            <RiskRow cells={cells} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BiologyDetail() {
  return (
    <div className="px-8 lg:px-24 py-16">
      <div className="max-w-none mx-auto">
        <Link
          to="/sciences"
          className="inline-flex items-center gap-1 text-base text-black hover:text-rose-500 transition-colors mb-8"
        >
          ← Sciences
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🧫</span>
            <span className="text-base font-semibold tracking-widest text-rose-500 uppercase">
              Sciences & Methodology
            </span>
          </div>
          <h1 className="text-5xl font-bold text-slate-950 mb-3">Biology</h1>
          <p className="text-xl text-rose-500 font-medium italic max-w-4xl">
            Which product type produces the least bacterial growth after exposure to simulated menstrual fluid?
          </p>
        </div>

        {/* Chemical Exposure Panel */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-800 px-8 py-5">
            <h2 className="text-white font-bold text-base flex items-center gap-2">
              <span className="text-lg">✏️</span> Chemical exposure: VOCs/phthalates, metals, PFAS, bleaching residues
            </h2>
          </div>
          <div className="p-8">
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <BrandHeader />
                <RiskRow cells={chemicalExposure} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-8">
            <div className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-base text-black mb-3">What is mandatory / official?</h3>
              <ul className="text-sm text-black space-y-1.5 list-disc list-inside">
                <li>EU Cosmetics Regulation (EC) No 1223/2009 governs fragrance allergen labeling</li>
                <li>FDA classifies tampons as Class II medical devices (510(k) clearance)</li>
                <li>ISO 81121:2020 sets absorbency standards, not chemical safety thresholds</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-base text-black mb-3">Why safe / not fully settled?</h3>
              <ul className="text-sm text-black space-y-1.5 list-disc list-inside">
                <li>Vaginal epithelium absorbs chemicals more readily than external skin</li>
                <li>No legally binding limits for heavy metals (Pb, As, Cd) in menstrual products</li>
                <li>PFAS found in 25% of reusable products despite no regulatory limits</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 px-8 py-5">
            <div className="flex items-start gap-4">
              <span className="font-bold text-base text-black whitespace-nowrap">Practical safety conclusion</span>
              <p className="text-sm text-black">
                Choose unscented products with natural, breathable materials. Change tampons every 4–6 hours and use the
                lowest absorbency needed. Wash cloth pads thoroughly, avoid fabric softeners, and check for PFAS-free
                claims on reusable products.
              </p>
            </div>
          </div>
        </div>

        {/* Legend + Disclaimer */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <p className="text-sm text-black italic">
            Brand comparison from the file (ratings are by product type/material, not lab tests of these exact brands).
          </p>
          <div className="flex gap-2 shrink-0">
            <span className="px-4 py-1.5 text-sm font-bold uppercase rounded-full bg-rose-100 text-rose-700">HIGH</span>
            <span className="px-4 py-1.5 text-sm font-bold uppercase rounded-full bg-orange-100 text-orange-700">MODERATE</span>
            <span className="px-4 py-1.5 text-sm font-bold uppercase rounded-full bg-slate-100 text-black">LOW</span>
          </div>
        </div>

        {/* Bacterial Growth */}
        <RiskPanel
          headerBg="bg-teal-700"
          emoji="🦠"
          title="Bacterial growth: affected by internal use + wear time"
          cells={bacterialGrowth}
        />

        {/* Toxic Shock Syndrome */}
        <RiskPanel
          headerBg="bg-rose-900"
          emoji="⚠️"
          title="Toxic shock syndrome (TSS): rare, serious, mainly tampon-associated"
          cells={tss}
        />

        {/* Skin Irritation */}
        <RiskPanel
          headerBg="bg-indigo-800"
          emoji="✏️"
          title="Skin irritation/contact dermatitis: fragrance, adhesives, friction, detergent residue"
          cells={skinIrritation}
        />

        <p className="text-sm text-black italic mt-4">
          *Cloth-pad risk becomes higher if it is not fully washed/dried or if irritating detergent remains.
        </p>

        <div className="mt-8 p-8 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="font-bold text-base text-black text-center">
            Key message: tampons create the only clear TSS pathway, pads mainly differ by breathability,
            fragrance/synthetics, and washing hygiene.
          </p>
        </div>
      </div>
    </div>
  )
}
