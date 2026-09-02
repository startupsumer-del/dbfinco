import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, PhoneCall } from "lucide-react";

import { socialIconMap } from "@/components/brand/SocialIcons";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  CardIcon,
  FloatCard,
  PortraitScene,
} from "@/components/imagery/PortraitScene";
import { JsonLd } from "@/components/layout/JsonLd";
import { Breadcrumbs } from "@/components/sections/ServicePageTemplate";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import {
  directionsUrl,
  mailtoEnquiry,
  mailtoSupport,
  site,
  telHref,
} from "@/config/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact DB FinCo",
  description:
    "Get in touch with DB FinCo. Call 718-559-7748, email us, or send a message and we’ll respond during business hours. Head office at 459 Columbus Ave, New York, NY 10024.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const { address, hours } = site.contact;

  return (
    <>
      <section className="border-b border-line bg-white">
        <Container className="pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-22 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <Eyebrow className="mb-4">Contact</Eyebrow>
              <h1 className="text-display-2 text-ink-primary">
                Let&apos;s Talk About Your Finances
              </h1>
              <p className="measure mt-5 text-lead text-ink-secondary">
                Tell us where things stand and what you need. We&apos;ll respond
                during business hours with a straight answer about how we can
                help — and whether we&apos;re the right fit.
              </p>
            </div>

            <PortraitScene
              portrait="consultant"
              tone="gold"
              priority
              cards={
                <FloatCard
                  at="bottom-left"
                  icon={
                    <CardIcon tone="violet">
                      <PhoneCall className="size-4" />
                    </CardIcon>
                  }
                  title="A free first conversation"
                  detail="No cost, no obligation"
                />
              }
            />
          </div>
        </Container>
      </section>

      <Section tone="subtle" size="default">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14 xl:gap-20">
            {/* Form first on mobile: it's the primary action */}
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 lg:p-10">
              <h2 className="text-h3 text-ink-primary">Send Us a Message</h2>
              <p className="measure mt-2.5 text-sm text-ink-secondary">
                Fields marked with an asterisk are required.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact details */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h2 className="text-h3 text-ink-primary">Get in Touch Directly</h2>

                <ul className="mt-7 space-y-6">
                  <li>
                    <p className="text-eyebrow font-semibold uppercase text-gold-800">
                      Call us
                    </p>
                    <a
                      href={telHref}
                      className="mt-2 inline-flex min-h-11 items-center gap-2.5 text-h4
                        font-semibold text-ink-primary transition-colors hover:text-purple-800"
                    >
                      <Phone aria-hidden="true" className="size-[1.125rem] text-purple-700" />
                      {site.contact.phoneDisplay}
                    </a>
                  </li>

                  <li>
                    <p className="text-eyebrow font-semibold uppercase text-gold-800">
                      Email us
                    </p>
                    <div className="mt-2 space-y-1">
                      <a
                        href={mailtoEnquiry}
                        className="flex min-h-11 items-center gap-2.5 break-all text-[0.9375rem]
                          font-medium text-ink-primary transition-colors hover:text-purple-800"
                      >
                        <Mail aria-hidden="true" className="size-4 shrink-0 text-purple-700" />
                        {site.contact.emailEnquiry}
                      </a>
                      <a
                        href={mailtoSupport}
                        className="flex min-h-11 items-center gap-2.5 break-all text-[0.9375rem]
                          font-medium text-ink-primary transition-colors hover:text-purple-800"
                      >
                        <Mail aria-hidden="true" className="size-4 shrink-0 text-purple-700" />
                        {site.contact.emailSupport}
                      </a>
                    </div>
                  </li>

                  <li>
                    <p className="text-eyebrow font-semibold uppercase text-gold-800">
                      {address.label}
                    </p>
                    <address className="mt-2 not-italic text-[0.9375rem] leading-relaxed text-ink-secondary">
                      {address.street}
                      <br />
                      {address.unit}
                      <br />
                      {address.locality}, {address.region} {address.postalCode}
                    </address>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold
                        text-purple-800 transition-colors hover:text-purple-950"
                    >
                      <MapPin aria-hidden="true" className="size-4" />
                      Get directions
                    </a>
                  </li>

                  <li>
                    <p className="text-eyebrow font-semibold uppercase text-gold-800">
                      Business hours
                    </p>
                    <p className="mt-2 flex items-start gap-2.5 text-[0.9375rem] text-ink-secondary">
                      <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-purple-700" />
                      {hours.label}
                    </p>
                  </li>

                  <li>
                    <p className="text-eyebrow font-semibold uppercase text-gold-800">
                      Follow us
                    </p>
                    <div className="mt-3 flex gap-3">
                      {site.social.map((profile) => {
                        const Icon =
                          socialIconMap[profile.name as keyof typeof socialIconMap];
                        return (
                          <a
                            key={profile.name}
                            href={profile.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={profile.label}
                            className="flex size-11 items-center justify-center rounded-full border
                              border-line text-purple-700 transition-colors
                              hover:border-purple-300 hover:bg-purple-50"
                          >
                            {Icon ? (
                              <Icon aria-hidden="true" className="size-[1.125rem]" />
                            ) : null}
                          </a>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border border-gold-200 bg-gold-50 p-6">
                <h2 className="text-h4 font-semibold text-ink-primary">
                  What Happens Next
                </h2>
                <ol className="mt-4 space-y-3">
                  {[
                    "We read your message and check we’re the right fit.",
                    "We reply during business hours to arrange a consultation.",
                    "The consultation is free, with no obligation to engage us.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm text-ink-secondary">
                      <span
                        aria-hidden="true"
                        className="flex size-5 shrink-0 items-center justify-center rounded-full
                          bg-gold-600 text-[0.625rem] font-bold text-purple-950"
                      >
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
