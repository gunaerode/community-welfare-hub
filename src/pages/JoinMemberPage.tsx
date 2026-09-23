import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PageMeta from "../components/PageMeta";
import { useLanguage } from "../context/LanguageContext";
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

export default function JoinMemberPage() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<JoinRequestData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});

  const updateField = (field: keyof JoinRequestData) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = t.joinFormRequiredError;
    if (!form.phone.trim()) nextErrors.phone = t.joinFormRequiredError;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const url = createJoinRequestUrl(form, lang);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClasses =
    "w-full rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:border-primary-400 focus:outline-none dark:border-primary-700 dark:bg-primary-800 dark:text-white dark:placeholder:text-primary-500";
  const labelClasses = "text-sm font-semibold text-primary-800 dark:text-primary-100";

  return (
    <>
      <PageMeta title={t.joinPageTitle} description={t.joinPageSubtitle} />
      <PageHeader icon="📝" title={t.joinPageTitle} subtitle={t.joinPageSubtitle} />

      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          to="/members"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-white"
        >
          <span aria-hidden="true">←</span> {t.backToMembers}
        </Link>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-2xl border border-primary-100 bg-white p-6 shadow-sm dark:border-primary-800 dark:bg-primary-800 sm:p-8"
        >
          <p className="text-xs font-medium text-primary-500 dark:text-primary-400">{t.joinFormRequiredNote}</p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="join-name" className={labelClasses}>
              {t.joinFormNameLabel} *
            </label>
            <input
              id="join-name"
              type="text"
              value={form.name}
              onChange={(e) => updateField("name")(e.target.value)}
              placeholder={t.joinFormNamePlaceholder}
              className={inputClasses}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "join-name-error" : undefined}
            />
            {errors.name && (
              <p id="join-name-error" className="text-xs font-medium text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="join-phone" className={labelClasses}>
              {t.joinFormPhoneLabel} *
            </label>
            <input
              id="join-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone")(e.target.value)}
              placeholder={t.joinFormPhonePlaceholder}
              className={inputClasses}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "join-phone-error" : undefined}
            />
            {errors.phone && (
              <p id="join-phone-error" className="text-xs font-medium text-red-600 dark:text-red-400">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="join-business" className={labelClasses}>
              {t.joinFormBusinessLabel}
            </label>
            <input
              id="join-business"
              type="text"
              value={form.businessName}
              onChange={(e) => updateField("businessName")(e.target.value)}
              placeholder={t.joinFormBusinessPlaceholder}
              className={inputClasses}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="join-category" className={labelClasses}>
                {t.joinFormCategoryLabel}
              </label>
              <input
                id="join-category"
                type="text"
                value={form.category}
                onChange={(e) => updateField("category")(e.target.value)}
                placeholder={t.joinFormCategoryPlaceholder}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="join-location" className={labelClasses}>
                {t.joinFormLocationLabel}
              </label>
              <input
                id="join-location"
                type="text"
                value={form.location}
                onChange={(e) => updateField("location")(e.target.value)}
                placeholder={t.joinFormLocationPlaceholder}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="join-description" className={labelClasses}>
              {t.joinFormDescriptionLabel}
            </label>
            <textarea
              id="join-description"
              value={form.description}
              onChange={(e) => updateField("description")(e.target.value)}
              placeholder={t.joinFormDescriptionPlaceholder}
              rows={3}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="join-services" className={labelClasses}>
              {t.joinFormServicesLabel}
            </label>
            <input
              id="join-services"
              type="text"
              value={form.services}
              onChange={(e) => updateField("services")(e.target.value)}
              placeholder={t.joinFormServicesPlaceholder}
              className={inputClasses}
            />
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className={labelClasses}>{t.joinFormPhotosLabel}</legend>
            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 text-sm text-primary-800 dark:text-primary-100">
                <input
                  type="radio"
                  name="wantsToSendPhotos"
                  checked={form.wantsToSendPhotos}
                  onChange={() => setForm((current) => ({ ...current, wantsToSendPhotos: true }))}
                  className="h-4 w-4 accent-accent-500"
                />
                {t.joinFormPhotosYes}
              </label>
              <label className="flex items-center gap-2 text-sm text-primary-800 dark:text-primary-100">
                <input
                  type="radio"
                  name="wantsToSendPhotos"
                  checked={!form.wantsToSendPhotos}
                  onChange={() => setForm((current) => ({ ...current, wantsToSendPhotos: false }))}
                  className="h-4 w-4 accent-accent-500"
                />
                {t.joinFormPhotosNo}
              </label>
            </div>
            {form.wantsToSendPhotos && (
              <p className="text-xs text-primary-500 dark:text-primary-400">{t.joinFormPhotosNote}</p>
            )}
          </fieldset>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-transform hover:scale-[1.02]"
          >
            {t.joinFormSubmit}
          </button>
        </form>
      </section>
    </>
  );
}
