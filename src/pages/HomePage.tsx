import PageMeta from "../components/common/PageMeta";
import AboutCommunity from "../components/home/AboutCommunity";
import CtaBanner from "../components/home/CtaBanner";
import FeaturedMembers from "../components/home/FeaturedMembers";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import StatsStrip from "../components/home/StatsStrip";
import { SITE } from "../constants/site";
import { pick, useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <>
      <PageMeta title={SITE.nameTamil} description={pick(lang, SITE.description, SITE.descriptionEn)} />
      <HeroSection />
      <StatsStrip />
      <AboutCommunity />
      <HowItWorks />
      <FeaturedMembers />
      <CtaBanner />
    </>
  );
}
