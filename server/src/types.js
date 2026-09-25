/**
 * JSDoc type definitions (no runtime code). Shapes mirror src/types/*.ts in
 * the frontend so the two stay in sync.
 *
 * @typedef {{
 *   id: string, name: string, businessName?: string,
 *   category?: string, categoryEn?: string, location?: string, locationEn?: string,
 *   phone?: string, image?: string, description?: string, descriptionEn?: string,
 *   services?: string[], servicesEn?: string[], businessImages?: string[],
 *   products?: unknown[], createdAt?: string, updatedAt?: string
 * }} Member
 *
 * @typedef {{
 *   id: string, name: string, businessName: string, category: string, location: string,
 *   phone: string, description: string, services: string, wantsToSendPhotos: boolean,
 *   status: "pending" | "approved" | "rejected", createdAt: string, reviewedAt?: string, memberId?: string
 * }} JoinRequest
 *
 * @typedef {{ id: string, name: string, phone?: string, message: string, read: boolean, createdAt: string }} ContactMessage
 *
 * @typedef {{ announcement: object | null, siteNotice: object | null, updatedAt: string | null }} SiteContent
 *
 * @typedef {{
 *   members: Member[], hiddenMemberIds: string[], joinRequests: JoinRequest[],
 *   messages: ContactMessage[], content: SiteContent
 * }} Db
 */
export {};
