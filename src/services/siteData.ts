import { useEffect, useMemo, useSyncExternalStore } from "react";
import { SERVER_ENABLED } from "../config/runtime";
import { SITE_NOTICE } from "../constants/site";
import { ANNOUNCEMENT } from "../data/community";
import { MEMBERS } from "../data/members";
import type { AnnouncementContent, SiteNoticeConfig } from "../types/community";
import type { Member } from "../types/member";
import type { MembersResponse, SiteContentResponse } from "../types/server";
import { api } from "./api";

/**
 * Where the data on screen came from:
 *  - "static"  — static mode (no server configured); built-in data only
 *  - "loading" — server mode, first request still in flight (built-in data shown meanwhile)
 *  - "live"    — server responded; data merged with the built-in list
 *  - "offline" — server mode, but the server couldn't be reached; built-in data shown
 */
export type DataStatus = "static" | "loading" | "live" | "offline";

interface Resource<T> {
  get: () => { data: T; status: DataStatus };
  subscribe: (listener: () => void) => () => void;
  load: (force?: boolean) => Promise<void>;
}

/** Tiny cached resource: fetched once per page load, shared by every component that uses it. */
function createResource<T>(fallback: T, fetcher: () => Promise<T>): Resource<T> {
  let snapshot: { data: T; status: DataStatus } = { data: fallback, status: SERVER_ENABLED ? "loading" : "static" };
  let inFlight: Promise<void> | null = null;
  let loaded = false;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());

  return {
    get: () => snapshot,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    load: (force = false) => {
      if (!SERVER_ENABLED || (loaded && !force && !inFlight)) return Promise.resolve();
      if (inFlight) return inFlight;
      inFlight = fetcher()
        .then((data) => {
          snapshot = { data, status: "live" };
        })
        .catch(() => {
          // Keep whatever we had (built-in data or the last good server response).
          snapshot = { ...snapshot, status: snapshot.status === "live" ? "live" : "offline" };
        })
        .finally(() => {
          loaded = true;
          inFlight = null;
          emit();
        });
      return inFlight;
    },
  };
}

/* ---------------- members ---------------- */

/** Built-in members, minus hidden ones, with server overrides applied and new server members appended. */
export type DirectoryMember = Member & { hidden?: boolean; source: "built-in" | "server" };

export function mergeMembers(response: MembersResponse | null, includeHidden = false): DirectoryMember[] {
  const hidden = new Set(response?.hiddenIds ?? []);
  const serverById = new Map((response?.members ?? []).map((m) => [m.id, m]));

  const merged: DirectoryMember[] = MEMBERS.map((m) => {
    const override = serverById.get(m.id);
    serverById.delete(m.id);
    return { ...(override ?? m), source: override ? "server" : "built-in", hidden: hidden.has(m.id) };
  });
  for (const m of serverById.values()) merged.push({ ...m, source: "server", hidden: hidden.has(m.id) });

  return includeHidden ? merged : merged.filter((m) => !m.hidden);
}

const membersResource = createResource<MembersResponse | null>(null, () => api.members());

export function useMembers(options: { includeHidden?: boolean } = {}) {
  const snap = useSyncExternalStore(membersResource.subscribe, membersResource.get);
  useEffect(() => void membersResource.load(), []);
  const includeHidden = options.includeHidden ?? false;
  const members = useMemo(() => mergeMembers(snap.data, includeHidden), [snap.data, includeHidden]);
  return { members, status: snap.status };
}

export function refreshMembers(): Promise<void> {
  return membersResource.load(true);
}

/* ---------------- editable site content ---------------- */

const contentResource = createResource<SiteContentResponse>(
  { announcement: null, siteNotice: null, updatedAt: null },
  () => api.content(),
);

export function useSiteContent(): {
  announcement: AnnouncementContent;
  siteNotice: SiteNoticeConfig;
  updatedAt: string | null;
  status: DataStatus;
  /** True when the admin has published custom content (vs. the built-in defaults). */
  custom: { announcement: boolean; siteNotice: boolean };
} {
  const snap = useSyncExternalStore(contentResource.subscribe, contentResource.get);
  useEffect(() => void contentResource.load(), []);
  return {
    announcement: snap.data.announcement ?? ANNOUNCEMENT,
    siteNotice: snap.data.siteNotice ?? SITE_NOTICE,
    updatedAt: snap.data.updatedAt,
    status: snap.status,
    custom: { announcement: snap.data.announcement !== null, siteNotice: snap.data.siteNotice !== null },
  };
}

export function refreshSiteContent(): Promise<void> {
  return contentResource.load(true);
}
