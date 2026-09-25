import { useParams } from "react-router-dom";
import MemberProfile from "../components/members/MemberProfile";
import NotFound from "../components/common/NotFound";
import PageMeta from "../components/common/PageMeta";
import { pick, useLanguage } from "../context/LanguageContext";
import { useMembers } from "../services/siteData";

export default function MemberProfilePage() {
  const { memberId } = useParams<{ memberId: string }>();
  const { members, status } = useMembers();
  const member = members.find((m) => m.id === memberId);
  const { lang, t } = useLanguage();

  // A server-added member isn't in the built-in list — wait for the server before saying "not found".
  if (!member && status === "loading") {
    return (
      <div className="container-page flex max-w-5xl justify-center py-24" role="status" aria-label="Loading">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-700" />
      </div>
    );
  }

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
