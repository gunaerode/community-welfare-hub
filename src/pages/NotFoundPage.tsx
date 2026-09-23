import NotFound from "../components/NotFound";
import PageMeta from "../components/PageMeta";
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
