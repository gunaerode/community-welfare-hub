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
}
