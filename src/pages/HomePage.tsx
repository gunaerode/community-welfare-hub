import AboutCommunity from "../components/AboutCommunity";
import HeroSection from "../components/HeroSection";
import PageMeta from "../components/PageMeta";
import { SITE } from "../constants/site";
import { pick, useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <>
      <PageMeta title={SITE.nameTamil} description={pick(lang, SITE.description, SITE.descriptionEn)} />
      <HeroSection />
      <AboutCommunity />
    </>
  );
}
