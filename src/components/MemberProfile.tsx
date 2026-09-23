import { pick, pickList, useLanguage } from "../context/LanguageContext";
import type { Member } from "../types/member";
import WhatsAppCTA from "./WhatsAppCTA";
import { createMemberEnquiryUrl, createShareMemberUrl } from "../utils/whatsapp";

interface MemberProfileProps {
  member: Member;
}

export default function MemberProfile({ member }: MemberProfileProps) {
  const profileUrl = `${window.location.origin}${window.location.pathname}`;
  const { lang, t } = useLanguage();

  const category = pick(lang, member.category ?? "", member.categoryEn);
  const location = pick(lang, member.location ?? "", member.locationEn);
  const description = pick(lang, member.description ?? "", member.descriptionEn);
  const services = member.services ? pickList(lang, member.services, member.servicesEn) : [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-800">
        <div className="flex flex-col items-center gap-4 bg-primary-50 px-6 py-8 text-center dark:bg-primary-900 sm:flex-row sm:text-left">
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md dark:border-primary-700">
            {member.image ? (
              <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-primary-100 text-7xl dark:bg-primary-800"
                aria-hidden="true"
              >
                👤
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-900 dark:text-white">{member.name}</h1>
            {member.businessName && (
              <p className="mt-1 text-lg font-semibold text-primary-700 dark:text-primary-200">
                {member.businessName}
              </p>
            )}
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              {category && (
                <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700 dark:bg-accent-900 dark:text-accent-200">
                  {category}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary-600 dark:bg-primary-800 dark:text-primary-200">
                  📍 {location}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          {description && (
            <section aria-labelledby="about-member">
              <h2
                id="about-member"
                className="text-sm font-bold uppercase tracking-wide text-primary-500 dark:text-primary-400"
              >
                {t.profileAboutHeading}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-primary-800 dark:text-primary-100">
                {description}
              </p>
            </section>
          )}

          {services.length > 0 && (
            <section aria-labelledby="services-heading">
              <h2
                id="services-heading"
                className="text-sm font-bold uppercase tracking-wide text-primary-500 dark:text-primary-400"
              >
                {t.profileServicesHeading}
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-100"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {member.businessImages && member.businessImages.length > 0 && (
            <section aria-labelledby="gallery-heading">
              <h2
                id="gallery-heading"
                className="text-sm font-bold uppercase tracking-wide text-primary-500 dark:text-primary-400"
              >
                {t.profilePhotosHeading}
              </h2>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {member.businessImages.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${member.businessName ?? member.name} photo`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </section>
          )}

          {member.phone && (
            <section aria-labelledby="contact-heading">
              <h2
                id="contact-heading"
                className="text-sm font-bold uppercase tracking-wide text-primary-500 dark:text-primary-400"
              >
                {t.profileContactHeading}
              </h2>
              <p className="mt-2 text-base text-primary-800 dark:text-primary-100">📞 +{member.phone}</p>
            </section>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <WhatsAppCTA
              href={createMemberEnquiryUrl(member, lang)}
              label={t.whatsAppEnquiry}
              className="flex-1"
            />
            <a
              href={createShareMemberUrl(member, profileUrl, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary-700 px-6 py-3.5 text-base font-bold text-primary-700 transition-colors hover:bg-primary-50 dark:text-primary-200 dark:hover:bg-primary-700"
            >
              {t.shareBusinessDetails}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
