import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/sections/ServicePageTemplate";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import type { Crumb } from "@/lib/seo";

export function LegalPage({
  title,
  intro,
  updated,
  crumbs,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <>
      {/* A narrow, centred column rather than a full-width one. These pages are
          a single run of prose with nothing beside it, and in the page-width
          container the text sat in the left half with the right half empty.
          Centring the reading measure is what a document looks like. */}
      <section className="border-b border-line bg-white">
        <Container
          width="narrow"
          className="pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-22 lg:pt-12"
        >
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-8">
            <h1 className="text-h1 text-ink-primary">{title}</h1>
            <p className="mt-5 text-lead text-ink-secondary">{intro}</p>
            <p className="mt-6 text-sm text-ink-muted">Last updated: {updated}</p>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container width="narrow">
          <Prose>{children}</Prose>
        </Container>
      </Section>
    </>
  );
}
