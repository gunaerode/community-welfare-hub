import type { AnnouncementContent, SiteNoticeConfig } from "./community";
import type { JoinRequestData, Member } from "./member";

export type RequestStatus = "pending" | "approved" | "rejected";

/** A "Add My Details" submission stored on the server, awaiting admin review. */
export interface JoinRequest extends Omit<JoinRequestData, "services"> {
  id: string;
  services: string;
  status: RequestStatus;
  createdAt: string;
  reviewedAt?: string;
  /** Id of the directory entry created when the request was approved. */
  memberId?: string;
}

/** A message sent from the Contact page form. */
export interface ContactMessage {
  id: string;
  name: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

/** Member records kept on the server — approved join requests or admin edits. */
export interface ServerMember extends Member {
  createdAt?: string;
  updatedAt?: string;
}

export interface MembersResponse {
  /** Members added/edited on the server. Same id as a built-in member = override. */
  members: ServerMember[];
  /** Ids (built-in or server) the admin has hidden from the public directory. */
  hiddenIds: string[];
}

/** Content the admin can edit live. `null` = use the built-in default from src/data. */
export interface SiteContentResponse {
  announcement: AnnouncementContent | null;
  siteNotice: SiteNoticeConfig | null;
  /** ISO timestamp of the last content change — used to re-show the announcement. */
  updatedAt: string | null;
}

export interface NewContactMessage {
  name: string;
  phone?: string;
  message: string;
}
