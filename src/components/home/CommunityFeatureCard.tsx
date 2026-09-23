import { pick, useLanguage } from "../../context/LanguageContext";
import type { CommunityFeature } from "../../types/community";

interface CommunityFeatureCardProps {
  feature: CommunityFeature;
}

export default function CommunityFeatureCard({ feature }: CommunityFeatureCardProps) {
  const { lang } = useLanguage();

  return (
    <div className="group flex flex-col items-start gap-3 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-primary-800 dark:bg-primary-800">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent-100 dark:bg-primary-900 dark:group-hover:bg-accent-900"
        aria-hidden="true"
      >
        {feature.icon}
      </span>
      <h3 className="text-base font-bold text-primary-900 dark:text-white">
        {pick(lang, feature.title, feature.titleEn)}
      </h3>
      <p className="text-sm leading-relaxed text-primary-700 dark:text-primary-200">
        {pick(lang, feature.description, feature.descriptionEn)}
      </p>
    </div>
  );
}
