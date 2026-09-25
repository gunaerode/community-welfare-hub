import { createHash, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { HttpError, Router, rateLimit, readJsonBody, sendJson } from "./http.js";
import {
  announcementInput,
  joinRequestInput,
  messageInput,
  newId,
  siteNoticeInput,
  slugify,
  text,
  url,
} from "./validation.js";

const MAX_MESSAGES = 2000;
const MAX_JOIN_REQUESTS = 2000;

/**
 * @param {{
 *   store: import("./store.js").Store,
 *   adminToken?: string,
 *   allowedOrigins?: string[],
 *   trustProxy?: boolean,
 *   bodyLimitBytes?: number,
 *   publicPostLimit?: number,
 * }} config
 */
export function createApp(config) {
  const {
    store,
    adminToken = "",
    allowedOrigins = ["*"],
    trustProxy = true,
    bodyLimitBytes = 32 * 1024,
    publicPostLimit = 10,
  } = config;
  const router = new Router();
  const now = () => new Date().toISOString();

  /* ---------- middleware ---------- */

  const publicPostLimiter = rateLimit({ name: "public-post", windowMs: 10 * 60 * 1000, max: publicPostLimit });
  const adminFailures = new Map(); // ip -> { count, resetAt }

  const tokenHash = adminToken ? createHash("sha256").update(adminToken).digest() : null;

  /** @type {import("./http.js").Handler} */
  const requireAdmin = (req) => {
    if (!tokenHash) throw new HttpError(503, "Admin is disabled: set ADMIN_TOKEN on the server");
    const fail = adminFailures.get(req.ip);
    if (fail && fail.resetAt > Date.now() && fail.count >= 10) {
      throw new HttpError(429, "Too many failed attempts, try again in 15 minutes");
    }
    const header = req.headers.authorization ?? "";
    const given = header.startsWith("Bearer ") ? header.slice(7) : "";
    const givenHash = createHash("sha256").update(given).digest();
    if (!given || !timingSafeEqual(givenHash, tokenHash)) {
      const entry = fail && fail.resetAt > Date.now() ? fail : { count: 0, resetAt: Date.now() + 15 * 60 * 1000 };
      entry.count += 1;
      adminFailures.set(req.ip, entry);
      throw new HttpError(401, "Invalid admin password");
    }
    adminFailures.delete(req.ip);
  };

  /** Bots fill every field; real visitors never see this one. */
  const honeypot = (req) => {
    if (req.body && typeof req.body.website === "string" && req.body.website.trim() !== "") {
      throw new HttpError(400, "Rejected");
    }
  };

  /* ---------- public routes ---------- */

  router.get("/", () => ({ name: "community-welfare-hub API", health: "/api/health" }));

  router.get("/api/health", () => ({ ok: true, time: now() }));

  router.get("/api/members", () => ({
    members: store.data.members,
    hiddenIds: store.data.hiddenMemberIds,
  }));

  router.get("/api/content", () => store.data.content);

  router.post("/api/join-requests", publicPostLimiter, honeypot, async (req, res) => {
    const input = joinRequestInput(req.body);
    const item = { id: newId("jr"), ...input, status: "pending", createdAt: now() };
    await store.update((db) => {
      db.joinRequests.unshift(item);
      if (db.joinRequests.length > MAX_JOIN_REQUESTS) db.joinRequests.length = MAX_JOIN_REQUESTS;
    });
    res.statusCode = 201;
    return { id: item.id };
  });

  router.post("/api/messages", publicPostLimiter, honeypot, async (req, res) => {
    const input = messageInput(req.body);
    const item = { id: newId("msg"), ...input, read: false, createdAt: now() };
    await store.update((db) => {
      db.messages.unshift(item);
      if (db.messages.length > MAX_MESSAGES) db.messages.length = MAX_MESSAGES;
    });
    res.statusCode = 201;
    return { id: item.id };
  });

  /* ---------- admin routes ---------- */

  router.get("/api/admin/verify", requireAdmin, () => ({ ok: true }));

  router.get("/api/admin/join-requests", requireAdmin, () => ({ items: store.data.joinRequests }));

  router.post("/api/admin/join-requests/:id/approve", requireAdmin, async (req) => {
    const overrides = {
      id: text(req.body.id, "id", { max: 60 }),
      categoryEn: text(req.body.categoryEn, "categoryEn", { max: 80 }),
      locationEn: text(req.body.locationEn, "locationEn", { max: 80 }),
      descriptionEn: text(req.body.descriptionEn, "descriptionEn", { max: 1000 }),
      image: url(req.body.image, "image"),
    };
    return store.update((db) => {
      const request = db.joinRequests.find((r) => r.id === req.params.id);
      if (!request) throw new HttpError(404, "Join request not found");
      if (request.status === "approved") throw new HttpError(409, "Already approved");

      const base = slugify(overrides.id) || slugify(`${request.name} ${request.businessName}`) || "member";
      let memberId = overrides.id ? base : `${base}-${Math.random().toString(36).slice(2, 6)}`;
      while (db.members.some((m) => m.id === memberId)) memberId = `${base}-${Math.random().toString(36).slice(2, 6)}`;

      const services = request.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 20);
      /** @type {import("./types.js").Member} */
      const member = {
        id: memberId,
        name: request.name,
        ...(request.businessName && { businessName: request.businessName }),
        ...(request.category && { category: request.category }),
        ...(overrides.categoryEn && { categoryEn: overrides.categoryEn }),
        ...(request.location && { location: request.location }),
        ...(overrides.locationEn && { locationEn: overrides.locationEn }),
        phone: request.phone,
        ...(request.description && { description: request.description }),
        ...(overrides.descriptionEn && { descriptionEn: overrides.descriptionEn }),
        ...(services.length > 0 && { services }),
        ...(overrides.image && { image: overrides.image }),
        createdAt: now(),
        updatedAt: now(),
      };
      db.members.push(member);
      request.status = "approved";
      request.reviewedAt = now();
      request.memberId = memberId;
      return { member };
    });
  });

  router.post("/api/admin/join-requests/:id/reject", requireAdmin, (req) =>
    store.update((db) => {
      const request = db.joinRequests.find((r) => r.id === req.params.id);
      if (!request) throw new HttpError(404, "Join request not found");
      request.status = "rejected";
      request.reviewedAt = now();
      return { ok: true };
    }),
  );

  router.delete("/api/admin/join-requests/:id", requireAdmin, (req) =>
    store.update((db) => {
      const before = db.joinRequests.length;
      db.joinRequests = db.joinRequests.filter((r) => r.id !== req.params.id);
      if (db.joinRequests.length === before) throw new HttpError(404, "Join request not found");
      return { ok: true };
    }),
  );

  router.get("/api/admin/messages", requireAdmin, () => ({ items: store.data.messages }));

  router.patch("/api/admin/messages/:id", requireAdmin, (req) =>
    store.update((db) => {
      const msg = db.messages.find((m) => m.id === req.params.id);
      if (!msg) throw new HttpError(404, "Message not found");
      msg.read = req.body.read !== false;
      return { ok: true };
    }),
  );

  router.delete("/api/admin/messages/:id", requireAdmin, (req) =>
    store.update((db) => {
      const before = db.messages.length;
      db.messages = db.messages.filter((m) => m.id !== req.params.id);
      if (db.messages.length === before) throw new HttpError(404, "Message not found");
      return { ok: true };
    }),
  );

  /** Works for both built-in ids (from src/data/members.ts) and server-added members. */
  router.post("/api/admin/members/:id/visibility", requireAdmin, (req) => {
    const id = text(req.params.id, "id", { max: 80, required: true });
    return store.update((db) => {
      const hidden = new Set(db.hiddenMemberIds);
      if (req.body.hidden === false) hidden.delete(id);
      else hidden.add(id);
      db.hiddenMemberIds = [...hidden];
      return { ok: true };
    });
  });

  router.delete("/api/admin/members/:id", requireAdmin, (req) =>
    store.update((db) => {
      const before = db.members.length;
      db.members = db.members.filter((m) => m.id !== req.params.id);
      if (db.members.length === before) throw new HttpError(404, "Only server-added members can be deleted");
      db.hiddenMemberIds = db.hiddenMemberIds.filter((id) => id !== req.params.id);
      return { ok: true };
    }),
  );

  router.put("/api/admin/content", requireAdmin, (req) => {
    const changes = {};
    if ("announcement" in req.body) changes.announcement = announcementInput(req.body.announcement);
    if ("siteNotice" in req.body) changes.siteNotice = siteNoticeInput(req.body.siteNotice);
    return store.update((db) => {
      db.content = { ...db.content, ...changes, updatedAt: now() };
      return db.content;
    });
  });

  /* ---------- server ---------- */

  const allowAnyOrigin = allowedOrigins.includes("*");

  return createServer(async (rawReq, res) => {
    const req = /** @type {import("./http.js").Req} */ (rawReq);
    const origin = req.headers.origin;
    if (origin && (allowAnyOrigin || allowedOrigins.includes(origin))) {
      res.setHeader("Access-Control-Allow-Origin", allowAnyOrigin ? "*" : origin);
      res.setHeader("Vary", "Origin");
    }
    res.setHeader("X-Content-Type-Options", "nosniff");

    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.setHeader("Access-Control-Max-Age", "86400");
      res.writeHead(204).end();
      return;
    }

    const forwarded = trustProxy ? String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim() : "";
    req.ip = forwarded || req.socket.remoteAddress || "unknown";

    try {
      const { pathname } = new URL(req.url ?? "/", "http://localhost");
      const found = router.match(req.method ?? "GET", pathname);
      if (found === null) throw new HttpError(404, "Not found");
      if (found === "method-not-allowed") throw new HttpError(405, "Method not allowed");

      req.params = found.params;
      if (req.method !== "GET" && req.method !== "DELETE") req.body = await readJsonBody(req, bodyLimitBytes);
      else req.body = {};
      if (req.body === null || typeof req.body !== "object" || Array.isArray(req.body)) {
        throw new HttpError(400, "Body must be a JSON object");
      }

      let result;
      for (const handler of found.route.handlers) {
        result = await handler(req, res);
        if (res.writableEnded) return;
      }
      sendJson(res, res.statusCode && res.statusCode !== 200 ? res.statusCode : 200, result ?? { ok: true });
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      if (status === 500) console.error(error);
      if (!res.headersSent) sendJson(res, status, { error: status === 500 ? "Server error" : error.message });
      else res.end();
    }
  });
}
