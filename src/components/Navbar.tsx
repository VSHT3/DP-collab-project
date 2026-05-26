import { NavLink, Link } from 'react-router-dom'
import { subjects } from '../data/sciences'

const links = [
  { to: '/',            label: 'Home' },
  { to: '/products',    label: 'Products' },
  { to: '/data',        label: 'Data & Results' },
  { to: '/recommend',   label: 'Recommendation Tool' },
  { to: '/conclusions', label: 'Conclusions' },
  { to: '/about',       label: 'About Us' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-8 lg:px-16 h-14 flex items-center justify-center">
        <ul className="flex gap-1 flex-wrap items-center">

          {/* Home */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                  isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>
          </li>

          {/* Sciences dropdown */}
          <li className="relative group">
            <NavLink
              to="/sciences"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-base font-medium transition-colors flex items-center gap-1 ${
                  isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`
              }
            >
              Sciences
              <svg className="w-3 h-3 mt-0.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </NavLink>

            {/* Dropdown panel */}
            <div className="absolute top-full left-0 pt-1 hidden group-hover:block">
              <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[180px]">
                <Link
                  to="/sciences"
                  className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  Overview
                </Link>
                <div className="border-t border-slate-100 my-1" />
                {subjects.map(({ slug, emoji, label }) => (
                  <Link
                    key={slug}
                    to={`/sciences/${slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    <span>{emoji}</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* Remaining links */}
          {links.slice(1).map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                    isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
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
