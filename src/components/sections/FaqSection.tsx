import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/types/content";

export function FaqSection({
  faqs,
  heading = "Frequently asked questions",
  eyebrow = "Questions",
  lead,
  tone = "subtle",
  includeSchema = true,
}: {
  faqs: FaqItem[];
  heading?: string;
  eyebrow?: string;
  lead?: string;
  tone?: "white" | "subtle";
  includeSchema?: boolean;
}) {
  return (
    <Section tone={tone} ariaLabelledBy="faq-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading id="faq-heading" eyebrow={eyebrow} title={heading} lead={lead} />
          <Accordion items={faqs} />
        </div>
      </Container>
      {includeSchema ? <JsonLd data={faqSchema(faqs)} /> : null}
    </Section>
  );
}
