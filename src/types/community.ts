export interface CommunityFeature {
  id: string;
  icon: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
}

export interface AnnouncementContent {
  title: string;
  titleEn?: string;
  intro: string;
  introEn?: string;
  points: string[];
  pointsEn?: string[];
  note: string;
  noteEn?: string;
  primaryButtonText: string;
  primaryButtonTextEn?: string;
  secondaryButtonText: string;
}

export interface ContactPerson {
  role: string;
  name: string;
  phone: string;
}

export interface RuleSection {
  id: string;
  icon: string;
  title: string;
  titleEn?: string;
  body: string[];
  bodyEn?: string[];
  isFuturePlan?: boolean;
}

export interface SiteNoticeConfig {
  /** Master on/off switch — set to false to hide the banner entirely. */
  enabled: boolean;
  /**
   * When true, shows a close button and remembers the dismissal (localStorage)
   * so it stays hidden for that visitor. When false, there is no close button
   * and the banner always shows on every visit.
   */
  dismissible: boolean;
  message: string;
  messageEn?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}
