import { useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryImages } from '../data/products'

const axes = [
  { emoji: '🧫', title: 'Biology',   desc: 'Bacterial growth after exposure to simulated menstrual fluid', question: 'Which product is safest?' },
  { emoji: '⚗️', title: 'Chemistry', desc: 'pH levels and presence of starch additives or bleaching agents', question: 'Which is chemically safest?' },
  { emoji: '📐', title: 'Physics',   desc: 'Absorbency capacity and wicking speed under controlled conditions', question: 'Which performs best mechanically?' },
  { emoji: '🌱', title: 'ESS',       desc: 'Decomposition time (14 days) and CO₂ footprint per use', question: 'Which is most sustainable?' },
]

export default function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null)

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
          <Link to="/data" className="px-5 py-2.5 rounded-lg bg-rose-500 text-white font-medium text-sm hover:bg-rose-600 transition-colors">
            View Results
          </Link>
          <Link to="/recommend" className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
            Find My Product
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-20">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">From the Lab</h2>
        <div style={{ columns: '3 200px', columnGap: '8px' }}>
          {galleryImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Lab photo ${i + 1}`}
              loading="lazy"
              onClick={() => setLightbox(src)}
              className="w-full mb-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity object-cover"
              style={{ breakInside: 'avoid' }}
            />
          ))}
        </div>
      </div>

      {/* Research Question */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-16">
        <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2">Research Question</h2>
        <p className="text-lg font-medium text-slate-900 leading-relaxed">
          Which type of menstrual product best minimizes health risks and environmental impact
          across biological, chemical, physical, and environmental dimensions?
        </p>
        <p className="text-xs text-amber-500 mt-3">Final wording to be confirmed by the team</p>
      </div>

      {/* Four Axes */}
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Our Four Research Axes</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {axes.map(({ emoji, title, desc, question }) => (
          <Link
            key={title}
            to="/sciences"
            className="border border-slate-100 rounded-xl p-6 hover:border-rose-100 hover:bg-rose-50/30 transition-colors block"
          >
            <div className="text-2xl mb-3">{emoji}</div>
            <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-3">{desc}</p>
            <p className="text-sm font-medium text-rose-500">{question}</p>
          </Link>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="bg-rose-500 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Want the most suitable pad for yourself?</h2>
        <p className="text-rose-100 mb-6 text-sm">
          Set your priorities across safety, chemistry, performance, and environment —
          our tool ranks all products for you.
        </p>
        <Link
          to="/recommend"
          className="inline-block bg-white text-rose-500 font-semibold px-6 py-3 rounded-xl hover:bg-rose-50 transition-colors text-sm"
        >
          Yes → Find My Product
        </Link>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Lab photo"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
