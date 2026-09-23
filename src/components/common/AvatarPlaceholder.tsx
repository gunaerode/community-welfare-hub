interface AvatarPlaceholderProps {
  /** Sizing classes for the outer wrapper, e.g. "h-16 w-16" */
  className?: string;
  /** Sizing classes for the icon itself, e.g. "h-8 w-8" */
  iconClassName?: string;
}

/**
 * Fallback avatar shown when a member has no photo — a soft gradient circle
 * with a clean person-silhouette SVG, used instead of an emoji glyph (which
 * renders inconsistently, and often poorly, across operating systems).
 */
export default function AvatarPlaceholder({ className = "h-full w-full", iconClassName = "h-1/2 w-1/2" }: AvatarPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-primary-400 dark:from-primary-800 dark:to-primary-900 dark:text-primary-500 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconClassName}>
        <path d="M12 12.75c2.9 0 5.25-2.35 5.25-5.25S14.9 2.25 12 2.25 6.75 4.6 6.75 7.5s2.35 5.25 5.25 5.25Zm0 2.25c-3.87 0-9.375 1.94-9.375 5.813V21a1.5 1.5 0 0 0 1.5 1.5h15.75a1.5 1.5 0 0 0 1.5-1.5v-.188C21.375 16.94 15.87 15 12 15Z" />
      </svg>
    </div>
  );
}
