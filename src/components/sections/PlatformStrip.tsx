import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { logoSrc, platformLogos } from "@/content/logos";

/**
 * A compact row of the platforms an engagement is likely to run inside.
 *
 * The homepage carries the same marks as a moving marquee; this is the still,
 * small version for a service page, where it answers a question the visitor is
 * already asking — "will you work in what we have?" — rather than setting a
 * tone.
 *
 * The claim stays narrow, exactly as it does on the homepage: the marks say
 * the firm works inside software the client already runs, not that any
 * partnership, certification or endorsement exists. The line under the row
 * says so in words.
 */
export function PlatformStrip() {
  return (
    <Reveal className="mt-12 rounded-xl border border-line bg-surface-subtle p-6 sm:p-7 lg:mt-16">
      <p className="text-eyebrow font-semibold uppercase text-gold-800">
        Works in the Ledger You Already Run
      </p>

      <ul className="mt-5 grid grid-cols-2 items-center gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {platformLogos.map((logo, index) => (
          <li
            key={logo.slug}
            data-chart-anim=""
            className="flex min-h-[3.5rem] items-center justify-center rounded-lg border
              border-line bg-white px-3 py-3 transition-shadow duration-200 hover:shadow-md
              [animation:db-rise_400ms_var(--ease-out-brand)_both]"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <Image
              src={logoSrc(logo.slug)}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              style={{ height: Math.round(logo.displayHeight * 0.78), width: "auto" }}
              className="w-auto max-w-full object-contain"
              sizes="140px"
            />
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        Marks are the property of their respective owners and indicate software
        we commonly work in. Their appearance here does not imply a partnership
        with, endorsement by, or certification from those organisations.
      </p>
    </Reveal>
  );
}
