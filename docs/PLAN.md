# Ahmad Khan — Portfolio Website · Build Plan & Architecture

> Advanced, animated personal portfolio for **Ahmad Khan — Digital Marketing Strategist / Creative Director**.
> Reference vibe: https://saadullahsajid.netlify.app/
> Owner: Ahmad K. (u.imran@mindwhiz.com) · Upwork: https://www.upwork.com/freelancers/~01ce451dc2d6bd7776

---

## 0. Locked Decisions (from kickoff)

| Area                   | Decision                                             | Notes                                                           |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| Framework              | **Next.js 15 (App Router)** + React 19 + TypeScript  | SSG/ISR, image optimization, fast on Vercel                     |
| Styling                | **Tailwind CSS v4** + CSS variables for theme tokens | utility-first, fast iteration                                   |
| Animation (scroll)     | **GSAP + ScrollTrigger + SplitText**                 | cinematic scroll storytelling, pinned sections, text reveals    |
| Smooth scroll          | **Lenis**                                            | buttery scroll, synced to GSAP ticker                           |
| Animation (UI)         | **Framer Motion** (optional, micro-interactions)     | page/route transitions, hover/tap states                        |
| Theme                  | **Electric gradient** — deep blue → magenta/violet   | matches "Digital Growth Specialist" slides; dark base `#0a0a1a` |
| Deploy                 | **Vercel**                                           | preview deploys, analytics, edge                                |
| Contact                | **Working form via Resend** (email service)          | server action / route handler + Resend API                      |
| Theme mode             | **Dark / Light toggle** via `next-themes`            | dark default; persisted, no-flash, system-aware                 |
| Languages              | **i18n: EN · ES · DE · RU** via `next-intl`          | locale-routed (`/en`, `/es`, `/de`, `/ru`), EN default          |
| 3D (optional, phase 2) | React Three Fiber hero blob OR pure-CSS/SVG waves    | keep optional to protect performance budget                     |

---

## 1. Tech Stack

```
Next.js 15 (App Router, TS)
React 19
Tailwind CSS v4
GSAP 3 (+ ScrollTrigger, SplitText/manual split)
Lenis (smooth scroll)
Framer Motion (UI micro-interactions, page transitions)
lucide-react (icons)
Resend (transactional email for contact form)
zod + react-hook-form (form validation)
next-themes (dark/light mode, no-flash, persisted)
next-intl (i18n: EN/ES/DE/RU, locale routing + middleware)
next/font (variable display + body fonts)
Vercel Analytics + Speed Insights
```

**Fonts** (electric/agency feel — bold condensed display + clean body):

- Display: **Clash Display** or **Space Grotesk** (huge headings, e.g. PORTFOLIO/META ADS look)
- Body: **Inter** or **Geist Sans**
- Mono accent (labels/stats): **Geist Mono** / **Space Mono**

---

## 2. Information Architecture (single-page + deep routes)

Primary experience is a **scroll-driven single page** with sticky nav. Case studies get their own routes.
**All routes are locale-prefixed** (`next-intl`): `/[locale]/...` where `locale ∈ {en, es, de, ru}`, EN default. Locale + theme are switchable from the nav.

```
/[locale]              → Home (one-page scroll narrative)
  #hero               → Name, title, animated gradient, CTA
  #about              → About Me + Vision
  #stats              → 30+ clients · 100+ handles · 45+ DVC · 200+ events (count-up)
  #services           → Meta Ads, PPC, SEO, SMM, Email/SMS, WordPress, Design
  #work               → Portfolio grid (case study cards)
  #results            → Headline metrics / proof (ROAS, leads, growth)
  #experience         → Timeline (Mindwhiz, Met Pakistan, Bloomwright, etc.)
  #testimonials       → Upwork reviews / client endorsements
  #certifications     → LinkedIn Learning certs
  #contact            → Working form + direct links

/[locale]/work         → Full portfolio index
/[locale]/work/[slug]  → Individual case study (detail page)
/[locale]/resume       → Optional printable CV
```

### Nav (sticky, like reference deck)

`INTRODUCTION · STRATEGY · SNAPSHOT · WORK · CONTACT` — active section highlighted via ScrollTrigger.
Nav right side: **language switcher** (EN/ES/DE/RU) + **theme toggle** (dark/light).

---

## 3. Folder Structure

```
portfolio-ahmad-khan/
├─ docs/
│  ├─ PLAN.md                 ← this file
│  └─ CONTENT.md              ← all copy, metrics, case studies (EN master)
├─ messages/                  ← i18n translation catalogs
│  ├─ en.json
│  ├─ es.json
│  ├─ de.json
│  └─ ru.json
├─ public/
│  ├─ images/                 ← optimized work shots, logos
│  ├─ og/                     ← social share images
│  └─ resume.pdf
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx        ← fonts, metadata, ThemeProvider, NextIntl, Lenis, analytics
│  │  │  ├─ page.tsx          ← home (composes sections)
│  │  │  ├─ work/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [slug]/page.tsx
│  │  │  └─ resume/page.tsx
│  │  ├─ globals.css          ← Tailwind + dark/light theme tokens + base
│  │  └─ api/contact/route.ts ← Resend handler (or app/actions/contact.ts)
│  ├─ i18n/        routing.ts, request.ts (next-intl config)
│  ├─ middleware.ts           ← next-intl locale negotiation/redirect
│  ├─ components/
│  │  ├─ layout/   Nav, Footer, SmoothScroll(Lenis), CursorFollower,
│  │  │            ThemeToggle, LocaleSwitcher
│  │  ├─ sections/ Hero, About, Stats, Services, Work, Results,
│  │  │            Experience, Testimonials, Certifications, Contact
│  │  ├─ ui/       Button, Tag, Card, Marquee, GradientBlob, Reveal
│  │  └─ motion/   useGsapReveal, SplitText, MagneticButton, CountUp
│  ├─ lib/
│  │  ├─ gsap.ts              ← registers plugins, Lenis↔GSAP sync
│  │  ├─ data.ts             ← typed content (services, work, exp, certs)
│  │  └─ utils.ts
│  └─ types/
├─ .env.local                 ← RESEND_API_KEY, CONTACT_TO_EMAIL
├─ next.config.ts
├─ tailwind.config.ts (or CSS-first v4 config)
├─ tsconfig.json
└─ package.json
```

---

## 4. Animation System (GSAP + Lenis)

**`SmoothScroll` provider** wraps the app:

- Init Lenis, drive it from `gsap.ticker` (`lenis.raf`), `ScrollTrigger.update` on Lenis `scroll`.
- Respect `prefers-reduced-motion` → disable Lenis + heavy reveals.

**Reusable patterns:**
| Pattern | Where | How |
|---------|-------|-----|
| Hero text reveal | Hero | SplitText chars/words, staggered `y`/opacity on load |
| Section reveal | every section | `useGsapReveal` Intersection/ScrollTrigger, fade+rise |
| Pinned scroll story | Services / Work | `pin: true`, horizontal scroll or layered cards |
| Count-up stats | Stats | ScrollTrigger trigger → animate numbers |
| Parallax gradient blob | Hero/bg | mouse + scroll parallax on gradient mesh |
| Magnetic buttons | CTAs | pointer-follow transform via Framer Motion/GSAP |
| Horizontal marquee | logos/skills | seamless infinite GSAP timeline |
| Active nav | Nav | ScrollTrigger per section sets active state |
| Page transition | route changes | Framer Motion `AnimatePresence` overlay wipe |

**Perf rules:** animate only `transform`/`opacity`; `will-change` sparingly; lazy-load below-fold; kill ScrollTriggers on unmount; cap blob/3D to one instance.

---

## 5. Theme Tokens (electric blue → magenta) + Dark/Light Mode

Theme handled by **`next-themes`** with `class` strategy (`<html class="dark">`), `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange` to avoid flicker. Toggle in nav (sun/moon). Accent gradient is shared; only surface/text tokens flip.

```css
/* Dark (default) */
:root,
.dark {
  --bg: #0a0a1a; /* near-black navy */
  --bg-soft: #11122a;
  --fg: #f5f5ff;
  --muted: #9aa0c0;
  --border: rgba(255, 255, 255, 0.08);
  --accent-1: #2b3df5; /* electric blue */
  --accent-2: #b91cff; /* violet */
  --accent-3: #ff2bd1; /* magenta */
  --grad-hero: linear-gradient(120deg, #2b3df5 0%, #7a1cff 45%, #ff2bd1 100%);
  --ring: rgba(124, 58, 237, 0.45);
}
/* Light */
.light {
  --bg: #f6f7fb;
  --bg-soft: #ffffff;
  --fg: #0a0a1a;
  --muted: #5a607e;
  --border: rgba(10, 10, 26, 0.1);
  /* same accent gradient — keeps brand identity in both modes */
}
```

Accent gradient on key words, glow rings on chips (like the `2025–2026` pill), dotted-grid motifs from the slides. In light mode soften blob opacity/glow so it stays legible; keep contrast AA in both modes.

---

## 6. Build Phases

1. **Scaffold** — `create-next-app` (TS, Tailwind, App Router), fonts, theme tokens, ESLint/Prettier.
2. **Theme + i18n foundation** — install `next-themes` (ThemeProvider, no-flash) and `next-intl` (middleware, `[locale]` segment, `i18n/routing.ts`, `messages/*.json`). Build `ThemeToggle` + `LocaleSwitcher`.
3. **Layout shell** — SmoothScroll(Lenis), Nav (with toggle + switcher), Footer, section anchors, `lib/gsap.ts`.
4. **Content layer** — populate `lib/data.ts` from `docs/CONTENT.md` (typed); move all UI strings into `messages/en.json`.
5. **Sections (static first)** — Hero → About → Stats → Services → Work → Results → Experience → Testimonials → Certifications → Contact, reading from translations.
6. **Animation pass** — reveals, splits, pins, count-ups, magnetic CTAs, marquee, active-nav, page transitions.
7. **Case studies** — `/[locale]/work` + `/[locale]/work/[slug]` from data.
8. **Translations** — produce `es.json`, `de.json`, `ru.json` from the EN master; verify layout holds for longer DE/RU strings.
9. **Contact form** — react-hook-form + zod → `api/contact` → Resend; localized labels/validation; success/error states; spam honeypot.
10. **SEO/meta** — localized `metadata`, `hreflang` alternates, OpenGraph images, sitemap (per locale), robots, JSON-LD `Person`.
11. **Perf/a11y** — Lighthouse ≥95, reduced-motion, keyboard nav, alt text, AA contrast in **both** themes, `lang` attr per locale.
12. **Deploy** — push to GitHub → Vercel; set env vars; custom domain; Analytics + Speed Insights.

---

## 7. Environment Variables

```
RESEND_API_KEY=re_NcESqUE8_HK6xoLvn9qXy7n1eSzrZT5ZE
CONTACT_TO_EMAIL=asadyaseen847@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev   # verified Resend domain/sender
NEXT_PUBLIC_SITE_URL=  #the vercel url will be here
```

---

## 8. Deployment (Vercel)

1. `git init` → push to GitHub.
2. Import repo in Vercel → framework auto-detected (Next.js).
3. Add env vars (Production + Preview).
4. Add custom domain; enable Analytics + Speed Insights.
5. Verify Resend domain/sender for the contact form to send.

---

## 8b. Dark/Light Theme & Bilingual (i18n) — Feature Spec

### Theme (dark/light)

- **Lib:** `next-themes`, `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange`.
- **Toggle:** sun/moon button in nav; animated icon swap (Framer Motion). Persists to `localStorage`, respects OS preference on first visit.
- **No flash:** `suppressHydrationWarning` on `<html>`; theme class applied before paint.
- **Tokens:** only surface/text/border tokens flip (see §5); brand gradient stays in both modes.
- **A11y:** AA contrast verified in both themes; reduce blob glow opacity in light mode.

### Languages (EN · ES · DE · RU)

- **Lib:** `next-intl` with locale-prefixed routing `/[locale]`. Default `en`; supported `['en','es','de','ru']`.
- **Middleware:** `src/middleware.ts` negotiates locale (cookie → `Accept-Language` → default) and redirects.
- **Catalogs:** `messages/{en,es,de,ru}.json`, namespaced (`nav`, `hero`, `about`, `services`, `work`, `contact`, …). EN is the master; others translated from it.
- **Switcher:** dropdown in nav (EN/ES/DE/RU); switches locale while preserving current path + hash.
- **What's translated:** all UI strings + section prose. Proper nouns (names, brand/tool names, case-study client names) stay as-is. Numbers/metrics unchanged; format dates/numbers via `next-intl` per locale.
- **SEO:** per-locale `metadata`, `<html lang>`, `hreflang` alternates, locale-aware sitemap.
- **Layout safety:** DE/RU strings run ~20–35% longer than EN — headings/buttons must use flexible widths and avoid fixed truncation.

---

## 9. Success Criteria

- Lighthouse: Perf ≥95, A11y ≥95, SEO 100.
- Smooth 60fps scroll; no layout shift (CLS < 0.05).
- Works with `prefers-reduced-motion`.
- Contact form delivers email reliably.
- **Dark + light both pass AA contrast; theme persists with no flash on reload.**
- **All four locales (EN/ES/DE/RU) render fully translated with correct `lang`/`hreflang` and no broken layouts.**
- Clear conversion path: hero CTA → work proof → contact.

---

## 10. Open Items / Next Instructions

The user will provide further detailed instructions. Pending inputs needed before/at build:

- Final domain name.
- Real image assets (work screenshots, headshot, logos) — currently described in CONTENT.md.
- Resend API key + verified sender.
- Confirm whether to add R3F 3D hero in phase 2.

See `docs/CONTENT.md` for all copy, metrics, services, case studies, experience, and certifications.
