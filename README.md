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

## Adding an External Article

Add an entry to the `externalPosts` array in `lib/data.ts` with a `url` field. External posts display a "Read on LinkedIn" badge and open in a new tab.

## Build

```bash
npm run build
```

Generates a fully static site in `out/` with all article pages pre-rendered.

## Project Structure

```
app/            → Pages (listing + [slug] article)
components/     → Navbar, Footer, BlogList, Article
content/posts/  → MDX article files
lib/            → MDX utilities + external posts data
types/          → TypeScript interfaces
```
