import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { bookingUrl, mailtoEnquiry, site, telHref } from "@/config/site";

/**
 * Closing consultation CTA, reused at the foot of every page with copy
 * tailored to that page's subject.
 */
export function CtaSection({
  heading,
  body,
  eyebrow = "Get started",
}: {
  heading: string;
  body: string;
  eyebrow?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-purple-900 px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Decorative brand wash — hidden from assistive tech, and it never
              affects layout because it is absolutely positioned. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full
              bg-[radial-gradient(circle,rgba(201,154,84,0.22),transparent_68%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 size-[22rem] rounded-full
              bg-[radial-gradient(circle,rgba(110,56,145,0.38),transparent_70%)]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-center lg:gap-16">
            <div className="min-w-0">
            <Eyebrow tone="inverse" className="mb-5">
              {eyebrow}
            </Eyebrow>
            <h2 className="text-h2 text-white">{heading}</h2>
            <p className="measure mt-5 text-lead text-purple-100">{body}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={bookingUrl} variant="gold" size="lg" className="sm:w-auto" fullWidth>
                Schedule a Free Consultation
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <a
                href={telHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill
                  border border-white/25 px-6 py-3.5 text-base font-semibold text-white
                  transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <Phone aria-hidden="true" className="size-4 text-gold-300" />
                {site.contact.phoneDisplay}
              </a>
            </div>

            </div>

            {/* Direct contact routes — the panel would otherwise be dead space,
                and these are the details a ready visitor actually wants. */}
            <div className="min-w-0 rounded-xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
              <p className="text-eyebrow font-semibold uppercase text-gold-300">
                Or reach us directly
              </p>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a
                    href={telHref}
                    className="flex min-h-11 items-center gap-3 text-white transition-colors hover:text-gold-300"
                  >
                    <Phone aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                    <span>
                      <span className="sr-only">Phone: </span>
                      {site.contact.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={mailtoEnquiry}
                    className="flex min-h-11 items-center gap-3 break-all text-white transition-colors hover:text-gold-300"
                  >
                    <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                    <span>
                      <span className="sr-only">Email: </span>
                      {site.contact.emailEnquiry}
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-purple-100">
                  <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400" />
                  {site.contact.hours.label}
                </li>
                <li className="flex items-start gap-3 text-purple-100">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400" />
                  <span>
                    {site.contact.address.street}, {site.contact.address.unit}
                    <br />
                    {site.contact.address.locality}, {site.contact.address.region}{" "}
                    {site.contact.address.postalCode}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
