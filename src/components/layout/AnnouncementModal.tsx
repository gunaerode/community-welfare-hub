import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ANNOUNCEMENT_REAPPEAR_DAYS, ANNOUNCEMENT_STORAGE_KEY } from "../../constants/site";
import { pick, pickList, useLanguage } from "../../context/LanguageContext";
import { ANNOUNCEMENT } from "../../data/community";

const REAPPEAR_INTERVAL_MS = ANNOUNCEMENT_REAPPEAR_DAYS * 24 * 60 * 60 * 1000;

/**
 * Landing announcement shown occasionally (once every `ANNOUNCEMENT_REAPPEAR_DAYS`
 * days per browser), not on every page load/refresh. Content is driven entirely
 * by `ANNOUNCEMENT` in src/data/community.ts.
 */
export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  useEffect(() => {
    try {
      const lastShown = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
      const dueToShow = !lastShown || Date.now() - Number(lastShown) > REAPPEAR_INTERVAL_MS;
      if (dueToShow) {
        setOpen(true);
        // Mark as shown immediately so a refresh before closing doesn't re-trigger it.
        localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, String(Date.now()));
      }
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewRules = () => {
    setOpen(false);
    navigate("/rules");
  };

  if (!open) return null;

  const points = pickList(lang, ANNOUNCEMENT.points, ANNOUNCEMENT.pointsEn);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/60 px-4 py-6 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-slide-up dark:bg-primary-800"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="announcement-title" className="text-xl font-extrabold text-primary-800 dark:text-white">
          {pick(lang, ANNOUNCEMENT.title, ANNOUNCEMENT.titleEn)}
        </h2>
        <p className="mt-2 text-sm text-primary-700 dark:text-primary-200">
          {pick(lang, ANNOUNCEMENT.intro, ANNOUNCEMENT.introEn)}
        </p>

        <ul className="mt-4 flex flex-col gap-2.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-primary-900 dark:text-primary-100">
              <span className="mt-0.5 text-accent-500" aria-hidden="true">
                ✔
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs italic text-primary-500 dark:text-primary-400">
          {pick(lang, ANNOUNCEMENT.note, ANNOUNCEMENT.noteEn)}
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={handleViewRules}
            className="flex-1 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            {pick(lang, ANNOUNCEMENT.primaryButtonText, ANNOUNCEMENT.primaryButtonTextEn)}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-full border border-primary-200 px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 dark:border-primary-600 dark:text-primary-100 dark:hover:bg-primary-700"
          >
            {ANNOUNCEMENT.secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
