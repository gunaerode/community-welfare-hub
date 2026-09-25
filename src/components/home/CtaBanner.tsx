import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Icon from "../common/Icon";

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="container-page pb-6">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 px-6 py-10 text-primary-950 shadow-lift sm:px-12 sm:py-12"
      >
        <div className="bg-dots-light absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="absolute -right-16 -bottom-20 h-64 w-64 rounded-full bg-white/20 blur-2xl" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-900 text-accent-300 shadow-lg">
              <Icon name="store" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">{t.ctaBannerTitle}</h2>
              <p className="mt-1 max-w-xl text-sm text-primary-900/80 sm:text-base">{t.ctaBannerText}</p>
            </div>
          </div>
          <Link to="/members/join" className="btn shrink-0 bg-primary-900 px-6 py-3 text-white hover:bg-primary-800">
            <Icon name="userPlus" className="h-5 w-5" />
            {t.navAddDetails}
          </Link>
        </div>
      </div>
    </section>
  );
}
