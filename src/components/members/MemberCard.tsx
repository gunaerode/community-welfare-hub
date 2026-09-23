import { Link } from "react-router-dom";
import { pick, useLanguage } from "../../context/LanguageContext";
import type { Member } from "../../types/member";
import AvatarPlaceholder from "../common/AvatarPlaceholder";

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const { lang, t } = useLanguage();
  const category = pick(lang, member.category ?? "", member.categoryEn);
  const location = pick(lang, member.location ?? "", member.locationEn);

  return (
    <Link
      to={`/members/${member.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-primary-800 dark:bg-primary-800"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-primary-50 dark:bg-primary-900">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-base font-bold text-primary-900 dark:text-white">{member.name}</h3>
        {member.businessName && (
          <p className="text-sm font-semibold text-primary-700 dark:text-primary-200">{member.businessName}</p>
        )}
        {category && (
          <span className="mt-1 inline-block w-fit rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-semibold text-accent-700 dark:bg-accent-900 dark:text-accent-200">
            {category}
          </span>
        )}
        {location && (
          <p className="mt-1 flex items-center gap-1 text-xs text-primary-500 dark:text-primary-400">
            <span aria-hidden="true">📍</span> {location}
          </p>
        )}

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 group-hover:text-accent-600 dark:text-primary-200 dark:group-hover:text-accent-400">
          {t.viewProfile}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
