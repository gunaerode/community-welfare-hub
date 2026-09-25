import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useMembers } from "../../services/siteData";
import Icon from "../common/Icon";
import MemberCard from "../members/MemberCard";

/** A peek at the directory on the home page — businesses with photos/shops first. */
export default function FeaturedMembers() {
  const { t } = useLanguage();
  const { members } = useMembers();

  const featured = [...members]
    .sort((a, b) => score(b) - score(a))
    .slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="container-page py-16 sm:py-20">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-end sm:text-left" data-reveal>
        <div>
          <span className="eyebrow">{t.featuredEyebrow}</span>
          <h2 id="featured-heading" className="section-title mt-4">
            {t.featuredHeading}
          </h2>
          <p className="section-subtitle max-w-xl">{t.featuredSubtitle}</p>
        </div>
        <Link to="/members" className="btn-outline shrink-0">
          {t.viewAllMembers}
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} />
        ))}
      </div>
    </section>
  );
}

function score(member: { products?: unknown[]; businessImages?: string[]; image?: string }) {
  return (member.products?.length ? 2 : 0) + (member.businessImages?.length ? 1 : 0) + (member.image ? 1 : 0);
}
