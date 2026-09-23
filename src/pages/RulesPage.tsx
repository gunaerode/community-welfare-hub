import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import RulesSection from "../components/rules/RulesSection";
import { useLanguage } from "../context/LanguageContext";
import { RULES_SECTIONS } from "../data/community";

export default function RulesPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta title={t.rulesPageTitle} description={t.rulesPageSubtitle} />
      <PageHeader icon="📜" title={t.rulesPageTitle} subtitle={t.rulesPageSubtitle} />

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {RULES_SECTIONS.map((section) => (
            <RulesSection key={section.id} section={section} />
          ))}
        </div>
      </section>
    </>
  );
}
