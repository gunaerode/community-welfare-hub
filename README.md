# community-welfare-hub

**சின்ன வீர சங்கிலி உறவினர் நல சங்கம்** — Community Welfare Association

A modern, mobile-first static website for a Tamil family/community welfare
association: home/about page, rules & regulations, a searchable member
business directory with individual profiles, and a contact page — all with
WhatsApp-first calls to action.

## Tech stack

- React 19 + TypeScript
- React Router (v7, `createHashRouter`)
- Tailwind CSS v4
- Vite
- Static frontend only — no backend/database. All content lives in
  `src/data/*.ts` and `src/constants/*.ts`.

## Project structure

```text
src/
├── components/   # reusable, focused UI components
├── pages/        # route-level views
├── data/         # sample content — members.ts, community.ts
├── types/        # Member, CommunityFeature, RuleSection, etc.
├── constants/    # site-wide constants (name, nav links, WhatsApp number)
├── utils/        # whatsapp.ts — wa.me URL builders
├── routes/       # router configuration
└── App.tsx
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
npm run dev
```

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
