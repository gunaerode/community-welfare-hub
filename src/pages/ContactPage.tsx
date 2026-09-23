import PageHeader from "../components/PageHeader";
import PageMeta from "../components/PageMeta";
import WhatsAppCTA from "../components/WhatsAppCTA";
import { pick, useLanguage } from "../context/LanguageContext";
import { ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN, CONTACT_PEOPLE } from "../data/community";
import { createGeneralWhatsAppUrl, createWhatsAppUrl } from "../utils/whatsapp";
import { SITE } from "../constants/site";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const address = pick(lang, ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN);

  return (
    <>
      <PageMeta title={t.contactPageTitle} description={t.contactPageSubtitle} />
      <PageHeader icon="📞" title={t.contactPageTitle} subtitle={t.contactPageSubtitle} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-sm dark:border-primary-800 dark:bg-primary-800 sm:p-8">
          <h2 className="text-lg font-bold text-primary-900 dark:text-white">{t.generalEnquiryHeading}</h2>
          <p className="mt-2 text-sm text-primary-600 dark:text-primary-300">{t.generalEnquiryMessage}</p>
          <WhatsAppCTA href={createGeneralWhatsAppUrl(lang)} label={t.generalWhatsAppCta} className="mt-5" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CONTACT_PEOPLE.map((person) => (
            <div
              key={person.phone}
              className="flex flex-col gap-2 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm dark:border-primary-800 dark:bg-primary-800"
            >
              <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-200">
                {person.role}
              </span>
              <h3 className="text-base font-bold text-primary-900 dark:text-white">{person.name}</h3>
              <a
                href={createWhatsAppUrl(
                  person.phone,
                  lang === "en"
                    ? `Hello ${person.name},\n\nI have a question about ${associationName}.`
                    : `வணக்கம் ${person.name},\n\n${associationName} தொடர்பாக ஒரு விசாரணை உள்ளது.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-accent-600 dark:text-primary-200 dark:hover:text-accent-400"
              >
                {t.sendWhatsApp}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-5 text-center dark:border-primary-800 dark:bg-primary-900">
          <h3 className="text-sm font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            {t.addressHeading}
          </h3>
          <p className="mt-1 text-sm text-primary-800 dark:text-primary-100">{address}</p>
        </div>
      </section>
    </>
  );
}
