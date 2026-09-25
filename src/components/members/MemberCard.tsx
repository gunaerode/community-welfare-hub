import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { pick, useLanguage } from "../../context/LanguageContext";
import type { Member } from "../../types/member";
import { createMemberEnquiryUrl } from "../../utils/whatsapp";
import Icon, { WhatsAppGlyph } from "../common/Icon";
import MemberAvatar from "../common/MemberAvatar";
import SafeImage from "../common/SafeImage";

interface MemberCardProps {
  member: Member;
  index?: number;
}

export default function MemberCard({ member, index = 0 }: MemberCardProps) {
  const { lang, t } = useLanguage();
  const category = pick(lang, member.category ?? "", member.categoryEn);
  const location = pick(lang, member.location ?? "", member.locationEn);
  const cover = member.businessImages?.[0];
  const hasShop = Boolean(member.products && member.products.length > 0);

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as CSSProperties}
      className="card card-hover group relative flex flex-col overflow-hidden"
    >
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
        <SafeImage
          src={cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallback={<div className="bg-dots-light h-full w-full" aria-hidden="true" />}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/50 to-transparent" aria-hidden="true" />
        {hasShop && (
          <span className="chip absolute top-3 right-3 bg-accent-500 text-primary-950 shadow">
            <Icon name="cart" className="h-3.5 w-3.5" />
            {t.shopBadge}
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5">
        <MemberAvatar
          name={member.name}
          seed={member.id}
          image={member.image}
          className="-mt-8 h-16 w-16 rounded-2xl border-4 border-white shadow-md dark:border-primary-900"
          textClassName="text-2xl"
        />

        <h3 className="mt-3 text-base font-bold text-primary-900 dark:text-white">
          {/* Stretched link: the whole card is clickable while the action buttons below stay separate. */}
          <Link to={`/members/${member.id}`} className="after:absolute after:inset-0 focus:outline-none">
            {member.businessName ?? member.name}
          </Link>
        </h3>
        {member.businessName && <p className="text-sm text-primary-600 dark:text-primary-300">{member.name}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {category && (
            <span className="chip bg-accent-100 text-accent-800 dark:bg-accent-900/60 dark:text-accent-200">{category}</span>
          )}
          {location && (
            <span className="chip bg-primary-50 text-primary-700 dark:bg-primary-800 dark:text-primary-200">
              <Icon name="mapPin" className="h-3 w-3" />
              {location}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors group-hover:text-accent-600 dark:text-primary-200 dark:group-hover:text-accent-400">
            {t.viewProfile}
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="relative z-10 flex items-center gap-1.5">
            {member.phone && (
              <a
                href={`tel:+${member.phone}`}
                aria-label={`${t.callNow} ${member.name}`}
                title={t.callNow}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-colors hover:bg-primary-100 dark:bg-primary-800 dark:text-primary-100 dark:hover:bg-primary-700"
              >
                <Icon name="phone" className="h-4 w-4" />
              </a>
            )}
            <a
              href={createMemberEnquiryUrl(member, lang)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.whatsAppEnquiry} — ${member.name}`}
              title={t.whatsAppEnquiry}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp text-white transition-transform hover:scale-110"
            >
              <WhatsAppGlyph className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
