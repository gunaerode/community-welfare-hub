import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { createApp } from "../src/app.js";
import { Store } from "../src/store.js";

const TOKEN = "test-admin-token-123";
let server;
let base;
let dir;

before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "cwh-"));
  const store = await new Store(dir).init();
  server = createApp({ store, adminToken: TOKEN, allowedOrigins: ["https://example.github.io"], publicPostLimit: 5 });
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.close();
  await rm(dir, { recursive: true, force: true });
});

const call = async (method, p, body, token) => {
  const res = await fetch(base + p, {
    method,
    headers: {
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      Origin: "https://example.github.io",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: res.status, headers: res.headers, data: await res.json().catch(() => null) };
};

test("health + CORS", async () => {
  const r = await call("GET", "/api/health");
  assert.equal(r.status, 200);
  assert.equal(r.data.ok, true);
  assert.equal(r.headers.get("access-control-allow-origin"), "https://example.github.io");
  const pre = await fetch(base + "/api/messages", { method: "OPTIONS", headers: { Origin: "https://evil.test" } });
  assert.equal(pre.status, 204);
  assert.equal(pre.headers.get("access-control-allow-origin"), null);
});

test("join request → approve → appears in directory", async () => {
  const bad = await call("POST", "/api/join-requests", { name: "", phone: "123" });
  assert.equal(bad.status, 400);

  const created = await call("POST", "/api/join-requests", {
    name: "Kumar",
    businessName: "Kumar Bakery",
    phone: "98765 43210",
    services: "Cakes, Snacks , ",
    category: "உணவு",
  });
  assert.equal(created.status, 201);

  assert.equal((await call("GET", "/api/admin/join-requests")).status, 401);
  assert.equal((await call("GET", "/api/admin/join-requests", undefined, "wrong")).status, 401);

  const list = await call("GET", "/api/admin/join-requests", undefined, TOKEN);
  assert.equal(list.data.items.length, 1);
  assert.equal(list.data.items[0].phone, "919876543210");
  assert.equal(list.data.items[0].status, "pending");

  const approved = await call(
    "POST",
    `/api/admin/join-requests/${created.data.id}/approve`,
    { categoryEn: "Food" },
    TOKEN,
  );
  assert.equal(approved.status, 200);
  assert.match(approved.data.member.id, /^kumar-kumar-bakery-/);
  assert.deepEqual(approved.data.member.services, ["Cakes", "Snacks"]);

  const again = await call("POST", `/api/admin/join-requests/${created.data.id}/approve`, {}, TOKEN);
  assert.equal(again.status, 409);

  const members = await call("GET", "/api/members");
  assert.equal(members.data.members.length, 1);
  assert.equal(members.data.members[0].categoryEn, "Food");
});

test("hide built-in member and restore", async () => {
  await call("POST", "/api/admin/members/ramesh-electrical/visibility", { hidden: true }, TOKEN);
  assert.deepEqual((await call("GET", "/api/members")).data.hiddenIds, ["ramesh-electrical"]);
  await call("POST", "/api/admin/members/ramesh-electrical/visibility", { hidden: false }, TOKEN);
  assert.deepEqual((await call("GET", "/api/members")).data.hiddenIds, []);
  assert.equal((await call("DELETE", "/api/admin/members/ramesh-electrical", undefined, TOKEN)).status, 404);
});

test("messages inbox + honeypot", async () => {
  const spam = await call("POST", "/api/messages", { name: "Bot", message: "hi", website: "http://spam" });
  assert.equal(spam.status, 400);
  const ok = await call("POST", "/api/messages", { name: "Anu", message: "Meeting date?" });
  assert.equal(ok.status, 201);
  const inbox = await call("GET", "/api/admin/messages", undefined, TOKEN);
  assert.equal(inbox.data.items[0].read, false);
  await call("PATCH", `/api/admin/messages/${ok.data.id}`, { read: true }, TOKEN);
  assert.equal((await call("GET", "/api/admin/messages", undefined, TOKEN)).data.items[0].read, true);
  assert.equal((await call("DELETE", `/api/admin/messages/${ok.data.id}`, undefined, TOKEN)).status, 200);
});

test("live content update, validation, reset", async () => {
  const invalid = await call("PUT", "/api/admin/content", { announcement: { title: "x", points: [] } }, TOKEN);
  assert.equal(invalid.status, 400);
  const updated = await call(
    "PUT",
    "/api/admin/content",
    {
      announcement: { title: "New", points: ["One"], primaryButtonText: "Rules", secondaryButtonText: "Close" },
      siteNotice: { enabled: true, dismissible: true, message: "Hello" },
    },
    TOKEN,
  );
  assert.equal(updated.status, 200);
  const content = await call("GET", "/api/content");
  assert.equal(content.data.announcement.title, "New");
  assert.equal(content.data.siteNotice.message, "Hello");
  assert.ok(content.data.updatedAt);
  await call("PUT", "/api/admin/content", { announcement: null }, TOKEN);
  const reset = await call("GET", "/api/content");
  assert.equal(reset.data.announcement, null);
  assert.equal(reset.data.siteNotice.message, "Hello");

  // persisted to disk
  const onDisk = JSON.parse(await readFile(path.join(dir, "db.json"), "utf8"));
  assert.equal(onDisk.content.siteNotice.message, "Hello");
});

test("rate limit, 404, 405, bad json", async () => {
  assert.equal((await call("GET", "/api/nope")).status, 404);
  assert.equal((await call("DELETE", "/api/health")).status, 405);
  const res = await fetch(base + "/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not json",
  });
  assert.equal(res.status, 400);
  let last;
  for (let i = 0; i < 8; i++) last = await call("POST", "/api/messages", { name: "A", message: "b" });
  assert.equal(last.status, 429);
});

test("admin lockout after repeated failures", async () => {
  let last;
  for (let i = 0; i < 11; i++) last = await call("GET", "/api/admin/verify", undefined, "nope");
  assert.equal(last.status, 429);
});
