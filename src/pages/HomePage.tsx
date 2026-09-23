import AboutCommunity from "../components/AboutCommunity";
import HeroSection from "../components/HeroSection";
import PageMeta from "../components/PageMeta";
import { SITE } from "../constants/site";

export default function HomePage() {
  return (
    <>
      <PageMeta title={SITE.nameTamil} description={SITE.description} />
      <HeroSection />
      <AboutCommunity />
    </>
  );
}
