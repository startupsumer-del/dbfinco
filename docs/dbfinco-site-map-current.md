# Current DB FinCo Website — Architecture

> Reconstructed from search-index data. Direct crawling of `dbfinco.com` was
> blocked by this environment's egress policy (see
> [`dbfinco-content-audit.md`](./dbfinco-content-audit.md)).

## Route tree

```
dbfinco.com/
├── /                     Home
├── /services.html        Our Services
├── /audit-assurance/     Audit & Assurance
└── /contact.html         Contact Us
```

Four public pages in total.

## Observations

**Inconsistent URL conventions.** The site mixes `.html` file extensions
(`/services.html`, `/contact.html`) with directory-style paths
(`/audit-assurance/`). This suggests a template migration that was never
completed.

**Mixed protocol.** `/audit-assurance/` is indexed over plain `http://` while
the other three pages are indexed over `https://`.

**No service detail pages.** Five services are named on `/services.html`, but
only one (Audit & Assurance) has a page of its own. Accounting, Bookkeeping,
Consulting, Risk & Financial Advisory and Analytics each get a single
sentence with nowhere to click through to.

**Tax is orphaned.** "Tax" appears in the site's own core positioning
statement but has no page and no section anywhere.

**No conversion architecture.** No pricing page, no dedicated consultation
flow, and no process explanation.

**No legal pages.** No privacy policy, terms of use or professional services
disclaimer — a notable gap for a firm handling client financial data.

**No sitemap or robots discovered.**

**Flat hierarchy.** No breadcrumbs and no parent/child relationships, so
Audit & Assurance sits at the same level as the homepage rather than beneath
Services.

## Depth of content by page

| Page | Depth | Note |
|------|-------|------|
| `/audit-assurance/` | Substantial | Technically accurate methodology, evidence and scope |
| `/` | Moderate | Positioning plus one-line service summaries |
| `/services.html` | Thin | Five services, roughly one sentence each |
| `/contact.html` | Thin | Contact block, partly filled with unedited template placeholders |
