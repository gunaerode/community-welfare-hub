import SafeImage from "./SafeImage";

interface MemberAvatarProps {
  name: string;
  /** Stable seed for the color (member id). */
  seed?: string;
  image?: string;
  className?: string;
  textClassName?: string;
}

const PALETTES = [
  "from-primary-500 to-primary-700",
  "from-accent-400 to-accent-600",
  "from-emerald-500 to-teal-700",
  "from-sky-500 to-indigo-600",
  "from-rose-400 to-pink-600",
  "from-violet-500 to-purple-700",
  "from-orange-400 to-red-500",
];

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** First user-perceived character — keeps Tamil letters with their vowel signs intact (e.g. "லெ"). */
function firstGrapheme(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "?";
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segment = new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(trimmed)[Symbol.iterator]().next();
    if (!segment.done) return segment.value.segment.toUpperCase();
  }
  return trimmed.charAt(0).toUpperCase();
}

/** Member photo, or a colorful initial when there isn't one. */
export default function MemberAvatar({
  name,
  seed,
  image,
  className = "h-12 w-12",
  textClassName = "text-lg",
}: MemberAvatarProps) {
  const palette = PALETTES[hash(seed ?? name) % PALETTES.length];
  const initial = (
    <div
      className={`flex items-center justify-center bg-gradient-to-br font-extrabold text-white ${palette} ${className}`}
      aria-hidden="true"
    >
      <span className={textClassName}>{firstGrapheme(name)}</span>
    </div>
  );
  return image ? (
    <SafeImage src={image} alt={name} loading="lazy" className={`object-cover ${className}`} fallback={initial} />
  ) : (
    initial
  );
}
