import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { logoSrc, platformLogos, type BrandLogo } from "@/content/logos";

/**
 * The accounting-platform strip.
 *
 * Two implementation notes worth keeping.
 *
 * The marquee is pure CSS: the track contains the sequence twice and slides
 * exactly -50%, so the loop point is invisible. No JavaScript runs, nothing
 * hydrates, and the logos are in the server-rendered HTML — animation is
 * strictly an enhancement, and the row is complete without it.
 *
 * Reduced motion gets a genuinely different layout rather than a paused
 * marquee: a static wrapped row, holding every logo once. Both versions are
 * in the markup and CSS picks one, which keeps this a server component.
 *
 * Accessibility follows from that split. Whichever version CSS shows, exactly
 * one copy of each brand name is in the accessibility tree — the first pass of
 * the marquee, or the static row. Everything else is aria-hidden or display:
 * none, so nothing is announced twice and nothing is announced zero times.
 *
 * The heading is deliberately narrow in what it claims. Showing these marks
 * says the firm works inside software the client already runs — which the
 * accounting FAQ and the QuickBooks line in pricing already state — and not
 * that any partnership, certification or endorsement exists.
 */

/** Passes of the sequence per half — see the note at the track below. */
const REPEATS = 3;

function LogoImage({ logo }: { logo: BrandLogo }) {
  return (
    <Image
      src={logoSrc(logo.slug)}
      alt={logo.name}
      width={logo.width}
      height={logo.height}
      // Per-logo height, so a circular mark and a wide wordmark carry the
      // same visual weight. Width follows from the intrinsic ratio.
      style={{ height: logo.displayHeight, width: "auto" }}
      className="w-auto max-w-none opacity-90 transition-opacity duration-200 hover:opacity-100"
      sizes="(min-width: 640px) 240px, 180px"
    />
  );
}

export function PlatformMarquee() {
  return (
    <section
      aria-labelledby="platforms-heading"
      className="border-y border-line bg-white py-10 sm:py-12 lg:py-16"
    >
      <Container>
        <div className="text-center">
          <Eyebrow className="mb-3">Accounting &amp; Business Tools</Eyebrow>
          <h2 id="platforms-heading" className="text-h3 text-ink-primary">
            Works With the Tools You Already Use
          </h2>
        </div>
      </Container>

      {/* Animated row. Hidden outright under reduced motion. */}
      <div className="marquee-viewport mt-8 overflow-hidden motion-reduce:hidden lg:mt-10">
        <div
          className="marquee-track flex w-max items-center"
          style={{ "--marquee-duration": "40s" } as React.CSSProperties}
        >
          {/* Two halves, each holding the sequence REPEATS times, so sliding
              -50% lands the second half exactly where the first began.

              REPEATS is not cosmetic. Five logos come to roughly 1000px, and
              a half narrower than the viewport leaves a visible empty band at
              the end of every cycle — at 1440px a single pass showed ~445px of
              nothing. Three passes put each half near 3000px, clear of the
              1920px widest tested viewport. Same five files either way, so
              this costs DOM nodes and no extra bytes. */}
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {Array.from({ length: REPEATS }, (_, pass) => (
                // Exactly one pass is left in the accessibility tree; the rest
                // exist only to fill the strip. Hiding the whole viewport
                // instead would have left a screen reader with the heading and
                // no brand names at all, since the static row below is
                // display:none unless reduced motion is on.
                <ul
                  key={pass}
                  aria-hidden={half === 0 && pass === 0 ? undefined : "true"}
                  className="flex shrink-0 items-center"
                >
                  {platformLogos.map((logo) => (
                    <li
                      key={logo.slug}
                      className="flex shrink-0 items-center justify-center px-[2.2rem] sm:px-[3.4rem]"
                    >
                      <LogoImage logo={logo} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Static equivalent for reduced motion: every logo, once, no movement. */}
      <Container className="mt-8 hidden motion-reduce:block lg:mt-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
          {platformLogos.map((logo) => (
            <li key={logo.slug} className="flex items-center justify-center">
              <LogoImage logo={logo} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
