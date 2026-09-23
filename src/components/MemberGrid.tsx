import { useLanguage } from "../context/LanguageContext";
import type { Member } from "../types/member";
import EmptyState from "./EmptyState";
import MemberCard from "./MemberCard";

interface MemberGridProps {
  members: Member[];
}

export default function MemberGrid({ members }: MemberGridProps) {
  const { t } = useLanguage();

  if (members.length === 0) {
    return <EmptyState icon="🔍" title={t.noMembersFoundTitle} message={t.noMembersFoundMessage} />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
