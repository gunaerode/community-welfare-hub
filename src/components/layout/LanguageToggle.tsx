import { useLanguage } from "../../context/LanguageContext";

/** Segmented தமிழ் / EN switch. */
export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  const segment = (active: boolean) =>
    `rounded-full px-2.5 py-1 transition-colors ${
      active ? "bg-primary-700 text-white shadow-sm dark:bg-accent-500 dark:text-primary-950" : "text-primary-500 dark:text-primary-300"
    }`;

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === "ta" ? "Switch to English" : "தமிழுக்கு மாற்று"}
      className="flex h-10 shrink-0 items-center gap-0.5 rounded-full border border-primary-200 bg-white/60 p-1 text-xs font-bold transition-colors hover:border-primary-300 dark:border-primary-700 dark:bg-primary-900/60"
    >
      <span className={segment(lang === "ta")}>தமிழ்</span>
      <span className={segment(lang === "en")}>EN</span>
    </button>
  );
}
