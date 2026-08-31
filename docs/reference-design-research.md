# Reference Design Research

## Method and limitation

The brief named four reference sites: Pilot, Xendoo, doola and Ejad Labs.

**This environment's egress policy blocked all four**, exactly as it blocked
`dbfinco.com`. They could not be fetched or inspected.

Two sources were used instead:

1. **Four screenshots supplied with the brief** — three Xendoo pages (home,
   bookkeeping, tax services) and one Pilot page (bookkeeping for startups),
   captured at desktop width. These were studied directly.
2. **Established conventions of the modern financial-SaaS and
   professional-services category**, applied as principles rather than as
   copied specifics.

Nothing was cloned. No layout was reproduced, no copy was taken, no
screenshot was embedded, and no illustration, dashboard image, testimonial,
price, statistic, customer name or partnership was carried across. What
follows is a record of *principles extracted*, and how DB FinCo's own
identity was built to be distinct from them.

---

## Observed: Xendoo

### Header
Horizontal navigation with four dropdown groups (Services, Technology,
Industries, Our Company) plus a flat Pricing link. Two right-side actions
with clear hierarchy: a hollow "Sign Up" and a solid "Get Started". The
wordmark sits far left and is small relative to the navigation.

**Principle taken:** a small number of top-level groups, one clearly dominant
CTA, and a wordmark that anchors without shouting.

**Where DB FinCo differs:** a single Services mega-menu rather than four
dropdowns — DB FinCo's offering is one coherent finance function, not four
product categories. One CTA, not two, because there is no self-serve product
to sign up to. The DB FinCo logo is given more presence, with the tagline
visible from laptop widths up, because the firm's name is less established
and the descriptor does real work.

### Hero
Two-column layout: headline, one-line support paragraph, a single rounded
pill CTA, then a two-by-two grid of green check marks. The right column
combines a photographic subject with floating dashboard cards — a donut
"Expense Breakdown" reading "$1,900,762 Total Expenses", a gauge, a line
chart, and a "Last 3 Months" control.

**Principles taken:**
- Pair the promise with *evidence of the output*. Showing the reporting is
  more persuasive than describing it.
- Keep the hero paragraph to one or two sentences.
- Give the primary CTA an unmistakable visual weight advantage.

**Where DB FinCo differs deliberately:**
- **No floating card collage.** The DB FinCo reporting panel is a single
  coherent surface with a header bar, a revenue trend, metric tiles and an
  expense breakdown — it reads as one report, not as scattered UI fragments.
- **Every figure is our own and clearly labelled.** The panel carries a
  visible "Illustrative example. Figures shown are for demonstration only."
  strip. Xendoo's specific figures were not reused.
- **The visual is rendered, not photographed.** Every chart is live SVG built
  from a documented dataset, so it is crisp at any resolution, theme-aware,
  and genuinely responsive rather than a scaled bitmap.
- **The hero has no stock photography.** DB FinCo cannot verify any
  photographic subject as its own team, and generic smiling-professional stock
  imagery reads as filler. The reporting panel carries the visual weight
  instead.

### Page structure
Xendoo's bookkeeping and tax pages share a strong spine: outcome-led headline,
short paragraph, single CTA, then alternating feature sections.

**Principle taken:** a consistent spine across service pages is good for
comprehension.

**Where DB FinCo differs:** the shared template carries a *per-service* hero
visual, problem framing, capability set, deliverables, process and FAQ — all
written individually. Eight pages that share a skeleton but never share a
sentence.

### Colour and type
Deep teal-navy grounds with a bright cyan accent; large, tight, heavy
headline type; generous whitespace.

**Principle taken:** commit to one deep brand ground for high-impact sections
and use a single accent with discipline.

**Where DB FinCo differs:** the palette is DB FinCo's own — deep violet
(`#2a1747`) sampled from the wordmark with warm gold (`#a87c22`–`#e0bc63`)
as the accent, on a predominantly white ground. Gold is used only for
eyebrow rules, small emphasis, one hero phrase and the dark-section CTA.

---

## Observed: Pilot

Full-bleed deep-purple hero with a large white headline, a short
people-plus-software positioning line, an inline email field beside a
"Contact Sales" button, and a video thumbnail. Navigation includes a named
product ("Meridian") and both "Get Started" and "Start Free Trial".

**Principles taken:**
- A deep, saturated brand ground makes a strong first impression when the
  type is confident enough to carry it.
- A short positioning sentence beats a paragraph.

**Where DB FinCo differs deliberately:**
- **The hero is light, not dark.** The brief called for a predominantly light
  site, and it suits an accounting firm: white reads as clarity and
  precision. Deep violet is reserved for two high-impact sections — the
  Merchant Services band and the closing CTA — where it lands harder for
  being rare.
- **No email-capture field in the hero.** DB FinCo has no free trial and no
  self-serve funnel. An email box would promise a product that does not
  exist. The CTA leads to a real consultation.
- **No video.** There is no authentic DB FinCo footage, and a stock video
  would be worse than none.
- **"Free trial" language is absent entirely**, because there is nothing to
  trial. The equivalent low-commitment offer is a free consultation, which is
  a real thing the firm does.

Pilot's purple is a bright electric violet on near-black. DB FinCo's is a
deeper, warmer, more traditional violet paired with gold — closer to
professional-services heritage than to venture-backed SaaS, which is the
correct register for an accounting and assurance firm.

---

## doola and Ejad Labs

These could not be fetched and no screenshots were supplied, so no specific
observations are recorded. Inventing findings about sites that were never
seen would be worthless.

The category conventions they represent — entity-formation and
startup-services positioning for doola, and a digital-studio presentation
style for Ejad Labs — informed two general decisions:

- **Business formation was excluded**, not imitated. doola's category makes
  formation services attractive to copy, but nothing on DB FinCo's own site
  supports offering them, and the brief scoped the route as conditional.
- **Studio-style motion was kept restrained.** Heavy scroll choreography
  suits a creative studio; it undermines a firm asking to be trusted with
  financial records.

---

## Principles adopted

| Principle | Source | DB FinCo implementation |
|-----------|--------|------------------------|
| Show the output, not just the promise | Xendoo hero | Live SVG reporting panel, labelled illustrative |
| One dominant CTA | Both | "Schedule a Free Consultation" everywhere; secondary actions are visually quieter |
| Short hero paragraph | Both | Two sentences maximum |
| Consistent service-page spine | Xendoo | Shared template, individually written content |
| One deep brand ground, used sparingly | Both | Violet on the Merchant band and closing CTA only |
| Disciplined single accent | Xendoo | Gold on eyebrows, emphasis and dark-section CTAs |
| Large, tight, confident headline type | Both | `clamp()` display scale, −0.033em tracking at the top end |
| Generous whitespace | Both | Section padding scaling 4rem → 9rem |

## Practices deliberately rejected

| Practice | Why |
|----------|-----|
| Floating dashboard-card collage | Reads as decoration; a single coherent report reads as evidence |
| Stock photography of "our team" | Cannot be verified as DB FinCo people; implies a claim we cannot support |
| Client logo walls | DB FinCo has no confirmed logos to show, and a fabricated wall is a lie |
| Ratings, review scores and awards | None verifiable — the brief explicitly forbids inventing them |
| Statistics ("$X billion processed") | None verifiable |
| Email-capture in the hero | No product to sign up for |
| Free-trial language | No trial exists |
| Video hero | No authentic footage |
| Named partner logos on Merchant Services | **No processor, bank or card-network relationship has been confirmed.** Displaying their marks would imply one |
| Scroll hijacking, parallax, particle fields | Undermines trust in a financial context and hurts INP |

## Quality bar

The target was that DB FinCo should stand next to these sites without looking
like a smaller imitation of any of them — carrying its own violet-and-gold
identity, its own reporting visual language, and content that is more
technically precise than the category norm (particularly in keeping audit,
internal audit and agreed-upon procedures properly distinct, and in refusing
to promise tax savings).
