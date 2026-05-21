# Academic Personal Website — Zhiwen (Ivan) Huang

A dark-mode, visually rich academic site built on the existing TanStack Start template. Content sourced from your CV.

## Visual direction

- Dark mode only. Deep near-black background with subtle warm undertone (Midnight Indigo + Noir & Gold accent feel).
- Accent: muted gold / amber for highlights; soft indigo for links and secondary accents.
- Typography: serif display headings (Instrument Serif) paired with clean sans body (Inter / Work Sans) — mirrors the EB Garamond + TGHeros pairing of your CV.
- Generous whitespace, thin hairline dividers, subtle grain/noise texture on hero, soft glow on accent text, smooth fade/slide-in on scroll.
- Hairline borders, small caps section labels (matches your LaTeX style).

## Site structure (separate routes, each with own SEO metadata)

```text
/              Home — hero, short bio, current focus, latest highlights
/research      Research projects + interests (grouped by institution)
/publications  Journal, conference papers, presentations
/cv            Full CV view + PDF download link
/photography   Photo gallery (your hobby)
/guestbook     World map of visitors + recent visitor list
/contact       Email, scholar, affiliation
```

Shared dark header with name/monogram + nav, minimal footer with socials.

## Page details

- **Home**: Name, title (PhD student, Industrial Engineering — OR Track, Clemson), one-paragraph summary from CV, quick links to Research / Publications / CV. Small "currently" card (multi-stage stochastic optimization w/ decision-dependent uncertainty; incoming Universal Destinations intern).
- **Research**: Three Clemson projects + three SYSU projects as cards with bullet outcomes from CV.
- **Publications**: Grouped by year, bold your name, italic venue, DOI/links where available (placeholders otherwise).
- **CV**: Web-rendered sections (Education, Experience, Skills, Service, Leadership, Awards) + "Download PDF" button (you upload PDF later; placeholder link for now).
- **Photography**: Responsive masonry gallery. Starts with placeholder slots — you drop in your own JPGs into `src/assets/photography/` and they appear. Lightbox on click.
- **Guestbook (visitor map)**: Interactive world map with a dot per visitor city. Counter of total visits + countries. Recent visitors list (city, country, time).
- **Contact**: Email, phone, Google Scholar, Clemson address, mailto button.

## Visitor map — technical

Requires a backend, so this step enables **Lovable Cloud** (database + server functions). Flow:

1. On first load of any page, the client calls a server function `recordVisit`.
2. The server function reads the request IP, calls a free IP-geolocation API (ipapi.co — no key needed for low volume), and inserts `{ ip_hash, country, city, lat, lng, created_at }` into a `visitors` table. IP is hashed (SHA-256) so raw IPs are never stored. One row per IP per 24h (dedupe).
3. The map page calls `getVisitors` server function → returns aggregated points + counts.
4. Map rendered with **react-simple-maps** (lightweight, no API key, SVG-based — fits the dark aesthetic better than Mapbox/Google).

RLS: `visitors` table has no public read; only server functions (service role) access it. Map page receives only anonymized aggregates.

## Tech notes

- Stack: existing TanStack Start + Tailwind v4 + shadcn (already in template).
- Design tokens added to `src/styles.css` (dark palette only — force `.dark` on `<html>`).
- New deps: `react-simple-maps`, `d3-geo` (for map), `motion` (subtle animations), `yet-another-react-lightbox` (photo lightbox).
- Lovable Cloud enabled → `visitors` table + 2 server functions (`recordVisit`, `getVisitors`).
- CV PDF + photos: you upload after the build; placeholders in the meantime.

## Out of scope (ask if you want them)

- Blog / news feed
- Comment system on guestbook
- Auth / admin panel for editing content (content lives in code for now)
