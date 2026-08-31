# Content Conflicts

Conflicts found between the existing DB FinCo site and other sources, and how
each was resolved.

---

## 1. Email address — RESOLVED

| Source | Value |
|---|---|
| `dbfinco.com/contact.html` (indexed) | `info@company.com` |
| Business owner (during this build) | `support@dbfinco.com`, `enquiry@dbfinco.com` |

**Assessment.** `info@company.com` is an unedited template default, not a
DB FinCo address. It cannot be a real contact route for the business.

**Resolution.** The owner-supplied addresses are used. `enquiry@dbfinco.com`
is the primary enquiry route (used in the contact form fallback, structured
data and the footer); `support@dbfinco.com` appears alongside it on the
contact page and footer, and in the error state of the site's error boundary.
`info@company.com` appears nowhere in the codebase.

**Action needed:** none.

---

## 2. Office address — RESOLVED

| Source | Value |
|---|---|
| `dbfinco.com/contact.html` (indexed) | 1020 New Mountain Street, Forest Park, FP 11220 |
| Business owner (during this build) | Head Office, 459 Columbus Ave, Unit 1090, New York, NY 10024 |

**Assessment.** The indexed address is a template placeholder and is
internally inconsistent: **"FP" is not a valid US state abbreviation**, and
ZIP **11220 is in Brooklyn, New York**, which does not correspond to any
locality called "Forest Park". It cannot be a real address.

The owner-supplied address is internally consistent: 459 Columbus Ave is on
Manhattan's Upper West Side, and **10024 is the correct ZIP for that
location**. It is also consistent with the **718** area code of the verified
phone number, which is a New York City code.

**Resolution.** The owner-supplied address is used throughout — contact page,
footer, `PostalAddress` structured data, and the Google Maps directions link.

**Action needed:** none.

---

## 3. Page title spelling — RESOLVED

| Source | Value |
|---|---|
| `dbfinco.com/` and `/audit-assurance/` `<title>` | "**Fianncial** Accounting Services" |
| Correct spelling | "Financial Accounting Services" |

**Assessment.** A straightforward typo in the live title tag, appearing in
browser tabs, search results and social shares.

**Resolution.** Not migrated. All new titles are correct and unique per route.

**Action needed:** none.

---

## 4. Brand name rendering — RESOLVED

The existing site renders the brand three ways: **DB FINCO** (body copy),
**DBFinco** (page titles), and **DB FinCo**.

**Resolution.** **DB FinCo** is used consistently in all body copy, titles and
metadata, read from a single value in `src/config/site.ts`. The all-caps
"DB FINCO" treatment is retained only in the logo, where it is a visual
letterform choice rather than a spelling.

**Action needed:** none.

---

## 5. Merchant Services — RESOLVED BY OWNER

| Source | Position |
|---|---|
| Existing DB FinCo site | **No mention anywhere.** No page, no navigation entry, no service listing |
| Build brief | Required a full `/merchant-services` page |

**Assessment.** This was a genuine conflict, and it was escalated rather than
assumed either way, because publishing payment-services claims for a firm
that does not offer them would be a material misrepresentation.

**Resolution.** The owner confirmed Merchant Services **is** a real DB FinCo
offering, and directed that it be built with neutral language. It is
therefore written with:

- **no named payment processor, gateway, acquiring bank or card network** as a
  partner or sponsor anywhere on the page;
- explicit statements that DB FinCo is **not** a bank, processor, gateway,
  acquirer, payment facilitator, ISO/MSP or card network;
- an explicit statement that **approval cannot be guaranteed** and is decided
  solely by the provider's underwriting;
- availability qualified as varying "by provider, business type, underwriting
  requirements and jurisdiction";
- payment methods described as what "may commonly be supported" rather than as
  partnerships;
- **no card-network or bank logos drawn or displayed at all** — the payment
  card visual is deliberately unbranded.

**Action needed:** see the open item below.

---

## 6. Pricing — RESOLVED BY OWNER

| Source | Position |
|---|---|
| Existing DB FinCo site | Quote-based only: "Pricing structure is designed to provide top-notch support that aligns with your budgetary needs." No figures published |
| Build brief | Requested a `/pricing` route |

**Assessment.** No prices, package names, tiers or inclusions exist on the
source site, and none could be verified. Inventing them was not acceptable.

**Resolution.** The owner directed that `/pricing` be **omitted entirely**.
No pricing route exists, no figures appear anywhere on the site, and the
pricing question is answered honestly in the homepage FAQ ("Pricing depends on
the services you need… We scope every engagement and quote it before any work
begins") with the visitor routed to a consultation.

**Action needed:** none, unless the owner later wishes to publish rates.

---

## 7. Business Formation / EIN — RESOLVED

| Source | Position |
|---|---|
| Existing DB FinCo site | No mention of entity selection, incorporation, EIN or FEIN support |
| Build brief | Requested the route **"ONLY if current DB FinCo content supports it"** |

**Assessment.** Nothing on the source site supports it, and the brief's own
condition therefore fails.

**Resolution.** Omitted. The disclaimer additionally states plainly that
DB FinCo does not provide legal services and is not a law firm, and directs
visitors to qualified counsel for entity formation documents.

**Action needed:** if DB FinCo does offer formation support, confirm the exact
scope and it can be added as `/services/business-formation`.

---

## Open items requiring owner confirmation

Nothing below blocks deployment. Each is an opportunity to strengthen the
site with facts that could not be verified during the build.

| # | Item | Current state | What would change |
|---|---|---|---|
| 1 | **Payment provider relationships** | No processor, gateway or acquiring bank is named on `/merchant-services` | If DB FinCo has confirmed provider relationships, they can be named accurately, with correct taxonomy (a card network is not a bank; a payment platform is not a bank) |
| 2 | **Additional social profiles** | Only Facebook, which the owner confirmed | No Instagram, LinkedIn, X or YouTube appears, because none could be verified. Verified handles can be added to `site.social` in one edit |
| 3 | **Professional credentials** | No CPA licence, registration or certification is claimed anywhere | If DB FinCo holds CPA licences or state registrations, stating them would materially strengthen the assurance pages |
| 4 | **Testimonials and client references** | None used | No testimonial, rating, review score, client count or logo appears, because none was verifiable. Owner-supplied, attributable testimonials could be added |
| 5 | **Saturday hours / after-hours contact** | Mon–Fri 9:00 AM – 6:30 PM only, as verified | If other hours apply, one edit to `site.contact.hours` updates the footer, contact page, CTA blocks and structured data together |
| 6 | **Live chat** | Not implemented | The source site advertised "initiate a chat with experts" but no provider could be identified. A dead chat button is worse than none |
