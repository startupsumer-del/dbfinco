import { ArrowRight, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/**
 * Alternating editorial feature block: copy on one side, a visual on the
 * other. On mobile the copy always comes first regardless of desktop side,
 * so the reading order stays logical.
 */
export function FeatureStory({
  eyebrow,
  heading,
  body,
  points,
  href,
  linkLabel,
  visual,
  reverse = false,
  tone = "white",
  id,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  href: string;
  linkLabel: string;
  visual: ReactNode;
  reverse?: boolean;
  tone?: "white" | "subtle" | "lilac" | "gold";
  id?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <Section tone={tone} id={id} ariaLabelledBy={headingId}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* `min-w-0` stops a grid item's min-content size from inflating the
              track. Without it a nowrap element deep inside a column (a
              truncating row in one of the visuals) widens the whole track and
              pushes the page 1px past the viewport at 360px. */}
          <div className={cn("min-w-0", reverse && "lg:order-2")}>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h2 id={headingId} className="text-h2 text-ink-primary">
              {heading}
            </h2>
            <p className="measure mt-5 text-lead text-ink-secondary">{body}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                  <CircleCheck
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-gold-800"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <Button href={href} variant="secondary" size="lg" className="mt-9">
              {linkLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>

          <div className={cn("min-w-0", reverse && "lg:order-1")}>{visual}</div>
        </div>
      </Container>
    </Section>
  );
}
