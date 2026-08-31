# Content Migration Matrix

Every piece of useful content on the existing DB FinCo site maps to a new
route, a section of a new route, or a documented exclusion.

| Existing URL | Topic | Useful content | New route | Preserve fact | Rewrite | Fact checked | Notes |
|---|---|---|---|---|---|---|---|
| `/` | Company positioning | "Growing firm of accountants and business advisors… improving financial outlooks for clients" | `/about` hero, `/` hero | ✅ | ✅ | ✅ | Meaning preserved verbatim in substance; prose rewritten |
| `/` | Core offer line | "Premier Accounting, Bookkeeping, Tax, and Consulting Solutions for Small & Medium Businesses" | `/` hero + `/services` | ✅ | ✅ | ✅ | Drove the decision to build a dedicated `/services/tax` |
| `/` | Outsourced suite claim | "Complete suite of outsourced financial services… holistic approach" | `/` services section, `/about` | ✅ | ✅ | ✅ | Became "A complete finance function, delivered by one firm" |
| `/` | Team experience | "Highly skilled and experienced accountants and bookkeepers… deep understanding of accounting principles and latest regulations" | `/about` principles, `/` Why DB FinCo | ✅ | ✅ | ✅ | Reframed as "a named accountant, not a queue" — no unverifiable counts |
| `/` | Customisation | "Every business is unique… customizable services" | `/` process, service pages | ✅ | ✅ | ✅ | Became the written-scope principle |
| `/` | Sub-services | "Financial Statement Preparation, Budgeting & Forecasting" | `/services/accounting` features | ✅ | ✅ | ✅ | Both are named capabilities on the accounting page |
| `/services.html` | Accounting & Bookkeeping | "Expert bookkeeping… accuracy and peace of mind" | `/services/accounting`, `/services/bookkeeping` | ✅ | ✅ | ✅ | Split into two full pages |
| `/services.html` | Audit & Assurance | "Meticulous Audit & Assurance… financial integrity" | `/services/audit-assurance` | ✅ | ✅ | ✅ | Plus three child engagement pages |
| `/services.html` | Business Consultancy | "Strategic business consultancy for navigating growth and success" | `/services/consulting` | ✅ | ✅ | ✅ | Expanded to full page |
| `/services.html` | Risk & Financial Advisory | "Secure your financial future" | `/services/risk-advisory` | ✅ | ✅ | ✅ | Expanded to full page |
| `/services.html` | Analytics | "Advanced Analytics Service to empower business decisions" | `/services/analytics` | ✅ | ✅ | ✅ | Expanded to full page |
| `/services.html` | Pricing language | "Pricing structure… aligns with your budgetary needs" | `/` FAQ, service CTAs | ✅ | ✅ | ✅ | **No `/pricing` route** — omitted on owner instruction; no figures invented |
| `/audit-assurance/` | Audit method | "Rigorous testing of accounting records and in-depth examination of evidence supporting the figures and disclosures" | `/services/audit-assurance`, `/services/audit-assurance/external-audit` | ✅ | ➖ | ✅ | Substance preserved closely — technically precise source |
| `/audit-assurance/` | Evidence methods | "Inquiries, analytical assessments, physical inspections, observations, independent confirmations" | `/services/audit-assurance/external-audit` + Audit Evidence visual | ✅ | ➖ | ✅ | All five methods preserved and made into a visual |
| `/audit-assurance/` | Audit purpose | "Opinion on whether financial statements are presented fairly and conform to GAAP or another applicable financial reporting framework" | `/services/audit-assurance/external-audit` | ✅ | ➖ | ✅ | Terminology preserved exactly |
| `/audit-assurance/` | Private company focus | "Exclusively focus on auditing privately held companies… free of public company regulations, reporting deadlines and risk management concerns" | `/services/audit-assurance` intro + FAQ | ✅ | ✅ | ✅ | Reused as a differentiator and as an honest scope limit |
| `/contact.html` | Phone | `718-559-7748` | Header, footer, every CTA, `/contact`, schema | ✅ | ➖ | ✅ | **Verified — unchanged everywhere** |
| `/contact.html` | Hours | 9:00 AM – 6:30 PM, Mon–Fri | Footer, `/contact`, CTA blocks, schema | ✅ | ➖ | ✅ | **Verified — unchanged** |
| `/contact.html` | Email | `info@company.com` | — | ❌ | — | ✅ | **Excluded: template placeholder.** Replaced with owner-confirmed addresses |
| `/contact.html` | Address | "1020 New Mountain Street Forest Park, FP 11220" | — | ❌ | — | ✅ | **Excluded: template placeholder.** "FP" is not a US state code |
| `/contact.html` | Form intro | "Kindly complete the form below…" | `/contact` | ➖ | ✅ | ✅ | Rewritten in natural American English |
| `/contact.html` | Live chat | "Initiate a chat with experts" | — | ❌ | — | ✅ | **Excluded: no chat provider confirmed.** A non-functional chat button would be a dead end |
| `/contact.html` | Callback scheduling | "Schedule a callback" | `/contact` "What happens next" | ✅ | ✅ | ✅ | Folded into the consultation flow |
| *(owner-confirmed)* | Emails | `support@dbfinco.com`, `enquiry@dbfinco.com` | Footer, `/contact`, schema, form fallback | ✅ | ➖ | ✅ | Supplied directly by the owner |
| *(owner-confirmed)* | Head Office | 459 Columbus Ave, Unit 1090, New York, NY 10024 | Footer, `/contact`, LocalBusiness schema, directions link | ✅ | ➖ | ✅ | Supplied directly by the owner |
| *(owner-confirmed)* | Facebook | `https://www.facebook.com/dbfinco` | Footer, `/contact`, `sameAs` schema | ✅ | ➖ | ✅ | The only social profile used — no others were verifiable |
| *(owner-confirmed)* | Merchant Services | Confirmed as a real offering | `/merchant-services` + home teaser + mega-menu | ✅ | ✅ | ✅ | Written in neutral language only; **no named processor, bank or card-network partnership** |
| `<title>` on `/` and `/audit-assurance/` | "Fianncial" typo | — | — | ❌ | — | ✅ | **Excluded: spelling error.** All new titles are correct |

**Legend** — ✅ applies · ➖ not applicable (fact carried over unchanged) · ❌ deliberately not migrated

## Coverage check

Every one of the four source pages is fully accounted for. No legitimate
DB FinCo service was dropped: all five services named on `/services.html`
have dedicated pages, plus Tax (implied by the site's own positioning) and
Merchant Services (owner-confirmed).
