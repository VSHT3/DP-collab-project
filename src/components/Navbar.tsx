import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',            label: 'Home' },
  { to: '/sciences',    label: 'Sciences' },
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
        <ul className="flex gap-1 flex-wrap">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
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
