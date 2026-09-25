/**
 * Runtime mode switch.
 *
 * The site runs in one of two modes, picked at build time:
 *
 *  - STATIC mode (default) — no `VITE_API_URL` set. Everything works on
 *    GitHub Pages exactly like before: content comes from `src/data/*.ts` and
 *    forms hand off to WhatsApp.
 *
 *  - SERVER mode — `VITE_API_URL` points at the API in `server/` (e.g.
 *    `https://cwh-api.onrender.com`). Forms are saved on the server, the
 *    admin page (`#/admin`) is enabled, and members/announcements are loaded
 *    live. If the server can't be reached, the site quietly falls back to
 *    the static content and WhatsApp, so visitors are never stuck.
 *
 * Set it in `.env.local` for local dev, or as a GitHub repository variable
 * named `VITE_API_URL` for the GitHub Pages build (see README).
 */
export const API_URL: string = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");

export const SERVER_ENABLED: boolean = API_URL.length > 0;

/** How long to wait for the server before falling back to static content. */
export const API_TIMEOUT_MS = 8000;
