import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Very small JSON-file database.
 *
 * The whole dataset lives in one `db.json` file inside DATA_DIR. Writes are
 * serialized through a promise queue and written atomically (temp file +
 * rename), so a crash mid-write never leaves a half-written file behind.
 * That is plenty for a community site with a handful of admins and a few
 * hundred records. Point DATA_DIR at a persistent disk/volume in production.
 */

/** @returns {import("./types.js").Db} */
function emptyDb() {
  return {
    members: [],
    hiddenMemberIds: [],
    joinRequests: [],
    messages: [],
    content: { announcement: null, siteNotice: null, updatedAt: null },
  };
}

export class Store {
  /** @param {string} dataDir */
  constructor(dataDir) {
    this.file = path.join(dataDir, "db.json");
    this.dataDir = dataDir;
    /** @type {import("./types.js").Db} */
    this.db = emptyDb();
    /** @type {Promise<void>} */
    this.queue = Promise.resolve();
  }

  async init() {
    await mkdir(this.dataDir, { recursive: true });
    try {
      const raw = await readFile(this.file, "utf8");
      this.db = { ...emptyDb(), ...JSON.parse(raw) };
    } catch (error) {
      if (/** @type {NodeJS.ErrnoException} */ (error).code !== "ENOENT") throw error;
      await this.persist();
    }
    return this;
  }

  /** Read-only view of the current data. Callers must not mutate it. */
  get data() {
    return this.db;
  }

  /**
   * Apply a change and save. The mutator receives the live db object.
   * @template T
   * @param {(db: import("./types.js").Db) => T} mutator
   * @returns {Promise<T>}
   */
  update(mutator) {
    const run = this.queue.then(async () => {
      const result = mutator(this.db);
      await this.persist();
      return result;
    });
    // keep the queue alive even if one update throws
    this.queue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  async persist() {
    const tmp = `${this.file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(this.db, null, 2), "utf8");
    await rename(tmp, this.file);
  }
}
