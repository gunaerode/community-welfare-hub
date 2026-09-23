import { useParams } from "react-router-dom";
import MemberProfile from "../components/MemberProfile";
import NotFound from "../components/NotFound";
import PageMeta from "../components/PageMeta";
import { MEMBERS } from "../data/members";

export default function MemberProfilePage() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = MEMBERS.find((m) => m.id === memberId);

  if (!member) {
    return (
      <>
        <PageMeta title="உறுப்பினர் கிடைக்கவில்லை" />
        <NotFound
          title="உறுப்பினர் கிடைக்கவில்லை"
          message="நீங்கள் தேடும் உறுப்பினர் சுயவிவரம் இல்லை அல்லது நீக்கப்பட்டிருக்கலாம்."
          backTo="/members"
          backLabel="உறுப்பினர்கள் பட்டியலுக்கு திரும்பு"
        />
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={member.businessName ? `${member.name} - ${member.businessName}` : member.name}
        description={member.description}
      />
      <MemberProfile member={member} />
    </>
  );
}
