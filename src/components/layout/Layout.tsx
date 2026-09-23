import { Outlet, useLocation } from "react-router-dom";
import AnnouncementModal from "./AnnouncementModal";
import Footer from "./Footer";
import Header from "./Header";
import SiteNoticeBanner from "./SiteNoticeBanner";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col print:hidden">
      <SiteNoticeBanner />
      <Header />
      <main className="flex-1">
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
