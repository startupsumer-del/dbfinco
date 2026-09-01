# Logo Restoration

How the official DB FinCo logo was quality-corrected and turned into the
production assets.

## What was supplied

`public/brand/source/db_finco_logo.pdf` — the artwork provided by the owner.

Inspecting it showed it was **not vector artwork**. The PDF contains a single
embedded raster image and nothing else:

| Property | Value |
|---|---|
| Page size | 482 × 166 pt |
| Vector paths | **0** |
| Embedded text | **none** |
| Embedded fonts | **none** |
| Images | 1 × `DeviceRGB`, **482 × 166**, 8 bits/channel |

The extracted bitmap is preserved at
`public/brand/source/db_finco_logo_extracted.png`.

## The three quality defects

1. **Very low resolution.** 482 × 166 pixels. The tagline's cap height is only
   **17 pixels**, with strokes about 1.5px wide.
2. **JPEG compression artefacts.** Measured directly: a grey ringing band under
   the wordmark at 0.30–0.36 "inkness", vertical streaks inside the B's
   counters, and speckle above the tagline cap line at 0.21–0.26.
3. **No transparency.** The background was opaque near-white (`#f8f8f8`), not
   an alpha channel — so the logo could not be placed on the violet footer or
   any coloured surface without showing a white box.

## The correction

The bitmap was vectorised with [potrace](http://potrace.sourceforge.net/),
using a pipeline built specifically around the defects measured above.

**1 · Denoise.** A 3×3 median filter over the RGB removes JPEG speckle while
preserving edges.

**2 · Segment on two independent criteria.** A single brightness threshold
cannot work here, and the measurements show exactly why:

| Region | Darkness | Saturation |
|---|---|---|
| Grey shadow artefact | up to 0.31 | **0.09–0.13** |
| Final "O" (lightest gold) | **0.04** | 0.35 |
| "F" (darker gold) | 0.20 | 0.36 |
| "B" (violet) | 0.73 | 0.81 |

A darkness-only cut keeps the shadow *and* erases the final "O". The rule used
is **`darkness > 0.38 OR saturation > 0.28`**, which keeps every letterform and
reduces the shadow band to 18 stray pixels. The tagline, being solid violet, is
cut on darkness alone at 0.24, with its band starting below the speckle line.

**3 · Clean up morphologically.** Small-object and small-hole filters remove
the streaks inside the B's counters; a binary opening removes the hairline
spurs JPEG ringing left hanging off the B.

**4 · Separate the layers.** The gold "D" is grown by one pixel and painted
first, with the exact violet "B" laid over it. Growing the *gold* rather than
the violet keeps the B's true outline — dilating the B instead visibly ate into
the D's bowl — while the one-pixel overlap prevents a hairline gap where the
two shapes meet.

**5 · Trace.** Each layer is upscaled with Lanczos resampling, lightly blurred
and re-thresholded so potrace sees smooth edges rather than a pixel staircase,
then traced. The tagline gets a higher upscale and gentler despeckling than the
wordmark, because its strokes are only ~1.5px wide in the source.

**6 · Bake the transform.** potrace's own `translate`/`scale` transform is
folded into the path coordinates, so the paths live directly in the artwork's
coordinate space. This matters: leaving the transform on a wrapping group put
the gradient's `userSpaceOnUse` coordinates in a different space from the
paths, which collapsed the gold ramp to a flat colour.

**7 · Reconstruct the gradient from the artwork.** The gold is essentially a
function of x — vertical variance within a column is negligible — so the
gradient was sampled column by column from well-saturated interior pixels only
(saturation > 0.30, so pale anti-aliased edges cannot wash it out), using the
median per column, then fitted to nine Gaussian-weighted stops.

## Result

| Defect | Before | After |
|---|---|---|
| Resolution | 482 × 166 raster | Vector — crisp at any size |
| JPEG artefacts | Shadow band, counter streaks, speckle | Removed |
| Background | Opaque `#f8f8f8` | Genuinely transparent |
| Dark grounds | White box | Dedicated inverse artwork |

| Asset | Size | Gzipped | Use |
|---|---|---|---|
| `dbfinco-logo.svg` | 443 × 123 | 8.1 KB | Full lockup, light grounds |
| `dbfinco-logo-inverse.svg` | 443 × 123 | 8.1 KB | Full lockup, violet grounds |
| `dbfinco-wordmark.svg` | 441 × 84 | 3.5 KB | Wordmark only (compact header) |
| `dbfinco-wordmark-inverse.svg` | 441 × 84 | 3.5 KB | Wordmark only, dark |
| `dbfinco-mark.svg` | 64 × 64 | 3.6 KB | "DB" monogram, favicon, app icon |

The assets are referenced as static files rather than inlined, so the path data
is fetched and cached once instead of being embedded in every page's HTML.
Explicit `width`/`height` reserve the box, so the logo cannot cause layout
shift, and the header variants are preloaded.

## Colours taken from the artwork

These are measured from the real logo, not chosen:

| Value | Measured | Note |
|---|---|---|
| Brand violet | **`#2e0d44`** | Median of the B's solid interior. Hue 276°, saturation 0.68 |
| Gold, darkest | **`#ba8f50`** | Start of the FINCO ramp. Hue 36° |
| Gold, lightest | **`#f5e99e`** | End of the ramp, at the final "O" |

The site's full violet and gold ramps are generated from these hues in HSL, so
every tint and shade carries the logo's actual colour rather than an
approximation. See [`design-system.md`](./design-system.md).

## Recommendation

These vector assets are a faithful, cleaned reconstruction, and they are a
genuine improvement on the supplied file. They are still a *trace* of a
low-resolution scan, so if the original vector artwork (AI, EPS, or a true
vector PDF) exists, supplying it would give exact letterform geometry —
particularly in the tagline, where the source offered only ~1.5px strokes to
work from. Dropping it in at `public/brand/` is the only change that would be
needed.
