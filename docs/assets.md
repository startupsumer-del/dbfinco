# Assets

## Summary

The site uses three kinds of image asset, and every other visual is generated
in code:

1. **DB FinCo's own brand artwork**, supplied by the owner.
2. **Thirteen photographic portraits**, supplied by the owner during the
   build, used decoratively.
3. **Fourteen third-party brand logos** — accounting platforms, card networks
   and banks — supplied by the owner, displayed to show what a customer can
   pay with and what software the firm works in.

> **This section previously said the opposite.** Until the portraits and logos
> were added it read "no external image assets, no stock photography, and no
> third-party artwork of any kind", and specifically that no card-network or
> bank logo was displayed. Both statements were true when written and are not
> true now. Anyone who relied on the old wording for a licensing review should
> re-read this file.

What still holds:

- No competitor screenshot, illustration or dashboard image is used anywhere.
- No visual asserts a claim about DB FinCo that cannot be verified. The
  portraits carry an empty `alt`, are never captioned with a name or a role,
  and nowhere does the site say they depict its staff.
- Every surface showing a third-party mark carries a caveat that it implies no
  partnership — see the licensing position below.
- The remaining visuals are vector or code-drawn, so they stay crisp at any
  resolution, contribute no layout shift, and inherit the design tokens.

## Inventory

| Asset | Location | Type | Origin |
|---|---|---|---|
| **Supplied logo artwork** | `public/brand/source/db_finco_logo.pdf` | PDF (single 482×166 bitmap) | **Provided by the owner — the source of truth** |
| Extracted bitmap | `public/brand/source/db_finco_logo_extracted.png` | PNG | The image extracted from that PDF, kept for reference |
| DB FinCo logo | `public/brand/dbfinco-logo.svg` | SVG | Vectorised from the supplied artwork |
| DB FinCo logo (inverse) | `public/brand/dbfinco-logo-inverse.svg` | SVG | Same, for violet grounds |
| DB FinCo wordmark | `public/brand/dbfinco-wordmark.svg` | SVG | Wordmark only, for the compact header |
| DB FinCo wordmark (inverse) | `public/brand/dbfinco-wordmark-inverse.svg` | SVG | Wordmark only, dark grounds |
| "DB" monogram | `public/brand/dbfinco-mark.svg` | SVG | Favicon and compact placements |
| Favicon | `src/app/icon.svg` | SVG | The monogram |
| Open Graph card | `src/app/opengraph-image.tsx` | Generated PNG (1200×630) | Rendered at build time via `next/og` from the brand palette |
| Facebook glyph | `src/components/brand/SocialIcons.tsx` | Inline SVG path | Drawn locally (lucide-react v1 removed brand marks) |
| Financial charts | `src/components/charts/*` | Inline SVG | Hand-built from `src/content/demo-financials.ts` |
| Payment card, terminal, checkout, settlement panel | `src/components/merchant/PaymentVisuals.tsx` | JSX + CSS + inline SVG | Drawn from scratch, deliberately unbranded |
| Close checklist, filing calendar, advisory, risk register, audit evidence | `src/components/sections/StoryVisuals.tsx`, `ServiceVisuals.tsx` | JSX + CSS | Drawn from scratch |
| **Photographic portraits (13)** | `public/imagery/advisor-*.webp` | WebP, ~1.5 MB total | **Supplied by the owner during the build.** Rendered through `next/image` with an empty `alt`, a blur placeholder and a per-placement `sizes` |
| **Accounting platform logos (5)** | `public/logos/{quickbooks,xero,zoho-books,gusto,sage}.webp` | WebP, ~136 KB for all 14 | **Supplied by the owner.** Each is the official mark, trimmed of surrounding canvas and scaled proportionally — never recoloured, redrawn or stretched |
| **Card network logos (4)** | `public/logos/{visa,mastercard,american-express,discover}.webp` | WebP | As above |
| **Bank logos (5)** | `public/logos/{chase,bank-of-america,wells-fargo,citi,us-bank}.webp` | WebP | As above |

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

- Brand assets: DB FinCo's own. The logo was supplied by the owner; the vector versions are derived from it (see [`logo-restoration.md`](./logo-restoration.md)).
- Icons: [Lucide](https://lucide.dev), ISC License.
- Fonts: SIL Open Font License 1.1.
- Code-drawn visuals: authored for this project.

No asset was scraped, copied or adapted from a competitor or reference site.

### Third-party marks — two items for the owner

The fourteen logos are the trademarks of their respective owners. The site
displays them to identify what a customer can pay with and what software the
firm works in, which is the ordinary nominative use of a mark, and every
surface that shows one states that it implies no partnership, endorsement or
certification — `merchant-services/page.tsx`, `PaymentJourney.tsx` and
`PlatformStrip.tsx` each carry that wording. No mark is recoloured, redrawn,
distorted, or placed so as to suggest a relationship.

That is the correct posture, but it is not the same as clearance. Two things
only the owner can settle:

1. **Trademark use.** Several of these companies publish brand-usage
   guidelines governing how third parties may display their marks. The owner
   should confirm the use here is consistent with them.
2. **Portrait rights.** The thirteen portraits were supplied during the build
   with no stated provenance or licence. If they are stock, generated, or
   photographs of identifiable people, the owner needs the right to use them
   commercially — and, for identifiable people, a model release. The build
   recorded no licence because none was provided.

Neither is a defect in the code. Both are facts the build could not verify,
and they are listed alongside the other open items in
[`content-conflicts.md`](./content-conflicts.md).

## If more photography is added

The thirteen portraits now in use are decorative. Should DB FinCo add further
imagery, the recommendation is unchanged:

1. **Authentic photography of the actual team and office** is worth
   substantially more than stock. The site's credibility rests on being
   verifiably real, and it is the one kind of image that could carry a name
   and a role rather than an empty `alt`.
2. If stock is used, license it properly, record the source and licence in
   this file, and avoid the generic "smiling professionals around a laptop"
   register that reads as filler.
3. Serve it through `next/image` with explicit `width`, `height` and `sizes`
   so the reserved box prevents layout shift.
4. Never crop faces, payment terminals or UI elements badly across
   breakpoints — set `object-position` per breakpoint if the art direction
   requires it.
