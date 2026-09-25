/**
 * Tiny Express-style helpers on top of node:http — no dependencies, so the
 * server runs anywhere Node 20+ runs without an `npm install` step.
 */

export class HttpError extends Error {
  /** @param {number} status @param {string} message */
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/**
 * @typedef {import("node:http").IncomingMessage & { params: Record<string, string>, body?: any, ip: string }} Req
 * @typedef {import("node:http").ServerResponse} Res
 * @typedef {(req: Req, res: Res) => unknown | Promise<unknown>} Handler
 */

export class Router {
  constructor() {
    /** @type {{ method: string, pattern: RegExp, keys: string[], handlers: Handler[] }[]} */
    this.routes = [];
  }

  /** @param {string} method @param {string} path @param {...Handler} handlers */
  add(method, path, ...handlers) {
    const keys = [];
    const pattern = new RegExp(
      "^" +
        path.replace(/:(\w+)/g, (_, key) => {
          keys.push(key);
          return "([^/]+)";
        }) +
        "/?$",
    );
    this.routes.push({ method, pattern, keys, handlers });
    return this;
  }
  get(p, ...h) { return this.add("GET", p, ...h); }
  post(p, ...h) { return this.add("POST", p, ...h); }
  put(p, ...h) { return this.add("PUT", p, ...h); }
  patch(p, ...h) { return this.add("PATCH", p, ...h); }
  delete(p, ...h) { return this.add("DELETE", p, ...h); }

  /** @param {string} method @param {string} pathname */
  match(method, pathname) {
    let pathMatched = false;
    for (const route of this.routes) {
      const m = route.pattern.exec(pathname);
      if (!m) continue;
      pathMatched = true;
      if (route.method !== method) continue;
      /** @type {Record<string, string>} */
      const params = {};
      route.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      return { route, params };
    }
    return pathMatched ? "method-not-allowed" : null;
  }
}

/** @param {Res} res @param {number} status @param {unknown} data */
export function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  res.end(body);
}

/**
 * Read and parse a JSON body with a size cap.
 * @param {Req} req @param {number} limitBytes
 */
export function readJsonBody(req, limitBytes) {
  return new Promise((resolve, reject) => {
    const type = req.headers["content-type"] ?? "";
    if (!type.includes("application/json")) {
      // Drain and treat as empty; handlers validate required fields.
      req.resume();
      req.on("end", () => resolve({}));
      return;
    }
    let size = 0;
    /** @type {Buffer[]} */
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(new HttpError(413, "Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (chunks.length === 0) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new HttpError(400, "Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

/**
 * Fixed-window in-memory rate limiter (per IP + bucket name).
 * @param {{ windowMs: number, max: number, name: string }} opts
 * @returns {Handler}
 */
export function rateLimit({ windowMs, max, name }) {
  /** @type {Map<string, { count: number, resetAt: number }>} */
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }, windowMs).unref();

  return (req, res) => {
    const key = `${name}:${req.ip}`;
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return;
    }
    entry.count += 1;
    if (entry.count > max) {
      res.setHeader("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
      throw new HttpError(429, "Too many requests, please try again later");
    }
  };
}
