import { useState, type FormEvent } from "react";
import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import { pick, useLanguage } from "../context/LanguageContext";
import { ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN, CONTACT_PEOPLE } from "../data/community";
import { createContactQueryUrl, createWhatsAppUrl } from "../utils/whatsapp";
import { SITE } from "../constants/site";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const address = pick(lang, ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const inputClasses =
    "w-full rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:border-primary-400 focus:outline-none dark:border-primary-700 dark:bg-primary-800 dark:text-white dark:placeholder:text-primary-500";
  const labelClasses = "text-sm font-semibold text-primary-800 dark:text-primary-100";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setNameError(t.joinFormRequiredError);
      return;
    }
    setNameError("");
    const url = createContactQueryUrl(name, message, lang);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageMeta title={t.contactPageTitle} description={t.contactPageSubtitle} />
      <PageHeader icon="📞" title={t.contactPageTitle} subtitle={t.contactPageSubtitle} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm dark:border-primary-800 dark:bg-primary-800 sm:p-8"
        >
          <h2 className="text-lg font-bold text-primary-900 dark:text-white">{t.generalEnquiryHeading}</h2>
          <p className="mt-2 text-sm text-primary-600 dark:text-primary-300">{t.generalEnquiryMessage}</p>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="contact-name" className={labelClasses}>
                {t.contactFormNameLabel} *
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contactFormNamePlaceholder}
                className={inputClasses}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "contact-name-error" : undefined}
              />
              {nameError && (
                <p id="contact-name-error" className="text-xs font-medium text-red-600 dark:text-red-400">
                  {nameError}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="contact-message" className={labelClasses}>
                {t.contactFormMessageLabel}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contactFormMessagePlaceholder}
                rows={3}
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-transform hover:scale-[1.02]"
            >
              {t.contactFormSubmit}
            </button>
          </div>
        </form>

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
