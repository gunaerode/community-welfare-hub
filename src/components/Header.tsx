import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS, SITE } from "../constants/site";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-primary-700 text-white"
        : "text-primary-800 hover:bg-primary-50"
    }`;

  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
      isActive ? "bg-primary-700 text-white" : "text-primary-800 hover:bg-primary-50"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt={`${SITE.nameTamil} logo`}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-primary-800 sm:text-base">
              {SITE.nameTamil}
            </span>
            <span className="block text-[11px] font-medium text-accent-600 sm:text-xs">
              {SITE.nameEnglish}
            </span>
          </span>
        </NavLink>

        <nav aria-label="முதன்மை வழிசெலுத்தல்" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClasses} end={link.to === "/"}>
                  <span aria-hidden="true">{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-800 hover:bg-primary-50 md:hidden"
          aria-label={menuOpen ? "மெனுவை மூடு" : "மெனுவை திற"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="மொபைல் வழிசெலுத்தல்"
          className="animate-slide-up border-t border-primary-100 bg-white px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={mobileLinkClasses}
                  end={link.to === "/"}
                  onClick={() => setMenuOpen(false)}
                >
                  <span aria-hidden="true">{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
