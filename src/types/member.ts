import type { Product } from "./product";

export interface Member {
  id: string;
  /** Personal/business names are proper nouns and stay as-authored regardless of UI language. */
  name: string;
  businessName?: string;
  category?: string;
  categoryEn?: string;
  location?: string;
  locationEn?: string;
  /** Phone number in international format without "+", e.g. "918883702745" */
  phone?: string;
  image?: string;
  description?: string;
  descriptionEn?: string;
  services?: string[];
  servicesEn?: string[];
  businessImages?: string[];
  /**
   * Product catalog for members who sell physical goods (e.g. a clothing or
   * mobile shop), as opposed to a pure service business. Presence of a
   * non-empty array is what enables the "Add to Cart" experience on that
   * member's profile — most members simply omit this field.
   */
  products?: Product[];
}

/** Data collected from the "Add My Details" form, submitted to the admin via WhatsApp. */
export interface JoinRequestData {
  name: string;
  businessName: string;
  category: string;
  location: string;
  phone: string;
  description: string;
  /** Comma-separated as typed by the visitor; split into a list when building the message. */
  services: string;
  /**
   * Whether the visitor wants to send business photos too. A wa.me link can
   * only pre-fill text, not attach files, so when true the generated message
   * just tells the admin to expect photos — the visitor attaches them
   * manually once the WhatsApp chat opens.
   */
  wantsToSendPhotos: boolean;
}
