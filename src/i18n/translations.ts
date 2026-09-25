export type Language = "ta" | "en";

export interface UiStrings {
  navHome: string;
  navMembers: string;
  navRules: string;
  navContact: string;
  openMenu: string;
  closeMenu: string;
  primaryNavLabel: string;
  mobileNavLabel: string;
  themeToggleToLight: string;
  themeToggleToDark: string;

  heroCtaMembers: string;
  heroCtaRules: string;
  heroCtaWhatsApp: string;

  aboutHeading: string;

  membersPageTitle: string;
  membersPageSubtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  allLocations: string;
  membersFoundSuffix: string;
  noMembersFoundTitle: string;
  noMembersFoundMessage: string;
  viewProfile: string;

  memberNotFoundTitle: string;
  memberNotFoundMessage: string;
  backToMembers: string;

  profileAboutHeading: string;
  profileServicesHeading: string;
  profilePhotosHeading: string;
  profileContactHeading: string;
  whatsAppEnquiry: string;
  shareBusinessDetails: string;

  rulesPageTitle: string;
  rulesPageSubtitle: string;
  futurePlanBadge: string;

  contactPageTitle: string;
  contactPageSubtitle: string;
  generalEnquiryHeading: string;
  generalEnquiryMessage: string;
  generalWhatsAppCta: string;
  sendWhatsApp: string;
  addressHeading: string;
  contactFormNameLabel: string;
  contactFormNamePlaceholder: string;
  contactFormMessageLabel: string;
  contactFormMessagePlaceholder: string;
  contactFormSubmit: string;

  notFoundTitle: string;
  notFoundMessage: string;
  backHome: string;

  footerNavHeading: string;
  footerRights: string;

  floatingWhatsAppLabel: string;
  closeNotice: string;

  productsHeading: string;
  addToCart: string;
  increaseQuantity: string;
  decreaseQuantity: string;
  removeFromCart: string;
  cartHeading: string;
  cartEmptyMessage: string;
  cartItemsSuffix: string;
  cartTotalLabel: string;
  expandCart: string;
  collapseCart: string;
  sendOrderWhatsApp: string;
  printOrder: string;
  orderSummaryTitle: string;
  orderDateLabel: string;
  cartItemColumn: string;
  cartQtyColumn: string;
  cartAmountColumn: string;

  navViewMembers: string;
  navAddDetails: string;

  joinPageTitle: string;
  joinPageSubtitle: string;
  joinFormNameLabel: string;
  joinFormNamePlaceholder: string;
  joinFormBusinessLabel: string;
  joinFormBusinessPlaceholder: string;
  joinFormCategoryLabel: string;
  joinFormCategoryPlaceholder: string;
  joinFormLocationLabel: string;
  joinFormLocationPlaceholder: string;
  joinFormPhoneLabel: string;
  joinFormPhonePlaceholder: string;
  joinFormDescriptionLabel: string;
  joinFormDescriptionPlaceholder: string;
  joinFormServicesLabel: string;
  joinFormServicesPlaceholder: string;
  joinFormPhotosLabel: string;
  joinFormPhotosYes: string;
  joinFormPhotosNo: string;
  joinFormPhotosNote: string;
  joinFormRequiredNote: string;
  joinFormRequiredError: string;
  joinFormSubmit: string;
  skipToContent: string;
  heroStatMembers: string;
  heroStatMonthly: string;
  heroStatMaxHelp: string;
  heroStatPlaces: string;
  heroTrustLine: string;
  aboutEyebrow: string;
  howEyebrow: string;
  howHeading: string;
  howSubtitle: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
  featuredEyebrow: string;
  featuredHeading: string;
  featuredSubtitle: string;
  viewAllMembers: string;
  ctaBannerTitle: string;
  ctaBannerText: string;
  categoryAll: string;
  clearFilters: string;
  shopBadge: string;
  callNow: string;
  membersMissingPrompt: string;
  copyLink: string;
  linkCopied: string;
  productsSubtitle: string;
  atAGlance: string;
  factMonthly: string;
  factCollection: string;
  factCollectionValue: string;
  factLimit: string;
  factLimitValue: string;
  factInterestFree: string;
  factInterestFreeValue: string;
  calcHeading: string;
  calcSubtitle: string;
  calcMonthsLabel: string;
  calcPaid: string;
  calcEligible: string;
  calcCapReached: string;
  calcLoanLabel: string;
  calcRepayLabel: string;
  calcInterest: string;
  calcTotalRepay: string;
  calcInterestNote: string;
  calcDisclaimer: string;
  monthsUnit: string;
  rulesAllHeading: string;
  contactFormPhoneLabel: string;
  contactFormPhonePlaceholder: string;
  contactSubmitServer: string;
  contactSuccessTitle: string;
  contactSuccessText: string;
  sendAnother: string;
  orWhatsAppDirect: string;
  serverFallbackNotice: string;
  sending: string;
  committeeHeading: string;
  openInMaps: string;
  faqHeading: string;
  joinSubtitleServer: string;
  joinSubmitServer: string;
  joinSuccessTitle: string;
  joinSuccessText: string;
  joinSendPhotosWhatsApp: string;
  joinPreviewHeading: string;
  joinPreviewHint: string;
  joinSectionPersonal: string;
  joinSectionBusiness: string;
  joinPhoneInvalid: string;
  joinPreviewNamePlaceholder: string;
  footerAboutHeading: string;
  footerContactHeading: string;
  backToTop: string;
  footerAdmin: string;
  tryAgain: string;
}

export const UI_TEXT: Record<Language, UiStrings> = {
  ta: {
    navHome: "முகப்பு",
    navMembers: "உறுப்பினர்கள்",
    navRules: "விதிமுறைகள்",
    navContact: "தொடர்பு",
    openMenu: "மெனுவை திற",
    closeMenu: "மெனுவை மூடு",
    primaryNavLabel: "முதன்மை வழிசெலுத்தல்",
    mobileNavLabel: "மொபைல் வழிசெலுத்தல்",
    themeToggleToLight: "Light mode-க்கு மாற்று",
    themeToggleToDark: "Dark mode-க்கு மாற்று",

    heroCtaMembers: "எங்கள் உறுப்பினர்கள்",
    heroCtaRules: "விதிமுறைகளை பார்க்க",
    heroCtaWhatsApp: "WhatsApp மூலம் தொடர்பு கொள்ள",

    aboutHeading: "எங்கள் சமூகம் பற்றி",

    membersPageTitle: "எங்கள் உறுப்பினர்கள்",
    membersPageSubtitle:
      "சங்க உறுப்பினர்களின் தொழில் மற்றும் சேவைகளை பார்வையிட்டு நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ளலாம்.",
    searchPlaceholder: "பெயர் / business தேடுங்கள்...",
    allCategories: "அனைத்து வகைகளும்",
    allLocations: "அனைத்து இடங்களும்",
    membersFoundSuffix: "உறுப்பினர்(கள்) கிடைத்தன",
    noMembersFoundTitle: "உறுப்பினர்கள் யாரும் கிடைக்கவில்லை",
    noMembersFoundMessage: "வேறு தேடல் அல்லது வடிகட்டியை முயற்சிக்கவும்.",
    viewProfile: "Profile பார்க்க",

    memberNotFoundTitle: "உறுப்பினர் கிடைக்கவில்லை",
    memberNotFoundMessage: "நீங்கள் தேடும் உறுப்பினர் சுயவிவரம் இல்லை அல்லது நீக்கப்பட்டிருக்கலாம்.",
    backToMembers: "உறுப்பினர்கள் பட்டியலுக்கு திரும்பு",

    profileAboutHeading: "விவரம்",
    profileServicesHeading: "சேவைகள்",
    profilePhotosHeading: "Business Photos",
    profileContactHeading: "தொடர்பு",
    whatsAppEnquiry: "WhatsApp Enquiry",
    shareBusinessDetails: "Share Business Details",

    rulesPageTitle: "விதிமுறைகள் & நடைமுறைகள்",
    rulesPageSubtitle: "அனைத்து உறுப்பினர்களும் கீழ்கண்ட விதிமுறைகளை கடைபிடிக்குமாறு கேட்டுக்கொள்கிறோம்.",
    futurePlanBadge: "எதிர்கால திட்டம் — feasibility/approval-ஐ பொறுத்தது",

    contactPageTitle: "தொடர்பு கொள்ள",
    contactPageSubtitle: "தொடர்பான கேள்விகளுக்கு எங்களை WhatsApp மூலம் அணுகவும்.",
    generalEnquiryHeading: "பொது விசாரணை",
    generalEnquiryMessage: "சங்கம் தொடர்பான எந்த கேள்விக்கும் நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ளுங்கள்.",
    generalWhatsAppCta: "WhatsApp மூலம் தொடர்பு கொள்ள",
    sendWhatsApp: "WhatsApp அனுப்ப",
    addressHeading: "முகவரி",
    contactFormNameLabel: "பெயர்",
    contactFormNamePlaceholder: "உங்கள் பெயர்",
    contactFormMessageLabel: "உங்கள் செய்தி",
    contactFormMessagePlaceholder: "உங்கள் கேள்வி/தேவையை எழுதவும் (விருப்பம்)",
    contactFormSubmit: "WhatsApp மூலம் அனுப்ப",

    notFoundTitle: "பக்கம் கிடைக்கவில்லை",
    notFoundMessage: "நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது.",
    backHome: "முகப்பு பக்கத்திற்கு திரும்பு",

    footerNavHeading: "வழிசெலுத்தல்",
    footerRights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

    floatingWhatsAppLabel: "WhatsApp மூலம் தொடர்பு கொள்ள",
    closeNotice: "அறிவிப்பை மூடு",

    productsHeading: "பொருட்கள்",
    addToCart: "கார்ட்டில் சேர்",
    increaseQuantity: "அளவை அதிகரி",
    decreaseQuantity: "அளவை குறை",
    removeFromCart: "நீக்கு",
    cartHeading: "உங்கள் கார்ட்",
    cartEmptyMessage: "உங்கள் கார்ட் காலியாக உள்ளது. பொருட்களை சேர்க்கவும்.",
    cartItemsSuffix: "பொருட்கள்",
    cartTotalLabel: "மொத்தம்",
    expandCart: "கார்ட்டை விரிவாக்கு",
    collapseCart: "கார்ட்டை சுருக்கு",
    sendOrderWhatsApp: "WhatsApp மூலம் ஆர்டர் அனுப்ப",
    printOrder: "ஆர்டரை பிரிண்ட் செய்ய",
    orderSummaryTitle: "ஆர்டர் விவரம்",
    orderDateLabel: "தேதி",
    cartItemColumn: "பொருள்",
    cartQtyColumn: "எண்ணிக்கை",
    cartAmountColumn: "மொத்தம்",

    navViewMembers: "உறுப்பினர்களைப் பார்க்க",
    navAddDetails: "எனது விவரங்களை சேர்",

    joinPageTitle: "எனது விவரங்களை சேர்",
    joinPageSubtitle:
      "படிவத்தை நிரப்பி சமர்ப்பிக்கவும் — உங்கள் விவரங்கள் WhatsApp வழியாக நிர்வாகியிடம் அனுப்பப்படும், அவர்கள் பரிசீலித்து Directory-ல் சேர்ப்பார்.",
    joinFormNameLabel: "பெயர்",
    joinFormNamePlaceholder: "உங்கள் முழு பெயர்",
    joinFormBusinessLabel: "Business பெயர்",
    joinFormBusinessPlaceholder: "எ.கா. ஸ்ரீ விநாயக எலக்ட்ரிக்கல்ஸ்",
    joinFormCategoryLabel: "வகை",
    joinFormCategoryPlaceholder: "எ.கா. மின் பணிகள், தையல், கேட்டரிங்",
    joinFormLocationLabel: "இடம்",
    joinFormLocationPlaceholder: "எ.கா. அந்தியூர்",
    joinFormPhoneLabel: "தொடர்பு எண்",
    joinFormPhonePlaceholder: "10-இலக்க மொபைல் எண்",
    joinFormDescriptionLabel: "விவரம்",
    joinFormDescriptionPlaceholder: "உங்கள் business/சேவை பற்றி சுருக்கமாக எழுதவும்",
    joinFormServicesLabel: "சேவைகள் (காமாவால் பிரிக்கவும்)",
    joinFormServicesPlaceholder: "எ.கா. வீட்டு வயரிங், மின் பழுது பார்க்கும் பணி",
    joinFormPhotosLabel: "Business படங்களையும் அனுப்ப விரும்புகிறீர்களா?",
    joinFormPhotosYes: "ஆம்",
    joinFormPhotosNo: "இல்லை",
    joinFormPhotosNote:
      "இந்த லிங்க் வழியாக படங்களை நேரடியாக அனுப்ப முடியாது — WhatsApp சாட் திறந்தவுடன் நீங்களே Attach செய்யலாம்.",
    joinFormRequiredNote: "* தேவையான புலங்கள்",
    joinFormRequiredError: "இந்த புலம் தேவை",
    joinFormSubmit: "WhatsApp மூலம் அனுப்ப",
    skipToContent: "உள்ளடக்கத்திற்கு செல்ல",
    heroStatMembers: "உறுப்பினர் தொழில்கள்",
    heroStatMonthly: "மாதாந்திர சந்தா",
    heroStatMaxHelp: "அதிகபட்ச உதவி",
    heroStatPlaces: "ஊர்கள்",
    heroTrustLine: "உறவினர்களால், உறவினர்களுக்காக",
    aboutEyebrow: "எங்கள் நோக்கம்",
    howEyebrow: "எளிய 3 படிகள்",
    howHeading: "எப்படி செயல்படுகிறது?",
    howSubtitle: "ஒவ்வொருவரின் சிறு பங்களிப்பும், தேவைப்படும் ஒருவருக்கு பெரிய உதவியாக மாறுகிறது.",
    step1Title: "உறுப்பினராக இணையுங்கள்",
    step1Text: "நிர்வாகியை WhatsApp-ல் தொடர்பு கொண்டு உறுப்பினராக பதிவு செய்யுங்கள்.",
    step2Title: "மாதம் ₹500 செலுத்துங்கள்",
    step2Text: "ஒவ்வொரு மாதமும் முதல் ஞாயிற்றுக்கிழமை தொகை வசூலிக்கப்படும்.",
    step3Title: "தேவையில் உதவி பெறுங்கள்",
    step3Text: "செலுத்திய தொகையின் 2 மடங்கு வரை — அதிகபட்சம் ₹5000.",
    featuredEyebrow: "உள்ளூர் தொழில்கள்",
    featuredHeading: "எங்கள் உறுப்பினர்களின் தொழில்கள்",
    featuredSubtitle: "நம் உறவினர்களின் கடைகள் மற்றும் சேவைகளை ஆதரியுங்கள்.",
    viewAllMembers: "அனைத்து உறுப்பினர்களையும் பார்க்க",
    ctaBannerTitle: "உங்கள் தொழிலையும் இங்கே பட்டியலிடுங்கள்",
    ctaBannerText: "உங்கள் விவரங்களை சமர்ப்பியுங்கள் — நம் சமூகத்தில் உள்ள அனைவரும் உங்களை எளிதாக கண்டுபிடிக்கலாம்.",
    categoryAll: "அனைத்தும்",
    clearFilters: "வடிகட்டிகளை நீக்கு",
    shopBadge: "ஆன்லைன் ஆர்டர்",
    callNow: "அழைக்க",
    membersMissingPrompt: "உங்கள் தொழில் பட்டியலில் இல்லையா?",
    copyLink: "லிங்க் நகலெடு",
    linkCopied: "நகலெடுக்கப்பட்டது!",
    productsSubtitle: "பொருட்களை கார்ட்டில் சேர்த்து WhatsApp மூலம் ஆர்டர் செய்யுங்கள்.",
    atAGlance: "ஒரே பார்வையில்",
    factMonthly: "மாதாந்திர சந்தா",
    factCollection: "வசூல் நாள்",
    factCollectionValue: "முதல் ஞாயிறு",
    factLimit: "உதவி வரம்பு",
    factLimitValue: "2× · அதிகபட்சம் ₹5000",
    factInterestFree: "வட்டி இல்லா காலம்",
    factInterestFreeValue: "2 மாதங்கள்",
    calcHeading: "உதவி கணிப்பான்",
    calcSubtitle: "நீங்கள் எவ்வளவு உதவி பெறலாம், எவ்வளவு திருப்பி செலுத்த வேண்டும் என கணக்கிடுங்கள்.",
    calcMonthsLabel: "சந்தா செலுத்திய மாதங்கள்",
    calcPaid: "செலுத்திய தொகை",
    calcEligible: "பெறக்கூடிய உதவி",
    calcCapReached: "அதிகபட்ச வரம்பு ₹5000",
    calcLoanLabel: "கடன் தொகை",
    calcRepayLabel: "திருப்பி செலுத்தும் காலம் (மாதங்கள்)",
    calcInterest: "வட்டி",
    calcTotalRepay: "திருப்பி செலுத்த வேண்டியது",
    calcInterestNote: "முதல் 2 மாதங்கள் வட்டி இல்லை; அதன் பிறகு மாதத்திற்கு 1% (₹100க்கு ₹1) என கணக்கிடப்படுகிறது.",
    calcDisclaimer: "இது ஒரு மதிப்பீடு மட்டுமே — இறுதி முடிவு நிர்வாகக் குழுவுடையது.",
    monthsUnit: "மாதங்கள்",
    rulesAllHeading: "முழு விதிமுறைகள்",
    contactFormPhoneLabel: "உங்கள் மொபைல் எண் (விருப்பம்)",
    contactFormPhonePlaceholder: "நாங்கள் திரும்ப அழைக்க",
    contactSubmitServer: "செய்தியை அனுப்பு",
    contactSuccessTitle: "உங்கள் செய்தி கிடைத்தது!",
    contactSuccessText: "நிர்வாகி விரைவில் உங்களை தொடர்பு கொள்வார்.",
    sendAnother: "மற்றொரு செய்தி அனுப்ப",
    orWhatsAppDirect: "அல்லது WhatsApp-ல் நேரடியாக பேசுங்கள்",
    serverFallbackNotice: "சர்வரை அடைய முடியவில்லை — தயவுசெய்து WhatsApp மூலம் அனுப்புங்கள்.",
    sending: "அனுப்புகிறது...",
    committeeHeading: "நிர்வாகக் குழு",
    openInMaps: "வரைபடத்தில் பார்க்க",
    faqHeading: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    joinSubtitleServer: "படிவத்தை சமர்ப்பிக்கவும் — நிர்வாகி பரிசீலித்து உங்களை Directory-ல் சேர்ப்பார்.",
    joinSubmitServer: "விவரங்களை சமர்ப்பிக்க",
    joinSuccessTitle: "விவரங்கள் சமர்ப்பிக்கப்பட்டன!",
    joinSuccessText: "நிர்வாகி சரிபார்த்த பிறகு உங்கள் விவரங்கள் Directory-ல் தோன்றும்.",
    joinSendPhotosWhatsApp: "படங்களை WhatsApp-ல் அனுப்ப",
    joinPreviewHeading: "நேரடி முன்னோட்டம்",
    joinPreviewHint: "உங்கள் பட்டியல் இப்படித்தான் தோன்றும்",
    joinSectionPersonal: "உங்கள் விவரங்கள்",
    joinSectionBusiness: "தொழில் விவரங்கள்",
    joinPhoneInvalid: "சரியான மொபைல் எண்ணை உள்ளிடவும்",
    joinPreviewNamePlaceholder: "உங்கள் பெயர்",
    footerAboutHeading: "எங்களைப் பற்றி",
    footerContactHeading: "தொடர்பு கொள்ள",
    backToTop: "மேலே செல்ல",
    footerAdmin: "நிர்வாகம்",
    tryAgain: "மீண்டும் முயற்சிக்க",
  },
  en: {
    navHome: "Home",
    navMembers: "Members",
    navRules: "Rules",
    navContact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNavLabel: "Primary navigation",
    mobileNavLabel: "Mobile navigation",
    themeToggleToLight: "Switch to light mode",
    themeToggleToDark: "Switch to dark mode",

    heroCtaMembers: "Our Members",
    heroCtaRules: "View Rules",
    heroCtaWhatsApp: "Contact via WhatsApp",

    aboutHeading: "About Our Community",

    membersPageTitle: "Our Members",
    membersPageSubtitle:
      "Browse our members' businesses and services, and reach out directly over WhatsApp.",
    searchPlaceholder: "Search by name / business...",
    allCategories: "All Categories",
    allLocations: "All Locations",
    membersFoundSuffix: "member(s) found",
    noMembersFoundTitle: "No members found",
    noMembersFoundMessage: "Try a different search or filter.",
    viewProfile: "View Profile",

    memberNotFoundTitle: "Member Not Found",
    memberNotFoundMessage: "The member profile you're looking for doesn't exist or may have been removed.",
    backToMembers: "Back to Members",

    profileAboutHeading: "About",
    profileServicesHeading: "Services",
    profilePhotosHeading: "Business Photos",
    profileContactHeading: "Contact",
    whatsAppEnquiry: "WhatsApp Enquiry",
    shareBusinessDetails: "Share Business Details",

    rulesPageTitle: "Rules & Regulations",
    rulesPageSubtitle: "All members are requested to follow the rules below.",
    futurePlanBadge: "Future plan — subject to feasibility/approval",

    contactPageTitle: "Contact Us",
    contactPageSubtitle: "Reach us on WhatsApp for any questions.",
    generalEnquiryHeading: "General Enquiry",
    generalEnquiryMessage: "For any question about the association, contact us directly on WhatsApp.",
    generalWhatsAppCta: "Contact via WhatsApp",
    sendWhatsApp: "Send WhatsApp",
    addressHeading: "Address",
    contactFormNameLabel: "Name",
    contactFormNamePlaceholder: "Your name",
    contactFormMessageLabel: "Your Message",
    contactFormMessagePlaceholder: "Write your question/need (optional)",
    contactFormSubmit: "Send via WhatsApp",

    notFoundTitle: "Page Not Found",
    notFoundMessage: "The page you're looking for doesn't exist or has been moved.",
    backHome: "Back to Home",

    footerNavHeading: "Navigation",
    footerRights: "All rights reserved.",

    floatingWhatsAppLabel: "Contact via WhatsApp",
    closeNotice: "Dismiss notice",

    productsHeading: "Products",
    addToCart: "Add to Cart",
    increaseQuantity: "Increase quantity",
    decreaseQuantity: "Decrease quantity",
    removeFromCart: "Remove",
    cartHeading: "Your Cart",
    cartEmptyMessage: "Your cart is empty. Add some products.",
    cartItemsSuffix: "item(s)",
    cartTotalLabel: "Total",
    expandCart: "Expand cart",
    collapseCart: "Collapse cart",
    sendOrderWhatsApp: "Send Order via WhatsApp",
    printOrder: "Print Order",
    orderSummaryTitle: "Order Summary",
    orderDateLabel: "Date",
    cartItemColumn: "Item",
    cartQtyColumn: "Qty",
    cartAmountColumn: "Amount",

    navViewMembers: "View Members",
    navAddDetails: "Add My Details",

    joinPageTitle: "Add My Details",
    joinPageSubtitle:
      "Fill in the form and submit — your details will be sent to our Admin via WhatsApp, who will review and add you to the directory.",
    joinFormNameLabel: "Name",
    joinFormNamePlaceholder: "Your full name",
    joinFormBusinessLabel: "Business Name",
    joinFormBusinessPlaceholder: "e.g. Sri Vinayaga Electricals",
    joinFormCategoryLabel: "Category",
    joinFormCategoryPlaceholder: "e.g. Electrical Services, Tailoring, Catering",
    joinFormLocationLabel: "Location",
    joinFormLocationPlaceholder: "e.g. Anthiyur",
    joinFormPhoneLabel: "Contact Number",
    joinFormPhonePlaceholder: "10-digit mobile number",
    joinFormDescriptionLabel: "Description",
    joinFormDescriptionPlaceholder: "A short note about your business/service",
    joinFormServicesLabel: "Services (comma-separated)",
    joinFormServicesPlaceholder: "e.g. Home Wiring, Electrical Repairs",
    joinFormPhotosLabel: "Would you like to send business photos too?",
    joinFormPhotosYes: "Yes",
    joinFormPhotosNo: "No",
    joinFormPhotosNote:
      "Photos can't be attached directly through this link — once the WhatsApp chat opens, you can attach them yourself.",
    joinFormRequiredNote: "* Required fields",
    joinFormRequiredError: "This field is required",
    joinFormSubmit: "Send via WhatsApp",
    skipToContent: "Skip to content",
    heroStatMembers: "Member businesses",
    heroStatMonthly: "Monthly contribution",
    heroStatMaxHelp: "Max assistance",
    heroStatPlaces: "Towns",
    heroTrustLine: "By relatives, for relatives",
    aboutEyebrow: "Our purpose",
    howEyebrow: "3 simple steps",
    howHeading: "How it works",
    howSubtitle: "Everyone's small monthly share becomes real help for whoever needs it.",
    step1Title: "Join the association",
    step1Text: "Contact the admin on WhatsApp and register as a member.",
    step2Title: "Contribute ₹500 a month",
    step2Text: "Collected on the first Sunday of every month.",
    step3Title: "Get help when it matters",
    step3Text: "Up to 2× what you've contributed — maximum ₹5000.",
    featuredEyebrow: "Local businesses",
    featuredHeading: "Businesses run by our members",
    featuredSubtitle: "Support the shops and services run by our own relatives.",
    viewAllMembers: "View all members",
    ctaBannerTitle: "Get your business listed too",
    ctaBannerText: "Share your details and everyone in our community can find you easily.",
    categoryAll: "All",
    clearFilters: "Clear filters",
    shopBadge: "Order online",
    callNow: "Call",
    membersMissingPrompt: "Is your business missing?",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
    productsSubtitle: "Add items to your cart and send the order on WhatsApp.",
    atAGlance: "At a glance",
    factMonthly: "Monthly contribution",
    factCollection: "Collection day",
    factCollectionValue: "1st Sunday",
    factLimit: "Assistance limit",
    factLimitValue: "2× · max ₹5000",
    factInterestFree: "Interest-free period",
    factInterestFreeValue: "2 months",
    calcHeading: "Assistance calculator",
    calcSubtitle: "Estimate how much you can receive and how much you'd repay.",
    calcMonthsLabel: "Months contributed",
    calcPaid: "Total contributed",
    calcEligible: "Eligible assistance",
    calcCapReached: "Capped at the ₹5000 maximum",
    calcLoanLabel: "Loan amount",
    calcRepayLabel: "Repay after (months)",
    calcInterest: "Interest",
    calcTotalRepay: "Total to repay",
    calcInterestNote: "No interest for the first 2 months; after that it's calculated at 1% per month (₹1 per ₹100).",
    calcDisclaimer: "This is only an estimate — the committee makes the final decision.",
    monthsUnit: "months",
    rulesAllHeading: "All rules",
    contactFormPhoneLabel: "Your mobile number (optional)",
    contactFormPhonePlaceholder: "So we can call you back",
    contactSubmitServer: "Send message",
    contactSuccessTitle: "Message received!",
    contactSuccessText: "An admin will get back to you soon.",
    sendAnother: "Send another message",
    orWhatsAppDirect: "Or chat with us directly on WhatsApp",
    serverFallbackNotice: "We couldn't reach the server — please send it via WhatsApp instead.",
    sending: "Sending...",
    committeeHeading: "Committee",
    openInMaps: "Open in Maps",
    faqHeading: "Frequently asked questions",
    joinSubtitleServer: "Submit the form — an admin will review it and add you to the directory.",
    joinSubmitServer: "Submit my details",
    joinSuccessTitle: "Details submitted!",
    joinSuccessText: "Your listing will appear in the directory once an admin approves it.",
    joinSendPhotosWhatsApp: "Send photos on WhatsApp",
    joinPreviewHeading: "Live preview",
    joinPreviewHint: "This is how your listing will look",
    joinSectionPersonal: "About you",
    joinSectionBusiness: "Your business",
    joinPhoneInvalid: "Enter a valid mobile number",
    joinPreviewNamePlaceholder: "Your name",
    footerAboutHeading: "About us",
    footerContactHeading: "Get in touch",
    backToTop: "Back to top",
    footerAdmin: "Admin",
    tryAgain: "Try again",
  },
};
