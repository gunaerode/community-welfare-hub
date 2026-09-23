import { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE, getNavLabel } from "../constants/site";
import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const membersDetailsRef = useRef<HTMLDetailsElement>(null);

  const isMembersSection = location.pathname.startsWith("/members");

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-primary-700 text-white"
        : "text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
    }`;

  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
      isActive
        ? "bg-primary-700 text-white"
        : "text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
    }`;

  const closeMembersDropdown = () => {
    if (membersDetailsRef.current) membersDetailsRef.current.open = false;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/95 backdrop-blur dark:border-primary-800 dark:bg-primary-900/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt={`${SITE.nameTamil} logo`}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-primary-800 dark:text-primary-50 sm:text-base">
              {SITE.nameTamil}
            </span>
            <span className="block text-[11px] font-medium text-accent-600 dark:text-accent-400 sm:text-xs">
              {SITE.nameEnglish}
            </span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <nav aria-label={t.primaryNavLabel} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.to === "/members" ? (
                  <li key={link.to} className="relative">
                    <details ref={membersDetailsRef} className="group">
                      <summary
                        className={`flex cursor-pointer list-none items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors [&::-webkit-details-marker]:hidden ${
                          isMembersSection
                            ? "bg-primary-700 text-white"
                            : "text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
                        }`}
                      >
                        <span aria-hidden="true">{link.icon}</span>
                        {getNavLabel(t, link.to)}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </summary>
                      <div className="absolute left-0 top-full z-10 mt-1 w-52 overflow-hidden rounded-xl border border-primary-100 bg-white py-1 shadow-lg dark:border-primary-700 dark:bg-primary-800">
                        <NavLink
                          to="/members"
                          end
                          onClick={closeMembersDropdown}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
                        >
                          <span aria-hidden="true">👨‍👩‍👧‍👦</span> {t.navViewMembers}
                        </NavLink>
                        <NavLink
                          to="/members/join"
                          onClick={closeMembersDropdown}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
                        >
                          <span aria-hidden="true">📝</span> {t.navAddDetails}
                        </NavLink>
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={link.to}>
                    <NavLink to={link.to} className={linkClasses} end={link.to === "/"}>
                      <span aria-hidden="true">{link.icon}</span>
                      {getNavLabel(t, link.to)}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
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
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label={t.mobileNavLabel}
          className="animate-slide-up border-t border-primary-100 bg-white px-4 py-3 dark:border-primary-800 dark:bg-primary-900 md:hidden"
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
                  {getNavLabel(t, link.to)}
                </NavLink>
                {link.to === "/members" && (
                  <NavLink
                    to="/members/join"
                    className={({ isActive }) =>
                      `ml-6 mt-0.5 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-primary-700 text-white"
                          : "text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-primary-800"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <span aria-hidden="true">📝</span> {t.navAddDetails}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-primary-100 pt-3 dark:border-primary-800">
            <LanguageToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
