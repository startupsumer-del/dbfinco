# DB FinCo — Financial Accounting Services

Production website for **DB FinCo**, a firm of accountants and business
advisors serving small and medium-sized businesses with accounting,
bookkeeping, tax, audit and assurance, consulting, risk and financial
advisory, analytics and merchant services.

Built from scratch as a static-first Next.js application, ready to deploy to
Vercel.

---

## Technology

| | Version |
|---|---|
| Next.js | 16.3.4 (App Router, Turbopack) |
| React | 19.2.8 |
| TypeScript | 5.9.3 (`strict`, `noUncheckedIndexedAccess`) |
| Tailwind CSS | 4.3.3 (CSS-first `@theme` tokens) |
| Zod | 4.5.4 (shared client/server validation) |
| Lucide React | 1.38.0 (tree-shaken icons) |
| Playwright | 1.62.1 |
| axe-core | via `@axe-core/playwright` |

**No charting library.** Every financial visual is hand-built SVG, which keeps
roughly 100kB out of the client bundle, lets each mark read the design tokens
directly, and makes the charts genuinely responsive — the plot scales via
`viewBox` while labels stay as real HTML that never shrinks below legibility.

**Brand palette taken from the logo.** The violet and gold ramps are generated
in HSL from colours measured directly in the official artwork (violet
`#2e0d44`, hue 276°; gold hue 36°), so every tint carries the real brand hue.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

The site builds and runs correctly with **no environment variables set**.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Playwright suite (197 tests) |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx                    Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx                      Home
│   ├── globals.css                   Design tokens (@theme) + base styles
│   ├── about/ contact/ merchant-services/
│   ├── privacy/ terms/ disclaimer/
│   ├── services/
│   │   ├── page.tsx                  Services overview
│   │   ├── [slug]/                   7 core service pages
│   │   └── audit-assurance/[slug]/   3 assurance engagement pages
│   ├── api/contact/route.ts          Contact form handler
│   ├── not-found.tsx  error.tsx  global-error.tsx
│   ├── sitemap.ts  robots.ts  icon.svg  opengraph-image.tsx
│
├── components/
│   ├── brand/          Logo, LogoMark, social glyphs
│   ├── charts/         TrendChart, BarPairChart, DonutChart, Sparkline,
│   │                   KpiTile, ReportingPreview
│   ├── forms/          ContactForm
│   ├── layout/         Footer, LegalPage, JsonLd
│   ├── merchant/       PaymentVisuals
│   ├── navigation/     Header, ServicesMegaMenu, MobileNav
│   ├── sections/       Hero, ServiceGrid, ProcessSteps, FaqSection,
│   │                   FeatureStory, CtaSection, ServicePageTemplate, …
│   └── ui/             Button, Card, Container, Section, Accordion,
│                       SectionHeading, Eyebrow, Badge, Prose
│
├── config/
│   ├── site.ts         ★ Single source of truth for every business fact
│   └── navigation.ts   Header, mega-menu and footer structure
│
├── content/
│   ├── services.ts             8 services with full page content
│   ├── audit-services.ts       3 assurance engagements
│   ├── home-faqs.ts
│   └── demo-financials.ts      Illustrative figures for the visuals
│
├── lib/                chart maths, SEO builders, hooks, validation schema
└── types/              Content type definitions

tests/                  responsive · smoke · accessibility
docs/                   Research, audits, design system, QA records
```

### The config layer

**Every phone number, email address, postal address, business hour and social
link on the site is read from `src/config/site.ts`.** Nothing is duplicated.
Changing the phone number there updates the header, footer, contact page,
every CTA block, the error boundary, the structured data and the tests
simultaneously.

Navigation and service content work the same way: `sitemap.xml`, the
mega-menu, the footer link groups and the service grids are all generated from
`src/content/services.ts` and `src/config/navigation.ts`, so a new service
cannot be added to one place and forgotten in another.

---

## Environment variables

All optional. Copy `.env.example` to `.env.local` for local use, or set them
in the Vercel project settings.

| Variable | Purpose | If unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public origin for canonical URLs, Open Graph URLs, sitemap and structured data | Defaults to `https://dbfinco.com` |
| `NEXT_PUBLIC_BOOKING_URL` | External scheduling link | Every "Schedule a Free Consultation" button links to `/contact` |
| `RESEND_API_KEY` | Contact form email delivery | Form reports honestly that it is not connected |
| `CONTACT_FROM_EMAIL` | Verified sender address | As above |
| `CONTACT_TO_EMAIL` | Enquiry destination | Defaults to `enquiry@dbfinco.com` |

**Never commit real values.** `.env*` is git-ignored except `.env.example`.

### Contact form behaviour

The form validates on the client with Zod for immediate feedback, and the API
route **revalidates the same schema server-side** — client validation is a
convenience, never a control.

Delivery requires **both** `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`. Without
them the route returns `status: "unconfigured"` and the UI says plainly:

> **Message not delivered** — This form isn't connected to our mail system
> yet, so your message wasn't sent.

…followed by the real phone number and email addresses. **It never shows a
false success message.** A delivery failure behaves the same way, offering the
same working alternatives.

A honeypot field catches bots: if filled, the request returns success without
sending anything, so bots learn nothing.

### Scheduling

Set `NEXT_PUBLIC_BOOKING_URL` and every consultation CTA points at it,
opening in a new tab with `rel="noopener noreferrer"`. Leave it unset and the
CTAs point at `/contact` — a real, working destination. **There is no dead
link in either case**, and no scheduling provider is invented.

### Social links

Only profiles confirmed by the business owner appear. Currently that is
Facebook alone (`https://www.facebook.com/dbfinco`), used in the footer, the
contact page and the `sameAs` structured data. To add a verified profile, add
it to `site.social` in `src/config/site.ts` and add its glyph to
`src/components/brand/SocialIcons.tsx`. Unverified profiles are deliberately
absent rather than guessed.

---

## Testing

```bash
npm run build
npm run test
```

The Playwright config starts `next start` automatically, so the suite always
runs against the production build rather than dev.

**197 tests:**

| Suite | Tests | Covers |
|---|---|---|
| `responsive.spec.ts` | 144 | Page-level horizontal overflow on 18 routes × 8 viewports (360→1920) |
| `smoke.spec.ts` | 32 | Status codes, single `h1`, titles, meta descriptions, canonicals, console errors, dead links, mega-menu, mobile drawer, focus trap, scroll lock, form validation, accordion ARIA, sitemap, robots, OG image |
| `accessibility.spec.ts` | 21 | axe-core WCAG 2.1/2.2 A + AA on every route, plus the open drawer, open mega-menu and form error states |

> **Browser note.** If Playwright cannot find its browser, set
> `PLAYWRIGHT_CHROMIUM_PATH` to a Chromium binary; the config uses it when
> present. Otherwise run `npm run test:install`.

---

## Deploying to Vercel

1. **Import the repository** at [vercel.com/new](https://vercel.com/new).
   Vercel detects Next.js automatically — framework preset **Next.js**, build
   command `next build`, output directory `.next`, install command
   `npm install`. No overrides needed.

2. **Set environment variables** (Project → Settings → Environment Variables).
   All are optional, but for production set at minimum:

   ```
   NEXT_PUBLIC_SITE_URL = https://dbfinco.com
   ```

   Without it, canonical URLs, Open Graph URLs and the sitemap will point at
   the default `https://dbfinco.com`, which is correct for production but
   wrong for a preview deployment.

   To enable contact form delivery, also set `RESEND_API_KEY` and
   `CONTACT_FROM_EMAIL` (a verified sender on your Resend domain).

3. **Deploy.** The build produces 18 statically prerendered routes plus
   `sitemap.xml`, `robots.txt`, the favicon and the Open Graph image. Only
   `/api/contact` runs on demand.

4. **Add the domain** under Project → Settings → Domains, then update
   `NEXT_PUBLIC_SITE_URL` to match and redeploy so metadata is consistent.

5. **After going live**, submit `https://dbfinco.com/sitemap.xml` to Google
   Search Console, and check a shared link renders correctly with the
   [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

Nothing in the build depends on a database, a CMS or any optional secret.

---

## Security

- **No secrets in client code.** Only `NEXT_PUBLIC_*` variables reach the
  browser; `RESEND_API_KEY` is read exclusively in the server route.
- **Security headers** are set in `next.config.ts` for every response: a
  Content-Security-Policy (`frame-ancestors 'none'`, `object-src 'none'`,
  `base-uri 'self'`, `form-action 'self'`), `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive
  `Permissions-Policy`, `X-Frame-Options: DENY` and HSTS with preload.
- **Server-side validation** on every submission via the shared Zod schema.
- **No user-controlled HTML is ever rendered.** The single
  `dangerouslySetInnerHTML` is the JSON-LD block, built from typed internal
  content and serialised with `<` escaped so it cannot terminate the script
  element.
- **Email content is HTML-escaped** before being placed in the message body.
- **Every external link** carries `rel="noopener noreferrer"`.
- `poweredByHeader` is disabled.

---

## Accessibility

Targets WCAG 2.2 AA, verified by axe-core on every route with **zero
violations**.

Semantic landmarks and a skip link; exactly one `h1` per page; visible
`:focus-visible` rings on every control; 44×44px minimum touch targets; the
mobile drawer traps focus, locks body scroll, closes on Escape and restores
focus to its trigger; the mega-menu opens on hover **and** click **and**
keyboard, so nothing depends on hover; form errors are associated via
`aria-describedby` with focus moved to the first invalid field; charts carry
accessible labels and screen-reader captions, and **no chart requires hover to
read a value**; `prefers-reduced-motion` disables all animation.

Two palette values were darkened during the build because axe caught them
failing contrast on their own tinted backgrounds — see
[`docs/design-system.md`](docs/design-system.md).

---

## Documentation

| Document | Contents |
|---|---|
| [`docs/dbfinco-content-audit.md`](docs/dbfinco-content-audit.md) | Page-by-page audit of the existing site; what was kept, rewritten and excluded |
| [`docs/dbfinco-site-map-current.md`](docs/dbfinco-site-map-current.md) | Existing architecture |
| [`docs/dbfinco-site-map-new.md`](docs/dbfinco-site-map-new.md) | New architecture and the reasoning behind it |
| [`docs/content-migration-matrix.md`](docs/content-migration-matrix.md) | Every source content item mapped to a destination or a documented exclusion |
| [`docs/content-conflicts.md`](docs/content-conflicts.md) | Conflicting facts, how each was resolved, and open items for the owner |
| [`docs/current-site-qa-audit.md`](docs/current-site-qa-audit.md) | QA audit of the existing site |
| [`docs/reference-design-research.md`](docs/reference-design-research.md) | Design principles extracted from the reference sites, and what was rejected |
| [`docs/design-system.md`](docs/design-system.md) | Tokens, typography, layout, components, motion |
| [`docs/final-route-qa.md`](docs/final-route-qa.md) | Measured per-route QA results |
| [`docs/responsive-qa.md`](docs/responsive-qa.md) | Measured 162-check responsive matrix |
| [`docs/logo-restoration.md`](docs/logo-restoration.md) | How the supplied logo was quality-corrected and vectorised |
| [`docs/assets.md`](docs/assets.md) | Asset inventory, fonts, licensing |

---

## Brand assets

The official DB FinCo logo was supplied as a PDF containing a single **482×166
bitmap** with JPEG artefacts and an opaque near-white background. It was
vectorised, denoised and given real transparency; the original file is kept at
`public/brand/source/` as the source of truth.

| Asset | Size | Gzipped | Use |
|---|---|---|---|
| `dbfinco-logo.svg` | 443 × 123 | 8.1 KB | Full lockup, light grounds |
| `dbfinco-logo-inverse.svg` | 443 × 123 | 8.1 KB | Full lockup, violet grounds |
| `dbfinco-wordmark.svg` | 441 × 84 | 3.5 KB | Compact header |
| `dbfinco-wordmark-inverse.svg` | 441 × 84 | 3.5 KB | Compact, dark grounds |
| `dbfinco-mark.svg` | 64 × 64 | 3.6 KB | Monogram, favicon, app icon |

They are served as static files (cached once, not inlined into every page) with
explicit dimensions so they cannot cause layout shift. Full method in
[`docs/logo-restoration.md`](docs/logo-restoration.md).

If the **original vector artwork** (AI, EPS or a true vector PDF) exists,
dropping it into `public/brand/` would give exact letterform geometry — these
assets are a faithful trace of a low-resolution scan.

## Content policy

This site publishes **only what can be substantiated**. It contains no
invented client counts, ratings, review scores, awards, certifications,
partnerships, customer logos or performance statistics — because none were
verifiable.

All financial figures in charts and dashboards are illustrative demonstration
data for a fictional business, labelled as such wherever they appear.

`/merchant-services` names **no** payment processor, gateway, acquiring bank
or card network as a partner, and states explicitly that DB FinCo is not a
bank or a processor and cannot guarantee merchant approval.
