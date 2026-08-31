import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Long-form typography for the legal pages. Styles are applied via descendant
 * selectors so the page content stays plain, semantic JSX.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "measure text-ink-secondary",
        "[&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-h3 [&>h2]:text-ink-primary [&>h2:first-child]:mt-0",
        "[&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-h4 [&>h3]:text-ink-primary",
        "[&>p]:mb-4 [&>p]:leading-relaxed",
        "[&>ul]:mb-5 [&>ul]:space-y-2 [&>ul]:pl-5",
        "[&>ul>li]:list-disc [&>ul>li]:marker:text-gold-800",
        "[&>ol]:mb-5 [&>ol]:space-y-2 [&>ol]:pl-5",
        "[&>ol>li]:list-decimal [&>ol>li]:marker:text-gold-800",
        "[&_a]:font-medium [&_a]:text-purple-700 [&_a]:underline [&_a]:underline-offset-2",
        "[&_a:hover]:text-purple-900",
        "[&_strong]:font-semibold [&_strong]:text-ink-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}
