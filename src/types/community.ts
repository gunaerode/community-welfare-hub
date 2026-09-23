export interface CommunityFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AnnouncementContent {
  title: string;
  intro: string;
  points: string[];
  note: string;
  primaryButtonText: string;
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
  body: string[];
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
}
