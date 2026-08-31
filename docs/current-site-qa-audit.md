# Current DB FinCo Website — QA Audit

> **Method note.** Direct access to `dbfinco.com` was blocked by this
> environment's egress policy, so this audit is based on search-index data
> (page inventory, titles, meta descriptions and substantial body copy) rather
> than on rendered pages. Findings about **content, information architecture
> and SEO** are well evidenced. Findings about **visual design, responsive
> behaviour and page speed** could not be observed directly and are therefore
> either omitted or explicitly marked as not assessable — they are not
> guessed at.

## Summary

| Area | Assessment | Evidence |
|------|-----------|----------|
| Information architecture | **Poor** | Observed |
| Content depth | **Poor to fair** | Observed |
| Content accuracy | **Poor** | Observed — live template placeholders |
| Copy quality | **Fair** | Observed |
| Spelling & grammar | **Poor** | Observed — typo in live page titles |
| Conversion architecture | **Poor** | Observed |
| Trust signals | **Poor** | Observed |
| Technical SEO | **Poor** | Observed |
| Legal coverage | **Absent** | Observed |
| Visual design | *Not assessable* | Blocked |
| Responsive behaviour | *Not assessable* | Blocked |
| Page speed | *Not assessable* | Blocked |

---

## 1. Content accuracy — the most serious finding

The live contact page carries **unedited template placeholder data**:

- **Email: `info@company.com`** — a generic template default, not a DB FinCo
  address.
- **Address: "1020 New Mountain Street Forest Park, FP 11220"** — "FP" is not
  a valid US state abbreviation, and ZIP 11220 is in Brooklyn, which does not
  match the stated locality.

For a financial services firm, publishing a fake address and a placeholder
email on the contact page is a direct credibility problem. A prospective
client who notices it has good reason to doubt everything else on the site.

**Fixed in the rebuild.** Both were excluded entirely. The owner supplied the
real details, now used consistently across the header, footer, contact page,
structured data and the contact-form fallback.

## 2. Spelling and grammar

The `<title>` on the homepage and the audit page reads **"Fianncial
Accounting Services"** — a misspelling of "Financial" in the single most
visible SEO element on the site. It appears in browser tabs, search results
and social shares.

Other issues: "kindly complete the form below" is stilted for a US business
audience; the brand is rendered inconsistently as "DB FINCO", "DBFinco" and
"DB FinCo".

**Fixed.** All titles are correct and unique. The brand is written **DB FinCo**
consistently in every piece of body copy, sourced from one config file.

## 3. Information architecture

Four pages. Five services are named, but only one has a page. There is no
`/tax` page despite "Tax" appearing in the site's own core positioning
statement. The hierarchy is flat — Audit & Assurance sits at the same level
as the homepage rather than beneath Services. URL conventions are inconsistent
(`.html` extensions mixed with directory paths), and `/audit-assurance/` is
indexed over plain `http://`.

**Fixed.** 18 indexable routes with a real hierarchy, consistent extensionless
URLs, breadcrumbs on every inner page, and `BreadcrumbList` structured data.

## 4. Content depth

Four of the five services are described in roughly one sentence each:

> "Strategic business consultancy for navigating growth and success."

That tells a prospect nothing about what they would receive, how the
engagement runs, or what it costs. There is no process explanation and no
FAQ content anywhere on the site.

**Fixed.** Each service page answers the seven core buyer questions and
carries its own problem framing, capabilities, deliverables, four-step
process and FAQs — written distinctly per service rather than templated.

## 5. Conversion architecture

The only conversion mechanism is "request a complimentary quote". There is no
consultation flow, no explanation of what happens after you make contact, and
the phone number does not appear as a persistent call to action.

**Fixed.** A primary CTA ("Schedule a Free Consultation") appears in the
sticky header, the hero and at the foot of every page. The phone number is
click-to-call in the header on every viewport. `/contact` includes a "What
happens next" sequence.

## 6. Trust signals

No process explanation, no legal pages, no terms, no privacy policy, no
disclaimer. For a firm that would handle client financial records, the
absence of a privacy policy is a genuine gap.

The site also has nothing verifiable to point to — no client count, no
ratings, no certifications. **This audit does not treat that as a reason to
invent any**, and the rebuild does not.

**Fixed.** Privacy Policy, Terms of Use and a Professional Services Disclaimer
were written. Trust is built from transparency instead of claims: real contact
details, a written process, correct professional terminology, honest FAQs
(including "Can you promise to reduce our tax bill?" answered "No"), and
clearly labelled illustrative figures.

## 7. Technical SEO

| Item | Existing site | Rebuild |
|------|--------------|---------|
| Unique page titles | Duplicated across pages, and misspelled | Unique per route |
| Meta descriptions | Thin or missing | Unique, 120–180 characters |
| Canonical URLs | Not observed | On every route |
| Open Graph | Not observed | Complete, with a generated 1200×630 PNG |
| Structured data | Not observed | ProfessionalService, Service, BreadcrumbList, FAQPage |
| `sitemap.xml` | Not discovered | Generated from the content config |
| `robots.txt` | Not discovered | Generated |
| URL consistency | Mixed `.html` and directory paths | Consistent, extensionless |
| Protocol | Mixed `http` / `https` | HTTPS with HSTS |
| Heading hierarchy | Not assessable | Exactly one `h1` per page, enforced by test |

## 8. What could not be assessed

The following were **not** evaluated because the site could not be loaded, and
no assumption has been made about them: visual design and branding execution;
responsive and mobile behaviour; navigation interaction; typography and
spacing; imagery quality; form usability; page speed and Core Web Vitals;
accessibility of the live site.

These are all addressed in the rebuild on their own merits and verified by the
test suite (144 responsive overflow checks and axe audits across every route),
rather than by comparison against an unmeasured baseline.

## 9. What the existing site does well

Worth stating, because it was preserved:

- **The audit page is genuinely good.** It uses correct professional
  terminology — testing of accounting records, evidence via inquiry,
  analytical assessment, physical inspection, observation and independent
  confirmation, and an opinion on fair presentation under GAAP or another
  applicable framework. Its substance was carried across carefully.
- **The private-company focus is a real differentiator**, honestly stated. It
  was kept and given more prominence.
- **The service mix is coherent** and was preserved in full.
