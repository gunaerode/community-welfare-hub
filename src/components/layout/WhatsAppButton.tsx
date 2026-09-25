import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { createGeneralWhatsAppUrl } from "../../utils/whatsapp";
import { WhatsAppGlyph } from "../common/Icon";

/** Floating WhatsApp button shown globally, bottom-right, for general enquiries. */
export default function WhatsAppButton() {
  const { lang, t } = useLanguage();
  const { pathname } = useLocation();

  // Keep the admin screen uncluttered.
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={createGeneralWhatsAppUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingWhatsAppLabel}
      className="group fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-primary-950/25 transition-transform animate-pulse-ring hover:scale-105 focus-visible:scale-105 motion-reduce:animate-none sm:right-6 sm:bottom-6 sm:h-16 sm:w-16"
    >
      <WhatsAppGlyph className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-xl bg-primary-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 sm:block">
        {t.floatingWhatsAppLabel}
      </span>
    </a>
  );
}
