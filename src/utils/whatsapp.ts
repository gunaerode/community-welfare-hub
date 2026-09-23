import { GENERAL_WHATSAPP_NUMBER, SITE } from "../constants/site";
import { pick, type Language } from "../context/LanguageContext";
import type { Member } from "../types/member";

/**
 * Build a wa.me deep link that opens WhatsApp with a pre-filled message.
 * @param phone international phone number, digits only (no "+"); omit to let the
 *   user pick a recipient (used for the "share with others" flow)
 * @param message plain text message to pre-fill
 */
export function createWhatsAppUrl(phone: string | undefined, message: string): string {
  const sanitizedPhone = phone?.replace(/[^\d]/g, "") ?? "";
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

/** General community enquiry link used by the floating WhatsApp button. */
export function createGeneralWhatsAppUrl(lang: Language = "ta"): string {
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const message =
    lang === "en"
      ? `Hello,\n\nI'd like more information about ${associationName}.`
      : `வணக்கம்,\n\n${associationName} தொடர்பாக மேலும் தகவல் தேவை.`;
  return createWhatsAppUrl(GENERAL_WHATSAPP_NUMBER, message);
}

/** Enquiry link pre-filled for a specific member's business. */
export function createMemberEnquiryUrl(member: Member, lang: Language = "ta"): string {
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const message =
    lang === "en"
      ? `Hello ${member.name},\n\nI saw information about your business${
          member.businessName ? ` (${member.businessName})` : ""
        } on the ${associationName} website.\n\nI'd like more details.`
      : `வணக்கம் ${member.name},\n\n${associationName} website-ல்\n${
          member.businessName ? `உங்கள் business (${member.businessName}) பற்றிய` : "உங்கள் business பற்றிய"
        } தகவல்களை பார்த்தேன்.\n\nமேலும் விவரங்கள் தேவை.`;
  const phone = member.phone ?? GENERAL_WHATSAPP_NUMBER;
  return createWhatsAppUrl(phone, message);
}

/**
 * Shareable link containing the member's business details, for the visitor to
 * forward to their own contacts (no fixed recipient — WhatsApp lets them pick one).
 */
export function createShareMemberUrl(member: Member, profileUrl: string, lang: Language = "ta"): string {
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const category = pick(lang, member.category ?? "", member.categoryEn);
  const location = pick(lang, member.location ?? "", member.locationEn);
  const categoryLabel = lang === "en" ? "Category" : "வகை";
  const moreInfoLabel = lang === "en" ? "More details" : "மேலும் விவரங்கள்";

  const lines = [
    `*${member.businessName ?? member.name}*`,
    category ? `${categoryLabel}: ${category}` : null,
    location ? `📍 ${location}` : null,
    member.phone ? `📞 ${member.phone}` : null,
    "",
    `${moreInfoLabel}: ${profileUrl}`,
    "",
    `- ${associationName}`,
  ].filter((line): line is string => line !== null);

  return createWhatsAppUrl(undefined, lines.join("\n"));
}
