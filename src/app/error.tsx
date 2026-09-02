"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mailtoSupport, site, telHref } from "@/config/site";

/**
 * Route-level error boundary. The underlying error is never rendered to the
 * visitor — only a recovery path and real contact routes.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Intentionally quiet in production; Next.js reports the error itself.
  }, []);

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow className="mb-4">Something went wrong</Eyebrow>
          <h1 className="text-h1 text-ink-primary">
            This Page Didn&apos;t Load Correctly
          </h1>
          <p className="measure mt-5 text-lead text-ink-secondary">
            Please try again. If it keeps happening, get in touch and we&apos;ll
            help you directly.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button onClick={reset} size="lg" fullWidth className="sm:w-auto">
              <RotateCcw aria-hidden="true" className="size-4" />
              Try again
            </Button>
            <a
              href={telHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill
                border border-line-strong bg-white px-6 py-3.5 text-base font-semibold
                text-ink-primary transition-colors hover:border-purple-300 hover:bg-purple-50"
            >
              {site.contact.phoneDisplay}
            </a>
          </div>

          <p className="mt-8 text-sm text-ink-secondary">
            Or email{" "}
            <a
              href={mailtoSupport}
              className="font-medium text-purple-700 underline underline-offset-2"
            >
              {site.contact.emailSupport}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
