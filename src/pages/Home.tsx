import { useState } from "react";
import { Link } from "react-router-dom";
import { galleryImages } from "../data/products";

const axes = [
  {
    emoji: "🧫",
    title: "Biology",
    desc: "Bacterial growth after exposure to simulated menstrual fluid",
    question: "Which product is safest?",
  },
  {
    emoji: "⚗️",
    title: "Chemistry",
    desc: "pH levels and presence of starch additives or bleaching agents",
    question: "Which is chemically safest?",
  },
  {
    emoji: "📐",
    title: "Physics",
    desc: "Absorbency capacity and wicking speed under controlled conditions",
    question: "Which performs best mechanically?",
  },
  {
    emoji: "🌱",
    title: "ESS",
    desc: "Decomposition time (14 days) and CO₂ footprint per use",
    question: "Which is most sustainable?",
  },
];

export default function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <span className="inline-block text-xs font-semibold tracking-widest text-rose-500 uppercase mb-4">
          IB Collaborative Science Project
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
          Comparing Menstrual Products
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          A cross-disciplinary study examining organic pads, commercial pads,
          reusable cloth pads, and tampons through the lenses of Biology,
          Chemistry, Physics, and Environmental Science.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/data"
            className="px-5 py-2.5 rounded-lg bg-rose-500 text-white font-medium text-sm hover:bg-rose-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
          >
            View Results
          </Link>
        </div>
      </div>

      {/* Global Issue */}
      <div className="border border-slate-200 rounded-2xl p-8 shadow-sm mb-16">
        <h2 className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2">
          Global Issue
        </h2>
        <p className="text-lg font-medium text-slate-900 leading-relaxed">
          Global women&apos;s health issues
        </p>
        <p className="text-slate-600 mt-3 leading-relaxed">
          Millions of women use menstrual products daily without full knowledge of their
          chemical composition, bacterial safety, or environmental footprint. This project
          addresses that gap through rigorous cross-disciplinary laboratory analysis.
        </p>
      </div>

      {/* Aim Statement */}
      <div className="bg-rose-50 rounded-2xl p-8 mb-16">
        <h2 className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2">
          Our Aim
        </h2>
        <p className="text-slate-700 leading-relaxed">
          This project aims to compare menstrual products across five scientific disciplines
          to determine which product type minimizes health and environmental risks, and to
          recommend safer options for women.
        </p>
      </div>

      {/* CTA Banner */}
      <div className="bg-rose-500 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">
          Want the most suitable pad for yourself?
        </h2>
        <p className="text-rose-100 mb-6 text-sm">
          Set your priorities across safety, chemistry, performance, and
          environment — our tool ranks all products for you.
        </p>
        <Link
          to="/recommend"
          className="inline-block bg-white text-rose-500 font-semibold px-6 py-3 rounded-xl hover:bg-rose-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 text-sm"
        >
          Find My Product
        </Link>
      </div>

      {/* Research Question */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-16 mt-20">
        <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2">
          Research Question
        </h2>
        <p className="text-lg font-medium text-slate-900 leading-relaxed">
          Which type of menstrual product best minimizes health risks and
          environmental impact across biological, chemical, physical, and
          environmental dimensions?
        </p>
      </div>

      {/* Four Axes */}
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        Our Four Research Axes
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {axes.map(({ emoji, title, desc, question }) => (
          <Link
            key={title}
            to="/sciences"
            className="border border-slate-200 rounded-xl p-6 shadow-sm hover:border-rose-300 hover:bg-rose-50/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
          >
            <div className="text-2xl mb-3">{emoji}</div>
            <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-600 mb-3">{desc}</p>
            <p className="text-sm font-medium text-rose-500">{question}</p>
          </Link>
        ))}
      </div>

      {/* Gallery */}
      <div className="mb-20 mt-24 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 max-w-5xl mx-auto text-center">
          From the Lab
        </h2>
        <div style={{ columns: "4 320px", columnGap: "12px" }}>
          {galleryImages.map((src, i) => {
            const ratios = ["3/4", "1/1", "4/5", "2/3", "5/6", "3/5"];
            const ar = ratios[i % ratios.length];
            return (
              <img
                key={i}
                src={src}
                alt={`Lab photo ${i + 1}`}
                loading="lazy"
                onClick={() => setLightbox(src)}
                className="w-full mb-3 rounded-lg cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-200 object-cover"
                style={{ breakInside: "avoid", aspectRatio: ar }}
              />
            );
          })}
        </div>
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
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold leading-none hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
