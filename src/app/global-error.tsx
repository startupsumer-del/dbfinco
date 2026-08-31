"use client";

/**
 * Last-resort boundary. It replaces the root layout, so it must render its
 * own html and body, and cannot rely on the site's fonts or components.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          background: "#ffffff",
          color: "#1e1330",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <h1 style={{ fontSize: "1.75rem", lineHeight: 1.2, margin: "0 0 1rem" }}>
            Something went wrong
          </h1>
          <p style={{ margin: "0 0 1.5rem", color: "#4a4058", lineHeight: 1.6 }}>
            The page couldn&apos;t be loaded. Please try again, or call DB FinCo
            on 718-559-7748.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: "2.75rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: "none",
              background: "#3a2063",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
