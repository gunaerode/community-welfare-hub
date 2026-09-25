import { SITE } from "../../constants/site";
import { pick, useLanguage } from "../../context/LanguageContext";
import { COMMUNITY_FEATURES } from "../../data/community";
import CommunityFeatureCard from "./CommunityFeatureCard";

export default function AboutCommunity() {
  const { lang, t } = useLanguage();

  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="about-heading">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <span className="eyebrow">{t.aboutEyebrow}</span>
        <h2 id="about-heading" className="section-title mt-4">
          {t.aboutHeading}
        </h2>
        <p className="section-subtitle">{pick(lang, SITE.aboutParagraph, SITE.aboutParagraphEn)}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMMUNITY_FEATURES.map((feature, index) => (
          <CommunityFeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
