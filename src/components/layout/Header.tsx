import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE, getNavLabel } from "../../constants/site";
import { useLanguage } from "../../context/LanguageContext";
import { createGeneralWhatsAppUrl } from "../../utils/whatsapp";
import Icon, { WhatsAppGlyph } from "../common/Icon";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, t } = useLanguage();
  const location = useLocation();
  const membersDetailsRef = useRef<HTMLDetailsElement>(null);

  const isMembersSection = location.pathname.startsWith("/members");

  // Close the mobile menu whenever the route changes (adjusting state during render).
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMenuOpen(false);
  }

  const closeMembersDropdown = () => {
    if (membersDetailsRef.current) membersDetailsRef.current.open = false;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const details = membersDetailsRef.current;
      if (details?.open && !details.contains(event.target as Node)) details.open = false;
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMembersDropdown();
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const pill = (active: boolean) =>
    `relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors lg:px-4 ${
      active
        ? "bg-primary-700 text-white shadow-sm shadow-primary-700/30"
        : "text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
    }`;

  const mobileLink = (active: boolean) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors ${
      active
        ? "bg-primary-700 text-white"
        : "text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-shadow ${
        scrolled
          ? "border-primary-100 bg-white/90 shadow-soft dark:border-primary-800 dark:bg-primary-950/90"
          : "border-transparent bg-white/70 dark:bg-primary-950/70"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover shadow-md ring-2 ring-white transition-transform group-hover:rotate-[-6deg] dark:ring-primary-800"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-extrabold text-primary-900 sm:text-[15px] dark:text-primary-50">
              {SITE.nameTamil}
            </span>
            <span className="block truncate text-[11px] font-semibold text-accent-700 sm:text-xs dark:text-accent-400">
              {SITE.nameEnglish}
            </span>
          </span>
        </Link>

        <nav aria-label={t.primaryNavLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.to === "/members" ? (
                <li key={link.to} className="relative">
                  <details ref={membersDetailsRef} className="group">
                    <summary
                      className={`${pill(isMembersSection)} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
                    >
                      <Icon name={link.icon} className="h-4 w-4" />
                      {getNavLabel(t, link.to)}
                      <Icon name="chevronDown" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="absolute left-0 top-full z-10 mt-2 w-60 overflow-hidden rounded-2xl border border-primary-100 bg-white p-1.5 shadow-lift animate-slide-up dark:border-primary-700 dark:bg-primary-900">
                      <NavLink
                        to="/members"
                        end
                        onClick={closeMembersDropdown}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-800 dark:text-primary-200">
                          <Icon name="users" className="h-4 w-4" />
                        </span>
                        {t.navViewMembers}
                      </NavLink>
                      <NavLink
                        to="/members/join"
                        onClick={closeMembersDropdown}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-100 text-accent-700 dark:bg-accent-900/60 dark:text-accent-300">
                          <Icon name="userPlus" className="h-4 w-4" />
                        </span>
                        {t.navAddDetails}
                      </NavLink>
                    </div>
                  </details>
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === "/"} className={({ isActive }) => pill(isActive)}>
                    <Icon name={link.icon} className="h-4 w-4" />
                    {getNavLabel(t, link.to)}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-1.5 md:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <Link to="/members/join" className="btn-accent btn-sm hidden lg:inline-flex">
            <Icon name="userPlus" className="h-4 w-4" />
            {t.navAddDetails}
          </Link>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-primary-800 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? "x" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label={t.mobileNavLabel}
          className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-primary-100 bg-white px-4 pt-3 pb-5 animate-slide-up md:hidden dark:border-primary-800 dark:bg-primary-950"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={({ isActive }) => mobileLink(isActive)}>
                  <Icon name={link.icon} />
                  {getNavLabel(t, link.to)}
                </NavLink>
                {link.to === "/members" && (
                  <NavLink
                    to="/members/join"
                    className={({ isActive }) =>
                      `ml-7 mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-primary-700 text-white"
                          : "text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-primary-800"
                      }`
                    }
                  >
                    <Icon name="userPlus" className="h-4 w-4" /> {t.navAddDetails}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-primary-100 pt-4 dark:border-primary-800">
            <a href={createGeneralWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <WhatsAppGlyph /> {t.heroCtaWhatsApp}
            </a>
            <div className="flex items-center justify-center">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
