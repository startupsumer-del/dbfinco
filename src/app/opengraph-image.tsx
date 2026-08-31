import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded Open Graph card.
 *
 * Rendered at build time from our own design tokens — no competitor artwork
 * and no external assets — so Facebook and other platforms show a proper
 * DB FinCo preview when a page is shared.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #150c26 0%, #2a1747 52%, #3a2063 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#e0bc63",
              }}
            >
              DB
            </span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                marginLeft: 10,
              }}
            >
              FINCO
            </span>
          </div>
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.22em",
              color: "#b79fdb",
              marginTop: 10,
            }}
          >
            FINANCIAL ACCOUNTING SERVICES
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <span
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.16,
              letterSpacing: "-0.025em",
              color: "#ffffff",
            }}
          >
            Financial clarity for every stage of your business.
          </span>
          <span
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: "#d6c8ec",
              marginTop: 26,
            }}
          >
            Accounting · Bookkeeping · Tax · Audit &amp; Assurance · Advisory ·
            Merchant Services
          </span>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 24, color: "#e0bc63", fontWeight: 600 }}>
            {site.contact.phoneDisplay}
          </span>
          <span style={{ fontSize: 24, color: "#b79fdb" }}>dbfinco.com</span>
        </div>
      </div>
    ),
    size,
  );
}
