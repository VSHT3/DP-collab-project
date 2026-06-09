import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { galleryImages } from "../data/products";

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

export default function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const rq = useInView()

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase mb-3 sm:mb-4">
            IB Collaborative Science Project
          </span>
          <h1 className="text-3xl sm:text-6xl font-bold text-slate-950 mb-4 sm:mb-5 leading-tight">
            Comparing Menstrual Products
          </h1>
          <p className="text-base sm:text-xl text-slate-700 max-w-3xl mx-auto mb-6 sm:mb-8">
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

        {/* Global Issue + Our Aim side by side */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xs sm:text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2">
              Global Issue
            </h2>
            <p className="text-lg sm:text-xl font-bold text-slate-950 leading-relaxed">
              Global women&apos;s health issues
            </p>
            <p className="text-sm sm:text-base text-slate-700 mt-2 sm:mt-3 leading-relaxed">
              Millions of women use menstrual products daily without full
              knowledge of their chemical composition, bacterial safety, or
              environmental footprint. This project addresses that gap through
              rigorous cross-disciplinary analysis.
            </p>
          </div>

          <div className="bg-rose-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xs sm:text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2">
              Our Aim
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              This project aims to compare menstrual products across four
              scientific disciplines and a cost analysis to determine which
              product type minimizes health and environmental risks, and to
              recommend safer options for women.
            </p>
          </div>
        </div>

        {/* Research Question */}
        <div ref={rq.ref} className={`max-w-4xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${rq.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-sm sm:text-base font-semibold text-amber-600 uppercase tracking-widest mb-3 sm:mb-4 text-center">
            Research Question
          </h2>
          <p className="text-2xl sm:text-4xl font-bold text-slate-950 leading-snug text-center">
            {"Which type of menstrual product best minimizes health risks and environmental impact across biological, chemical, physical, and environmental dimensions?"
              .split(" ")
              .map((word, wi, arr) => [
                <span key={wi} className="whitespace-nowrap inline-block">
                  {word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className="inline-block"
                      style={{ animation: rq.inView ? `letter-wave 4s ease-in-out ${(wi * 6 + ci) * 0.05}s infinite` : 'none' }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>,
                wi < arr.length - 1 ? " " : null,
              ])
            }
          </p>
        </div>

        {/* CTA Banner */}
        <div className="bg-rose-500 rounded-2xl p-8 sm:p-10 text-center text-white mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
            Want the most suitable menstrual product for yourself?
          </h2>
          <p className="text-rose-100 mb-5 sm:mb-6 text-sm sm:text-base">
            Set your priorities across safety, chemistry, performance,
            environment, and cost. Our tool ranks all products for you.
          </p>
          <Link
            to="/recommend"
            className="inline-block w-full sm:w-auto bg-white text-rose-500 font-semibold px-6 py-3 rounded-xl hover:bg-rose-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 text-sm"
          >
            Find My Product
          </Link>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
            <p className="text-sm font-semibold text-slate-700 mb-3">Scan to visit</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://dp-collab-project.vercel.app/`}
              alt="QR code to project site"
              className="w-40 h-40 mx-auto"
            />
            <p className="text-xs text-slate-500 mt-2">dp-collab-project.vercel.app</p>
          </div>
        </div>

        {/* Main Axes */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4 sm:mb-6">
          Our Evaluation Axes
        </h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {[
            { label: "Biology", desc: "TSS risk, bacterial growth, skin irritation, and chemical exposure assessment through literature review", to: "/sciences/biology" },
            { label: "Chemistry", desc: "Chemical composition analysis: VOCs, phthalates, heavy metals, bleaching residues, and endocrine disruptors", to: "/sciences/chemistry" },
            { label: "Physics", desc: "Hands-on lab experiments measuring absorption capacity (g/g) and absorption rate (s/5 mL)", to: "/sciences/physics" },
            { label: "ESS", desc: "Waste volume, decomposition timelines, marine pollution, and reusability analysis", to: "/sciences/environment" },
            { label: "CS", desc: "Website, interactive recommendation tool, data analysis, statistics, and source gathering", to: "/about" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:border-rose-300 hover:bg-rose-50/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1">
                {item.label}
              </h3>
              <p className="text-sm sm:text-base text-slate-700">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Gallery */}
        <div className="mb-16 sm:mb-20 mt-16 sm:mt-24 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-6 sm:mb-8 max-w-5xl mx-auto text-center">
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

        {/* Sources */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4 sm:mb-6 text-center">
            Sources
          </h2>
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Project Documents</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li>Experimental Methods and Data</li>
                <li>Health Research Review</li>
              </ul>
            </div>
            <div className="border-t border-slate-100 pt-3 sm:pt-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Web Sources</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li><a href="https://hsph.harvard.edu/research/apple-womens-health-study/study-updates/menstrual-hygiene-products-pads-and-tampons-are-the-go-to-choice/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Harvard Apple Women&apos;s Health Study — Menstrual Hygiene Products</a></li>
                <li><a href="https://www.businesswaste.co.uk/waste-facts/sanitary-waste-facts/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">BusinessWaste — Sanitary Waste Facts</a></li>
                <li><a href="https://m.statisticstimes.com/demographics/world-sex-ratio.php" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Statistics Times — World Sex Ratio</a></li>
                <li><a href="https://www.sciencedirect.com/science/article/pii/S2666789422000277" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">ScienceDirect — Menstrual Product Waste Review</a></li>
                <li><a href="https://www.hoffmannbros.com/can-i-flush/sanitary-pads" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Hoffmann Bros — Can I Flush Sanitary Pads</a></li>
                <li><a href="https://www.nlwa.gov.uk/whatcanwerecycle/sanitary-products" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">NLWA — Sanitary Products Recycling</a></li>
                <li><a href="https://thebetterindia.com/237000/sanitary-pads-waste-recycling-ecofriendly-disposal-landfills-burning-ros174/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">The Better India — Sanitary Pads Waste and Recycling</a></li>
                <li><a href="https://www.wwf.org.uk/challenges/sustainable-sanitary-products" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">WWF UK — Sustainable Sanitary Products</a></li>
                <li><a href="https://www.nationalgeographic.com/environment/article/how-tampons-pads-became-unsustainable-story-of-plastic" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">National Geographic — How Tampons and Pads Became Unsustainable</a></li>
                <li><a href="https://www.researchgate.net/publication/361474323_Experimental_Investigation_of_Blood_Mimicking_Fluid_Viscosity_for_Application_in_3D-Printed_Medical_Simulator" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">ResearchGate — Blood Mimicking Fluid Viscosity</a></li>
              </ul>
            </div>
          </div>
        </div>
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
