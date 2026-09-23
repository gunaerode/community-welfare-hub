import { Link } from "react-router-dom";
import { SITE } from "../../constants/site";
import { pick, useLanguage } from "../../context/LanguageContext";
import { createGeneralWhatsAppUrl } from "../../utils/whatsapp";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white dark:from-primary-900 dark:via-primary-900 dark:to-primary-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="rounded-full bg-accent-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-700 dark:bg-accent-900 dark:text-accent-200">
          {SITE.nameEnglish}
        </span>

        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-primary-900 dark:text-white sm:text-4xl md:text-5xl">
          {SITE.nameTamil}
        </h1>

        <p className="text-lg font-semibold text-accent-600 dark:text-accent-400 sm:text-xl">
          {pick(lang, SITE.tagline, SITE.taglineEn)}
        </p>

        <p className="max-w-2xl text-base leading-relaxed text-primary-700 dark:text-primary-200 sm:text-lg">
          {pick(lang, SITE.description, SITE.descriptionEn)}
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/members"
            className="rounded-full bg-primary-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary-700/20 transition-transform hover:scale-[1.02] hover:bg-primary-600 sm:text-base"
          >
            {t.heroCtaMembers}
          </Link>
          <Link
            to="/rules"
            className="rounded-full border-2 border-primary-700 px-6 py-3 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-50 dark:text-primary-200 dark:hover:bg-primary-800 sm:text-base"
          >
            {t.heroCtaRules}
          </Link>
          <a
            href={createGeneralWhatsAppUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#25D366]/25 transition-transform hover:scale-[1.02] sm:text-base"
          >
            {t.heroCtaWhatsApp}
          </a>
        </div>
      </div>
    </section>
  );
}
