# GitHub Achievements — AdityaCodes06

A futuristic glassmorphism website showcasing GitHub achievements, live stats, and top repositories. Built with Next.js 14 (App Router), TypeScript, and zero external UI dependencies.

## Features

- **Live GitHub data** — fetched from GitHub's public API, revalidated every hour (ISR)
- **Achievement system** — 15 unlockable achievements with Common / Rare / Epic / Legendary rarity
- **Language distribution** — animated bar chart of your top languages
- **Top repositories** — sorted by stars, with topics and metadata
- **Activity feed** — recent public events
- **Glassmorphism UI** — animated background, orbital avatar, shimmer effects
- **Vercel-ready** — one-click deploy

## Deploy to Vercel (2 minutes)

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub → Vercel (recommended)

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "init: github achievements site"
   git remote add origin https://github.com/AdityaCodes06/github-achievements.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo → Deploy

That's it. No env vars required for public data.

### Optional: GitHub Token (higher rate limits)

To avoid GitHub API rate limiting (60 req/hr without token → 5000 req/hr with token):

1. Create a token: [github.com/settings/tokens](https://github.com/settings/tokens) (no scopes needed for public data)
2. Add to Vercel: Project Settings → Environment Variables → `GITHUB_TOKEN=ghp_...`

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Customization

- **Username**: Edit `GITHUB_USERNAME` in `lib/github.ts`
- **Achievements**: Add/edit entries in `computeAchievements()` in `lib/github.ts`
- **Colors**: Edit CSS variables in `app/globals.css`
- **Revalidation**: Change `revalidate = 3600` in `app/page.tsx`

## Tech Stack

- Next.js 14 (App Router, ISR)
- TypeScript
- CSS (no Tailwind, no UI library — pure custom glassmorphism)
- GitHub REST API v3


*Automated maintenance update: 2026-05-06 18:15:35*
