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

export const ANNOUNCEMENT_STORAGE_KEY = "cvs-announcement-seen";
