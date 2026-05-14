export default function Sciences() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">Sciences</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Our Four Research Axes</h1>
        <p className="text-slate-500 max-w-2xl">
          Each axis represents an independent subject investigation conducted as part of this study.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { emoji: '🧫', label: 'Biology', to: '/sciences/biology' },
          { emoji: '⚗️', label: 'Chemistry', to: '/sciences/chemistry' },
          { emoji: '📐', label: 'Physics', to: '/sciences/physics' },
          { emoji: '🌱', label: 'Environmental Science', to: '/sciences/environmental' },
        ].map(({ emoji, label, to }) => (
          <a
            key={to}
            href={to}
            className="border border-slate-100 rounded-2xl p-6 hover:border-rose-500 hover:bg-rose-50 transition-colors"
          >
            <span className="text-2xl">{emoji}</span>
            <h2 className="text-lg font-semibold text-slate-900 mt-2">{label}</h2>
          </a>
        ))}
      </div>
    </div>
  )
}