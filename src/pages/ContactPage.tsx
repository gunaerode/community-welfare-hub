import { useState, type FormEvent } from "react";
import Honeypot from "../components/common/Honeypot";
import Icon, { WhatsAppGlyph } from "../components/common/Icon";
import MemberAvatar from "../components/common/MemberAvatar";
import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import SubmitSuccess from "../components/common/SubmitSuccess";
import { SERVER_ENABLED } from "../config/runtime";
import { SITE } from "../constants/site";
import { pick, useLanguage } from "../context/LanguageContext";
import { ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN, CONTACT_PEOPLE, FAQS } from "../data/community";
import { api } from "../services/api";
import { createContactQueryUrl, createGeneralWhatsAppUrl, createWhatsAppUrl } from "../utils/whatsapp";

type SubmitState = "idle" | "sending" | "sent" | "failed";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const address = pick(lang, ASSOCIATION_ADDRESS, ASSOCIATION_ADDRESS_EN);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [nameError, setNameError] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  const whatsAppUrl = createContactQueryUrl(name, message, lang);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setNameError(t.joinFormRequiredError);
      document.getElementById("contact-name")?.focus();
      return;
    }
    setNameError("");

    // Static mode: hand off to WhatsApp, exactly like before.
    if (!SERVER_ENABLED) {
      window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // Server mode: save to the admin inbox; fall back to WhatsApp if the server is unreachable.
    setState("sending");
    try {
      await api.sendMessage({ name: name.trim(), phone: phone.trim() || undefined, message: message.trim() }, honeypot);
      setState("sent");
    } catch {
      setState("failed");
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setMessage("");
    setState("idle");
  };

  return (
    <>
      <PageMeta title={t.contactPageTitle} description={t.contactPageSubtitle} />
      <PageHeader icon="phone" title={t.contactPageTitle} subtitle={t.contactPageSubtitle} />

      <section className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {state === "sent" ? (
            <SubmitSuccess title={t.contactSuccessTitle} message={t.contactSuccessText}>
              <button type="button" onClick={resetForm} className="btn-outline btn-sm">
                {t.sendAnother}
              </button>
            </SubmitSuccess>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="card relative p-6 sm:p-8" data-reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-800 dark:text-accent-300">
                  <Icon name={SERVER_ENABLED ? "send" : "inbox"} />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-primary-900 dark:text-white">{t.generalEnquiryHeading}</h2>
                  <p className="text-sm text-primary-600 dark:text-primary-300">{t.generalEnquiryMessage}</p>
                </div>
              </div>

              <Honeypot value={honeypot} onChange={setHoneypot} />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className={`flex flex-col gap-1.5 ${SERVER_ENABLED ? "" : "sm:col-span-2"}`}>
                  <label htmlFor="contact-name" className="field-label">
                    {t.contactFormNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contactFormNamePlaceholder}
                    className="field-input"
                    aria-invalid={Boolean(nameError)}
                    aria-describedby={nameError ? "contact-name-error" : undefined}
                  />
                  {nameError && (
                    <p id="contact-name-error" className="field-error">
                      <Icon name="info" className="h-3.5 w-3.5" />
                      {nameError}
                    </p>
                  )}
                </div>

                {SERVER_ENABLED && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="field-label">
                      {t.contactFormPhoneLabel}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.contactFormPhonePlaceholder}
                      className="field-input"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="contact-message" className="field-label">
                    {t.contactFormMessageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contactFormMessagePlaceholder}
                    rows={4}
                    maxLength={2000}
                    className="field-input resize-y"
                  />
                </div>
              </div>

              {state === "failed" && (
                <div role="alert" className="mt-4 flex flex-col gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
                  <p className="flex items-start gap-2">
                    <Icon name="info" className="mt-0.5 h-4 w-4" />
                    {t.serverFallbackNotice}
                  </p>
                  <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-sm w-fit">
                    <WhatsAppGlyph className="h-4 w-4" />
                    {t.contactFormSubmit}
                  </a>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                {SERVER_ENABLED ? (
                  <button type="submit" className="btn-primary py-3" disabled={state === "sending"}>
                    {state === "sending" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                    ) : (
                      <Icon name="send" className="h-4 w-4" />
                    )}
                    {state === "sending" ? t.sending : t.contactSubmitServer}
                  </button>
                ) : (
                  <button type="submit" className="btn-whatsapp py-3">
                    <WhatsAppGlyph />
                    {t.contactFormSubmit}
                  </button>
                )}
                {SERVER_ENABLED && (
                  <a
                    href={createGeneralWhatsAppUrl(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline dark:text-primary-200"
                  >
                    <WhatsAppGlyph className="h-4 w-4 text-whatsapp" />
                    {t.orWhatsAppDirect}
                  </a>
                )}
              </div>
            </form>
          )}

          <div className="flex flex-col gap-5">
            <div className="card p-6" data-reveal>
              <h2 className="text-xs font-bold tracking-widest text-primary-500 uppercase dark:text-primary-400">
                {t.committeeHeading}
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {CONTACT_PEOPLE.map((person) => (
                  <li key={`${person.role}-${person.name}`} className="flex items-center gap-3">
                    <MemberAvatar name={person.name} seed={person.role} className="h-12 w-12 rounded-2xl" textClassName="text-lg" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-primary-900 dark:text-white">{person.name}</p>
                      <p className="text-xs font-semibold text-accent-700 dark:text-accent-400">{person.role}</p>
                    </div>
                    <a
                      href={`tel:+${person.phone}`}
                      aria-label={`${t.callNow} ${person.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-800 dark:text-primary-100"
                    >
                      <Icon name="phone" className="h-4 w-4" />
                    </a>
                    <a
                      href={createWhatsAppUrl(
                        person.phone,
                        lang === "en"
                          ? `Hello ${person.name},\n\nI have a question about ${associationName}.`
                          : `வணக்கம் ${person.name},\n\n${associationName} தொடர்பாக ஒரு விசாரணை உள்ளது.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.sendWhatsApp} — ${person.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white hover:scale-105"
                    >
                      <WhatsAppGlyph className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card overflow-hidden" data-reveal>
              <div className="relative h-28 bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
                <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-700 shadow-lift">
                  <Icon name="mapPin" className="h-7 w-7" />
                </span>
              </div>
              <div className="p-5 text-center">
                <h2 className="text-xs font-bold tracking-widest text-primary-500 uppercase dark:text-primary-400">
                  {t.addressHeading}
                </h2>
                <p className="mt-1.5 font-semibold text-primary-900 dark:text-white">{address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ASSOCIATION_ADDRESS_EN)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost btn-sm mt-3"
                >
                  <Icon name="globe" className="h-4 w-4" />
                  {t.openInMaps}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl" data-reveal>
          <h2 className="section-title text-center">{t.faqHeading}</h2>
          <div className="mt-6 flex flex-col gap-3">
            {FAQS.map((faq) => (
              <details key={faq.id} className="card group p-0 open:shadow-lift">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-primary-900 dark:text-white [&::-webkit-details-marker]:hidden">
                  {pick(lang, faq.question, faq.questionEn)}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-transform group-open:rotate-45 dark:bg-primary-800 dark:text-accent-300">
                    <Icon name="plus" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-primary-700 dark:text-primary-200">
                  {pick(lang, faq.answer, faq.answerEn)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
