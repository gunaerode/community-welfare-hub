import type { CSSProperties } from "react";
import { pick, pickList, useLanguage } from "../../context/LanguageContext";
import type { RuleSection } from "../../types/community";
import Icon from "../common/Icon";

interface RulesSectionProps {
  section: RuleSection;
  number: number;
}

export default function RulesSection({ section, number }: RulesSectionProps) {
  const { lang, t } = useLanguage();
  const body = pickList(lang, section.body, section.bodyEn);

  return (
    <article
      id={`rule-card-${section.id}`}
      data-reveal
      style={{ "--reveal-delay": `${(number % 2) * 80}ms` } as CSSProperties}
      className={`relative scroll-mt-28 overflow-hidden rounded-3xl border p-5 sm:p-6 ${
        section.isFuturePlan
          ? "border-accent-300 bg-gradient-to-br from-accent-50 to-white dark:border-accent-800 dark:from-accent-900/30 dark:to-primary-900"
          : "border-primary-100 bg-white shadow-soft dark:border-primary-800 dark:bg-primary-900"
      }`}
      aria-labelledby={`rule-${section.id}`}
    >
      <span
        className="pointer-events-none absolute -top-3 right-3 text-7xl font-black text-primary-50 select-none dark:text-primary-800/60"
        aria-hidden="true"
      >
        {String(number).padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl dark:bg-primary-800"
          aria-hidden="true"
        >
          {section.icon}
        </span>
        <h3 id={`rule-${section.id}`} className="text-base font-bold text-primary-900 sm:text-lg dark:text-white">
          {pick(lang, section.title, section.titleEn)}
        </h3>
      </div>

      <ul className="relative mt-4 flex flex-col gap-2.5">
        {body.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-primary-700 dark:text-primary-200">
            <Icon name="check" className="mt-0.5 h-4 w-4 text-primary-500 dark:text-accent-400" strokeWidth={2.5} />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {section.isFuturePlan && (
        <p className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-200 px-3 py-1 text-xs font-semibold text-accent-900 dark:bg-accent-800 dark:text-accent-100">
          <Icon name="clock" className="h-3.5 w-3.5" />
          {t.futurePlanBadge}
        </p>
      )}
    </article>
  );
}
