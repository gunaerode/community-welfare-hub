import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === "ta" ? "Switch to English" : "தமிழுக்கு மாற்று"}
      className="flex h-9 shrink-0 items-center gap-1 rounded-full border border-primary-200 px-3 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-50 dark:border-primary-700 dark:text-primary-100 dark:hover:bg-primary-800"
    >
      <span className={lang === "ta" ? "text-primary-900 dark:text-white" : "text-primary-400 dark:text-primary-500"}>
        தமிழ்
      </span>
      <span aria-hidden="true" className="text-primary-300 dark:text-primary-600">
        |
      </span>
      <span className={lang === "en" ? "text-primary-900 dark:text-white" : "text-primary-400 dark:text-primary-500"}>
        EN
      </span>
    </button>
  );
}
