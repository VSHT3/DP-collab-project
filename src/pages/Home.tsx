import { Link } from 'react-router-dom'

const cards = [
  {
    emoji: '🧫',
    title: 'Biology',
    desc: 'Bacterial growth after exposure to simulated menstrual fluid',
    question: 'Which product is safest?',
  },
  {
    emoji: '⚗️',
    title: 'Chemistry',
    desc: 'pH levels and presence of starch additives',
    question: 'Which is chemically safest?',
  },
  {
    emoji: '📐',
    title: 'Physics',
    desc: 'Absorbency capacity, wicking speed, leakage under pressure',
    question: 'Which performs best mechanically?',
  },
  {
    emoji: '🌱',
    title: 'ESS',
    desc: 'Decomposition time (14 days) and CO₂ footprint per use',
    question: 'Which is most sustainable?',
  },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <span className="inline-block text-xs font-semibold tracking-widest text-rose-400 uppercase mb-4">
          IB Collaborative Science Project
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
          Comparing Menstrual Products
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          A cross-disciplinary study examining organic pads, commercial pads,
          reusable cloth pads, and tampons through the lenses of Biology,
          Chemistry, Physics, and Environmental Science.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/data"
            className="px-5 py-2.5 rounded-lg bg-rose-500 text-white font-medium text-sm hover:bg-rose-600 transition-colors"
          >
            View Results
          </Link>
          <Link
            to="/recommend"
            className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
          >
            Find My Product
          </Link>
        </div>
      </div>

      {/* Global issue */}
      <div className="bg-rose-50 rounded-2xl p-8 mb-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Global Issue</h2>
        <p className="text-slate-600 leading-relaxed">
          Access to safe, affordable, and sustainable menstrual products is a critical
          women's health issue affecting millions globally. Misinformation, chemical
          exposure, environmental waste, and cost all influence which products women
          choose — often without complete evidence. This project applies scientific
          methodology to provide clear, data-driven guidance.
        </p>
      </div>

      {/* Four axes */}
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Our Four Research Axes</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {cards.map(({ emoji, title, desc, question }) => (
          <div key={title} className="border border-slate-100 rounded-xl p-6 hover:border-rose-100 hover:bg-rose-50/30 transition-colors">
            <div className="text-2xl mb-3">{emoji}</div>
            <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-3">{desc}</p>
            <p className="text-sm font-medium text-rose-500">{question}</p>
          </div>
        ))}
      </div>

      {/* Products */}
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Products Tested</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['Organic Pad', 'Commercial Pad', 'Reusable Cloth Pad', 'Tampon'].map(p => (
          <div key={p} className="border border-slate-100 rounded-xl p-4 text-center">
            <p className="text-sm font-medium text-slate-700">{p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
