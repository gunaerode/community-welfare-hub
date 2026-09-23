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
  joinFormRequiredNote: string;
  joinFormRequiredError: string;
  joinFormSubmit: string;
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
    whatsAppEnquiry: "📱 WhatsApp Enquiry",
    shareBusinessDetails: "📤 Share Business Details",

    rulesPageTitle: "விதிமுறைகள் & நடைமுறைகள்",
    rulesPageSubtitle: "அனைத்து உறுப்பினர்களும் கீழ்கண்ட விதிமுறைகளை கடைபிடிக்குமாறு கேட்டுக்கொள்கிறோம்.",
    futurePlanBadge: "எதிர்கால திட்டம் — feasibility/approval-ஐ பொறுத்தது",

    contactPageTitle: "தொடர்பு கொள்ள",
    contactPageSubtitle: "தொடர்பான கேள்விகளுக்கு எங்களை WhatsApp மூலம் அணுகவும்.",
    generalEnquiryHeading: "பொது விசாரணை",
    generalEnquiryMessage: "சங்கம் தொடர்பான எந்த கேள்விக்கும் நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ளுங்கள்.",
    generalWhatsAppCta: "WhatsApp மூலம் தொடர்பு கொள்ள",
    sendWhatsApp: "📱 WhatsApp அனுப்ப",
    addressHeading: "முகவரி",

    notFoundTitle: "பக்கம் கிடைக்கவில்லை",
    notFoundMessage: "நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது.",
    backHome: "முகப்பு பக்கத்திற்கு திரும்பு",

    footerNavHeading: "வழிசெலுத்தல்",
    footerRights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

    floatingWhatsAppLabel: "WhatsApp மூலம் தொடர்பு கொள்ள",
    closeNotice: "அறிவிப்பை மூடு",

    productsHeading: "பொருட்கள்",
    addToCart: "🛒 கார்ட்டில் சேர்",
    increaseQuantity: "அளவை அதிகரி",
    decreaseQuantity: "அளவை குறை",
    removeFromCart: "நீக்கு",
    cartHeading: "🛒 உங்கள் கார்ட்",
    cartEmptyMessage: "உங்கள் கார்ட் காலியாக உள்ளது. பொருட்களை சேர்க்கவும்.",
    cartItemsSuffix: "பொருட்கள்",
    cartTotalLabel: "மொத்தம்",
    sendOrderWhatsApp: "🛒 WhatsApp மூலம் ஆர்டர் அனுப்ப",
    printOrder: "🖨️ ஆர்டரை பிரிண்ட் செய்ய",
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
    joinFormRequiredNote: "* தேவையான புலங்கள்",
    joinFormRequiredError: "இந்த புலம் தேவை",
    joinFormSubmit: "📤 WhatsApp மூலம் அனுப்ப",
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
    whatsAppEnquiry: "📱 WhatsApp Enquiry",
    shareBusinessDetails: "📤 Share Business Details",

    rulesPageTitle: "Rules & Regulations",
    rulesPageSubtitle: "All members are requested to follow the rules below.",
    futurePlanBadge: "Future plan — subject to feasibility/approval",

    contactPageTitle: "Contact Us",
    contactPageSubtitle: "Reach us on WhatsApp for any questions.",
    generalEnquiryHeading: "General Enquiry",
    generalEnquiryMessage: "For any question about the association, contact us directly on WhatsApp.",
    generalWhatsAppCta: "Contact via WhatsApp",
    sendWhatsApp: "📱 Send WhatsApp",
    addressHeading: "Address",

    notFoundTitle: "Page Not Found",
    notFoundMessage: "The page you're looking for doesn't exist or has been moved.",
    backHome: "Back to Home",

    footerNavHeading: "Navigation",
    footerRights: "All rights reserved.",

    floatingWhatsAppLabel: "Contact via WhatsApp",
    closeNotice: "Dismiss notice",

    productsHeading: "Products",
    addToCart: "🛒 Add to Cart",
    increaseQuantity: "Increase quantity",
    decreaseQuantity: "Decrease quantity",
    removeFromCart: "Remove",
    cartHeading: "🛒 Your Cart",
    cartEmptyMessage: "Your cart is empty. Add some products.",
    cartItemsSuffix: "item(s)",
    cartTotalLabel: "Total",
    sendOrderWhatsApp: "🛒 Send Order via WhatsApp",
    printOrder: "🖨️ Print Order",
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
    joinFormRequiredNote: "* Required fields",
    joinFormRequiredError: "This field is required",
    joinFormSubmit: "📤 Send via WhatsApp",
  },
};
