import NotFound from "../components/common/NotFound";
import PageMeta from "../components/common/PageMeta";
import { useLanguage } from "../context/LanguageContext";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta title={t.notFoundTitle} />
      <NotFound title={t.notFoundTitle} message={t.notFoundMessage} backTo="/" backLabel={t.backHome} />
    </>
  );
}
