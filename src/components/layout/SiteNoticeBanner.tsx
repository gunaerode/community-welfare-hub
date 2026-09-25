import { useState } from "react";
import { SITE_NOTICE, SITE_NOTICE_STORAGE_KEY } from "../../constants/site";
import { pick, useLanguage } from "../../context/LanguageContext";
import { useSiteContent } from "../../services/siteData";
import Icon from "../common/Icon";

function readDismissed(): string | null {
  try {
    return localStorage.getItem(SITE_NOTICE_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Thin notice banner pinned above the header on every page.
 * Configure via `SITE_NOTICE` in src/constants/site.ts, or live from the
 * Admin page when server mode is on. A dismissal is remembered per message,
 * so a new notice shows again even if an older one was closed.
 */
export default function SiteNoticeBanner() {
  const { siteNotice } = useSiteContent();
  const [dismissedMessage, setDismissedMessage] = useState(readDismissed);
  const { lang, t } = useLanguage();

  // "true" was the old stored value, which meant "the default notice was dismissed".
  const isDismissed =
    siteNotice.dismissible && (dismissedMessage === siteNotice.message ||
      (dismissedMessage === "true" && siteNotice.message === SITE_NOTICE.message));

  if (!siteNotice.enabled || !siteNotice.message || isDismissed) return null;

  const handleDismiss = () => {
    try {
      localStorage.setItem(SITE_NOTICE_STORAGE_KEY, siteNotice.message);
    } catch {
      /* storage unavailable — dismissal won't persist, which is acceptable */
    }
    setDismissedMessage(siteNotice.message);
  };

  return (
    <div role="status" className="relative bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500 text-primary-950">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-10 py-2 text-center text-xs font-semibold sm:text-sm">
        <Icon name="megaphone" className="hidden h-4 w-4 sm:block" />
        <span>{pick(lang, siteNotice.message, siteNotice.messageEn)}</span>
      </div>
      {siteNotice.dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t.closeNotice}
          className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-primary-950/70 hover:bg-black/10 hover:text-primary-950"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
