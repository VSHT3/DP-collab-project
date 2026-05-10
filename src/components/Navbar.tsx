import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',               label: 'Home' },
  { to: '/methodology',    label: 'Methodology' },
  { to: '/data',           label: 'Data & Results' },
  { to: '/recommend',      label: 'Find My Product' },
  { to: '/conclusions',    label: 'Conclusions' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-rose-500 tracking-tight">
          MenstrualProduct<span className="text-slate-800">Study</span>
        </span>
        <ul className="flex gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
