import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { socialIconMap } from "@/components/brand/SocialIcons";
import { footerNav } from "@/config/navigation";
import {
  directionsUrl,
  mailtoEnquiry,
  mailtoSupport,
  site,
  telHref,
} from "@/config/site";

/**
 * Site footer.
 *
 * Mobile order is deliberate: identity, then contact, then social, then the
 * link groups, then legal — the priority a phone visitor actually needs.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { address } = site.contact;

  return (
    <footer className="bg-purple-950 text-purple-100">
      <div className="container-page py-12 sm:py-16 lg:py-22">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          {/* Identity + contact */}
          <div>
            <Link href="/" aria-label={`${site.name} home`} className="inline-block">
              <Logo height={56} inverse />
            </Link>
            <p className="measure-tight mt-6 text-sm leading-relaxed text-purple-200">
              A firm of accountants and business advisors helping small and
              medium-sized businesses keep their finances accurate, compliant
              and useful for making decisions.
            </p>

            <ul className="mt-8 space-y-1 text-sm">
              <li>
                <a
                  href={telHref}
                  className="inline-flex min-h-11 items-center gap-3 text-purple-50
                    transition-colors hover:text-gold-300"
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
                  className="inline-flex min-h-11 items-center gap-3 break-all text-purple-50
                    transition-colors hover:text-gold-300"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                  <span>
                    <span className="sr-only">Enquiries email: </span>
                    {site.contact.emailEnquiry}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={mailtoSupport}
                  className="inline-flex min-h-11 items-center gap-3 break-all text-purple-50
                    transition-colors hover:text-gold-300"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                  <span>
                    <span className="sr-only">Support email: </span>
                    {site.contact.emailSupport}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-3 py-2 text-purple-50 transition-colors
                    hover:text-gold-300"
                >
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400" />
                  <span className="not-italic">
                    <span className="block font-medium">{address.label}</span>
                    <span className="block text-purple-200">
                      {address.street}, {address.unit}
                    </span>
                    <span className="block text-purple-200">
                      {address.locality}, {address.region} {address.postalCode}
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {site.social.map((profile) => {
                const Icon = socialIconMap[profile.name as keyof typeof socialIconMap];
                return (
                  <a
                    key={profile.name}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={profile.label}
                    className="flex size-11 items-center justify-center rounded-full border
                      border-white/15 bg-white/5 text-purple-100 transition-colors
                      hover:border-gold-400/60 hover:bg-white/10 hover:text-gold-300"
                  >
                    {Icon ? <Icon aria-hidden="true" className="size-[1.125rem]" /> : null}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link groups */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-1 gap-x-8 gap-y-10 xs:grid-cols-2 xl:grid-cols-4"
          >
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="text-eyebrow font-semibold uppercase text-gold-400">
                  {group.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.heading}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-purple-200 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-purple-300">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-xs text-purple-300 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-xs text-purple-300 transition-colors hover:text-white"
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                href="/disclaimer"
                className="text-xs text-purple-300 transition-colors hover:text-white"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
