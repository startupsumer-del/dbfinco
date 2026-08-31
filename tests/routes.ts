/** Every production route exercised by the smoke and responsive suites. */
export const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/accounting",
  "/services/bookkeeping",
  "/services/tax",
  "/services/audit-assurance",
  "/services/audit-assurance/external-audit",
  "/services/audit-assurance/internal-audit",
  "/services/audit-assurance/agreed-upon-procedures",
  "/services/consulting",
  "/services/risk-advisory",
  "/services/analytics",
  "/merchant-services",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
] as const;

export const VIEWPORTS = [
  { name: "small-mobile", width: 360, height: 800 },
  { name: "modern-mobile", width: 390, height: 844 },
  { name: "large-mobile", width: 430, height: 932 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "large-desktop", width: 1920, height: 1080 },
] as const;
