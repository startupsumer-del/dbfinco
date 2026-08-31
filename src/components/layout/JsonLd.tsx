/**
 * Renders a structured-data block.
 *
 * The payload is always built server-side from our own typed content — it is
 * never derived from user input — and it is serialised with `<` escaped so it
 * cannot terminate the script element early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
