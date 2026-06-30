# SEO Guide — Wavenxt

This document records the SEO infrastructure of the site, the improvements made on **2026-06-17**, and the strategy for ranking on Google's first page.

---

## 1. What was already in place

The site shipped with a strong technical SEO foundation:

- Central metadata helpers in `lib/seo.ts` + site constants in `lib/site.ts`
- Default metadata, Open Graph, Twitter, robots directives in `app/layout.tsx`
- JSON-LD structured data: `Organization`, `WebSite`, `Product`, `Breadcrumb`, `CollectionPage`, `AboutPage`, `ContactPage`
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- Dynamic OG / Twitter images (`app/opengraph-image.tsx`, `app/twitter-image.tsx`)
- Per-page metadata + JSON-LD on product family and product-detail routes

The gaps were concentrated in the **content / resources area** (blog + webinars) — the part of the site that actually earns organic rankings.

---

## 2. Changes made (2026-06-17)

All changes are built, typechecked, and runtime-verified.

| # | Change | Files | Why it matters |
|---|--------|-------|----------------|
| 1 | **Blogs & webinars added to `sitemap.xml`** — fetched live from Sanity with images and `lastmod`; resilient to fetch failure | `app/sitemap.ts` | Google previously had no way to discover blog/webinar URLs from the sitemap. Biggest indexing fix. |
| 2 | **Blog listing server-rendered** — was a client-only `useEffect` fetch; split into a server `page.tsx` (data fetch + ISR) and a client `blogs-view.tsx` (animations) | `app/resources/blogs/page.tsx`, `app/resources/blogs/blogs-view.tsx` | Blog cards & internal links are now in the initial server HTML — crawlable without running JS. |
| 3 | **Blog detail enriched** — `BlogPosting` + `Breadcrumb` JSON-LD, canonical URL, `article` Open Graph (publishedTime / author / tags), Twitter image, `generateStaticParams` + ISR | `app/resources/blogs/[slug]/page.tsx` | Eligible for rich results, faster (Core Web Vitals), no duplicate-content risk. |
| 4 | **Webinar detail enriched** — `VideoObject` + `Breadcrumb` JSON-LD, canonical, video OG tags, `generateStaticParams` + ISR | `app/resources/webinars/[id]/page.tsx` | Eligible for Google video rich results. |
| 5 | **Metadata + JSON-LD layouts** for the blog and webinar listings | `app/resources/blogs/layout.tsx`, `app/resources/webinars/layout.tsx` | These pages previously inherited the generic homepage title. |
| 6 | **`robots.txt` tightened** — disallow `/api/` and `/ingest/` (PostHog) | `app/robots.ts` | Stops wasting crawl budget on non-content routes. |
| 7 | **`Organization` schema enriched** — `foundingDate`, `image`, and a `sameAs` slot wired to a new `socials` array | `lib/seo.ts`, `lib/site.ts` | Builds toward a Google brand Knowledge Panel. |
| 8 | **New reusable helpers** — `createBlogPostingJsonLd`, `createVideoObjectJsonLd` | `lib/seo.ts` | Consistent structured data across content routes. |
| 9 | **Hero video optimized** — re-encoded to 720p H.264 (2.2 MB → ~0.5 MB), audio stripped, `+faststart`; added a 24 KB WebP `poster` and `preload` to the `<video>` | `public/hero-bg.mp4`, `public/hero-poster.webp`, `app/page.tsx` | Faster LCP and far less mobile data; instant first paint via poster. WebM was tested but came out larger than H.264 for this clip, so it was dropped. |
| 10 | **Webinars listing server-rendered** — converted from client `useEffect` fetch to a server `page.tsx` (fetch + ISR) plus a client `webinars-view.tsx` (filter pills + dialog) | `app/resources/webinars/page.tsx`, `app/resources/webinars/webinars-view.tsx` | Webinar cards & links are now in the initial HTML — crawlable without JS (same pattern as the blog listing). |

### Verified at runtime
- `sitemap.xml` lists `/resources/blogs`, `/resources/webinars`, and each blog post URL
- `robots.txt` disallows `/api/` and `/ingest/`
- Blog post title appears in the raw server HTML of `/resources/blogs`
- Blog detail emits `"@type":"BlogPosting"` and a `<link rel="canonical">`
- Webinar cards + detail links render in the raw server HTML of `/resources/webinars`
- Homepage `<video>` carries `poster="/hero-poster.webp"` and `preload="auto"`
- `npm run build` ✅, `npx tsc --noEmit` ✅, `eslint` clean on changed files

---

## 3. Action items for you (config)

1. **Fill in `socials` in `lib/site.ts`** — LinkedIn, X/Twitter, YouTube, Google Business Profile URLs. They are wired into the `Organization` `sameAs` structured data but currently empty.
2. **Confirm `NEXT_PUBLIC_SITE_URL`** — defaults to `https://wavenxt.com`. Set it as a production env var if the live domain differs.

---

## 4. How to reach Google's first page

Technical SEO (done) makes pages **eligible**. Ranking comes from **content + authority + speed**.

### 4.1 Set up the tools (this week)
- **Google Search Console** — verify the domain, submit `https://wavenxt.com/sitemap.xml`, monitor the Coverage and Performance reports.
- **Bing Webmaster Tools** — same submission.
- **Google Business Profile** — the Bangalore address drives local + brand searches and feeds the Knowledge Panel.

### 4.2 Win long-tail keywords (the blog is the engine)
Head terms like "RF attenuator" are dominated by Keysight / Rohde & Schwarz. Win the specific, high-intent searches engineers actually type:
- **Model / spec queries:** "8 channel programmable digital attenuator PoE", "Butler matrix 8x8 beamforming", "NXA-B648M"
- **Problem / how-to:** "how to automate handover testing", "RF path loss simulation setup", "programmable attenuator REST API"
- **Comparisons / buying guides:** "mesh attenuator vs matrix switch"

Target **1–2 well-researched articles per month**, each 1,200+ words answering one question thoroughly.

### 4.3 Build authority (backlinks + E-E-A-T)
- List products in industry directories (everythingRF, RF Globalnet, EEWeb, IEEE).
- Add real **author bios** with credentials + photo to blog posts (the `author` field exists; extend it).
- Earn citations from distributors, university RF labs, and technical LinkedIn posts.

### 4.4 Speed / Core Web Vitals
- ✅ **Hero video** compressed (2.2 MB → ~0.5 MB) with a WebP poster for instant paint — done (changes #9).
- ✅ **Webinars listing** server-rendered for full crawlability — done (change #10).
- ⏳ **Homepage** is still a single large `"use client"` component — splitting the static sections (Who We Are, Core Products, Values, Technologies) into server components would shrink the client JS bundle and improve hydration time. This is the main remaining CWV item; left for a focused follow-up because the page is built around framer-motion scroll/`useInView` hooks.

### 4.5 Internal linking
Link blog posts → relevant product pages and back. Keeps crawl paths short and spreads ranking signal.

---

## 5. Maintenance checklist

- [ ] Publish 1–2 blog posts/month targeting long-tail keywords
- [ ] Re-submit / check sitemap in Search Console after major content changes
- [ ] Keep `excerpt`, `mainImage` (with `alt`), `tags`, `category`, `author`, `publishedAt` filled on every Sanity blog/webinar
- [ ] Add author bios to posts
- [ ] Compress new images to WebP before upload
- [ ] Review Core Web Vitals in Search Console quarterly

---

## 6. Key file reference

| Concern | File |
|---------|------|
| Site constants, keywords, socials | `lib/site.ts` |
| Metadata + JSON-LD helpers | `lib/seo.ts` |
| Global metadata / OG / robots defaults | `app/layout.tsx` |
| Sitemap (static + products + blogs + webinars) | `app/sitemap.ts` |
| Robots rules | `app/robots.ts` |
| PWA manifest | `app/manifest.ts` |
| OG / Twitter images | `app/opengraph-image.tsx`, `app/twitter-image.tsx` |
| Blog listing (server) | `app/resources/blogs/page.tsx` + `blogs-view.tsx` + `layout.tsx` |
| Blog detail | `app/resources/blogs/[slug]/page.tsx` |
| Webinar listing | `app/resources/webinars/page.tsx` + `layout.tsx` |
| Webinar detail | `app/resources/webinars/[id]/page.tsx` |
