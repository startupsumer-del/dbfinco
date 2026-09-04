import { Mail, Phone } from "lucide-react";

import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mailtoEnquiry, site, telHref } from "@/config/site";
import { faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/types/content";

export function FaqSection({
  faqs,
  heading = "Frequently Asked Questions",
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
          <div className="min-w-0">
            <SectionHeading id="faq-heading" eyebrow={eyebrow} title={heading} lead={lead} />

            {/* The way out of an FAQ that does not answer your question. It
                belongs here rather than three sections further down, and it
                fills a column that a heading alone leaves mostly empty beside
                a full list of questions. */}
            <div className="mt-8 rounded-xl border border-line bg-white p-5">
              <p className="text-sm font-semibold text-ink-primary">
                Question not answered here?
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={telHref}
                    className="group inline-flex min-h-11 items-center gap-2.5 text-sm
                      font-semibold text-ink-primary transition-colors hover:text-purple-800"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 items-center justify-center rounded-full
                        bg-purple-50 text-purple-700 transition-transform duration-250
                        ease-[var(--ease-out-brand)] group-hover:scale-105"
                    >
                      <Phone className="size-4" />
                    </span>
                    <span>
                      <span className="sr-only">Call DB FinCo on </span>
                      {site.contact.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={mailtoEnquiry}
                    className="group inline-flex min-h-11 items-center gap-2.5 text-sm
                      font-semibold text-ink-primary transition-colors hover:text-purple-800"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 items-center justify-center rounded-full
                        bg-purple-50 text-purple-700 transition-transform duration-250
                        ease-[var(--ease-out-brand)] group-hover:scale-105"
                    >
                      <Mail className="size-4" />
                    </span>
                    {site.contact.emailEnquiry}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Accordion items={faqs} />
        </div>
      </Container>
      {includeSchema ? <JsonLd data={faqSchema(faqs)} /> : null}
    </Section>
  );
}
