import type { SiteNoticeConfig } from "../types/community";
import type { UiStrings } from "../i18n/translations";
import type { IconName } from "../components/common/Icon";

export const SITE = {
  nameTamil: "சின்ன வீர சங்கிலி உறவினர் நல சங்கம்",
  nameEnglish: "Community Welfare Association",
  tagline: "ஒற்றுமை • உதவி • நலம் • முன்னேற்றம்",
  taglineEn: "Unity • Help • Welfare • Progress",
  description:
    "மருத்துவம், கல்வி, அவசரம் மற்றும் பிற முக்கிய தேவைகளின்போது எங்கள் குடும்ப மற்றும் சமூக உறவினர்களுக்கு ஒருவருக்கொருவர் உதவும் நோக்கில் உருவாக்கப்பட்ட நல சங்கம்.",
  descriptionEn:
    "A welfare association created so our family and community members can support one another during medical, education, emergency, and other important needs.",
  aboutParagraph:
    "சின்ன வீர சங்கிலி உறவினர் நல சங்கம் என்பது உறவினர்களிடையே ஒற்றுமை, நிதி உதவி, அவசர ஆதரவு, கல்வி மற்றும் மருத்துவ உதவி, சமூக வளர்ச்சி மற்றும் பரஸ்பர உதவியை ஊக்குவிக்கும் நோக்கில் உருவாக்கப்பட்ட ஒரு சமூக முன்முயற்சி.",
  aboutParagraphEn:
    "Chinna Veera Sangili Uravinar Nala Sangam is a community initiative created to encourage unity among relatives, financial support, emergency assistance, education and medical support, community development, and mutual help.",
} as const;

/** General enquiry WhatsApp number — replace with the real association number */
export const GENERAL_WHATSAPP_NUMBER = "918883702745";

export const NAV_LINKS = [
  { to: "/", icon: "home" },
  { to: "/members", icon: "users" },
  { to: "/rules", icon: "scroll" },
  { to: "/contact", icon: "phone" },
] as const satisfies readonly { to: string; icon: IconName }[];

/** Looks up the localized label for a NAV_LINKS entry, e.g. `getNavLabel(t, "/members")`. */
export function getNavLabel(t: UiStrings, to: (typeof NAV_LINKS)[number]["to"]): string {
  switch (to) {
    case "/":
      return t.navHome;
    case "/members":
      return t.navMembers;
    case "/rules":
      return t.navRules;
    case "/contact":
      return t.navContact;
    default:
      return "";
  }
}

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
  message: "இந்த வலைத்தளம் தற்போது உருவாக்கப்பட்டு வருகிறது — சில தகவல்கள் மாறலாம்.",
  messageEn: "This website is currently under development — some information may change.",
};

export const SITE_NOTICE_STORAGE_KEY = "cvs-site-notice-dismissed";
