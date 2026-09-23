interface SearchIllustrationProps {
  className?: string;
}

/**
 * A small original flat-style illustration (in the spirit of unDraw's
 * character illustrations) used for "nothing found" states — 404, member
 * not found, empty search results — instead of a plain emoji.
 */
export default function SearchIllustration({ className = "h-40 w-40" }: SearchIllustrationProps) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true">
      <ellipse cx="100" cy="152" rx="65" ry="9" fill="#d3ebe3" opacity="0.6" />

      {/* legs */}
      <rect x="76" y="118" width="14" height="34" rx="7" fill="#124337" />
      <rect x="98" y="118" width="14" height="34" rx="7" fill="#124337" />

      {/* body */}
      <rect x="66" y="66" width="52" height="58" rx="18" fill="#1c6656" />

      {/* head */}
      <circle cx="92" cy="46" r="20" fill="#f2c9a0" />
      <path d="M73 42c2-14 15-22 27-18 10 3 15 12 14 20-3-6-9-9-16-9-11 0-19 3-25 7Z" fill="#3a2317" />

      {/* far arm */}
      <path
        d="M108 82c14-2 24-10 30-22"
        stroke="#1c6656"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* magnifying glass */}
      <circle cx="146" cy="52" r="22" fill="#fdf8ec" stroke="#d4af37" strokeWidth="8" />
      <line x1="162" y1="68" x2="177" y2="83" stroke="#d4af37" strokeWidth="9" strokeLinecap="round" />
      <text x="146" y="60" fontSize="22" fontWeight="700" textAnchor="middle" fill="#b3821f">
        ?
      </text>

      {/* near arm */}
      <path
        d="M78 84c-10 4-16 12-18 24"
        stroke="#1c6656"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
