import { Link } from "react-router-dom";
import { SERVER_ENABLED } from "../../config/runtime";
import { NAV_LINKS, SITE, getNavLabel } from "../../constants/site";
import { pick, useLanguage } from "../../context/LanguageContext";
import { ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN } from "../../data/community";
import { createGeneralWhatsAppUrl } from "../../utils/whatsapp";
import Icon, { WhatsAppGlyph } from "../common/Icon";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang, t } = useLanguage();

  return (
    <footer className="relative mt-10 overflow-hidden bg-primary-950 text-primary-100">
      <div className="bg-dots-light absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container-page py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 rounded-full ring-2 ring-accent-500/60"
              />
              <div>
                <h2 className="text-base font-extrabold text-white">{SITE.nameTamil}</h2>
                <p className="text-xs font-semibold text-accent-400">{SITE.nameEnglish}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-200">
              {pick(lang, SITE.description, SITE.descriptionEn)}
            </p>
            <p className="mt-3 text-sm font-semibold text-accent-300">{pick(lang, SITE.tagline, SITE.taglineEn)}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-bold tracking-widest text-accent-400 uppercase">{t.footerNavHeading}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-sm text-primary-100 transition-colors hover:text-accent-300"
                  >
                    <Icon name={link.icon} className="h-4 w-4 text-primary-400" />
                    {getNavLabel(t, link.to)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/members/join"
                  className="inline-flex items-center gap-2 text-sm text-primary-100 transition-colors hover:text-accent-300"
                >
                  <Icon name="userPlus" className="h-4 w-4 text-primary-400" />
                  {t.navAddDetails}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-accent-400 uppercase">{t.footerContactHeading}</h3>
            <p className="mt-4 flex items-start gap-2 text-sm text-primary-200">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 text-primary-400" />
              {pick(lang, ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN)}
            </p>
            <a
              href={createGeneralWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-sm mt-4"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              {t.heroCtaWhatsApp}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-300 sm:flex-row">
          <p className="text-center sm:text-left">
            © {year} {SITE.nameTamil}. {t.footerRights}
          </p>
          <div className="flex items-center gap-4">
            {SERVER_ENABLED && (
              <Link to="/admin" className="inline-flex items-center gap-1.5 hover:text-accent-300">
                <Icon name="lock" className="h-3.5 w-3.5" />
                {t.footerAdmin}
              </Link>
            )}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 hover:text-accent-300"
            >
              <Icon name="arrowUp" className="h-3.5 w-3.5" />
              {t.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
