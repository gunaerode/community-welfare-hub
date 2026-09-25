import { API_TIMEOUT_MS, API_URL, SERVER_ENABLED } from "../config/runtime";
import type { AnnouncementContent, SiteNoticeConfig } from "../types/community";
import type { JoinRequestData } from "../types/member";
import type {
  ContactMessage,
  JoinRequest,
  MembersResponse,
  NewContactMessage,
  ServerMember,
  SiteContentResponse,
} from "../types/server";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
}

async function request<T>(path: string, { method = "GET", body, token }: RequestOptions = {}): Promise<T> {
  if (!SERVER_ENABLED) throw new ApiError("Server mode is not enabled", 0);

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    const text = await response.text();
    const data = text ? (JSON.parse(text) as unknown) : null;
    if (!response.ok) {
      const message =
        data && typeof data === "object" && "error" in data ? String((data as { error: unknown }).error) : response.statusText;
      throw new ApiError(message || "Request failed", response.status);
    }
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error instanceof Error ? error.message : "Network error", 0);
  } finally {
    window.clearTimeout(timer);
  }
}

/* ---------- public ---------- */

export const api = {
  health: () => request<{ ok: boolean; time: string }>("/api/health"),
  members: () => request<MembersResponse>("/api/members"),
  content: () => request<SiteContentResponse>("/api/content"),
  submitJoinRequest: (data: JoinRequestData, honeypot = "") =>
    request<{ id: string }>("/api/join-requests", { method: "POST", body: { ...data, website: honeypot } }),
  sendMessage: (data: NewContactMessage, honeypot = "") =>
    request<{ id: string }>("/api/messages", { method: "POST", body: { ...data, website: honeypot } }),
};

/* ---------- admin (Bearer token = ADMIN_TOKEN on the server) ---------- */

export interface ApproveOverrides {
  id?: string;
  categoryEn?: string;
  locationEn?: string;
  descriptionEn?: string;
  image?: string;
}

export const adminApi = {
  verify: (token: string) => request<{ ok: boolean }>("/api/admin/verify", { token }),

  joinRequests: (token: string) => request<{ items: JoinRequest[] }>("/api/admin/join-requests", { token }),
  approve: (token: string, id: string, overrides: ApproveOverrides = {}) =>
    request<{ member: ServerMember }>(`/api/admin/join-requests/${encodeURIComponent(id)}/approve`, {
      method: "POST",
      body: overrides,
      token,
    }),
  reject: (token: string, id: string) =>
    request<{ ok: boolean }>(`/api/admin/join-requests/${encodeURIComponent(id)}/reject`, { method: "POST", token }),
  deleteJoinRequest: (token: string, id: string) =>
    request<{ ok: boolean }>(`/api/admin/join-requests/${encodeURIComponent(id)}`, { method: "DELETE", token }),

  messages: (token: string) => request<{ items: ContactMessage[] }>("/api/admin/messages", { token }),
  markMessage: (token: string, id: string, read: boolean) =>
    request<{ ok: boolean }>(`/api/admin/messages/${encodeURIComponent(id)}`, { method: "PATCH", body: { read }, token }),
  deleteMessage: (token: string, id: string) =>
    request<{ ok: boolean }>(`/api/admin/messages/${encodeURIComponent(id)}`, { method: "DELETE", token }),

  setMemberHidden: (token: string, id: string, hidden: boolean) =>
    request<{ ok: boolean }>(`/api/admin/members/${encodeURIComponent(id)}/visibility`, {
      method: "POST",
      body: { hidden },
      token,
    }),
  deleteMember: (token: string, id: string) =>
    request<{ ok: boolean }>(`/api/admin/members/${encodeURIComponent(id)}`, { method: "DELETE", token }),

  updateContent: (
    token: string,
    content: { announcement?: AnnouncementContent | null; siteNotice?: SiteNoticeConfig | null },
  ) => request<SiteContentResponse>("/api/admin/content", { method: "PUT", body: content, token }),
};
