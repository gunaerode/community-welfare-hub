import { useState, type ImgHTMLAttributes, type ReactNode } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Rendered instead of a broken-image icon when the photo can't load. */
  fallback?: ReactNode;
}

/** <img> that swaps to a fallback (or nothing) if the URL is broken or offline. */
export default function SafeImage({ fallback = null, onError, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed || !props.src) return <>{fallback}</>;
  return (
    <img
      {...props}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
