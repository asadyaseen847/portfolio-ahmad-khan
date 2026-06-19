# Ahmad Khan — Portfolio

Advanced, animated portfolio for **Ahmad Khan — Digital Marketing Strategist**.
Built with **Next.js 16**, **GSAP + Lenis**, **Framer Motion**, **Tailwind v4**,
**next-intl** (EN/ES/DE/RU) and **next-themes** (dark/light). Deploys to **Vercel**.

## Features
- Cinematic scroll: Lenis smooth scroll synced to GSAP ScrollTrigger, split-text hero,
  scroll reveals, count-up stats, magnetic CTAs, infinite skill marquee, parallax gradient blobs.
- **Dark / light** theme — dark default, system-aware, persisted, no flash.
- **4 languages** — English, Español, Deutsch, Русский. Locale-prefixed routes (`/`, `/es`, `/de`, `/ru`)
  with a nav switcher, localized metadata, `hreflang` alternates and locale-aware sitemap.
- Working **contact form** → Resend email, with zod validation + honeypot.
- Case-study routes at `/work` and `/work/[slug]`.

## Local development
```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Environment variables
See `.env.example`. Required for the contact form: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.
`CONTACT_FROM_EMAIL` must be a verified Resend sender for production delivery.

## Deploy to Vercel
1. Push this repo to GitHub.
2. Import it in Vercel — Next.js is auto-detected (no config needed).
3. Add the env vars from `.env.example` (Production + Preview).
4. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to your Vercel/custom domain and redeploy
   so metadata, sitemap and `hreflang` use the right origin.
5. (Optional) Add a custom domain; enable Analytics + Speed Insights (already wired in code).

## Editing content
- **Structured data** (case studies, services, experience, stats, links): `src/lib/data.ts`.
- **Copy / translations**: `messages/{en,es,de,ru}.json` (EN is the master).
- **Theme colors**: CSS tokens in `src/app/globals.css`.
- Full source reference: `docs/PLAN.md` and `docs/CONTENT.md`.

## Notes
- Next.js 16 renamed `middleware` → `proxy`; locale negotiation lives in `src/proxy.ts`.
- Case-study long-form bodies are English; UI chrome and marketing copy are translated in all 4 locales.
