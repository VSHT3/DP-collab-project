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

        {/* QR Code */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
            <p className="text-sm font-semibold text-slate-700 mb-3">Scan to visit</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://dp-collab-project.vercel.app/`}
              alt="QR code to project site"
              className="w-60 h-60 sm:w-72 sm:h-72 mx-auto"
            />
            <p className="text-xs text-slate-500 mt-2">dp-collab-project.vercel.app</p>
          </div>
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
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="border-t border-slate-100 pt-4 sm:pt-6">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Web Sources</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700">
                <li><a href="https://www.fda.gov/media/189362/download" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">FDA (2025). Menstrual Products — Performance Testing and Labeling Recommendations. Draft Guidance.</a></li>
                <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10847380/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">DeLoughery, E. et al. (2024). Red blood cell capacity of modern menstrual products. BMJ Sexual &amp; Reproductive Health, 50(1), 21–26.</a></li>
                <li><a href="https://www.scientificamerican.com/article/no-one-studied-menstrual-product-absorbency-realistically-until-now/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Samuelson Bannow, B. (2023). No One Studied Menstrual Product Absorbency Realistically until Now. Scientific American.</a></li>
                <li><a href="https://www.sciencedirect.com/science/article/pii/S2405665021000068" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Marcelis, Q. et al. (2021). Development and application of a novel method to assess exposure levels. Emerging Contaminants, 7, 116–123.</a></li>
                <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11968503/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Mirzaie, A. et al. (2025). Toward eco-friendly menstrual products: a comparative LCA. Environ Sci Pollut Res Int, 32(14), 9050–9067.</a></li>
                <li><a href="https://www.sciencedirect.com/science/article/pii/S2352186425007217" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Paul, S.C. et al. (2026). Exploring biodegradable fibers as sustainable alternatives. Environmental Technology &amp; Innovation, 41, 104735.</a></li>
                <li><a href="https://www.researchgate.net/publication/367640489" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Brunsek, R. et al. (2023). Biodegradation properties of natural fibers for agro textile nonwovens.</a></li>
                <li>Schlievert, P.M. &amp; Blomster, D.A. (1983). Production of staphylococcal pyrogenic exotoxin by the tampon sac method. Journal of Infectious Diseases.</li>
                <li>Reiser, R.F. et al. (1987). Influence of tampon composition on the production of toxic shock syndrome toxin-1. Infection and Immunity.</li>
                <li>Owen, D.H. &amp; Katz, D.F. (1999). A vaginal fluid simulant. Contraception, 59(2), 91–95.</li>
                <li><a href="https://www.eppendorf.com/us-en/lab-academy/life-science/microbiology/how-to-quantify-bacterial-cultures/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Eppendorf (2024). How to quantify bacterial cultures.</a></li>
                <li>21 CFR 801.430 — US Code of Federal Regulations: Tampon labeling requirements and Syngyna testing specification.</li>
                <li><a href="https://www.brookings.edu/articles/period-products-health-risks-and-regulations/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">McClure, S.M. (2024). Period products, health risks, and regulations. Brookings Institution.</a></li>
                <li><a href="https://doi.org/10.1016/j.envint.2024.108849" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Shearston, J. et al. (2024). Detection of metals in tampons. Environment International, 108849.</a></li>
                <li><a href="https://www.colorado.edu/asmagazine/2026/02/20/menstrual-pads-and-tampons-can-contain-toxic-substances" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Shearston, J. (2026). Menstrual pads and tampons can contain toxic substances. Colorado Arts and Sciences Magazine.</a></li>
                <li><a href="https://www.cnn.com/2025/07/22/health/toxins-reusable-menstrual-products-wellness" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">LaMotte, S. (2025). Very high levels of toxic chemicals found in eco-friendly menstrual products. CNN.</a></li>
                <li><a href="https://dx.doi.org/10.1021/acs.estlett.5c00553" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Wicks, A., Peaslee, G. et al. (2025). PFAS in Reusable Feminine Hygiene Products. EST Letters.</a></li>
                <li><a href="https://helloclue.com/articles/cycle-a-z/toxic-shock-syndrome-and-menstrual-products-a-short-history" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Clue (2024). Toxic Shock Syndrome (TSS) and menstrual products: a short history.</a></li>
                <li><a href="https://www.healthline.com/health/menstrual-cup-dangers" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Nall, R. (2022). Are Menstrual Cups Dangerous? Healthline.</a></li>
                <li><a href="https://www.acs.org/pressroom/presspacs/2025/august/research-update-pfas-found-in-several-reusable-period-products.html" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">American Chemical Society (2025). Research Update: PFAS found in several reusable period products.</a></li>
                <li><a href="https://www.bahp.com/all-news/fda-literature-review-on-july-2024-tampon-study-no-safety-concerns-found" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">BAHP (2024). FDA Literature Review on July 2024 Tampon Study.</a></li>
                <li><a href="https://www.brighamandwomens.org/cancer/every-day-feminine-products-and-their-link-to-cancer" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Brigham and Women&apos;s Hospital. Everyday Feminine Products: What&apos;s Safe, What&apos;s Hype.</a></li>
                <li><a href="https://www.safecosmetics.org/resources/health-science/menstrual-care-products/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Safe Cosmetics (2024). Menstrual Care Products &amp; Toxic Chemicals.</a></li>
                <li><a href="https://publichealth.berkeley.edu/articles/spotlight/research/first-study-to-measure-toxic-metals-in-tampons-shows-arsenic-and-lead" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">UC Berkeley Public Health (2024). First study to measure toxic metals in tampons shows arsenic and lead.</a></li>
                <li><a href="https://news.nd.edu/news/researchers-at-notre-dame-detect-forever-chemicals-in-reusable-feminine-hygiene-products/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">University of Notre Dame (2025). Researchers detect &apos;forever chemicals&apos; in reusable feminine hygiene products.</a></li>
                <li><a href="https://www.dw.com/en/hazardous-forever-chemicals-found-in-period-products/a-73418252" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">DW (2025). Hazardous &apos;forever chemicals&apos; found in period products.</a></li>
                <li><a href="https://oneill.indiana.edu/news/2025-0721-forever-chemicals.html" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Indiana University O&apos;Neill School (2025). Study finds &apos;forever chemicals&apos; in reusable feminine hygiene products.</a></li>
                <li><a href="https://hsph.harvard.edu/research/apple-womens-health-study/study-updates/menstrual-hygiene-products-pads-and-tampons-are-the-go-to-choice/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Harvard Apple Women&apos;s Health Study — Menstrual Hygiene Products.</a></li>
                <li><a href="https://www.businesswaste.co.uk/waste-facts/sanitary-waste-facts/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">BusinessWaste — Sanitary Waste Facts.</a></li>
                <li><a href="https://m.statisticstimes.com/demographics/world-sex-ratio.php" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Statistics Times — World Sex Ratio.</a></li>
                <li><a href="https://www.sciencedirect.com/science/article/pii/S2666789422000277" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">ScienceDirect — Menstrual Product Waste Review.</a></li>
                <li><a href="https://www.hoffmannbros.com/can-i-flush/sanitary-pads" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">Hoffmann Bros — Can I Flush Sanitary Pads.</a></li>
                <li><a href="https://www.nlwa.gov.uk/whatcanwerecycle/sanitary-products" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">NLWA — Sanitary Products Recycling.</a></li>
                <li><a href="https://thebetterindia.com/237000/sanitary-pads-waste-recycling-ecofriendly-disposal-landfills-burning-ros174/" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">The Better India — Sanitary Pads Waste and Recycling.</a></li>
                <li><a href="https://www.wwf.org.uk/challenges/sustainable-sanitary-products" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">WWF UK — Sustainable Sanitary Products.</a></li>
                <li><a href="https://www.nationalgeographic.com/environment/article/how-tampons-pads-became-unsustainable-story-of-plastic" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">National Geographic — How Tampons and Pads Became Unsustainable.</a></li>
                <li><a href="https://www.researchgate.net/publication/361474323_Experimental_Investigation_of_Blood_Mimicking_Fluid_Viscosity_for_Application_in_3D-Printed_Medical_Simulator" className="text-rose-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">ResearchGate — Blood Mimicking Fluid Viscosity.</a></li>
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
