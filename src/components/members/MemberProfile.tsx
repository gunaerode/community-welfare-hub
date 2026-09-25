import { useState } from "react";
import { Link } from "react-router-dom";
import { pick, pickList, useLanguage } from "../../context/LanguageContext";
import type { Member } from "../../types/member";
import type { CartLine } from "../../types/product";
import { createMemberEnquiryUrl, createShareMemberUrl } from "../../utils/whatsapp";
import Icon, { WhatsAppGlyph } from "../common/Icon";
import MemberAvatar from "../common/MemberAvatar";
import WhatsAppCTA from "../common/WhatsAppCTA";
import CartPanel from "./CartPanel";
import FixedCartBar from "./FixedCartBar";
import PhotoGallery from "./PhotoGallery";
import ProductGrid from "./ProductGrid";
import SafeImage from "../common/SafeImage";

interface MemberProfileProps {
  member: Member;
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-2 text-xs font-bold tracking-widest text-primary-500 uppercase dark:text-primary-400">
      <span className="h-px w-5 bg-accent-500" aria-hidden="true" />
      {children}
    </h2>
  );
}

export default function MemberProfile({ member }: MemberProfileProps) {
  const profileUrl = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const category = pick(lang, member.category ?? "", member.categoryEn);
  const location = pick(lang, member.location ?? "", member.locationEn);
  const description = pick(lang, member.description ?? "", member.descriptionEn);
  const services = member.services ? pickList(lang, member.services, member.servicesEn) : [];
  const cover = member.businessImages?.[0];

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleAddOrIncrement = (productId: string) => {
    setQuantities((q) => ({ ...q, [productId]: (q[productId] ?? 0) + 1 }));
  };

  const handleDecrementOrRemove = (productId: string) => {
    setQuantities((q) => {
      const current = q[productId] ?? 0;
      if (current <= 1) {
        const next = { ...q };
        delete next[productId];
        return next;
      }
      return { ...q, [productId]: current - 1 };
    });
  };

  const handleRemove = (productId: string) => {
    setQuantities((q) => {
      const next = { ...q };
      delete next[productId];
      return next;
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t.copyLink, profileUrl);
    }
  };

  const cartLines: CartLine[] = (member.products ?? [])
    .filter((product) => (quantities[product.id] ?? 0) > 0)
    .map((product) => ({ product, quantity: quantities[product.id] }));

  const hasCartItems = cartLines.length > 0;

  return (
    <div className="container-page max-w-5xl py-8">
      <Link
        to="/members"
        className="mb-5 inline-flex items-center gap-1.5 rounded-full px-1 text-sm font-semibold text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-white"
      >
        <Icon name="arrowLeft" className="h-4 w-4" /> {t.backToMembers}
      </Link>

      <article className="card overflow-hidden">
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 sm:h-56">
          <SafeImage
            src={cover}
            alt=""
            className="h-full w-full object-cover"
            fallback={<div className="bg-dots-light h-full w-full" aria-hidden="true" />}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent" aria-hidden="true" />
        </div>

        <div className="relative px-5 pb-6 sm:px-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
            <MemberAvatar
              name={member.name}
              seed={member.id}
              image={member.image}
              className="-mt-16 h-32 w-32 shrink-0 rounded-3xl border-4 border-white shadow-lift dark:border-primary-900"
              textClassName="text-5xl"
            />
            <div className="min-w-0 flex-1 sm:pb-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-primary-950 sm:text-3xl dark:text-white">
                {member.businessName ?? member.name}
              </h1>
              {member.businessName && (
                <p className="mt-0.5 text-base font-semibold text-primary-600 dark:text-primary-300">{member.name}</p>
              )}
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {category && (
                  <span className="chip bg-accent-100 px-3 py-1 text-accent-800 dark:bg-accent-900/60 dark:text-accent-200">
                    <Icon name="briefcase" className="h-3.5 w-3.5" />
                    {category}
                  </span>
                )}
                {location && (
                  <span className="chip bg-primary-50 px-3 py-1 text-primary-700 dark:bg-primary-800 dark:text-primary-200">
                    <Icon name="mapPin" className="h-3.5 w-3.5" />
                    {location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
            <WhatsAppCTA href={createMemberEnquiryUrl(member, lang)} label={t.whatsAppEnquiry} className="col-span-2 sm:flex-1" />
            {member.phone && (
              <a href={`tel:+${member.phone}`} className="btn-primary py-3.5">
                <Icon name="phone" />
                {t.callNow}
              </a>
            )}
            <a
              href={createShareMemberUrl(member, profileUrl, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline py-3"
              title={t.shareBusinessDetails}
            >
              <Icon name="share" />
              <span className="sm:hidden lg:inline">{t.shareBusinessDetails}</span>
            </a>
            <button type="button" onClick={handleCopyLink} className="btn-ghost py-3" aria-live="polite">
              <Icon name={copied ? "check" : "copy"} />
              {copied ? t.linkCopied : t.copyLink}
            </button>
          </div>
        </div>

        <div className="grid gap-8 border-t border-primary-100 px-5 py-7 sm:px-8 lg:grid-cols-[1fr_280px] dark:border-primary-800">
          <div className="flex min-w-0 flex-col gap-8">
            {description && (
              <section aria-labelledby="about-member">
                <SectionHeading id="about-member">{t.profileAboutHeading}</SectionHeading>
                <p className="mt-3 text-base leading-relaxed text-primary-800 dark:text-primary-100">{description}</p>
              </section>
            )}

            {services.length > 0 && (
              <section aria-labelledby="services-heading">
                <SectionHeading id="services-heading">{t.profileServicesHeading}</SectionHeading>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-2.5 rounded-xl bg-primary-50 px-3.5 py-2.5 text-sm font-medium text-primary-800 dark:bg-primary-800/60 dark:text-primary-100"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-primary-600 dark:bg-primary-900 dark:text-accent-300">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {member.businessImages && member.businessImages.length > 0 && (
              <section aria-labelledby="gallery-heading">
                <SectionHeading id="gallery-heading">{t.profilePhotosHeading}</SectionHeading>
                <div className="mt-3">
                  <PhotoGallery images={member.businessImages} alt={member.businessName ?? member.name} />
                </div>
              </section>
            )}
          </div>

          <aside aria-labelledby="contact-heading" className="h-fit rounded-2xl bg-primary-50 p-5 lg:sticky lg:top-24 dark:bg-primary-800/50">
            <SectionHeading id="contact-heading">{t.profileContactHeading}</SectionHeading>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              {member.phone && (
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary-700 dark:bg-primary-900 dark:text-accent-300">
                    <Icon name="phone" className="h-4 w-4" />
                  </span>
                  <dd>
                    <a href={`tel:+${member.phone}`} className="font-semibold text-primary-900 hover:underline dark:text-white">
                      +{member.phone}
                    </a>
                  </dd>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary-700 dark:bg-primary-900 dark:text-accent-300">
                    <Icon name="mapPin" className="h-4 w-4" />
                  </span>
                  <dd className="font-semibold text-primary-900 dark:text-white">{location}</dd>
                </div>
              )}
            </dl>
            <a
              href={createMemberEnquiryUrl(member, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-sm mt-5 w-full py-2.5"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              {t.whatsAppEnquiry}
            </a>
          </aside>
        </div>
      </article>

      {member.products && member.products.length > 0 && (
        <div className="mt-8">
          <section aria-labelledby="products-heading" className="card p-5 sm:p-7">
            <div className="flex flex-col gap-1">
              <h2 id="products-heading" className="flex items-center gap-2 text-xl font-extrabold text-primary-900 dark:text-white">
                <Icon name="store" className="h-5 w-5 text-accent-600" />
                {t.productsHeading}
              </h2>
              <p className="text-sm text-primary-600 dark:text-primary-300">{t.productsSubtitle}</p>
            </div>
            <div className="mt-5">
              <ProductGrid
                products={member.products}
                quantities={quantities}
                onAdd={handleAddOrIncrement}
                onIncrement={handleAddOrIncrement}
                onDecrement={handleDecrementOrRemove}
              />
            </div>
          </section>

          {hasCartItems ? (
            <FixedCartBar
              member={member}
              cart={cartLines}
              onIncrement={handleAddOrIncrement}
              onDecrement={handleDecrementOrRemove}
              onRemove={handleRemove}
            />
          ) : (
            <div className="mt-6">
              <CartPanel
                member={member}
                cart={cartLines}
                onIncrement={handleAddOrIncrement}
                onDecrement={handleDecrementOrRemove}
                onRemove={handleRemove}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
