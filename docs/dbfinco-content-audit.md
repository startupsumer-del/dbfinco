# DB FinCo — Content Audit

## How this audit was produced (read this first)

This audit records an important limitation honestly rather than implying a
completeness it does not have.

**The build environment's egress policy blocked direct access to
`https://dbfinco.com/`.** Every attempt — via HTTP client and via the
fetch tool — returned `EGRESS_BLOCKED` / `403 CONNECT` from the policy proxy.
The same block applied to all four reference sites. Routing around an
organisation egress denial is not permitted, so no page could be crawled,
and no HTML, CSS or asset from the existing site could be retrieved.

Two sources were therefore used instead:

1. **Search-engine index data for `dbfinco.com`** — this surfaced the live
   page inventory, page titles and substantial verbatim body copy.
2. **Direct confirmation from the business owner**, who supplied the
   authoritative contact block during the build and made three explicit
   scope decisions (recorded below).

Where a fact below is marked **Owner-confirmed**, it came from the owner and
supersedes anything found in the index.

---

## Discovered page inventory (existing site)

| # | URL | Title (as indexed) | Purpose |
|---|-----|--------------------|---------|
| 1 | `https://dbfinco.com/` | Home – Fianncial Accounting Services *(sic — typo in the live title tag)* | Homepage; positioning and service overview |
| 2 | `https://dbfinco.com/services.html` | Our Services – DBFinco | Services overview |
| 3 | `http://dbfinco.com/audit-assurance/` | Audit & Assurance – Fianncial Accounting Services | Audit and assurance detail |
| 4 | `https://dbfinco.com/contact.html` | Contact Us – DBFinco | Contact details and enquiry form |

No other public routes were discoverable. Notably **no pricing page, no
merchant-services page and no business-formation page** appeared in the index.

---

## Page-by-page findings

### 1. Home — `/`

| Field | Finding |
|-------|---------|
| Primary positioning | "Enabling Small & Medium Businesses with Premier Accounting, Bookkeeping, Tax, and Consulting Solutions" |
| Company description | "DB FINCO is a growing firm of accountants and business advisors with a focus on improving financial outlooks for clients." |
| Supporting claim | "We provide a complete suite of outsourced financial services, ensuring a holistic approach to meet all your business's financial requirements." |
| Team claim | "DB FINCO takes pride in their team of highly skilled and experienced accountants and bookkeepers, with years of industry experience and deep understanding of accounting principles and latest regulations." |
| Flexibility claim | "Every business is unique… a wide range of customizable accounting and bookkeeping services to suit specific requirements." |
| Services listed | Accounting & Bookkeeping; Audit & Assurance; Business Consultancy; Risk & Financial Advisory; Analytics |
| Sub-services | Financial Statement Preparation; Budgeting & Forecasting |
| CTA | "Request a complimentary quote" / consultation |
| Grammar problem | Page `<title>` reads **"Fianncial"** — a live typo in the title tag |
| Assessment | Business meaning is sound and worth keeping. Prose is generic and needs professional rewriting. |

### 2. Services — `/services.html`

| Field | Finding |
|-------|---------|
| Service 1 | **Accounting & Bookkeeping** — "expert bookkeeping services, ensuring accuracy and peace of mind"; "comprehensive accounting and bookkeeping services, including Financial Statement Preparation, Budgeting & Forecasting" |
| Service 2 | **Audit & Assurance** — "meticulous Audit & Assurance services for comprehensive financial integrity" |
| Service 3 | **Business Consultancy** — "strategic business consultancy for navigating growth and success" |
| Service 4 | **Risk & Financial Advisory** — "Risk and Financial Advisory Service to secure your financial future" |
| Service 5 | **Analytics** — "advanced Analytics Service to empower business decisions" |
| Pricing | "Pricing structure is designed to provide top-notch support that aligns with your budgetary needs." No figures published. |
| Assessment | Service *names* are authoritative and fully preserved. Descriptions are one-line marketing lines requiring substantial expansion. |

### 3. Audit & Assurance — `/audit-assurance/`

This page carried the most substantive and technically specific copy on the
site. Its factual content has been preserved carefully.

| Field | Finding |
|-------|---------|
| Method | "Auditing procedures involve rigorous testing of accounting records and an in-depth examination of evidence supporting the figures and disclosures in financial statements." |
| Evidence | "Evidence is gathered through inquiries, analytical assessments, physical inspections, observations, and independent confirmations." |
| Purpose | "The core purpose of audits is to provide an opinion on whether the financial statements are presented fairly and conform to generally accepted accounting principles or another applicable financial reporting framework." |
| Market focus | "Advisory services exclusively focus on auditing privately held companies, which liberates them from the complexities of public company regulations, reporting deadlines, and intricate risk management concerns." |
| Assessment | **High-value, technically accurate content. Migrated with its meaning intact** across `/services/audit-assurance` and `/services/audit-assurance/external-audit`. |

### 4. Contact — `/contact.html`

| Field | Indexed value | Status |
|-------|---------------|--------|
| Intro | "For inquiries or assistance, kindly complete the form below. We will promptly reach out to address your questions or concerns." | Rewritten |
| Phone | `718-559-7748` | ✅ **Verified — migrated unchanged** |
| Business hours | 9:00 AM – 6:30 PM, Monday to Friday | ✅ **Verified — migrated unchanged** |
| Email (indexed) | `info@company.com` | ❌ **Template placeholder — NOT migrated** |
| Address (indexed) | "1020 New Mountain Street Forest Park, FP 11220" | ❌ **Template placeholder — NOT migrated.** "FP" is not a US state code; 11220 is a Brooklyn ZIP that does not match the locality. |
| Email (owner-confirmed) | `support@dbfinco.com`, `enquiry@dbfinco.com` | ✅ **Owner-confirmed — migrated** |
| Address (owner-confirmed) | Head Office, 459 Columbus Ave, Unit 1090, New York, NY 10024 | ✅ **Owner-confirmed — migrated** |
| Contact methods | Form, live chat, direct call, scheduled callback | Form + call + email implemented; chat not implemented (no provider confirmed) |

---

## Content kept exactly as-is (facts)

- Company name: **DB FinCo**
- Descriptor: **Financial Accounting Services**
- Phone: **718-559-7748**
- Business hours: **Monday – Friday, 9:00 AM – 6:30 PM**
- Emails: **enquiry@dbfinco.com**, **support@dbfinco.com** *(owner-confirmed)*
- Head Office: **459 Columbus Ave, Unit 1090, New York, NY 10024** *(owner-confirmed)*
- Facebook: **https://www.facebook.com/dbfinco** *(owner-confirmed)*
- Service names: Accounting, Bookkeeping, Tax, Audit & Assurance, Consulting,
  Risk & Financial Advisory, Analytics
- Audit methodology, evidence-gathering methods, audit purpose, and the
  privately-held-company focus

## Content whose meaning was kept but which was rewritten

- All homepage marketing prose
- All five one-line service descriptions (expanded into full service pages)
- All calls to action
- The contact page introduction
- Every headline

## Content deliberately NOT migrated

| Item | Reason |
|------|--------|
| `info@company.com` | Template placeholder, not a real DB FinCo address |
| "1020 New Mountain Street Forest Park, FP 11220" | Template placeholder; invalid state code and mismatched ZIP |
| `<title>` typo "Fianncial" | Spelling error |
| "Request a complimentary quote" pricing language as a standalone page | Owner decided to omit `/pricing` entirely |
| Live-chat widget | No chat provider confirmed |
| Any client count, rating, award or statistic | None found and none verifiable — nothing invented |

## Content added that had no source page (and why)

| Addition | Justification |
|----------|---------------|
| `/services/tax` | "Tax" appears in the site's own core positioning line ("Accounting, Bookkeeping, **Tax**, and Consulting Solutions") but had no dedicated page |
| `/services/bookkeeping` (split from accounting) | The existing site bundles "Accounting & Bookkeeping"; these are distinct buyer intents and distinct services |
| `/services/audit-assurance/internal-audit` and `/agreed-upon-procedures` | Required by the build brief; written to correct professional standards and kept strictly distinct from an external audit |
| `/merchant-services` | **Owner-confirmed** as a real offering during the build. Written entirely in neutral language with no named processor, bank or network partnership. |
| `/privacy`, `/terms`, `/disclaimer` | No legal pages existed on the source site |

## Content excluded on owner instruction

| Item | Decision |
|------|----------|
| `/pricing` | **Omitted entirely** at the owner's explicit direction. No invented prices appear anywhere. |
| Business Formation / EIN | **Omitted.** No evidence on the source site, and the brief specified "only if current DB FinCo content supports it". |
