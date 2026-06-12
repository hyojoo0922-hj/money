# MINGLEY Deployment Guide

Everything you need to go from the ZIP file to a live URL on your iPhone.
No developer experience assumed.

---

## 1. GitHub Repository Structure

After unzipping, your folder looks like this:

```
mingley/
├── public/
│   └── assets/
│       ├── characters/
│       │   ├── female/        ← F_A.png … F_I.png (9 files)
│       │   └── male/          ← M_A.png … M_I.png (9 files)
│       ├── ming/              ← all MING emotion/action/etc. images
│       └── brand/             ← BUBBLE_GIRL_BASE.png
├── src/
│   ├── App.tsx                ← routes
│   ├── main.tsx               ← entry point
│   ├── index.css              ← global dark theme
│   ├── components/            ← UI primitives, MING, character, layout
│   ├── data/                  ← traits, archetypes, mock data
│   ├── lib/                   ← assets manifest, utilities
│   └── screens/               ← all app screens + onboarding
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── vercel.json                ← SPA routing config (pre-configured)
├── .env.example               ← template for environment variables
├── .gitignore
└── DEPLOYMENT_GUIDE.md        ← this file
```

**What goes on GitHub:** Everything in this folder.
**What does NOT go on GitHub:** The `node_modules/` folder (it doesn't exist yet — it gets created during deployment automatically).

---

## 2. Vercel Deployment Instructions

### Step 1 — Create a GitHub Account

1. Go to [github.com](https://github.com)
2. Click **Sign up** — choose the free plan
3. Verify your email

### Step 2 — Create a New Repository

1. Once logged in, click the **+** icon (top right) → **New repository**
2. Repository name: `mingley`
3. Set to **Private** (recommended)
4. Do NOT check "Add a README file"
5. Click **Create repository**

### Step 3 — Upload Your Files

1. On the new empty repository page, click **uploading an existing file**
2. Unzip `mingley-phase1-2-reskin.zip` on your computer
3. Open the `mingley/` folder — you should see `src/`, `public/`, `package.json`, etc.
4. Select ALL files and folders inside `mingley/` and drag them into the GitHub upload area
5. Scroll down, click **Commit changes**
6. Wait for the upload to complete (may take 1–2 minutes due to image assets)

### Step 4 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → choose **Continue with GitHub** (uses your GitHub account)
3. Click **Add New…** → **Project**
4. Find `mingley` in the list → click **Import**
5. On the configuration screen:
   - **Framework Preset:** Select **Vite**
   - **Root Directory:** leave as `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**
7. Wait approximately 2–3 minutes
8. Vercel shows a **Congratulations** screen with your live URL

Your URL will look like:
```
https://mingley-yourname.vercel.app
```

Open this URL on your iPhone. It works immediately.

### Step 5 — Every Future Update

Whenever you make changes:
1. Go to your GitHub repository
2. Navigate to the file you want to change → click the pencil icon (Edit)
3. Make changes → Commit
4. Vercel automatically detects the commit and re-deploys in ~2 minutes
5. Your URL stays the same

---

## 3. Required Environment Variables

### Phase 1 + 2 (current build)

**No environment variables required.**
The current build runs entirely on static mock data. You can deploy and preview immediately with zero configuration.

### Phase 4+ (when Supabase is connected)

These will be needed later. Do not add them yet.

| Variable | Where to get it | What it does |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase dashboard → Settings → API | Connects to your database |
| `VITE_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API | Public API authentication key |

**How to add environment variables in Vercel (when the time comes):**
1. Go to your project on vercel.com
2. Click **Settings** → **Environment Variables**
3. Add each variable name and value
4. Click **Save**
5. Go to **Deployments** → click the three dots on the latest deployment → **Redeploy**

The `.env.example` file in the project shows the variable names as a reference. Never put real values in `.env.example` — it is safe to commit to GitHub.

---

## 4. Build Commands

These run automatically on Vercel. Listed here for reference.

| Command | What it does |
|---|---|
| `npm install` | Downloads all dependencies (~500MB, runs once) |
| `npm run build` | Compiles TypeScript + Tailwind → outputs to `dist/` folder |
| `npm run preview` | Serves the compiled `dist/` locally to test the production build |

**Vercel runs `npm install` then `npm run build` automatically on every deployment.**
You never need to run these yourself unless you set up a local development environment later.

---

## 5. Mobile Preview Workflow

### On iPhone (recommended)

1. Open the Vercel URL in **Safari**
2. Tap the **Share** button (box with arrow) at the bottom of Safari
3. Tap **Add to Home Screen**
4. Tap **Add**

MINGLEY now appears as an app icon on your home screen. It opens full-screen with no browser UI, exactly like a native app.

### Checking updates on iPhone

After you commit a change to GitHub and Vercel redeploys (~2 min):
- If you added it to your home screen: close and reopen the app
- In Safari: pull down to refresh

### Testing specific screens

Append the route to your Vercel URL to jump to any screen:

| Screen | URL |
|---|---|
| Brand splash | `https://your-url.vercel.app/splash` |
| Onboarding start | `https://your-url.vercel.app/onboarding/welcome` |
| Home | `https://your-url.vercel.app/` |
| Situation cards | `https://your-url.vercel.app/situations` |
| Relationships | `https://your-url.vercel.app/relationships` |
| Report | `https://your-url.vercel.app/report` |
| Profile (마이) | `https://your-url.vercel.app/profile` |
| Relationship detail | `https://your-url.vercel.app/relationships/r1` |

---

## 6. Troubleshooting Guide

### "Build failed" on Vercel

**Most common cause:** Framework not set to Vite.

Fix:
1. Go to Vercel → your project → **Settings** → **General**
2. Under **Build & Development Settings**, set Framework to **Vite**
3. Set Build Command to `npm run build`
4. Set Output Directory to `dist`
5. Go to **Deployments** → Redeploy

---

### "Page not found" when navigating directly to a URL

**Cause:** Vercel doesn't know about single-page app routing.

Fix: The file `vercel.json` in the project root handles this. If it was not uploaded:
1. Create a new file in GitHub called `vercel.json`
2. Paste this exact content:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
3. Commit — Vercel redeploys automatically

---

### Images not showing (characters or MING appear as broken)

**Cause:** The `public/assets/` folder was not uploaded to GitHub, or files were placed in the wrong location.

Fix — Check the structure in GitHub:
1. Go to your repository
2. Click `public/` → `assets/` → `characters/` → `female/`
3. You should see `F_A.png`, `F_B.png`, etc.
4. If the folder is empty or missing, upload the images again following Step 3 of the deployment instructions

---

### The app loads but shows a white/blank screen

**Cause:** A JavaScript error is preventing the app from starting.

Fix:
1. Open the Vercel URL in Safari on Mac (not iPhone)
2. In Safari menu → **Develop** → **Show JavaScript Console**
3. Look for a red error message
4. Take a screenshot and share it — this identifies the exact cause

---

### Vercel says "No framework detected"

Fix: Manually set it.
1. In Vercel project → **Settings** → **General**
2. Framework Preset → **Vite**
3. Build Command → `npm run build`
4. Output Directory → `dist`
5. Redeploy

---

### The URL works but looks like raw text (no styling)

**Cause:** Tailwind CSS did not compile correctly.

Fix:
1. In GitHub, confirm the file `tailwind.config.ts` exists in the root folder
2. In Vercel → **Deployments** → click the latest deployment → **View Build Logs**
3. Look for any error mentioning `tailwind` or `postcss`
4. Share the error message for further diagnosis

---

### "Environment variable not found" errors (Phase 4+)

**Cause:** Supabase variables were not added to Vercel before deploying.

Fix:
1. Vercel → your project → **Settings** → **Environment Variables**
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Set scope to **Production**, **Preview**, and **Development**
4. Redeploy

---

## Quick Reference Card

```
Repository:    github.com/YOUR_USERNAME/mingley
Live URL:      https://mingley-YOUR_SUFFIX.vercel.app
Dashboard:     vercel.com/dashboard
Build time:    ~2 minutes per deployment
Phase 1+2:     No env vars needed — deploy immediately
Phase 4+:      Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
```

---

*DEPLOYMENT_GUIDE.md — MINGLEY Phase 1+2*
*Update this file as new phases are added.*
