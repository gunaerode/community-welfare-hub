import { SITE } from "../constants/site";
import { COMMUNITY_FEATURES } from "../data/community";
import CommunityFeatureCard from "./CommunityFeatureCard";

export default function AboutCommunity() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="about-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="about-heading" className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
          எங்கள் சமூகம் பற்றி
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-primary-700 sm:text-base">
          <strong>{SITE.nameTamil}</strong> என்பது உறவினர்களிடையே ஒற்றுமை, நிதி உதவி, அவசர
          ஆதரவு, கல்வி மற்றும் மருத்துவ உதவி, சமூக வளர்ச்சி மற்றும் பரஸ்பர உதவியை
          ஊக்குவிக்கும் நோக்கில் உருவாக்கப்பட்ட ஒரு சமூக முன்முயற்சி.
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
