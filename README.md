# community-welfare-hub

**சின்ன வீர சங்கிலி உறவினர் நல சங்கம்** — Community Welfare Association

> **License:** All Rights Reserved — see [LICENSE](LICENSE). This repository
> is public for transparency only; copying, reuse, or redistribution of the
> code or content is not permitted without written permission.

A modern, mobile-first website for a Tamil family/community welfare
association: home/about page, rules & regulations (with an assistance
calculator), a searchable member business directory with individual
profiles and product ordering, and a contact page — all with WhatsApp-first
calls to action.

It runs in **two modes**:

| | Static mode (default) | Server mode (optional) |
|---|---|---|
| Hosting | GitHub Pages only | GitHub Pages **+** the small API in `server/` |
| "Add My Details" form | Opens WhatsApp to the admin | Saved on the server → admin approves → appears in the directory automatically |
| Contact form | Opens WhatsApp | Saved in the admin inbox (WhatsApp still offered) |
| Announcement popup & notice bar | Edited in code | Edited live from the Admin page |
| Member directory | `src/data/members.ts` | Built-in list **+** approved members; admin can hide any member |
| Admin page (`#/admin`) | Shows "server features are off" | Password-protected dashboard |

Switching is one setting: `VITE_API_URL`. If the server is ever unreachable,
the site automatically falls back to the built-in content and WhatsApp, so
visitors are never stuck.

## Tech stack

- React 19 + TypeScript
- React Router (v7, `createHashRouter`)
- Tailwind CSS v4
- Vite
- Optional API: zero-dependency Node.js (20+) server in `server/`, storing
  data in a JSON file. No `npm install` needed to run it.

## Project structure

```text
src/
├── components/   # reusable, focused UI components
├── pages/        # route-level views
├── data/         # sample content — members.ts, community.ts
├── types/        # Member, CommunityFeature, RuleSection, etc.
├── constants/    # site-wide constants (name, nav links, WhatsApp number)
├── utils/        # whatsapp.ts — wa.me URL builders
├── config/       # runtime.ts — static/server mode switch (VITE_API_URL)
├── services/     # api.ts (HTTP client), siteData.ts (static + live data merge)
├── routes/       # router configuration
└── App.tsx
server/
├── src/          # app.js (routes), store.js (JSON db), validation.js, http.js
├── test/         # node --test API tests
└── Dockerfile
```

### Updating content

- **Members / business directory** — edit `src/data/members.ts`. Each entry
  follows the `Member` interface in `src/types/member.ts`.
- **Rules, announcement, about-section features, contact people** — edit
  `src/data/community.ts`.
- **Association name, tagline, WhatsApp number, nav links** — edit
  `src/constants/site.ts`. Replace `GENERAL_WHATSAPP_NUMBER` with the real
  association number before going live.

## Development

```bash
npm install
npm run dev            # static mode
```

To work on server features locally, run the API in a second terminal:

```bash
cd server
cp .env.example .env   # set ADMIN_TOKEN
npm run dev            # http://localhost:8787
```

then create `.env.local` in the project root with
`VITE_API_URL=http://localhost:8787` and restart `npm run dev`.
Open `http://localhost:5173/community-welfare-hub/#/admin` and sign in with
your `ADMIN_TOKEN`.

Run the API tests with `cd server && npm test`.

## Build

```bash
npm run build   # type-checks then builds to dist/
npm run preview # preview the production build locally
```

## Deployment (GitHub Pages)

`vite.config.ts` sets `base: '/community-welfare-hub/'` to match this repo
name, and routing uses `createHashRouter` so all routes (`/members/:id`,
`/rules`, etc.) work correctly on GitHub Pages without any server-side
rewrite rules.

### Option A — `gh-pages` CLI (quick, manual)

```bash
npm install   # installs gh-pages as a devDependency (already included)
npm run deploy
```

This runs `npm run build` then publishes `dist/` to the `gh-pages` branch.
In the repo's **Settings → Pages**, set the source to the `gh-pages` branch.
The site will be live at `https://<username>.github.io/community-welfare-hub/`.

### Option B — GitHub Actions (automatic on push)

A workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub
Pages automatically on every push to `main`. In **Settings → Pages**, set
the source to **GitHub Actions** (instead of the `gh-pages` branch).

> If you rename the repository, update `base` in `vite.config.ts` to match.

## Enabling server features (optional)

### 1. Deploy the API (`server/`)

The API is plain Node.js with no dependencies. Environment variables:

| Variable | Purpose |
|---|---|
| `ADMIN_TOKEN` | Password for the Admin page. Use 12+ random characters. **Required** for admin. |
| `ALLOWED_ORIGINS` | Sites allowed to call the API, e.g. `https://gunaerode.github.io`. Default `*`. |
| `DATA_DIR` | Folder for `db.json`. Must be on a **persistent** disk in production. |
| `PORT` | Usually set by the host. Default `8787`. |

Any of these work:

- **Render** — New → Web Service → this repo, *Root Directory* `server`,
  *Build Command* empty, *Start Command* `node src/index.js`. Add a
  persistent disk mounted at e.g. `/data` and set `DATA_DIR=/data`.
- **Railway / Fly.io** — deploy the `server/Dockerfile`, attach a volume at
  `/data`.
- **Any VPS or a spare computer** — `cd server && ADMIN_TOKEN=... node src/index.js`
  (behind a reverse proxy with HTTPS).

> ⚠️ Free tiers without a persistent disk wipe `db.json` on every restart or
> redeploy. Use a disk/volume, and download a backup of `db.json` now and then.

Check it's running: `https://<your-api>/api/health` → `{"ok":true,...}`.

### 2. Point the website at it

- **GitHub Actions deploy:** repo **Settings → Secrets and variables →
  Actions → Variables → New repository variable**, name `VITE_API_URL`,
  value `https://<your-api>` (no trailing slash). Re-run the workflow.
- **`npm run deploy` (gh-pages CLI):** put `VITE_API_URL=https://<your-api>`
  in `.env.production.local` before deploying.

To go back to a purely static site, delete the variable and redeploy.

### 3. Use the Admin page

Open `https://<username>.github.io/community-welfare-hub/#/admin` (there's
also a small **Admin** link in the footer in server mode) and sign in with
`ADMIN_TOKEN`. From there you can:

- approve/reject **join requests** (approving publishes the member to the
  directory, optionally with English category/location/description and a
  photo URL),
- read, mark and delete **contact messages**,
- **hide/show** any member (built-in or server-added),
- edit the **announcement popup** and **notice bar** in Tamil + English —
  visitors see the new popup once after each change.

### API reference

Public: `GET /api/health`, `GET /api/members`, `GET /api/content`,
`POST /api/join-requests`, `POST /api/messages` (rate-limited, with a spam
honeypot).
Admin (`Authorization: Bearer <ADMIN_TOKEN>`): `GET /api/admin/verify`,
`GET /api/admin/join-requests`, `POST /api/admin/join-requests/:id/approve|reject`,
`DELETE /api/admin/join-requests/:id`, `GET /api/admin/messages`,
`PATCH|DELETE /api/admin/messages/:id`, `POST /api/admin/members/:id/visibility`,
`DELETE /api/admin/members/:id`, `PUT /api/admin/content`.
