import { Link } from "react-router-dom";
import type { Member } from "../types/member";

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <Link
      to={`/members/${member.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-primary-50">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl" aria-hidden="true">
            👤
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-base font-bold text-primary-900">{member.name}</h3>
        {member.businessName && (
          <p className="text-sm font-semibold text-primary-700">{member.businessName}</p>
        )}
        {member.category && (
          <span className="mt-1 inline-block w-fit rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-semibold text-accent-700">
            {member.category}
          </span>
        )}
        {member.location && (
          <p className="mt-1 flex items-center gap-1 text-xs text-primary-500">
            <span aria-hidden="true">📍</span> {member.location}
          </p>
        )}

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 group-hover:text-accent-600">
          Profile பார்க்க
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
