import { useParams } from "react-router-dom";
import MemberProfile from "../components/MemberProfile";
import NotFound from "../components/NotFound";
import PageMeta from "../components/PageMeta";
import { pick, useLanguage } from "../context/LanguageContext";
import { MEMBERS } from "../data/members";

export default function MemberProfilePage() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = MEMBERS.find((m) => m.id === memberId);
  const { lang, t } = useLanguage();

  if (!member) {
    return (
      <>
        <PageMeta title={t.memberNotFoundTitle} />
        <NotFound
          title={t.memberNotFoundTitle}
          message={t.memberNotFoundMessage}
          backTo="/members"
          backLabel={t.backToMembers}
        />
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={member.businessName ? `${member.name} - ${member.businessName}` : member.name}
        description={pick(lang, member.description ?? "", member.descriptionEn)}
      />
      <MemberProfile member={member} />
    </>
  );
}
