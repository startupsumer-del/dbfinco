import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { primaryNav } from "@/config/navigation";
import { site, telHref } from "@/config/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 size-[32rem] rounded-full bg-[radial-gradient(circle,var(--color-purple-50),transparent_68%)]" />
      </div>

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow className="mb-4">Error 404</Eyebrow>
          <h1 className="text-display-2 text-ink-primary">
            We Couldn&apos;t Find That Page
          </h1>
          <p className="measure mt-5 text-lead text-ink-secondary">
            The page may have moved, or the link may be out of date. Everything
            we offer is reachable from the links below — or call us and
            we&apos;ll point you to the right place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/" size="lg" fullWidth className="sm:w-auto">
              Back to home
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <a
              href={telHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill
                border border-line-strong bg-white px-6 py-3.5 text-base font-semibold
                text-ink-primary transition-colors hover:border-purple-300 hover:bg-purple-50"
            >
              <Phone aria-hidden="true" className="size-4 text-purple-700" />
              {site.contact.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Helpful links" className="mt-12 border-t border-line pt-8">
            <p className="text-eyebrow font-semibold uppercase text-gold-800">
              Popular pages
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-pill border border-line
                      bg-white px-4 py-2 text-sm font-medium text-ink-secondary
                      transition-colors hover:border-purple-200 hover:bg-purple-50
                      hover:text-purple-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
