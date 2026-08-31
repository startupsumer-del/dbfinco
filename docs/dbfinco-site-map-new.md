# DB FinCo — New Website Architecture

## Route tree

```
/                                                    Home
├── /about                                           About DB FinCo
│                                                      └─ #how-we-work
├── /services                                        Services overview
│   ├── /services/accounting                         Financial Accounting
│   ├── /services/bookkeeping                        Bookkeeping
│   ├── /services/tax                                Tax Services
│   ├── /services/audit-assurance                    Audit & Assurance
│   │   ├── …/external-audit                         External Audit
│   │   ├── …/internal-audit                         Internal Audit
│   │   └── …/agreed-upon-procedures                 Agreed-Upon Procedures
│   ├── /services/consulting                         Business Consulting
│   ├── /services/risk-advisory                      Risk & Financial Advisory
│   └── /services/analytics                          Financial Analytics
├── /merchant-services                               Merchant Services
│                                                      ├─ #payment-methods
│                                                      ├─ #onboarding
│                                                      └─ #reporting
├── /contact                                         Contact
├── /privacy                                         Privacy Policy
├── /terms                                           Terms of Use
├── /disclaimer                                      Professional Services Disclaimer
│
├── /sitemap.xml                                     Generated from content config
├── /robots.txt                                      Generated
├── /opengraph-image                                 Generated 1200×630 PNG
├── /icon.svg                                        Favicon
└── (404)                                            Branded not-found page
```

**18 indexable routes** plus generated metadata endpoints and the 404 page.

## Deliberate exclusions

| Route | Why it does not exist |
|-------|----------------------|
| `/pricing` | Excluded on the owner's explicit instruction. The source site published no prices, and inventing figures was not acceptable. Pricing questions are answered in the FAQ ("what does it cost") and routed to the consultation flow. |
| `/services/business-formation` | No supporting content on the source site. The brief scoped this route as conditional on existing content supporting it. |
| `/resources`, `/blog`, `/case-studies` | No such content exists. Empty content hubs damage credibility. |
| Testimonials section | No verifiable testimonials exist. Replaced by "Why DB FinCo", which describes how engagements actually run. |

## Why this structure

**Services became a real hierarchy.** The old site named five services and
gave one of them a page. Each service now has a page that answers the seven
core buyer questions: what it is, who it is for, what problem it solves, what
you receive, why DB FinCo is credible, what happens next, and what to do now.

**Bookkeeping was split from Accounting.** The source bundles them, but a
business searching for "bookkeeping services" and one searching for
"financial statement preparation" have different intents and different
urgency. They are cross-linked as related services.

**Assurance engagements are kept strictly distinct.** External audit,
internal audit and agreed-upon procedures are separate engagements under
separate standards producing different reports. They are separate routes, and
`/services/audit-assurance` carries a comparison section explaining which
answers which question — including where the client needs *less* than they
thought.

**Tax was given the page its own positioning implies.** The source site sells
"Tax" in its headline and then never mentions it again.

**Merchant Services sits at the top level, not under Services.** It targets a
different buyer moment (a merchant with a processing problem) than the
accounting services, and it earns its own primary navigation slot.

**Legal pages were added.** A firm handling client financial records needs a
privacy policy, terms of use and a professional services disclaimer. The
disclaimer carries the merchant-services accuracy language.

## Navigation mapping

| Header item | Target |
|-------------|--------|
| Logo | `/` |
| Services (mega-menu) | 4 columns → all 10 service routes + `/services` |
| Merchant Services | `/merchant-services` |
| About | `/about` |
| Contact | `/contact` |
| Phone | `tel:+17185597748` |
| Schedule a Free Consultation | `NEXT_PUBLIC_BOOKING_URL`, else `/contact` |

Mega-menu columns: **Accounting** (Financial Accounting, Bookkeeping,
Financial Analytics) · **Tax & Assurance** (Tax, Audit & Assurance) ·
**Assurance Engagements** (External, Internal, Agreed-Upon Procedures) ·
**Advisory & Payments** (Consulting, Risk & Financial Advisory, Merchant
Services).
