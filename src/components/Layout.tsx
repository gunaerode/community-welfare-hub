import { Outlet } from "react-router-dom";
import AnnouncementModal from "./AnnouncementModal";
import Footer from "./Footer";
import Header from "./Header";
import SiteNoticeBanner from "./SiteNoticeBanner";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNoticeBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AnnouncementModal />
    </div>
  );
}
