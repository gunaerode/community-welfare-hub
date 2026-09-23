export interface Member {
  id: string;
  name: string;
  businessName?: string;
  category?: string;
  location?: string;
  /** Phone number in international format without "+", e.g. "918883702745" */
  phone?: string;
  image?: string;
  description?: string;
  services?: string[];
  businessImages?: string[];
}
