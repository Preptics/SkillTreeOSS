# 🌳 SkillTreeOSS

[![CI](https://github.com/Preptics/SkillTreeOSS/actions/workflows/ci.yml/badge.svg)](https://github.com/Preptics/SkillTreeOSS/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-11d452.svg)](./LICENCE.md)
[![Live site](https://img.shields.io/badge/live-skilltree.preptics.com-11d452.svg)](https://skilltree.preptics.com)
[![good first issues](https://img.shields.io/github/issues/Preptics/SkillTreeOSS/good%20first%20issue.svg?color=11d452)](https://github.com/Preptics/SkillTreeOSS/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

**The Democratization of Mastery.** SkillTreeOSS is an open-source, gamified learning platform. We map out complex skills (like "Full-Stack Developer," "ML Engineer," or "Photography") into beautiful, interactive RPG-style skill trees. Click a node, find the best free resource on the internet, and level up your life.

**Try it:** [skilltree.preptics.com](https://skilltree.preptics.com) · **Build a tree:** [skilltree.preptics.com/builder](https://skilltree.preptics.com/builder)

> **SkillTreeOSS is now part of [Preptics](https://preptics.com).** In October 2026 the project moved into the GitHub organisation of Preptics LLC, and the site moved from `skilltreeoss.softexforge.io` to **[skilltree.preptics.com](https://skilltree.preptics.com)** (old links redirect). The code stays MIT-licensed, trees stay free, and contributions still happen here, in the open. [What changes and what does not →](https://skilltree.preptics.com/about)

<!-- TODO: Hero GIF
     Record a ~10s GIF of the skill canvas in action:
     - Start on the RPG-theme tree (full-stack-dev or similar)
     - Hover over a few nodes so the sidebar slides in
     - Click a node → unlock animation fires → XP counter ticks up in the navbar
     - Switch the view theme (FAB pill) from RPG → Neural
     Suggested tool: ScreenToGif (Windows) or Kap (Mac). Export at 1280×720, ≤5 MB.
     Save to: docs/images/hero-demo.gif
-->
![SkillTreeOSS — interactive skill tree demo](docs/images/hero-demo.gif)

---

## 🎯 The Vision

Most learning sites are either hidden behind expensive paywalls or are overwhelming, messy lists of links. Self-learners often face a "curriculum gap" — they don't know *what* they should learn next.

SkillTreeOSS solves this by turning education into a visual progression system.

* **Zero Overwhelm:** See exactly where you are and what to tackle next.
* **Community Curated:** Nodes link to the single highest-voted free resource for that specific sub-skill.
* **Gamified Progression:** Watch your tree light up as you complete nodes, unlocking advanced branches.

---

## ✨ Features

### 🏗️ Visual Skill Tree Builder
- **In-app editor** at `/builder` — no JSON or GitHub knowledge required
- `/builder/[treeId]` — load and edit any existing published tree
- Double-click the canvas (or press `N`) to add nodes; drag between node handles to connect them
- Right-click anywhere for a context menu; rectangular drag to multi-select nodes
- **Full keyboard shortcuts** — `V` Select, `H` Pan, `N` add at cursor, `Ctrl+A` select all, `Ctrl+L` toggle layout direction, `Delete` remove; press `?` for the built-in guide modal
- Edit each node inline: label, description, zone, icon (searchable Material Symbols + emoji picker), and learning resources
- **Liquid bubble animation** — tool and tab switches animate with a spring-physics bubble (Framer Motion `layoutId` shared layout)
- **Dagre auto-layout** with LR ↔ TB direction toggle; smart node placement prevents stacking
- **Preview mode** — switch between Build and Preview to see the tree exactly as learners will
- Auto-save drafts to `localStorage`; Supabase persistence for signed-in users
- **Submit as PR** — anonymously (bot token) or from your own GitHub fork

<!-- TODO: Builder GIF
     Record a ~15s GIF showing the full builder flow:
     1. Open /builder (blank canvas)
     2. Double-click to add 2–3 nodes; watch smart placement kick in
     3. Drag from one node's handle to another to connect them
     4. Click a node → right panel slides in; type a label, pick a zone color chip
     5. Press Ctrl+L → watch Dagre re-layout with the LR direction
     6. Click "Preview" in the header → tree renders in the full viewer
     Suggested tool: ScreenToGif at 1280×800. Export ≤8 MB.
     Save to: docs/images/builder-demo.gif
-->
![Visual Tree Builder](docs/images/builder-demo.gif)

### 🗺️ Interactive Skill Canvas
- **4 visual themes** — World Map, RPG, Terminal, Neural
- Dagre auto-layout with toggleable LR ↔ TB direction
- Node sidebar with resources, prerequisite timeline, resource voting, and resource suggestions
- Animated node state transitions (locked → available → completed)
- Right-click context menu; center-on-node with smooth `setViewport` animation

<!-- TODO: Themes screenshot (static PNG is fine, or a short GIF cycling through themes)
     Open the full-stack-dev tree. Take a 4-panel screenshot (or record switching themes via the FAB pill):
     Panel 1 — RPG theme   | Panel 2 — World Map theme
     Panel 3 — Terminal    | Panel 4 — Neural
     Alternatively: record a 6s GIF clicking through all 4 themes.
     Save to: docs/images/themes-preview.png  (or .gif)
-->
![4 visual themes — RPG, World Map, Terminal, Neural](docs/images/themes-preview.gif)

### 🔐 Auth & Progress
- Supabase auth (email/password, OAuth)
- Progress synced to DB in real time; `localStorage` fallback
- **XP & level system** — 50 XP per completed node, 8 levels (Apprentice → Legend)
- Navbar **UserMenu** with SVG level-ring progress indicator and Lv badge
- Reset-progress button with confirmation modal

### 🌐 Explore Page
- Full-text search across titles, descriptions, categories, node labels, zones, and resource titles
- Filter by **category** (dynamically derived from tree files) and **difficulty**
- Sort by: A→Z, Most Popular (enrolled), Top Rated, Easiest First, Shortest First
- **"Continue your journey"** strip for in-progress trees
- Pagination (12 per page)

### ⭐ Tree Ratings & Enrollment
- 1–5 star rating modal on the canvas toolbar
- Enrollment auto-detected from completed nodes (no separate join flow)
- Per-tree enrolled counts and average ratings shown in Explore and landing page

### 📊 Live Platform Stats
- Landing page stats (Active Learners, Skill Trees, Nodes Unlocked) served from a **`site_stats` singleton** kept current by a Postgres trigger — O(1) read, no full table scans
- Featured trees configurable in `lib/featured-trees.ts` with real data from tree JSON + DB

### 💡 Community Feedback
- Per-resource **upvote / downvote** on every resource card
- **"Suggest a better resource"** inline form on every node — stores explanation, optional URL, and title in a `resource_suggestions` table with a status workflow (`pending → reviewed → accepted/rejected`)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Canvas Engine | ReactFlow (`@xyflow/react`) + Dagre |
| State | Zustand — `lib/store.ts` (viewer) · `lib/builder-store.ts` (builder) |
| Animations | Framer Motion (shared-layout `layoutId`, spring physics, `AnimatePresence`) |
| Styling | Tailwind CSS v4 |
| Auth + DB | Supabase (Postgres, RLS, SSR client) |

---

## 🗄️ Database Migrations

Run these in order from `supabase/migrations/` via the Supabase SQL editor:

| File | Table | Purpose |
|---|---|---|
| `20240101_tree_ratings.sql` | `tree_ratings` | 1–5 star ratings per user per tree |
| `20240102_site_stats.sql` | `site_stats` | Singleton counter + Postgres trigger for landing-page stats |
| `20240103_resource_suggestions.sql` | `resource_suggestions` | Community resource feedback queue |
| `20240105_builder_tables.sql` | `tree_drafts`, `github_connections` | Builder drafts and optional GitHub connections for "Submit as PR" |

> **`user_progress`** (existing) — stores `completed_node_ids text[]` per user per tree. Enrollment is implicit: any row with ≥1 completed node counts as enrolled.

---

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Preptics/SkillTreeOSS.git
cd SkillTreeOSS
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

4. **Run database migrations** — paste each file from `supabase/migrations/` into the Supabase SQL editor and execute in order.

5. **Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Go to [http://localhost:3000/builder](http://localhost:3000/builder) to try the visual tree builder.

---

## 🌲 Adding or Editing Trees

The easiest way is the **in-app builder** at `/builder` — no coding required. See the [Builder section of CONTRIBUTING.md](./CONTRIBUTING.md) for a step-by-step walkthrough.

For direct JSON editing, all skill trees live in `data/trees/` as JSON files. See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for the full schema, validation rules, and PR process. Check your tree before opening a PR:

```bash
npm run validate
```

CI runs the same check, plus type-check and build, on every pull request.

To change the featured trees on the landing page, edit `lib/featured-trees.ts`:
```ts
export const FEATURED_TREE_IDS = ['full-stack-dev', 'ml-ai-engineer', 'photography-mastery']
```

---

## 🤝 Contributing

We welcome new trees, bug fixes, UI improvements, and backend integrations. Check the **Issues** tab for `good first issue` and `help wanted` labels.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and developer guidelines. Everyone taking part follows the [Code of Conduct](./CODE_OF_CONDUCT.md); report security issues privately as described in [SECURITY.md](./SECURITY.md).

---

## 🏢 Who maintains SkillTreeOSS

SkillTreeOSS was started by [Md Nasim Sheikh](https://github.com/nasimstg) in February 2026. Since October 2026 it has been maintained by **[Preptics LLC](https://preptics.com)**, the company behind Preptics, a test-prep platform whose first track is the Digital SAT. Preptics hosts the site at [skilltree.preptics.com](https://skilltree.preptics.com), pays for its infrastructure and reviews pull requests.

What that means for contributors:

- The code and every tree stay under the MIT License. You can fork and self-host the whole thing ([Self-hosting guide](./docs/Self-hosting.md)).
- You keep the copyright in your own contributions; there is no CLA.
- Roadmap and discussion stay public: [Roadmap](https://skilltree.preptics.com/roadmap) · [Discussions](https://github.com/Preptics/SkillTreeOSS/discussions).
- Private matters (account deletion, conduct reports, press): support@preptics.com.

---

## 📜 License

MIT — see [LICENCE.md](./LICENCE.md). Copyright © 2026 Preptics LLC and SkillTreeOSS contributors. Education should be free, and so is this code.

**The name.** The licence covers the code, not the SkillTreeOSS name and logo. Forks are welcome; if you run one publicly, please give it its own name and say it is based on SkillTreeOSS, so people know which site is which.

<sub>Not to be confused with SkillTree at skilltreeplatform.dev, an unrelated open-source training platform.</sub>
