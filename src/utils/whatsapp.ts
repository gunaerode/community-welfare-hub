import { GENERAL_WHATSAPP_NUMBER, SITE } from "../constants/site";
import { pick, type Language } from "../context/LanguageContext";
import type { JoinRequestData, Member } from "../types/member";
import type { CartLine } from "../types/product";

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

/** Order enquiry link pre-filled with a member's cart contents (name, qty, line total, grand total). */
export function createCartOrderUrl(member: Member, cart: CartLine[], lang: Language = "ta"): string {
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const businessName = member.businessName ?? member.name;
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  const itemLines = cart.map((line, index) => {
    const name = pick(lang, line.product.name, line.product.nameEn);
    const lineTotal = line.product.price * line.quantity;
    return `${index + 1}. ${name} x${line.quantity} - ₹${lineTotal}`;
  });

  const heading = lang === "en" ? `Order from ${businessName}` : `${businessName} - ஆர்டர்`;
  const totalLabel = lang === "en" ? "Total" : "மொத்தம்";
  const greeting =
    lang === "en"
      ? `Hello ${member.name},\n\nI'd like to place the following order:`
      : `வணக்கம் ${member.name},\n\nநான் பின்வரும் பொருட்களை ஆர்டர் செய்ய விரும்புகிறேன்:`;

  const lines = [
    `*${heading}*`,
    "",
    greeting,
    "",
    ...itemLines,
    "",
    `*${totalLabel}: ₹${total}*`,
    "",
    `- ${associationName}`,
  ];

  return createWhatsAppUrl(member.phone ?? GENERAL_WHATSAPP_NUMBER, lines.join("\n"));
}

/**
 * Sends a prospective/updated member's details to the association admin via
 * WhatsApp. There's no backend to persist this directly into the member
 * directory — the admin reviews the message and adds/updates the entry in
 * src/data/members.ts.
 */
export function createJoinRequestUrl(data: JoinRequestData, lang: Language = "ta"): string {
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);
  const heading = lang === "en" ? "New Member Details" : "புதிய உறுப்பினர் விவரங்கள்";
  const labels =
    lang === "en"
      ? {
          name: "Name",
          business: "Business Name",
          category: "Category",
          location: "Location",
          phone: "Contact Number",
          description: "Description",
          services: "Services",
        }
      : {
          name: "பெயர்",
          business: "Business பெயர்",
          category: "வகை",
          location: "இடம்",
          phone: "தொடர்பு எண்",
          description: "விவரம்",
          services: "சேவைகள்",
        };
  const signOff =
    lang === "en" ? `Submitted via the ${associationName} website` : `${associationName} website மூலம் அனுப்பப்பட்டது`;

  const lines = [
    `*${heading}*`,
    "",
    `${labels.name}: ${data.name}`,
    data.businessName ? `${labels.business}: ${data.businessName}` : null,
    data.category ? `${labels.category}: ${data.category}` : null,
    data.location ? `${labels.location}: ${data.location}` : null,
    `${labels.phone}: ${data.phone}`,
    data.description ? `${labels.description}: ${data.description}` : null,
    data.services ? `${labels.services}: ${data.services}` : null,
    "",
    `- ${signOff}`,
  ].filter((line): line is string => line !== null);

  return createWhatsAppUrl(GENERAL_WHATSAPP_NUMBER, lines.join("\n"));
}
