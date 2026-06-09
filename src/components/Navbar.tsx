import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { subjects } from "../data/sciences";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/data", label: "Data & Results" },
  { to: "/recommend", label: "Recommendation Tool" },
  { to: "/conclusions", label: "Conclusions" },
  { to: "/about", label: "About Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      {/* Desktop nav */}
      <nav className="max-w-7xl mx-auto px-8 lg:px-16 h-14 hidden lg:flex items-center justify-center">
        <ul className="flex gap-1 flex-wrap items-center">
          {/* Home */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "bg-rose-50 text-rose-600"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
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
                  isActive
                    ? "bg-rose-50 text-rose-600"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                }`
              }
            >
              Sciences
              <svg
                className="w-3 h-3 mt-0.5 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
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
                    isActive
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      <nav className="lg:hidden flex items-center justify-between px-4 h-14">
        <Link to="/" className="text-base font-bold text-slate-950">
          Collaborative Science Project
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <MobileLink
              to="/"
              end
              label="Home"
              onClick={() => setOpen(false)}
            />
            <MobileLink
              to="/sciences"
              label="Sciences"
              onClick={() => setOpen(false)}
            />
            <div className="ml-4 border-l-2 border-slate-100 pl-3 space-y-1">
              <MobileLink
                to="/sciences"
                label="Overview"
                onClick={() => setOpen(false)}
                subtle
              />
              {subjects.map(({ slug, emoji, label }) => (
                <MobileLink
                  key={slug}
                  to={`/sciences/${slug}`}
                  label={`${emoji} ${label}`}
                  onClick={() => setOpen(false)}
                  subtle
                />
              ))}
            </div>
            {links.slice(1).map(({ to, label }) => (
              <MobileLink
                key={to}
                to={to}
                label={label}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  to,
  label,
  end,
  subtle,
  onClick,
}: {
  to: string;
  label: string;
  end?: boolean;
  subtle?: boolean;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
          subtle
            ? isActive
              ? "text-rose-600"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            : isActive
              ? "bg-rose-50 text-rose-600"
              : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
