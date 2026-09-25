import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.js";
import { Store } from "./store.js";

// Load server/.env when present (Node 20.12+). Hosting platforms set real env vars instead.
try {
  process.loadEnvFile(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env"));
} catch {
  /* no .env file — fine */
}

const PORT = Number(process.env.PORT ?? 8787);
const DATA_DIR = path.resolve(process.env.DATA_DIR ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data"));
const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "*")
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

if (!ADMIN_TOKEN) {
  console.warn("⚠  ADMIN_TOKEN is not set — the admin page will be disabled.");
} else if (ADMIN_TOKEN.length < 12) {
  console.warn("⚠  ADMIN_TOKEN is short. Use at least 12 random characters.");
}

const store = await new Store(DATA_DIR).init();
const server = createApp({
  store,
  adminToken: ADMIN_TOKEN,
  allowedOrigins: ALLOWED_ORIGINS,
  trustProxy: process.env.TRUST_PROXY !== "false",
});

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  console.log(`Data file: ${store.file}`);
  console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 3000).unref();
  });
}
