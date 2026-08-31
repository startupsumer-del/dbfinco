# DB FinCo Design System

All tokens are defined in `src/app/globals.css` under Tailwind v4's `@theme`
block, which is the single source of truth. Nothing below is hard-coded
anywhere else in the codebase.

---

## Colour

### Brand — violet

Sampled from the deep violet of the official DB FinCo wordmark (`#2a1747`)
and extended into a full ramp.

| Token | Hex | Used for |
|---|---|---|
| `--color-purple-950` | `#150c26` | Footer ground, OG gradient start |
| `--color-purple-900` | `#2a1747` | **Core brand violet** — logo, dark sections |
| `--color-purple-800` | `#3a2063` | Primary button fill |
| `--color-purple-700` | `#4c2b7e` | Primary hover, chart series 1, focus ring |
| `--color-purple-600` | `#603a97` | Icon accents |
| `--color-purple-500` | `#7a52b3` | Chart series 3 |
| `--color-purple-400` | `#9a79c9` | Chart series 5 |
| `--color-purple-300` | `#b79fdb` | Chart series 6, inverse eyebrow |
| `--color-purple-200` | `#d6c8ec` | Inverse tagline, card hover border |
| `--color-purple-100` | `#e9e1f6` | Soft borders on tinted surfaces |
| `--color-purple-50` | `#f5f1fc` | Icon chips, hover fills |

### Brand — gold

Sampled from the gold gradient of the wordmark.

| Token | Hex | Used for |
|---|---|---|
| `--color-gold-900` | `#6f4f10` | Reserved |
| `--color-gold-800` | `#8a6417` | **All gold text** — 5.4:1 on white |
| `--color-gold-700` | `#a87c22` | Wordmark gradient mid, non-text accents |
| `--color-gold-600` | `#c0912e` | Eyebrow rules, bullets, chart series 2 |
| `--color-gold-500` | `#d4a73c` | Gold button fill |
| `--color-gold-400` | `#e0bc63` | Accents on violet grounds |
| `--color-gold-300` | `#ebd08f` | Inverse eyebrow, icons on violet |
| `--color-gold-200` | `#f3e2ba` | Disclaimer panel border |
| `--color-gold-100` | `#f8eed6` | Tinted chips |
| `--color-gold-50` | `#fdf9ef` | Warm surface, disclaimer panel |

> **Gold discipline rule.** `gold-700` and lighter never carry body text —
> they fail AA on white. **`gold-800` is the only gold used for text on light
> surfaces.** This is enforced by the axe suite, which caught and rejected an
> earlier `gold-700` usage.

### Surfaces

White dominates. The site is deliberately light; violet grounds appear only
twice per page at most.

| Token | Hex | Used for |
|---|---|---|
| `--color-surface-white` | `#ffffff` | Default page ground |
| `--color-surface-subtle` | `#fbfafd` | Alternating sections, panel headers |
| `--color-surface-muted` | `#f4f2f8` | Donut track, keypad keys |
| `--color-surface-lilac` | `#f6f3fc` | Reporting and deliverables sections |
| `--color-surface-gold-soft` | `#fdf9ef` | Warm accent sections |

### Text

| Token | Hex | Contrast on white | Used for |
|---|---|---|---|
| `--color-ink-primary` | `#1e1330` | 16.4:1 | Headings, key figures |
| `--color-ink-secondary` | `#4a4058` | 9.0:1 | Body copy |
| `--color-ink-muted` | `#6e667e` | 5.2:1 | Captions, labels |
| `--color-ink-inverse` | `#ffffff` | — | Text on violet |

### Lines and status

`--color-line` `#e6e2ee` · `--color-line-strong` `#d0c9de`

| Token | Hex | Note |
|---|---|---|
| `--color-success` | `#126544` | Darkened from `#16794c` to clear 4.5:1 on its own 10% tint |
| `--color-warning` | `#92400e` | Darkened from `#b45309` for the same reason — axe caught the original at 4.40:1 |
| `--color-danger` | `#a91d13` | Form errors |

### Data visualisation

An ordered six-colour series, all AA-legible on white and distinguishable
without relying on hue alone (legends always carry the label and the value).

`viz-1` `#4c2b7e` · `viz-2` `#c0912e` · `viz-3` `#7a52b3` ·
`viz-4` `#126544` · `viz-5` `#9a79c9` · `viz-6` `#b79fdb`

---

## Typography

**Display / headings:** Plus Jakarta Sans (600, 700, 800) — geometric and wide,
matching the letterforms of the wordmark.
**Body / UI:** Inter — chosen for readability at small sizes and its excellent
tabular figures, which matter for financial data.

Both are loaded through `next/font/google` with `display: swap` and
self-hosted at build time, so there is no render-blocking request to a
third-party font host and no layout shift.

### Fluid scale

Every step uses `clamp()` so type scales continuously rather than jumping at
breakpoints.

| Token | Min → max | Line height | Tracking |
|---|---|---|---|
| `text-display-1` | 2.5 → 4.75rem | 1.04 | −0.033em |
| `text-display-2` | 2.125 → 3.5rem | 1.08 | −0.028em |
| `text-h1` | 1.95 → 3rem | 1.12 | −0.024em |
| `text-h2` | 1.6 → 2.375rem | 1.18 | −0.02em |
| `text-h3` | 1.3 → 1.6rem | 1.28 | −0.014em |
| `text-h4` | 1.1 → 1.25rem | 1.36 | −0.01em |
| `text-lead` | 1.0625 → 1.1875rem | 1.62 | — |
| `text-eyebrow` | 0.75rem | 1.2 | +0.11em |

**Measure.** `.measure` caps prose at `68ch` and `.measure-tight` at `56ch`,
keeping lines in the 55–75 character range. Headings use `text-wrap: balance`
and paragraphs `text-wrap: pretty`, so no heading ends on an orphan word.

---

## Layout

### Containers

`.container-page` — `max-width: 84rem` (1344px), centred, with gutters that
step deliberately:

| Viewport | Gutter |
|---|---|
| < 640px | 20px |
| ≥ 640px | 32px |
| ≥ 1024px | 40px |
| ≥ 1440px | 64px |

`.container-narrow` — `max-width: 48rem` for long-form legal content.

### Breakpoints

Tailwind defaults plus two: `xs` 424px (large phones, used for the footer link
grid) and `3xl` 1600px.

The three navigation modes are a deliberate design decision, not a single
collapse point:

| Range | Navigation |
|---|---|
| < 1024px | Full-screen drawer |
| 1024–1279px | Horizontal nav + mega-menu + one CTA; phone as an icon button |
| ≥ 1280px | Adds the phone number as text beside the CTA |

### Section rhythm

`compact` `3rem → 5rem` · `default` `4rem → 7rem` · `roomy` `5rem → 9rem`

---

## Components

### Buttons

Pill-shaped, minimum height `2.75rem` (44px) on every variant so touch targets
always pass. Five variants: `primary` (violet 800), `secondary` (white with
border), `gold` (gold 500 on violet grounds), `ghost`, `inverse`.

`fullWidth` is used for mobile CTAs, which become edge-to-edge below `sm` and
revert to intrinsic width above it.

### Cards

`rounded-xl`, `1px` line border, white ground, `p-6` rising to `p-7`.
Interactive cards lift `2px` and deepen their shadow over 250ms. Service cards
use a stretched-link pseudo-element so the whole card is one hit target while
the accessible name stays on the heading link.

### Radii and elevation

`xs` 4px · `sm` 8px · `md` 12px · `lg` 16px · `xl` 20px · `2xl` 28px · `pill` 999px

Five shadow steps, all tinted with the ink colour (`rgb(30 19 48 / …)`) rather
than neutral black, so elevation stays within the brand.

### Icons

Lucide, `1rem`–`1.5rem`, `1.5px` stroke, tree-shaken per-icon. Decorative
icons carry `aria-hidden="true"`; the accessible name lives on the enclosing
control.

> lucide-react v1 removed brand marks, so the Facebook glyph is drawn locally
> in `src/components/brand/SocialIcons.tsx`.

### Charts

Hand-built SVG — no charting library. This is a deliberate call: it removes
roughly 100kB of client JavaScript, lets every mark read design tokens
directly, and makes genuine responsiveness possible.

**The key technique:** the plot area is SVG with a `viewBox` so it scales to
any parent width, while **axis labels, legends and values are real HTML** that
scale with the root font size. A chart shrunk to 320px therefore keeps
fully legible labels rather than 4px text.

Rules every chart follows:
- No fixed pixel widths; width is always 100% of the parent.
- `aspect-ratio` reserves the box before paint, so charts contribute no CLS.
- `vector-effect="non-scaling-stroke"` keeps strokes even under non-uniform scaling.
- X labels are decimated to at most six so they never collide.
- **No information depends on hover.** Every value is in the legend or a tile.
- Each chart carries an accessible `aria-label` plus an `sr-only` figcaption
  stating the data range.

Components: `TrendChart` (area + line), `BarPairChart` (grouped bars),
`DonutChart` (segments + HTML legend), `Sparkline`, `KpiTile`,
`ReportingPreview` (composed panel).

---

## Motion

| Class | Duration | Applied to |
|---|---|---|
| Fast UI | 150–220ms | Colour, border, hover |
| Standard | 250–350ms | Card lift, drawer slide, accordion chevron |
| Large reveal | 400–650ms | Chart draw-on, bar growth |

Easing: `--ease-out-brand` `cubic-bezier(0.22, 1, 0.36, 1)`.

`prefers-reduced-motion: reduce` collapses every animation and transition to
`0.01ms` and disables smooth scrolling, globally.

Nothing loops, nothing parallaxes, nothing hijacks scroll, and no animation
moves layout — reveals use `opacity` and `transform` only.

---

## Focus and interaction

Global `:focus-visible` ring: `2px solid var(--color-purple-600)` at `2px`
offset, on every interactive element. Mouse clicks do not show it;
keyboard navigation always does.

Minimum touch target is 44×44 CSS pixels on every button, link chip, icon
button, radio and form control.

The Services mega-menu opens on hover **and** on click and keyboard, so no
navigation depends on hover alone. A `(hover: hover)` media query gates the
hover behaviour to devices that genuinely support it.

---

## Logo

The wordmark is reconstructed as vector in
`src/components/brand/Logo.tsx`: a gold-to-violet gradient "D", a deep-violet
"B", the gold-gradient "FINCO", and the letterspaced violet tagline beneath.

Geometry comes from measured Plus Jakarta Sans metrics at 88px — "DB" is
122.2 units wide, "FINCO" 284.5, with a 14-unit gap — so glyphs render at
their natural widths and are never stretched. The SVG carries explicit
`width`/`height`, so the logo box is fixed regardless of font-loading state
and cannot cause layout shift.

The tagline is dropped below `lg`, where it would be unreadable and would
crowd the menu button.

`LogoMark` is a square "DB" monogram drawn as paths — no webfont dependency
at all — used for the favicon and compact placements.
