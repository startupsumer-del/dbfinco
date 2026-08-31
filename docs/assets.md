# Assets

## Summary

**This site uses no external image assets, no stock photography, and no
third-party artwork of any kind.** Every visual is generated in code.

That is a deliberate decision rather than a shortcut:

- Stock photography of "our team" would imply a claim about DB FinCo's people
  that cannot be verified.
- No competitor screenshot, illustration or dashboard image is used anywhere.
- No card-network, bank or payment-processor logo is displayed, because
  displaying one would imply a partnership that has not been confirmed.
- Vector visuals stay crisp at any resolution, carry zero image-loading cost,
  contribute no layout shift, and inherit the design tokens directly.

## Inventory

| Asset | Location | Type | Origin |
|---|---|---|---|
| DB FinCo wordmark | `src/components/brand/Logo.tsx` | Inline SVG | Reconstructed as vector from the official DB FinCo logo supplied by the owner |
| DB FinCo wordmark (standalone) | `public/brand/dbfinco-logo.svg` | SVG file | Same geometry, self-contained for external use |
| "DB" monogram | `src/components/brand/Logo.tsx` (`LogoMark`) | Inline SVG paths | Drawn from scratch; no webfont dependency |
| Favicon | `src/app/icon.svg` | SVG file | The monogram |
| Monogram (standalone) | `public/brand/logomark.svg` | SVG file | The monogram |
| Open Graph card | `src/app/opengraph-image.tsx` | Generated PNG (1200×630) | Rendered at build time via `next/og` from the brand palette |
| Facebook glyph | `src/components/brand/SocialIcons.tsx` | Inline SVG path | Drawn locally (lucide-react v1 removed brand marks) |
| Financial charts | `src/components/charts/*` | Inline SVG | Hand-built from `src/content/demo-financials.ts` |
| Payment card, terminal, checkout, settlement panel | `src/components/merchant/PaymentVisuals.tsx` | JSX + CSS + inline SVG | Drawn from scratch, deliberately unbranded |
| Close checklist, filing calendar, advisory, risk register, audit evidence | `src/components/sections/StoryVisuals.tsx`, `ServiceVisuals.tsx` | JSX + CSS | Drawn from scratch |

## Fonts

| Font | Weights | Source | Delivery |
|---|---|---|---|
| Plus Jakarta Sans | 600, 700, 800 | Google Fonts (SIL Open Font License 1.1) | Self-hosted at build time by `next/font/google` |
| Inter | variable | Google Fonts (SIL Open Font License 1.1) | Self-hosted at build time by `next/font/google` |

Both are downloaded during `next build` and served from the site's own origin.
There is **no runtime request to `fonts.googleapis.com` or
`fonts.gstatic.com`**, which removes a third-party dependency, avoids a
render-blocking round trip, and keeps the CSP tight (`font-src 'self' data:`).

## Illustrative financial data

All figures shown in charts, dashboards, settlement panels and reporting
visuals come from `src/content/demo-financials.ts`. They describe a
**fictional business** and exist to demonstrate the format and clarity of
DB FinCo's reporting.

They are **not** client data, **not** DB FinCo's own results, and **not** a
representation of outcomes any business will achieve.

Every surface that renders them carries a visible label:

> Illustrative example. Figures shown are for demonstration only.

This is stated again in the Terms of Use and, at more length, in the
Professional Services Disclaimer.

## Licensing position

Everything in this repository is either written for DB FinCo or is
open-licensed:

- Brand assets: DB FinCo's own.
- Icons: [Lucide](https://lucide.dev), ISC License.
- Fonts: SIL Open Font License 1.1.
- All other visuals: authored for this project.

No asset was scraped, copied or adapted from a competitor or reference site.

## If photography is added later

Should DB FinCo wish to add imagery, the recommendation is:

1. **Authentic photography of the actual team and office** is worth
   substantially more than stock. The site's credibility rests on being
   verifiably real.
2. If stock is used, license it properly, record the source and licence in
   this file, and avoid the generic "smiling professionals around a laptop"
   register that reads as filler.
3. Serve it through `next/image` with explicit `width`, `height` and `sizes`
   so the reserved box prevents layout shift.
4. Never crop faces, payment terminals or UI elements badly across
   breakpoints — set `object-position` per breakpoint if the art direction
   requires it.
