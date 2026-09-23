import { useLanguage } from "../context/LanguageContext";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

/** Floating WhatsApp button shown globally, bottom-right, for general enquiries. */
export default function WhatsAppButton() {
  const { lang, t } = useLanguage();

  return (
    <a
      href={createGeneralWhatsAppUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingWhatsAppLabel}
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-primary-900/20 transition-transform hover:scale-105 focus-visible:scale-105 sm:h-16 sm:w-16"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 w-7 sm:h-8 sm:w-8"
      >
        <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.386.699 4.61 1.902 6.48L4 29l7.699-1.877A11.94 11.94 0 0 0 16.001 27C22.63 27 28 21.63 28 15.001 28 8.373 22.63 3 16.001 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.363l-.357-.212-4.567 1.113 1.132-4.451-.234-.372a9.77 9.77 0 0 1-1.512-5.532c0-5.415 4.404-9.818 9.818-9.818 5.415 0 9.818 4.403 9.818 9.818 0 5.414-4.403 9.817-9.818 9.817Zm5.392-7.36c-.295-.148-1.744-.86-2.014-.958-.27-.099-.467-.148-.664.148-.197.295-.762.958-.934 1.155-.172.197-.344.222-.639.074-.295-.148-1.245-.459-2.372-1.463-.877-.782-1.47-1.748-1.642-2.043-.172-.295-.018-.454.13-.601.134-.133.295-.345.443-.517.148-.172.197-.295.295-.492.098-.197.05-.369-.025-.517-.074-.148-.664-1.6-.91-2.192-.24-.575-.484-.497-.664-.506l-.566-.01c-.197 0-.517.074-.787.369-.27.295-1.032 1.008-1.032 2.46 0 1.451 1.057 2.853 1.204 3.05.148.197 2.08 3.177 5.04 4.455.704.304 1.253.486 1.681.622.706.225 1.348.193 1.856.117.566-.084 1.744-.713 1.99-1.402.246-.69.246-1.28.172-1.402-.074-.123-.27-.197-.566-.345Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-primary-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 sm:block">
        {t.floatingWhatsAppLabel}
      </span>
    </a>
  );
}
