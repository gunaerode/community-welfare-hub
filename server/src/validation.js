import { HttpError } from "./http.js";

/**
 * @param {unknown} value
 * @param {string} field
 * @param {{ max: number, required?: boolean }} opts
 */
export function text(value, field, { max, required = false }) {
  if (value === undefined || value === null) value = "";
  if (typeof value !== "string") throw new HttpError(400, `${field} must be text`);
  const trimmed = value.replace(/\u0000/g, "").trim();
  if (required && !trimmed) throw new HttpError(400, `${field} is required`);
  if (trimmed.length > max) throw new HttpError(400, `${field} is too long (max ${max} characters)`);
  return trimmed;
}

/** Digits only, Indian 10-digit numbers get the 91 country code. */
export function phone(value, field, { required = false } = {}) {
  const raw = text(value, field, { max: 20, required });
  if (!raw) return "";
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  if (digits.length < 10 || digits.length > 13) throw new HttpError(400, `${field} must be a valid phone number`);
  return digits;
}

/** @param {unknown} value @param {string} field @param {{ maxItems: number, maxLength: number }} opts */
export function textList(value, field, { maxItems, maxLength }) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new HttpError(400, `${field} must be a list`);
  if (value.length > maxItems) throw new HttpError(400, `${field} has too many items (max ${maxItems})`);
  return value.map((v, i) => text(v, `${field}[${i}]`, { max: maxLength })).filter(Boolean);
}

/** Only allow http(s) URLs for images. */
export function url(value, field) {
  const raw = text(value, field, { max: 500 });
  if (!raw) return "";
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error();
    return u.toString();
  } catch {
    throw new HttpError(400, `${field} must be a valid http(s) URL`);
  }
}

/** ASCII slug for member ids; Tamil-only names fall back to a random suffix. */
export function slugify(input) {
  const slug = String(input)
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return slug;
}

export function newId(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/** @param {any} body */
export function joinRequestInput(body) {
  return {
    name: text(body.name, "name", { max: 80, required: true }),
    businessName: text(body.businessName, "businessName", { max: 120 }),
    category: text(body.category, "category", { max: 80 }),
    location: text(body.location, "location", { max: 80 }),
    phone: phone(body.phone, "phone", { required: true }),
    description: text(body.description, "description", { max: 1000 }),
    services: text(body.services, "services", { max: 500 }),
    wantsToSendPhotos: body.wantsToSendPhotos === true,
  };
}

/** @param {any} body */
export function messageInput(body) {
  return {
    name: text(body.name, "name", { max: 80, required: true }),
    phone: phone(body.phone, "phone"),
    message: text(body.message, "message", { max: 2000 }),
  };
}

/** @param {any} a */
export function announcementInput(a) {
  if (a === null) return null;
  if (typeof a !== "object") throw new HttpError(400, "announcement must be an object");
  const points = textList(a.points, "announcement.points", { maxItems: 12, maxLength: 300 });
  if (points.length === 0) throw new HttpError(400, "announcement needs at least one point");
  return {
    title: text(a.title, "announcement.title", { max: 120, required: true }),
    titleEn: text(a.titleEn, "announcement.titleEn", { max: 120 }),
    intro: text(a.intro, "announcement.intro", { max: 400 }),
    introEn: text(a.introEn, "announcement.introEn", { max: 400 }),
    points,
    pointsEn: textList(a.pointsEn, "announcement.pointsEn", { maxItems: 12, maxLength: 300 }),
    note: text(a.note, "announcement.note", { max: 300 }),
    noteEn: text(a.noteEn, "announcement.noteEn", { max: 300 }),
    primaryButtonText: text(a.primaryButtonText, "announcement.primaryButtonText", { max: 60, required: true }),
    primaryButtonTextEn: text(a.primaryButtonTextEn, "announcement.primaryButtonTextEn", { max: 60 }),
    secondaryButtonText: text(a.secondaryButtonText, "announcement.secondaryButtonText", { max: 60, required: true }),
  };
}

/** @param {any} n */
export function siteNoticeInput(n) {
  if (n === null) return null;
  if (typeof n !== "object") throw new HttpError(400, "siteNotice must be an object");
  return {
    enabled: n.enabled === true,
    dismissible: n.dismissible !== false,
    message: text(n.message, "siteNotice.message", { max: 300, required: n.enabled === true }),
    messageEn: text(n.messageEn, "siteNotice.messageEn", { max: 300 }),
  };
}
