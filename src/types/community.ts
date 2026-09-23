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
