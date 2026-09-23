import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { UI_TEXT, type Language, type UiStrings } from "../i18n/translations";

export type { Language };

const LANGUAGE_STORAGE_KEY = "cvs-language";

interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  t: UiStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "ta" || stored === "en") return stored;
  } catch {
    /* storage unavailable — fall back to default */
  }
  return "ta";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — language choice won't persist, which is acceptable */
    }
  }, [lang]);

  const toggleLang = () => setLang((current) => (current === "ta" ? "en" : "ta"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: UI_TEXT[lang] }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}

/** Picks the localized value for a data field with an optional English companion, e.g. `pick(lang, item.title, item.titleEn)`. */
export function pick(lang: Language, ta: string, en?: string): string {
  return lang === "en" && en ? en : ta;
}

/** Same as `pick`, for optional string array fields (e.g. services, rule body lines). */
export function pickList(lang: Language, ta: string[], en?: string[]): string[] {
  return lang === "en" && en && en.length > 0 ? en : ta;
}
