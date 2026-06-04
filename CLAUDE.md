# Steven Ayman — AI Automation Portfolio Website

## Project Overview

A personal portfolio website for **Steven Ayman**, Mechatronics Engineer & AI Automation Specialist. The site showcases projects with a heavy focus on AI automation, n8n workflows, and live case studies. It includes a password-protected admin panel to manage all project content without touching code.

**Live URL:** https://steven-ayman-portfolio.netlify.app  
**Netlify Site ID:** e1f6fd5a-8d64-4a08-bc26-9d04f80ddb8c  
**Data Layer:** Supabase (PostgreSQL)  
**Auth:** Hardcoded admin password (no Supabase Auth needed)  
**Deployment:** Netlify (static files, no build step)  
**Stack:** Vanilla HTML + CSS + JavaScript (no framework, no bundler)

---

## File Structure

```
portfolio/
├── index.html          ← Homepage: hero + filterable project grid
├── project.html        ← Single project detail page (?id=...)
├── admin.html          ← Password-protected admin dashboard
├── css/
│   ├── style.css       ← Global styles, CSS variables, typography
│   ├── home.css        ← Homepage-specific styles
│   ├── project.css     ← Project detail page styles
│   └── admin.css       ← Admin panel styles
├── js/
│   ├── supabase.js     ← Supabase client init (uses CDN, no npm)
│   ├── home.js         ← Fetch & render projects, filter by category
│   ├── project.js      ← Fetch & render single project by URL ?id=
│   └── admin.js        ← Admin CRUD logic, password gate, form handling
└── assets/
    └── (logo, favicon, og-image, etc.)
```

---

## Supabase Setup

### Table: `projects`

| Column            | Type      | Notes                                      |
|-------------------|-----------|--------------------------------------------|
| `id`              | uuid      | Primary key, auto-generated                |
| `title`           | text      | Project title                              |
| `slug`            | text      | URL-friendly ID (used in ?id=)             |
| `short_desc`      | text      | 1–2 line summary shown on card             |
| `long_desc`       | text      | Full markdown description for detail page  |
| `category`        | text      | See categories below                       |
| `tech_stack`      | text[]    | Array of tags: ["n8n", "Claude API", ...]  |
| `thumbnail_url`   | text      | Image URL (Supabase Storage or external)   |
| `github_url`      | text      | Optional GitHub link                       |
| `live_url`        | text      | Optional live demo link                    |
| `youtube_url`     | text      | Optional YouTube video embed link          |
| `status`          | text      | "Completed" | "In Progress" | "Case Study" |
| `featured`        | boolean   | Show in hero/featured section              |
| `created_at`      | timestamp | Auto-generated                             |
| `sort_order`      | int       | Manual ordering override                   |

### RLS Policy
- **Public read:** enabled (anon key can SELECT)
- **Write:** only via service role key (used in admin panel only)

### Environment Variables (store in Netlify env + a local `.env` for dev)
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...        ← used for public reads
SUPABASE_SERVICE_KEY=eyJ...     ← used in admin.js for writes (keep private!)
ADMIN_PASSWORD=your_password    ← hardcoded in admin.js
```

> ⚠️ Never commit service key or admin password to GitHub. Use Netlify environment variables and inject at build time, OR keep admin.js referencing a `config.js` that is gitignored.

---

## Categories

Use these exact strings in the `category` column:

| Value               | Display Label         | Icon |
|---------------------|-----------------------|------|
| `ai-automation`     | AI Automation         | 🤖   |
| `n8n`               | n8n Workflows         | ⚙️   |
| `serenoil`          | Serenoil Case Study   | 🌿   |
| `robotics`          | Robotics              | 🦾   |
| `web`               | Web Development       | 🌐   |
| `youtube`           | YouTube / Content     | 📹   |

---

## Pages

### 1. `index.html` — Homepage

**Sections:**
1. **Hero** — Name, title ("Mechatronics Engineer & AI Automation Specialist"), short bio, CTA buttons (View Projects / Contact)
2. **Category Filter Bar** — Horizontal pill buttons: All | AI Automation | n8n Workflows | Serenoil | Robotics | Web | YouTube
3. **Projects Grid** — Cards rendered from Supabase. Filterable by category, no page reload.
4. **Featured Project** (optional) — Larger card for projects where `featured = true`
5. **Footer** — GitHub, LinkedIn, YouTube links + email

**Project Card contains:**
- Thumbnail image
- Category badge (colored by category)
- Status badge (Completed / In Progress / Case Study)
- Title
- Short description
- Tech stack tags (first 3–4 visible, rest hidden)
- Links: GitHub icon, Live icon, YouTube icon (only show if URL exists)
- Click → navigates to `project.html?id={slug}`

---

### 2. `project.html` — Project Detail

Loaded dynamically via `?id=slug` query param. Fetches single row from Supabase.

**Sections:**
1. Back button → `index.html`
2. Thumbnail (full width hero image)
3. Title + category badge + status badge
4. Tech stack tags
5. Long description (render markdown using `marked.js` from CDN)
6. YouTube embed (if `youtube_url` exists) — use `<iframe>` with responsive wrapper
7. Links row: GitHub, Live Demo, YouTube (as buttons)
8. Created date

---

### 3. `admin.html` — Admin Panel

**Password Gate:**
- On page load, show a full-screen password prompt
- Check against hardcoded `ADMIN_PASSWORD` constant in `admin.js`
- On correct password → store in `sessionStorage` and show dashboard
- On wrong → show error, stay on gate screen

**Dashboard Layout:**
- **Sidebar:** Navigation (All Projects, Add New, Settings)
- **Main area:** Project list table OR the add/edit form

**Project Table columns:** Thumbnail · Title · Category · Status · Featured · Actions (Edit / Delete)

**Add / Edit Form fields:**
- Title (text input)
- Slug (auto-generated from title, editable)
- Short Description (textarea, max 150 chars with counter)
- Long Description (textarea — markdown supported, show char count)
- Category (dropdown — from categories list)
- Tech Stack (tag input — type and press Enter to add tags)
- Thumbnail URL (text input + preview)
- GitHub URL (text input)
- Live URL (text input)
- YouTube URL (text input)
- Status (select: Completed / In Progress / Case Study)
- Featured (toggle/checkbox)
- Sort Order (number input)

**Operations:**
- CREATE → INSERT into Supabase using service key
- READ → SELECT all projects, ordered by `sort_order` then `created_at DESC`
- UPDATE → UPDATE row by `id`
- DELETE → DELETE row by `id` with confirmation dialog

---

## Design System

### Aesthetic Direction
- **Theme:** Dark, sleek, techy — like a high-end dev tool or AI dashboard
- **NOT:** generic purple gradient Bootstrap look
- **Inspiration:** Vercel dashboard meets terminal-aesthetic meets modern SaaS

### Color Palette (CSS Variables)
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: #161616;
  --border: #2a2a2a;
  --accent: #00d4aa;        /* Teal/mint — primary accent */
  --accent-2: #7c6af7;      /* Purple — secondary accent */
  --text-primary: #f0f0f0;
  --text-secondary: #888888;
  --text-muted: #555555;
  --status-done: #22c55e;
  --status-wip: #f59e0b;
  --status-case: #3b82f6;
  --cat-ai: #00d4aa;
  --cat-n8n: #ff6b35;
  --cat-serenoil: #84cc16;
  --cat-robotics: #a855f7;
  --cat-web: #3b82f6;
  --cat-youtube: #ef4444;
}
```

### Typography
- **Display / headings:** `Syne` or `Space Mono` (from Google Fonts) — techy, geometric
- **Body:** `DM Sans` or `Outfit` — clean, readable
- Load from Google Fonts CDN

### Animations
- Subtle fade-in on cards (staggered)
- Hover lift effect on project cards (`transform: translateY(-4px)`)
- Category filter: smooth opacity transition on filter change
- Admin form: slide-in panel

---

## JavaScript Architecture

### `supabase.js`
```js
// Load via CDN in HTML: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const SUPABASE_URL = 'YOUR_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### `home.js`
- On DOMContentLoaded → fetch all projects from Supabase (ordered by sort_order)
- Render project cards into grid
- Attach click handlers to filter pills → filter rendered cards by category (client-side, no re-fetch)
- Handle empty state (no projects in category)

### `project.js`
- Read `?id=` from URL
- Fetch single project where `slug = id`
- Render all fields
- Use `marked.js` (CDN) to render `long_desc` markdown
- If 404 → redirect to index

### `admin.js`
- Password gate logic
- CRUD functions using Supabase service key
- Form validation (required fields, slug uniqueness check)
- Slug auto-generator: `title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')`
- Tag input: custom component (no library needed — array stored in JS, rendered as pills)
- Confirm before delete

---

## Netlify Deployment Notes

- All files are static — just drag & drop the folder or connect GitHub repo
- Set environment variables in Netlify dashboard (Site Settings → Environment Variables)
- If using a `config.js` approach (injecting keys at runtime), generate it via a Netlify build plugin or keep it gitignored for local dev
- Recommended: use Supabase's Row Level Security so anon key is safe in frontend

---

## Development Checklist

### Phase 1 — Foundation
- [ ] Set up Supabase project + create `projects` table with schema above
- [ ] Set RLS policies (public read, service key for writes)
- [ ] Create file structure locally
- [ ] Implement `supabase.js` client init
- [ ] Implement global `style.css` with full design system (colors, fonts, spacing)

### Phase 2 — Homepage
- [ ] Build `index.html` layout (hero, filter bar, grid)
- [ ] Implement `home.js` — fetch + render + filter
- [ ] Style project cards with hover effects
- [ ] Handle loading state + empty state
- [ ] Footer with social links

### Phase 3 — Project Detail Page
- [ ] Build `project.html` layout
- [ ] Implement `project.js` — fetch by slug
- [ ] YouTube embed with responsive wrapper
- [ ] Markdown rendering with `marked.js`

### Phase 4 — Admin Panel
- [ ] Build `admin.html` layout (sidebar + main)
- [ ] Password gate with sessionStorage
- [ ] Project list table with Edit/Delete
- [ ] Add/Edit form with all fields
- [ ] Tag input component
- [ ] CRUD operations wired to Supabase (service key)
- [ ] Slug auto-generator + uniqueness check
- [ ] Form validation + error messages

### Phase 5 — Polish
- [ ] Responsive design (mobile-first)
- [ ] Loading skeletons on project grid
- [ ] OG meta tags for social sharing
- [ ] Favicon + site title
- [ ] Deploy to Netlify
- [ ] Add first 3 real projects

---

## First Projects to Add (Seed Data)

| Title                                | Category        | Status      |
|--------------------------------------|-----------------|-------------|
| Serenoil AI Customer Service Bot     | serenoil        | In Progress |
| Gmail → Notion Email Logger (n8n)    | n8n             | Completed   |
| Wall-Climbing Robot (EKF + AprilTag) | robotics        | In Progress |
| Claude AI Tutorial YouTube Content   | youtube         | Completed   |

---

## Stack

**Framework:** Next.js 14 (App Router) · **Language:** TypeScript · **Styling:** Tailwind CSS v3 · **Data:** Supabase · **Deploy:** Netlify

---

## Rules for Claude Code

- Next.js 14 App Router, TypeScript, Tailwind CSS v3 — no class components, no pages router
- Server Components for public pages (homepage, project detail) — client components only when needed (filtering, forms, admin)
- Supabase anon key in public pages — service key ONLY in `lib/supabase-admin.ts` (server-only, never in client components)
- Admin writes go through `/api/projects` route handler — never call supabaseAdmin from a client component
- Tailwind custom tokens: `bg-background`, `bg-surface`, `bg-card`, `bg-elevated`, `border-border`, `text-fg`, `text-fg-2`, `text-fg-3`, `text-accent`
- Follow the dark design system exactly — no light mode drift
- `SUPABASE_SERVICE_KEY`, `ADMIN_PASSWORD`, `API_KEY` — server-only env vars (no `NEXT_PUBLIC_` prefix)
- Never commit `.env.local`

---

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

Local dev setup:
1. Copy `.env.local.example` → `.env.local`
2. Fill in Supabase URL, keys, admin password, and API key
3. `npm install` then `npm run dev`

---

## Admin API (Netlify Functions)

Deployed at `/.netlify/functions/projects`. Requires `X-API-Key` header.

| Method | Query        | Action           |
|--------|--------------|------------------|
| GET    | —            | List all         |
| GET    | `?slug=x`    | Get one by slug  |
| POST   | body: JSON   | Create project   |
| PUT    | `?id=uuid`   | Update project   |
| DELETE | `?id=uuid`   | Delete project   |

**Netlify env vars required:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `ADMIN_PASSWORD`, `API_KEY`

Auth header: `X-Admin-Key` set to either `ADMIN_PASSWORD` or `API_KEY`.

```bash
# List all projects
curl https://your-site.netlify.app/api/projects \
  -H "X-Admin-Key: YOUR_PASSWORD_OR_API_KEY"

# Create a project
curl -X POST https://your-site.netlify.app/api/projects \
  -H "X-Admin-Key: YOUR_PASSWORD_OR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","slug":"my-project","category":"n8n","status":"Completed","short_desc":"Short description"}'

# Update a project
curl -X PUT "https://your-site.netlify.app/api/projects?id=UUID" \
  -H "X-Admin-Key: YOUR_PASSWORD_OR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status":"Completed"}'

# Delete a project
curl -X DELETE "https://your-site.netlify.app/api/projects?id=UUID" \
  -H "X-Admin-Key: YOUR_PASSWORD_OR_API_KEY"
```