import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ANNOUNCEMENT_STORAGE_KEY } from "../constants/site";
import { ANNOUNCEMENT } from "../data/community";

/**
 * Landing announcement shown once per browser session.
 * Content is driven entirely by `ANNOUNCEMENT` in src/data/community.ts.
 */
export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const alreadySeen = sessionStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
      if (!alreadySeen) {
        setOpen(true);
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

  const markSeen = () => {
    try {
      sessionStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, "true");
    } catch {
      /* storage unavailable — announcement will show again, which is acceptable */
    }
  };

  const handleClose = () => {
    markSeen();
    setOpen(false);
  };

  const handleViewRules = () => {
    markSeen();
    setOpen(false);
    navigate("/rules");
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/60 px-4 py-6 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-slide-up"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="announcement-title" className="text-xl font-extrabold text-primary-800">
          {ANNOUNCEMENT.title}
        </h2>
        <p className="mt-2 text-sm text-primary-700">{ANNOUNCEMENT.intro}</p>

        <ul className="mt-4 flex flex-col gap-2.5">
          {ANNOUNCEMENT.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-primary-900">
              <span className="mt-0.5 text-accent-500" aria-hidden="true">
                ✔
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs italic text-primary-500">{ANNOUNCEMENT.note}</p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={handleViewRules}
            className="flex-1 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            {ANNOUNCEMENT.primaryButtonText}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-full border border-primary-200 px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
          >
            {ANNOUNCEMENT.secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
