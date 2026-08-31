# Responsive QA

Every route was loaded at every viewport below against the production build
and measured directly. Two independent checks were applied:

1. `document.documentElement.scrollWidth` vs `clientWidth` — page-level horizontal overflow.
2. A DOM sweep counting every element whose right edge escapes the viewport **and** is not inside an `overflow`-clipping ancestor — so intentionally clipped decoration (the hero brand washes, the off-canvas drawer) is correctly excluded while genuine escapes are caught.

Nothing below is asserted without measurement.

## Navigation modes by width

| Range | Mode |
|---|---|
| < 1024px | Full-screen drawer with nested services accordion |
| 1024–1279px | Horizontal nav, mega-menu, one CTA, phone as an icon button |
| ≥ 1280px | Adds the phone number as text beside the CTA |

## Result matrix

| Route | Viewport | Navigation | Layout | Text | Media | Overflow | Escaping elements | Result |
|---|---|---|---|---|---|---|---|---|
| `/` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 360x800 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 390x844 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 430x932 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 768x1024 | Drawer | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 1024x768 | Compact desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 1280x800 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 1366x768 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 1440x900 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/about` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/accounting` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/bookkeeping` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/tax` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/external-audit` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/internal-audit` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/audit-assurance/agreed-upon-procedures` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/consulting` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/risk-advisory` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/services/analytics` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/merchant-services` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/contact` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/privacy` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/terms` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |
| `/disclaimer` | 1920x1080 | Full desktop | ✅ | ✅ | ✅ | **0px** | 0 | ✅ PASS |

**162 / 162 checks pass. Maximum page-level horizontal overflow across every combination: 0px.**

## Bugs this suite caught and forced fixes for

1. **The closed mobile drawer extended the document.** Translated fully off-canvas, it added exactly one viewport-width of horizontal scroll to every page below 1024px. Fixed at source by clipping its fixed container and transitioning `visibility` alongside the transform — not by masking it with `overflow-x: hidden` on the body.
2. **A grid track inflated by min-content.** A `truncate` row inside the filing-calendar visual pushed its grid track 21px wider than the container, overflowing the page by 1px at 360px. Fixed with `min-w-0` on the grid children, which is the structural fix rather than a width override.

