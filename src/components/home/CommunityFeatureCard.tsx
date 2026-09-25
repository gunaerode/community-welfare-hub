import type { CSSProperties } from "react";
import { pick, useLanguage } from "../../context/LanguageContext";
import type { CommunityFeature } from "../../types/community";

interface CommunityFeatureCardProps {
  feature: CommunityFeature;
  index?: number;
}

/** Rotating soft tints so the grid feels lively without being noisy. */
const TINTS = [
  "from-primary-100 to-primary-50 dark:from-primary-800 dark:to-primary-900",
  "from-accent-100 to-accent-50 dark:from-accent-900/60 dark:to-primary-900",
  "from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-primary-900",
  "from-sky-100 to-sky-50 dark:from-sky-900/40 dark:to-primary-900",
  "from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-primary-900",
  "from-lime-100 to-lime-50 dark:from-lime-900/40 dark:to-primary-900",
];

export default function CommunityFeatureCard({ feature, index = 0 }: CommunityFeatureCardProps) {
  const { lang } = useLanguage();

  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
      className="card card-hover group relative flex items-start gap-4 overflow-hidden p-5 sm:flex-col sm:gap-3 sm:p-6"
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center sm:h-14 sm:w-14 justify-center rounded-2xl bg-gradient-to-br text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${TINTS[index % TINTS.length]}`}
        aria-hidden="true"
      >
        {feature.icon}
      </span>
      <div className="relative z-10 min-w-0">
        <h3 className="text-base font-bold text-primary-900 sm:mt-1 sm:text-lg dark:text-white">
          {pick(lang, feature.title, feature.titleEn)}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-primary-700 sm:mt-2 dark:text-primary-200">
          {pick(lang, feature.description, feature.descriptionEn)}
        </p>
      </div>
      <span
        className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-primary-800/60"
        aria-hidden="true"
      />
    </div>
  );
}
