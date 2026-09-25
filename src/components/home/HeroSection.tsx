import { Link } from "react-router-dom";
import { SITE } from "../../constants/site";
import { pick, useLanguage } from "../../context/LanguageContext";
import { createGeneralWhatsAppUrl } from "../../utils/whatsapp";
import Icon, { WhatsAppGlyph } from "../common/Icon";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-[#f7faf8] dark:from-primary-900 dark:via-primary-950 dark:to-primary-950">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-200/50 blur-3xl dark:bg-primary-700/30" aria-hidden="true" />
      <div className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-accent-200/60 blur-3xl dark:bg-accent-700/20" aria-hidden="true" />

      <div className="relative container-page grid items-center gap-10 pt-10 pb-24 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:pb-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="eyebrow">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            {t.heroTrustLine}
          </span>

          <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-primary-950 sm:text-4xl lg:text-5xl dark:text-white">
            {SITE.nameTamil}
          </h1>

          <p className="mt-4 bg-gradient-to-r from-accent-600 to-accent-500 bg-clip-text text-lg font-bold text-transparent sm:text-xl dark:from-accent-300 dark:to-accent-500">
            {pick(lang, SITE.tagline, SITE.taglineEn)}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-700 sm:text-lg dark:text-primary-200">
            {pick(lang, SITE.description, SITE.descriptionEn)}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <Link to="/members" className="btn-primary py-3">
              <Icon name="users" className="h-5 w-5" />
              {t.heroCtaMembers}
            </Link>
            <a href={createGeneralWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-3">
              <WhatsAppGlyph />
              {t.heroCtaWhatsApp}
            </a>
            <Link to="/rules" className="btn-ghost py-3">
              {t.heroCtaRules}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-sm sm:block">
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary-600 to-primary-900 opacity-10 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-square rounded-full border border-primary-100 bg-white/70 p-6 shadow-lift backdrop-blur dark:border-primary-800 dark:bg-primary-900/60">
            <div className="h-full w-full rounded-full border-2 border-dashed border-accent-300/70 p-4 dark:border-accent-700/60">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt={`${SITE.nameTamil} logo`}
                width={512}
                height={512}
                className="h-full w-full rounded-full object-cover shadow-md"
              />
            </div>
          </div>

          <div className="absolute top-8 -left-6 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-lift animate-float motion-reduce:animate-none dark:bg-primary-800">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-accent-300">
              <Icon name="calendar" className="h-5 w-5" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-extrabold text-primary-900 dark:text-white">₹500</span>
              <span className="block text-[11px] text-primary-500 dark:text-primary-300">{t.heroStatMonthly}</span>
            </span>
          </div>

          <div className="absolute -right-4 bottom-10 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-lift animate-float [animation-delay:1.5s] motion-reduce:animate-none dark:bg-primary-800">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-100 text-accent-700 dark:bg-accent-900/60 dark:text-accent-300">
              <Icon name="heartHand" className="h-5 w-5" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-extrabold text-primary-900 dark:text-white">₹5000</span>
              <span className="block text-[11px] text-primary-500 dark:text-primary-300">{t.heroStatMaxHelp}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
