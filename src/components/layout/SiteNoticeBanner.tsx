import { useState } from "react";
import { SITE_NOTICE, SITE_NOTICE_STORAGE_KEY } from "../../constants/site";
import { pick, useLanguage } from "../../context/LanguageContext";

function wasDismissed(): boolean {
  if (!SITE_NOTICE.dismissible) return false;
  try {
    return localStorage.getItem(SITE_NOTICE_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Thin "under development" banner pinned above the header on every page.
 * Configure via `SITE_NOTICE` in src/constants/site.ts:
 *  - enabled: master on/off switch
 *  - dismissible: true = shows a close button and remembers the dismissal
 *                 (localStorage); false = always shows, no close button
 */
export default function SiteNoticeBanner() {
  const [dismissed, setDismissed] = useState(wasDismissed);
  const { lang, t } = useLanguage();

  if (!SITE_NOTICE.enabled || (SITE_NOTICE.dismissible && dismissed)) {
    return null;
  }

  const handleDismiss = () => {
    try {
      localStorage.setItem(SITE_NOTICE_STORAGE_KEY, "true");
    } catch {
      /* storage unavailable — dismissal won't persist, which is acceptable */
    }
    setDismissed(true);
  };

  return (
    <div role="status" className="bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-accent-900">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3">
        <span>{pick(lang, SITE_NOTICE.message, SITE_NOTICE.messageEn)}</span>
        {SITE_NOTICE.dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label={t.closeNotice}
            className="shrink-0 rounded-full px-1.5 text-accent-900/70 hover:text-accent-900 focus-visible:text-accent-900"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
