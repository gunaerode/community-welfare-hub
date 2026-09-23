import type { SiteNoticeConfig } from "../types/community";

export const SITE = {
  nameTamil: "சின்ன வீர சங்கிலி உறவினர் நல சங்கம்",
  nameEnglish: "Community Welfare Association",
  tagline: "ஒற்றுமை • உதவி • நலம் • முன்னேற்றம்",
  description:
    "மருத்துவம், கல்வி, அவசரம் மற்றும் பிற முக்கிய தேவைகளின்போது எங்கள் குடும்ப மற்றும் சமூக உறவினர்களுக்கு ஒருவருக்கொருவர் உதவும் நோக்கில் உருவாக்கப்பட்ட நல சங்கம்.",
} as const;

/** General enquiry WhatsApp number — replace with the real association number */
export const GENERAL_WHATSAPP_NUMBER = "918883702745";

export const NAV_LINKS = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/members", label: "Members", icon: "👨‍👩‍👧‍👦" },
  { to: "/rules", label: "Rules", icon: "📜" },
  { to: "/contact", label: "Contact", icon: "📞" },
] as const;

export const ANNOUNCEMENT_STORAGE_KEY = "cvs-announcement-last-shown";

/** How often the landing announcement is allowed to reappear for a returning visitor. */
export const ANNOUNCEMENT_REAPPEAR_DAYS = 7;

/**
 * Site-wide "under development" notice banner, shown above the header on
 * every page. Edit this to update the message, or set `enabled: false` to
 * remove the banner once the site is ready for production.
 */
export const SITE_NOTICE: SiteNoticeConfig = {
  enabled: true,
  dismissible: true,
  message: "⚠️ இந்த வலைத்தளம் தற்போது உருவாக்கப்பட்டு வருகிறது — சில தகவல்கள் மாறலாம்.",
};

export const SITE_NOTICE_STORAGE_KEY = "cvs-site-notice-dismissed";
