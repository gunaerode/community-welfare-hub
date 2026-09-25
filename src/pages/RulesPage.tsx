import type { CSSProperties } from "react";
import Icon, { type IconName } from "../components/common/Icon";
import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import AssistanceCalculator from "../components/rules/AssistanceCalculator";
import RulesSection from "../components/rules/RulesSection";
import { pick, useLanguage } from "../context/LanguageContext";
import { RULES_SECTIONS } from "../data/community";

export default function RulesPage() {
  const { lang, t } = useLanguage();

  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: "wallet", label: t.factMonthly, value: "₹500" },
    { icon: "calendar", label: t.factCollection, value: t.factCollectionValue },
    { icon: "heartHand", label: t.factLimit, value: t.factLimitValue },
    { icon: "clock", label: t.factInterestFree, value: t.factInterestFreeValue },
  ];

  return (
    <>
      <PageMeta title={t.rulesPageTitle} description={t.rulesPageSubtitle} />
      <PageHeader icon="scroll" title={t.rulesPageTitle} subtitle={t.rulesPageSubtitle} />

      <section className="container-page -mt-8 max-w-5xl" aria-label={t.atAGlance}>
        <div className="relative grid grid-cols-2 gap-3 md:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              className="card flex flex-col gap-2 p-4 sm:p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-800 dark:text-accent-300">
                <Icon name={fact.icon} />
              </span>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-300">{fact.label}</span>
              <span className="text-base font-extrabold text-primary-900 sm:text-lg dark:text-white">{fact.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page max-w-5xl py-10">
        <AssistanceCalculator />
      </section>

      <section className="container-page max-w-5xl pb-12" aria-labelledby="all-rules">
        <div className="flex flex-col gap-4">
          <h2 id="all-rules" className="section-title">
            {t.rulesAllHeading}
          </h2>
          {/* Quick jump chips */}
          <nav aria-label={t.rulesAllHeading} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {RULES_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#rule-card-${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`rule-card-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="shrink-0 rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-primary-50 sm:text-sm whitespace-nowrap text-primary-700 hover:border-primary-400 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-200"
              >
                <span aria-hidden="true">{s.icon}</span> {pick(lang, s.title, s.titleEn)}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {RULES_SECTIONS.map((section, i) => (
            <RulesSection key={section.id} section={section} number={i + 1} />
          ))}
        </div>
      </section>
    </>
  );
}
