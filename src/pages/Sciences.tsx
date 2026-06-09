import { Link } from 'react-router-dom'
import { subjects } from '../data/sciences'

export default function Sciences() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase">
            Sciences & Methodology
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 mt-1 sm:mt-2 mb-2 sm:mb-3">How We Tested</h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl">
            Each axis represents an independent subject investigation. Physics
            involved hands-on laboratory experiments. Biology, Chemistry, and
            Environmental Science assessments are based on published literature
            review and published scientific studies. Products tested: Always
            Platinum, Ria Ultra Pad, Ria Tampon, o.b. Tampon, Naturella Pad,
            Jessa Cotton Pad, Jessa Cloth Pad.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {subjects.map(({ slug, emoji, label, rq, metric }) => (
            <Link
              key={slug}
              to={`/sciences/${slug}`}
              className="border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-rose-300 transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl">{emoji}</span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-950">{label}</h2>
              </div>
              <p className="text-sm sm:text-base text-rose-500 font-medium italic mb-3 sm:mb-4 leading-snug">{rq}</p>
              <div className="bg-slate-50 rounded-lg px-4 py-2 inline-block">
                <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Key metric: </span>
                <span className="text-xs sm:text-sm text-slate-800">{metric}</span>
              </div>
              <p className="text-sm text-rose-500 font-medium mt-4">Read more →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
