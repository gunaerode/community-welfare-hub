import { pick, pickList, useLanguage } from "../context/LanguageContext";
import type { RuleSection } from "../types/community";

interface RulesSectionProps {
  section: RuleSection;
}

export default function RulesSection({ section }: RulesSectionProps) {
  const { lang, t } = useLanguage();
  const body = pickList(lang, section.body, section.bodyEn);

  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${
        section.isFuturePlan
          ? "border-accent-200 bg-accent-50 dark:border-accent-800 dark:bg-accent-900/30"
          : "border-primary-100 bg-white dark:border-primary-800 dark:bg-primary-800"
      }`}
      aria-labelledby={`rule-${section.id}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {section.icon}
        </span>
        <h3 id={`rule-${section.id}`} className="text-base font-bold text-primary-900 dark:text-white sm:text-lg">
          {pick(lang, section.title, section.titleEn)}
        </h3>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {body.map((line) => (
          <li
            key={line}
            className="flex items-start gap-2 text-sm leading-relaxed text-primary-700 dark:text-primary-200"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" aria-hidden="true" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {section.isFuturePlan && (
        <p className="mt-3 inline-block rounded-full bg-accent-200 px-3 py-1 text-xs font-semibold text-accent-800 dark:bg-accent-800 dark:text-accent-100">
          {t.futurePlanBadge}
        </p>
      )}
    </article>
  );
}
