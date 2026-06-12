# MINGLEY

Question-based AI relationship-growth platform. Mobile-first.
Stack: React + Vite + TypeScript + Tailwind + Supabase + Vercel.

> Phase 1 + 2 delivered: project setup + mobile UI shell on static mock data.
> No Supabase / no AI yet (those are Phase 4+).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Preview on your phone (same Wi-Fi)

```bash
npm run dev:host          # serves on 0.0.0.0
```

Then open the printed Network URL (e.g. http://192.168.0.12:5173) on your phone.

## Build

```bash
npm run build             # tsc -b && vite build  -> dist/
npm run preview
```

## Deploy to Vercel

- Framework preset: **Vite**
- Build command: `npm run build`
- Output dir: `dist`
- SPA routing handled by `vercel.json`
- Env vars (Phase 4+): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (see `.env.example`)

## Routes

- `/splash` brand splash
- `/onboarding/welcome` → `auth` → `info` → `questions` → `recommend` → `select` → `intro`
- `/` Home · `/questions` · `/relationships` (+`/:id`) · `/recommendations` · `/profile`

## Asset rules (locked)

- 18 base characters = only selectable identities. Never redesigned.
- MING = only mascot. `src/lib/assets.ts` is the manifest.
- `BUBBLE_GIRL_BASE` = brand character (onboarding / empty states / marketing only). Never selectable.
- Badges / frames / point icons = CSS/SVG, not bitmap assets.

## Seed content

- `src/data/traits.ts` — complete 150-trait taxonomy (15×10), ready to seed `personality_traits`.
