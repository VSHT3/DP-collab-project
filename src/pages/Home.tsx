import { useState } from "react";
import { Link } from "react-router-dom";
import { galleryImages, mainAxes } from "../data/products";

export default function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-semibold tracking-widest text-rose-500 uppercase mb-4">
            IB Collaborative Science Project
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-950 mb-5 leading-tight">
            Comparing Menstrual Products
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
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
          <p className="text-xl font-bold text-slate-950 leading-relaxed">
            Global women&apos;s health issues
          </p>
          <p className="text-base text-slate-700 mt-3 leading-relaxed">
            Millions of women use menstrual products daily without full
            knowledge of their chemical composition, bacterial safety, or
            environmental footprint. This project addresses that gap through
            rigorous cross-disciplinary laboratory analysis.
          </p>
        </div>

        {/* Research Question */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-16">
          <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2">
            Research Question
          </h2>
          <p className="text-xl font-bold text-slate-950 leading-relaxed">
            Which type of menstrual product best minimizes health risks and
            environmental impact across biological, chemical, physical, and
            environmental dimensions?
          </p>
        </div>

        {/* Aim Statement */}
        <div className="bg-rose-50 rounded-2xl p-8 mb-16">
          <h2 className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2">
            Our Aim
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            This project aims to compare menstrual products across five
            scientific disciplines to determine which product type minimizes
            health and environmental risks, and to recommend safer options for
            women.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="bg-rose-500 rounded-2xl p-10 text-center text-white mb-16">
          <h2 className="text-2xl font-bold mb-3">
            Want the most suitable menstrual product for yourself?
          </h2>
          <p className="text-rose-100 mb-6 text-base">
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

        {/* Main Axes */}
        <h2 className="text-2xl font-bold text-slate-950 mb-6">
          Our Evaluation Axes
        </h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-16">
          {(() => {
            const axisSlug: Record<string, string> = {
              safety: "/sciences/biology",
              chemistry: "/sciences/chemistry",
              performance: "/sciences/physics",
              environment: "/sciences/environment",
            };
            return mainAxes.map(({ key, label, description }) => (
              <Link
                key={key}
                to={axisSlug[key] || "/sciences"}
                className="border border-slate-200 rounded-xl p-6 shadow-sm hover:border-rose-300 hover:bg-rose-50/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
              >
                <h3 className="text-lg font-bold text-slate-950 mb-1">{label}</h3>
                <p className="text-base text-slate-700">{description}</p>
              </Link>
            ));
          })()}
        </div>

        {/* Gallery */}
        <div className="mb-20 mt-24 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 max-w-5xl mx-auto text-center">
            From the Lab
          </h2>
          <div style={{ columns: "4 320px", columnGap: "12px" }}>
            {galleryImages.map((src, i) => {
              const ratios = [
                "3/4",
                "1/1",
                "4/5",
                "2/3",
                "5/6",
                "3/5",
                "7/10",
                "9/16",
                "2/1",
                "5/4",
                "3/2",
                "4/3",
                "16/9",
                "5/3",
                "7/5",
                "8/5",
              ];
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
    </div>
  );
}
