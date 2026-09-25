import { useEffect, useState } from "react";
import Icon from "../common/Icon";
import SafeImage from "../common/SafeImage";

interface PhotoGalleryProps {
  images: string[];
  alt: string;
}

/** Thumbnail grid with a keyboard-friendly lightbox. */
export default function PhotoGallery({ images, alt }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800"
          >
            <SafeImage
              src={src}
              alt={`${alt} ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              fallback={
                <span className="flex h-full w-full items-center justify-center text-primary-300">
                  <Icon name="image" className="h-10 w-10" />
                </span>
              }
            />
            <span className="absolute inset-0 flex items-center justify-center bg-primary-950/0 text-white opacity-0 transition-all group-hover:bg-primary-950/30 group-hover:opacity-100">
              <Icon name="search" className="h-6 w-6" />
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 animate-fade-in"
          onClick={() => setOpenIndex(null)}
        >
          <img
            src={images[openIndex]}
            alt={`${alt} ${openIndex + 1}`}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setOpenIndex(null)}
          >
            <Icon name="x" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((openIndex - 1 + images.length) % images.length);
                }}
              >
                <Icon name="arrowLeft" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((openIndex + 1) % images.length);
                }}
              >
                <Icon name="arrowRight" />
              </button>
              <p className="absolute bottom-5 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                {openIndex + 1} / {images.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
