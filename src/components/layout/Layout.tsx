import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import AnnouncementModal from "./AnnouncementModal";
import Footer from "./Footer";
import Header from "./Header";
import SiteNoticeBanner from "./SiteNoticeBanner";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  useRevealOnScroll();

  // Hash routing doesn't reset scroll on navigation — start each page at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col print:hidden">
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
        className="sr-only z-[70] rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.skipToContent}
      </a>
      <SiteNoticeBanner />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Re-keyed per route so each page plays the entrance animation on navigation. */}
        <div key={pathname} className="animate-slide-up motion-reduce:animate-none">
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <AnnouncementModal />
    </div>
  );
}
