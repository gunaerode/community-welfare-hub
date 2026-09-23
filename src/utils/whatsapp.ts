import { GENERAL_WHATSAPP_NUMBER, SITE } from "../constants/site";
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
export function createGeneralWhatsAppUrl(): string {
  const message = `வணக்கம்,\n\n${SITE.nameTamil} தொடர்பாக மேலும் தகவல் தேவை.`;
  return createWhatsAppUrl(GENERAL_WHATSAPP_NUMBER, message);
}

/** Enquiry link pre-filled for a specific member's business. */
export function createMemberEnquiryUrl(member: Member): string {
  const businessLine = member.businessName ? `உங்கள் business (${member.businessName}) பற்றிய` : "உங்கள் business பற்றிய";
  const message = `வணக்கம் ${member.name},\n\n${SITE.nameTamil} website-ல்\n${businessLine} தகவல்களை பார்த்தேன்.\n\nமேலும் விவரங்கள் தேவை.`;
  const phone = member.phone ?? GENERAL_WHATSAPP_NUMBER;
  return createWhatsAppUrl(phone, message);
}

/**
 * Shareable link containing the member's business details, for the visitor to
 * forward to their own contacts (no fixed recipient — WhatsApp lets them pick one).
 */
export function createShareMemberUrl(member: Member, profileUrl: string): string {
  const lines = [
    `*${member.businessName ?? member.name}*`,
    member.category ? `வகை: ${member.category}` : null,
    member.location ? `📍 ${member.location}` : null,
    member.phone ? `📞 ${member.phone}` : null,
    "",
    `மேலும் விவரங்கள்: ${profileUrl}`,
    "",
    `- ${SITE.nameTamil}`,
  ].filter((line): line is string => line !== null);

  return createWhatsAppUrl(undefined, lines.join("\n"));
}
