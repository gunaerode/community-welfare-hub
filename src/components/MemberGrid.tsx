import type { Member } from "../types/member";
import EmptyState from "./EmptyState";
import MemberCard from "./MemberCard";

interface MemberGridProps {
  members: Member[];
}

export default function MemberGrid({ members }: MemberGridProps) {
  if (members.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="உறுப்பினர்கள் யாரும் கிடைக்கவில்லை"
        message="வேறு தேடல் அல்லது வடிகட்டியை முயற்சிக்கவும்."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
