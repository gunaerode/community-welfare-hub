import type {
  AnnouncementContent,
  CommunityFeature,
  ContactPerson,
  FaqItem,
  RuleSection,
} from "../types/community";

/** Edit this file to update the landing announcement content without touching any component. */
export const ANNOUNCEMENT: AnnouncementContent = {
  title: "📢 முக்கிய அறிவிப்பு",
  titleEn: "📢 Important Announcement",
  intro: "எங்கள் சங்கத்தின் முக்கிய விதிமுறைகள் மற்றும் எதிர்கால திட்டங்கள்:",
  introEn: "Key rules and future plans of our association:",
  points: [
    "மாதாந்திர சந்தா: ஒவ்வொரு உறுப்பினரும் மாதத்திற்கு ₹500 செலுத்த வேண்டும்.",
    "வசூல்: ஒவ்வொரு மாதமும் முதல் ஞாயிற்றுக்கிழமை தொகை வசூலிக்கப்படும்.",
    "தகுதிக்கேற்ப ₹5000 வரை உதவி/கடன் பெறலாம்.",
    "மருத்துவம், கல்வி மற்றும் அவசர தேவைகளுக்கு சமூக உதவி வழங்கப்படும்.",
    "எதிர்காலத்தில் சமூக வங்கி கணக்கு, website விரிவாக்கம் மற்றும் insurance திட்டம் ஆகியவை பரிசீலிக்கப்படும்.",
  ],
  pointsEn: [
    "Monthly contribution: every member must pay ₹500 per month.",
    "Collection: contributions are collected on the first Sunday of every month.",
    "Eligible members can receive assistance/loans up to ₹5000.",
    "Community support is provided for medical, education, and emergency needs.",
    "Future plans under consideration: a community bank account, website expansion, and an insurance scheme.",
  ],
  note: "மேலும் விவரங்களுக்கு விதிமுறைகள் பக்கத்தை பார்க்கவும்.",
  noteEn: "See the Rules page for more details.",
  primaryButtonText: "விதிமுறைகளை பார்க்க",
  primaryButtonTextEn: "View Rules",
  secondaryButtonText: "Close",
};

export const COMMUNITY_FEATURES: CommunityFeature[] = [
  {
    id: "unity",
    icon: "🤝",
    title: "உறவினர் ஒற்றுமை",
    titleEn: "Family Unity",
    description: "குடும்ப மற்றும் சமூக உறவினர்களை நெருக்கமாக இணைத்து ஒற்றுமையை வளர்க்கிறோம்.",
    descriptionEn: "We bring family and community members closer together and build unity.",
  },
  {
    id: "financial",
    icon: "💰",
    title: "நிதி உதவி",
    titleEn: "Financial Support",
    description: "தேவைப்படும் நேரங்களில் உறுப்பினர்களுக்கு நிதி உதவி மற்றும் கடன் வசதி.",
    descriptionEn: "Financial support and loan facilities for members when they need it most.",
  },
  {
    id: "emergency",
    icon: "🚨",
    title: "அவசர உதவி",
    titleEn: "Emergency Assistance",
    description: "எதிர்பாராத சூழ்நிலைகளில் உடனடி சமூக ஆதரவு மற்றும் உதவி.",
    descriptionEn: "Immediate community support and assistance in unexpected situations.",
  },
  {
    id: "education",
    icon: "📚",
    title: "கல்வி ஆதரவு",
    titleEn: "Education Support",
    description: "குழந்தைகளின் கல்விக்கு ஊக்கமும் தேவையான ஆதரவும் வழங்குகிறோம்.",
    descriptionEn: "We encourage and support children's education wherever it's needed.",
  },
  {
    id: "medical",
    icon: "🏥",
    title: "மருத்துவ உதவி",
    titleEn: "Medical Support",
    description: "உடல்நல பிரச்சனை காலங்களில் உறுப்பினர்களுக்கு பக்கபலமாக இருக்கிறோம்.",
    descriptionEn: "We stand by our members through health issues and medical needs.",
  },
  {
    id: "development",
    icon: "🌱",
    title: "சமூக முன்னேற்றம்",
    titleEn: "Community Development",
    description: "நீண்டகால திட்டங்கள் மூலம் சமூகத்தின் ஒட்டுமொத்த வளர்ச்சிக்கு பாடுபடுகிறோம்.",
    descriptionEn: "We work toward the community's overall growth through long-term plans.",
  },
];

export const RULES_SECTIONS: RuleSection[] = [
  {
    id: "collection-day",
    icon: "📅",
    title: "மாதாந்திர தொகை நாள்",
    titleEn: "Monthly Collection Day",
    body: [
      "ஒவ்வொரு மாதமும் முதல் ஞாயிற்றுக்கிழமை தொகை வசூலிக்கப்படும்.",
      "மாதத்தின் முதல் நாள் ஞாயிற்றுக்கிழமை இருந்தால், அடுத்த நாள் (திங்கள்) வசூலிக்கப்படும்.",
    ],
    bodyEn: [
      "The monthly contribution is collected on the first Sunday of every month.",
      "If the 1st of the month is itself a Sunday, collection happens the next day (Monday).",
    ],
  },
  {
    id: "monthly-amount",
    icon: "💰",
    title: "மாதாந்திர தொகை",
    titleEn: "Monthly Contribution",
    body: ["ஒவ்வொரு உறுப்பினரும் மாதத்திற்கு ₹500 செலுத்த வேண்டும்."],
    bodyEn: ["Every member must pay ₹500 per month."],
  },
  {
    id: "assistance-limit",
    icon: "🤝",
    title: "உதவி / கடன் வரம்பு",
    titleEn: "Assistance / Loan Limit",
    body: [
      "செலுத்திய தொகையின் 2 மடங்கு வரை உதவி பெறலாம்.",
      "உதாரணம்: ₹500 → ₹1000",
      "அதிகபட்ச உதவி: ₹5000",
    ],
    bodyEn: [
      "Members can receive assistance up to 2x the amount they've contributed.",
      "Example: ₹500 → ₹1000",
      "Maximum assistance: ₹5000",
    ],
  },
  {
    id: "loan-terms",
    icon: "💸",
    title: "கடன் விதிமுறை",
    titleEn: "Loan Terms",
    body: [
      "முதல் 2 மாதங்கள் வட்டி இல்லை",
      "2 மாதத்திற்குள் திருப்பி செலுத்த வேண்டும்",
      "அதற்கு பிறகு 1% வட்டி (₹100க்கு ₹1) விதிக்கப்படும்",
      "தொகையை அடுத்த மாதம் கட்டாயம் திருப்பி செலுத்த வேண்டும்",
    ],
    bodyEn: [
      "No interest for the first 2 months",
      "Must be repaid within 2 months",
      "After that, 1% interest applies (₹1 per ₹100)",
      "The amount must be repaid the following month without fail",
    ],
  },
  {
    id: "exit-policy",
    icon: "🚪",
    title: "விலகும் விதிமுறை",
    titleEn: "Exit Policy",
    body: ["குழுவை விட்டு வெளியேறினால், செலுத்திய தொகை திருப்பி வழங்கப்படாது."],
    bodyEn: ["If a member leaves the group, the contributions already paid will not be refunded."],
  },
  {
    id: "future-plans",
    icon: "🌐",
    title: "எதிர்கால திட்டங்கள்",
    titleEn: "Future Plans",
    body: [
      "சமூக வங்கி கணக்கு",
      "அனைத்து சந்தாக்களும் வங்கி கணக்கில் செலுத்தப்படும்",
      "Admin + Treasurer + 3 உறுப்பினர்கள் கணக்கை நிர்வகிக்கலாம்",
      "4–6 மாதங்கள் வெற்றிகரமான செயல்பாட்டிற்குப் பிறகு Website விரிவாக்கம்",
      "அடுத்த வருடம் முதல் Insurance திட்டம்",
    ],
    bodyEn: [
      "A community bank account",
      "All contributions will be deposited into the bank account",
      "Admin + Treasurer + 3 members can manage the account",
      "Website expansion after 4–6 months of successful operation",
      "An insurance plan starting next year",
    ],
    isFuturePlan: true,
  },
  {
    id: "help",
    icon: "❓",
    title: "உதவி",
    titleEn: "Help",
    body: ["மருத்துவம், கல்வி அல்லது அவசர தேவைகளை சமூகத்திடம் தெரிவிக்கலாம்."],
    bodyEn: ["Medical, education, or emergency needs can be raised with the community."],
  },
  {
    id: "discipline",
    icon: "⚖️",
    title: "Group Discipline",
    titleEn: "Group Discipline",
    body: [
      "சமூகம் தொடர்பான விஷயங்கள் மட்டுமே பேசப்பட வேண்டும்.",
      "தேவையற்ற உரையாடல்கள் அல்லது முறையற்ற மொழி அனுமதிக்கப்படாது.",
    ],
    bodyEn: [
      "Only community-related matters should be discussed.",
      "Unnecessary conversations or inappropriate language are not allowed.",
    ],
  },
  {
    id: "violation",
    icon: "🚫",
    title: "Rules Violation",
    titleEn: "Rules Violation",
    body: ["சமூக விதிமுறைகளை பின்பற்றாத உறுப்பினர்கள் குழுவிலிருந்து நீக்கப்படலாம்."],
    bodyEn: ["Members who do not follow the community rules may be removed from the group."],
  },
];

export const CONTACT_PEOPLE: ContactPerson[] = [
  { role: "Admin", name: "செல்வம்", phone: "918883702745" },
  { role: "Treasurer", name: "முருகன்", phone: "918883702745" },
];

export const ASSOCIATION_ADDRESS = "அந்தியூர், ஈரோடு மாவட்டம், தமிழ்நாடு";
export const ASSOCIATION_ADDRESS_EN = "Anthiyur, Erode District, Tamil Nadu";

/** Shown on the Contact page. Edit freely — each item has Tamil + English text. */
export const FAQS: FaqItem[] = [
  {
    id: "join",
    question: "சங்கத்தில் எப்படி சேருவது?",
    questionEn: "How do I join the association?",
    answer: "நிர்வாகியை WhatsApp மூலம் தொடர்பு கொள்ளுங்கள். உறுப்பினர் பதிவு மற்றும் மாதாந்திர சந்தா விவரங்களை அவர் தெரிவிப்பார்.",
    answerEn: "Message the admin on WhatsApp. They'll share the registration steps and monthly contribution details.",
  },
  {
    id: "contribution",
    question: "மாதாந்திர சந்தா எவ்வளவு, எப்போது?",
    questionEn: "How much is the monthly contribution, and when?",
    answer: "மாதம் ₹500. ஒவ்வொரு மாதமும் முதல் ஞாயிற்றுக்கிழமை வசூலிக்கப்படும்.",
    answerEn: "₹500 per month, collected on the first Sunday of every month.",
  },
  {
    id: "assistance",
    question: "எவ்வளவு உதவி பெறலாம்?",
    questionEn: "How much assistance can I get?",
    answer: "நீங்கள் செலுத்திய தொகையின் 2 மடங்கு வரை, அதிகபட்சம் ₹5000. விதிமுறைகள் பக்கத்தில் உள்ள கணிப்பானைப் பயன்படுத்தலாம்.",
    answerEn: "Up to 2× what you've contributed, with a maximum of ₹5000. Try the calculator on the Rules page.",
  },
  {
    id: "listing",
    question: "என் தொழிலை Directory-ல் எப்படி சேர்ப்பது?",
    questionEn: "How do I list my business in the directory?",
    answer: "\"எனது விவரங்களை சேர்\" படிவத்தை நிரப்புங்கள். நிர்வாகி சரிபார்த்த பின் உங்கள் விவரங்கள் சேர்க்கப்படும்.",
    answerEn: "Fill in the \"Add My Details\" form. Your listing is added once an admin reviews it.",
  },
];
