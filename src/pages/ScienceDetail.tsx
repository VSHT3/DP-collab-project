import { useParams, Link } from 'react-router-dom'
import { subjects } from '../data/sciences'
import BiologyDetail from './BiologyDetail'

export default function ScienceDetail() {
  const { slug } = useParams<{ slug: string }>()

  if (slug === 'biology') {
    return <BiologyDetail />
  }

  const subject = subjects.find(s => s.slug === slug)

  if (!subject) {
    return (
      <div className="px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-700">Subject not found.</p>
          <Link to="/sciences" className="text-rose-500 hover:underline mt-4 inline-block">← Back to Sciences</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/sciences"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-rose-500 transition-colors mb-8"
        >
          ← Sciences
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{subject.emoji}</span>
            <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">Sciences & Methodology</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-950 mb-3">{subject.label}</h1>
          <p className="text-lg text-rose-500 font-medium italic max-w-3xl">{subject.rq}</p>
        </div>

        <div className="space-y-8">
          <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Procedure</h2>
            <ol className="list-decimal list-inside space-y-2 text-base text-slate-700">
              {subject.methodology.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Key Metric</h2>
            <p className="text-base text-slate-800">{subject.metric}</p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Details</h2>
            <p className="text-base text-slate-700 leading-relaxed">{subject.details}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
