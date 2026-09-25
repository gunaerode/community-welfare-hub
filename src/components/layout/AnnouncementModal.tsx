import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ANNOUNCEMENT_REAPPEAR_DAYS, ANNOUNCEMENT_STORAGE_KEY } from "../../constants/site";
import { pick, pickList, useLanguage } from "../../context/LanguageContext";
import { useSiteContent } from "../../services/siteData";
import Icon from "../common/Icon";

const REAPPEAR_INTERVAL_MS = ANNOUNCEMENT_REAPPEAR_DAYS * 24 * 60 * 60 * 1000;

function readLastShown(): number {
  try {
    return Number(localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

/**
 * Landing announcement shown occasionally (once every `ANNOUNCEMENT_REAPPEAR_DAYS`
 * days per browser) — and, in server mode, again as soon as the admin
 * publishes new announcement content. Default content: `ANNOUNCEMENT` in
 * src/data/community.ts.
 */
export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const decidedRef = useRef(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const { announcement, updatedAt, status } = useSiteContent();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Wait for the server's answer (if any) so we show the latest content only once.
    if (decidedRef.current || status === "loading" || pathname.startsWith("/admin")) return;
    const lastShown = readLastShown();
    const dueByTime = Date.now() - lastShown > REAPPEAR_INTERVAL_MS;
    const updatedSinceShown = updatedAt !== null && Date.parse(updatedAt) > lastShown;
    if (!dueByTime && !updatedSinceShown) {
      decidedRef.current = true;
      return;
    }

    // Small delay so the page paints first — feels less abrupt.
    const timer = window.setTimeout(() => {
      decidedRef.current = true;
      setOpen(true);
      try {
        localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, String(Date.now()));
      } catch {
        /* storage unavailable — announcement may reappear, acceptable */
      }
    }, 600);
    return () => window.clearTimeout(timer);
  }, [status, updatedAt, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const points = pickList(lang, announcement.points, announcement.pointsEn);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-primary-950/60 px-3 pb-3 backdrop-blur-sm animate-fade-in sm:items-center sm:px-4 sm:py-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl animate-slide-up dark:bg-primary-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 px-6 pt-6 pb-5 text-white">
          <div className="bg-dots-light absolute inset-0 opacity-60" aria-hidden="true" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={announcement.secondaryButtonText}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
          <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-primary-950 shadow-lg">
            <Icon name="megaphone" className="h-6 w-6" />
          </span>
          <h2 id="announcement-title" className="relative mt-3 text-xl font-extrabold">
            {pick(lang, announcement.title, announcement.titleEn)}
          </h2>
          <p className="relative mt-1 text-sm text-primary-100">{pick(lang, announcement.intro, announcement.introEn)}</p>
        </div>

        <div className="px-6 pt-5 pb-6">
          <ul className="flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-primary-900 dark:text-primary-100">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-accent-300">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {announcement.note && (
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-xs text-accent-800 dark:bg-accent-900/30 dark:text-accent-200">
              <Icon name="info" className="mt-px h-4 w-4" />
              {pick(lang, announcement.note, announcement.noteEn)}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/rules");
              }}
              className="btn-primary flex-1"
            >
              {pick(lang, announcement.primaryButtonText, announcement.primaryButtonTextEn)}
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => setOpen(false)} className="btn-ghost flex-1">
              {announcement.secondaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
