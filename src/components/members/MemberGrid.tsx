import type { ReactNode } from "react";
import { useLanguage } from "../../context/LanguageContext";
import type { Member } from "../../types/member";
import EmptyState from "../common/EmptyState";
import MemberCard from "./MemberCard";

interface MemberGridProps {
  members: Member[];
  emptyAction?: ReactNode;
}

export default function MemberGrid({ members, emptyAction }: MemberGridProps) {
  const { t } = useLanguage();

  if (members.length === 0) {
    return (
      <EmptyState illustration title={t.noMembersFoundTitle} message={t.noMembersFoundMessage} action={emptyAction} />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member, i) => (
        <MemberCard key={member.id} member={member} index={i} />
      ))}
    </div>
  );
}
