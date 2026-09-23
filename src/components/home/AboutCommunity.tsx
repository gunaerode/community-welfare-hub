import { SITE } from "../../constants/site";
import { pick, useLanguage } from "../../context/LanguageContext";
import { COMMUNITY_FEATURES } from "../../data/community";
import CommunityFeatureCard from "./CommunityFeatureCard";

export default function AboutCommunity() {
  const { lang, t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="about-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="about-heading" className="text-2xl font-extrabold text-primary-900 dark:text-white sm:text-3xl">
          {t.aboutHeading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-primary-700 dark:text-primary-200 sm:text-base">
          {pick(lang, SITE.aboutParagraph, SITE.aboutParagraphEn)}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMMUNITY_FEATURES.map((feature) => (
          <CommunityFeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
