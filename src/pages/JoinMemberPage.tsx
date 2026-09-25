import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Honeypot from "../components/common/Honeypot";
import Icon, { WhatsAppGlyph } from "../components/common/Icon";
import MemberAvatar from "../components/common/MemberAvatar";
import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import SubmitSuccess from "../components/common/SubmitSuccess";
import { SERVER_ENABLED } from "../config/runtime";
import { useLanguage } from "../context/LanguageContext";
import { api } from "../services/api";
import type { JoinRequestData } from "../types/member";
import { createJoinRequestUrl } from "../utils/whatsapp";

const EMPTY_FORM: JoinRequestData = {
  name: "",
  businessName: "",
  category: "",
  location: "",
  phone: "",
  description: "",
  services: "",
  wantsToSendPhotos: false,
};

type Errors = Partial<Record<"name" | "phone", string>>;
type SubmitState = "idle" | "sending" | "sent" | "failed";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          <Icon name="info" className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-primary-500 dark:text-primary-400">{hint}</p>
      )}
    </div>
  );
}

export default function JoinMemberPage() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<JoinRequestData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  const updateField = (field: keyof JoinRequestData) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === "name" || field === "phone") setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const whatsAppUrl = createJoinRequestUrl(form, lang);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = t.joinFormRequiredError;
    const digits = form.phone.replace(/\D/g, "");
    if (!digits) nextErrors.phone = t.joinFormRequiredError;
    else if (digits.length < 10 || digits.length > 13) nextErrors.phone = t.joinPhoneInvalid;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(nextErrors.name ? "join-name" : "join-phone")?.focus();
      return;
    }

    if (!SERVER_ENABLED) {
      window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setState("sending");
    try {
      await api.submitJoinRequest(form, honeypot);
      setState("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setState("failed");
    }
  };

  const services = form.services
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <PageMeta title={t.joinPageTitle} description={SERVER_ENABLED ? t.joinSubtitleServer : t.joinPageSubtitle} />
      <PageHeader icon="userPlus" title={t.joinPageTitle} subtitle={SERVER_ENABLED ? t.joinSubtitleServer : t.joinPageSubtitle} />

      <section className="container-page max-w-5xl py-8">
        <Link
          to="/members"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-white"
        >
          <Icon name="arrowLeft" className="h-4 w-4" /> {t.backToMembers}
        </Link>

        {state === "sent" ? (
          <SubmitSuccess title={t.joinSuccessTitle} message={t.joinSuccessText}>
            {form.wantsToSendPhotos && (
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-sm">
                <WhatsAppGlyph className="h-4 w-4" />
                {t.joinSendPhotosWhatsApp}
              </a>
            )}
            <Link to="/members" className="btn-outline btn-sm">
              {t.navViewMembers}
            </Link>
          </SubmitSuccess>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <form onSubmit={handleSubmit} noValidate className="card relative flex flex-col gap-8 p-6 sm:p-8">
              <Honeypot value={honeypot} onChange={setHoneypot} />
              <p className="text-xs font-medium text-primary-500 dark:text-primary-400">{t.joinFormRequiredNote}</p>

              <fieldset className="flex flex-col gap-5">
                <legend className="mb-4 flex items-center gap-2 text-base font-extrabold text-primary-900 dark:text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-700 text-xs text-white">1</span>
                  {t.joinSectionPersonal}
                </legend>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="join-name" label={t.joinFormNameLabel} required error={errors.name}>
                    <input
                      id="join-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => updateField("name")(e.target.value)}
                      placeholder={t.joinFormNamePlaceholder}
                      className="field-input"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "join-name-error" : undefined}
                    />
                  </Field>
                  <Field id="join-phone" label={t.joinFormPhoneLabel} required error={errors.phone}>
                    <input
                      id="join-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone")(e.target.value)}
                      placeholder={t.joinFormPhonePlaceholder}
                      className="field-input"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "join-phone-error" : undefined}
                    />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-5">
                <legend className="mb-4 flex items-center gap-2 text-base font-extrabold text-primary-900 dark:text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-700 text-xs text-white">2</span>
                  {t.joinSectionBusiness}
                </legend>
                <Field id="join-business" label={t.joinFormBusinessLabel}>
                  <input
                    id="join-business"
                    type="text"
                    value={form.businessName}
                    onChange={(e) => updateField("businessName")(e.target.value)}
                    placeholder={t.joinFormBusinessPlaceholder}
                    className="field-input"
                  />
                </Field>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="join-category" label={t.joinFormCategoryLabel}>
                    <input
                      id="join-category"
                      type="text"
                      value={form.category}
                      onChange={(e) => updateField("category")(e.target.value)}
                      placeholder={t.joinFormCategoryPlaceholder}
                      className="field-input"
                    />
                  </Field>
                  <Field id="join-location" label={t.joinFormLocationLabel}>
                    <input
                      id="join-location"
                      type="text"
                      value={form.location}
                      onChange={(e) => updateField("location")(e.target.value)}
                      placeholder={t.joinFormLocationPlaceholder}
                      className="field-input"
                    />
                  </Field>
                </div>
                <Field id="join-description" label={t.joinFormDescriptionLabel}>
                  <textarea
                    id="join-description"
                    value={form.description}
                    onChange={(e) => updateField("description")(e.target.value)}
                    placeholder={t.joinFormDescriptionPlaceholder}
                    rows={3}
                    maxLength={1000}
                    className="field-input resize-y"
                  />
                </Field>
                <Field id="join-services" label={t.joinFormServicesLabel}>
                  <input
                    id="join-services"
                    type="text"
                    value={form.services}
                    onChange={(e) => updateField("services")(e.target.value)}
                    placeholder={t.joinFormServicesPlaceholder}
                    className="field-input"
                  />
                </Field>

                <fieldset className="flex flex-col gap-2.5">
                  <legend className="field-label mb-2 flex items-center gap-2">
                    <Icon name="image" className="h-4 w-4 text-accent-600" />
                    {t.joinFormPhotosLabel}
                  </legend>
                  <div className="flex gap-3">
                    {[true, false].map((choice) => (
                      <label
                        key={String(choice)}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-500 ${
                          form.wantsToSendPhotos === choice
                            ? "border-primary-700 bg-primary-700 text-white"
                            : "border-primary-200 text-primary-800 hover:border-primary-400 dark:border-primary-700 dark:text-primary-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="wantsToSendPhotos"
                          checked={form.wantsToSendPhotos === choice}
                          onChange={() => setForm((current) => ({ ...current, wantsToSendPhotos: choice }))}
                          className="sr-only"
                        />
                        {choice && <Icon name="check" className="h-4 w-4" />}
                        {choice ? t.joinFormPhotosYes : t.joinFormPhotosNo}
                      </label>
                    ))}
                  </div>
                  {form.wantsToSendPhotos && (
                    <p className="flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-xs text-accent-900 dark:bg-accent-900/30 dark:text-accent-100">
                      <Icon name="info" className="mt-px h-4 w-4" />
                      {t.joinFormPhotosNote}
                    </p>
                  )}
                </fieldset>
              </fieldset>

              {state === "failed" && (
                <div role="alert" className="flex flex-col gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
                  <p className="flex items-start gap-2">
                    <Icon name="info" className="mt-0.5 h-4 w-4" />
                    {t.serverFallbackNotice}
                  </p>
                  <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-sm w-fit">
                    <WhatsAppGlyph className="h-4 w-4" />
                    {t.joinFormSubmit}
                  </a>
                </div>
              )}

              {SERVER_ENABLED ? (
                <button type="submit" className="btn-primary py-3.5" disabled={state === "sending"}>
                  {state === "sending" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                  ) : (
                    <Icon name="send" className="h-4 w-4" />
                  )}
                  {state === "sending" ? t.sending : t.joinSubmitServer}
                </button>
              ) : (
                <button type="submit" className="btn-whatsapp py-3.5">
                  <WhatsAppGlyph />
                  {t.joinFormSubmit}
                </button>
              )}
            </form>

            {/* Live preview of the directory card */}
            <aside className="h-fit lg:sticky lg:top-24" aria-label={t.joinPreviewHeading}>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-primary-500 uppercase dark:text-primary-400">
                <Icon name="eye" className="h-4 w-4" />
                {t.joinPreviewHeading}
              </p>
              <div className="card overflow-hidden">
                <div className="h-24 bg-gradient-to-br from-primary-600 to-primary-800" aria-hidden="true">
                  <div className="bg-dots-light h-full w-full" />
                </div>
                <div className="px-5 pb-5">
                  <MemberAvatar
                    name={form.name || "?"}
                    seed={form.name}
                    className="-mt-8 h-16 w-16 rounded-2xl border-4 border-white shadow-md dark:border-primary-900"
                    textClassName="text-2xl"
                  />
                  <p className="mt-3 text-base font-bold break-words text-primary-900 dark:text-white">
                    {form.businessName || form.name || t.joinPreviewNamePlaceholder}
                  </p>
                  {form.businessName && form.name && <p className="text-sm text-primary-600 dark:text-primary-300">{form.name}</p>}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {form.category && (
                      <span className="chip bg-accent-100 text-accent-800 dark:bg-accent-900/60 dark:text-accent-200">{form.category}</span>
                    )}
                    {form.location && (
                      <span className="chip bg-primary-50 text-primary-700 dark:bg-primary-800 dark:text-primary-200">
                        <Icon name="mapPin" className="h-3 w-3" />
                        {form.location}
                      </span>
                    )}
                  </div>
                  {form.description && (
                    <p className="mt-3 line-clamp-3 text-sm text-primary-700 dark:text-primary-200">{form.description}</p>
                  )}
                  {services.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {services.slice(0, 6).map((s) => (
                        <li key={s} className="chip bg-primary-50 text-primary-800 dark:bg-primary-800 dark:text-primary-100">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-primary-500 dark:text-primary-400">{t.joinPreviewHint}</p>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
