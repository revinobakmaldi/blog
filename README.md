# RBA Blog

A Medium-like blog built with Next.js 16, featuring MDX articles with syntax highlighting, dark theme with glassmorphism design, and static export for fast deployment.

## Tech Stack

- **Framework**: Next.js 16, React 19
- **Styling**: Tailwind CSS 4, `@tailwindcss/typography`
- **Animations**: Framer Motion
- **Content**: MDX via `next-mdx-remote` + `gray-matter`
- **Syntax Highlighting**: `rehype-pretty-code` + Shiki
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a New Article

Create an `.mdx` file in `content/posts/`:

```mdx
---
title: "Your Article Title"
excerpt: "A short description of the article."
date: "2025-01-15"
readTime: "5 min read"
---

Your markdown content here...
```

The slug is derived from the filename (e.g., `my-article.mdx` → `/my-article`).

The landing page automatically picks up new articles — no manual syncing needed (see [Posts API](#posts-api) below).

## Adding an External Article

Add an entry to the `externalPosts` array in both `lib/data.ts` and `scripts/generate-posts-json.mjs` with a `url` field. External posts display a "Read on LinkedIn" badge and open in a new tab.

## Build

```bash
npm run build
```

A `prebuild` script automatically generates `public/api/posts.json` before each build. This generates a fully static site in `out/` with all article pages pre-rendered.

## Posts API

The build outputs a static JSON file at `/api/posts.json` containing metadata for all posts (internal + external), sorted by date descending. The [landing page](https://github.com/revinobakmaldi/landing-page) fetches this at build time to display the 3 latest articles, with a hardcoded fallback if the blog is unreachable.

## Project Structure

```
app/            → Pages (listing + [slug] article)
components/     → Navbar, Footer, BlogList, Article
content/posts/  → MDX article files
lib/            → MDX utilities + external posts data
scripts/        → Prebuild script (generates posts.json)
public/api/     → Static JSON API (auto-generated)
types/          → TypeScript interfaces
```
