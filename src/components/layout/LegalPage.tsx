import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/sections/ServicePageTemplate";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
      <section className="border-b border-line bg-white">
        <Container className="pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-22 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-8 max-w-3xl">
            <Eyebrow className="mb-4">Legal</Eyebrow>
            <h1 className="text-h1 text-ink-primary">{title}</h1>
            <p className="measure mt-5 text-lead text-ink-secondary">{intro}</p>
            <p className="mt-6 text-sm text-ink-muted">Last updated: {updated}</p>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container>
          <Prose>{children}</Prose>
        </Container>
      </Section>
    </>
  );
}
