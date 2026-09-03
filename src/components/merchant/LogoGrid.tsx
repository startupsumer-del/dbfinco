import Image from "next/image";

import { logoSrc, type BrandLogo } from "@/content/logos";
import { cn } from "@/lib/cn";

/**
 * A labelled row of third-party brand marks.
 *
 * Reusable on purpose: adding, removing or replacing a logo means editing the
 * array in `src/content/logos.ts` and dropping a file in `public/logos/` —
 * no layout work. Each mark sits on its own white tile so brands whose asset
 * carries a white ground blend cleanly, and every logo keeps its official
 * colours, proportions and its own tuned height.
 *
 * `label` is the group heading and must stay factually narrow: these marks
 * show what a customer can pay with, not who the firm is partnered with.
 */
export function LogoGrid({
  label,
  logos,
  columns = 5,
  className,
}: {
  label: string;
  logos: BrandLogo[];
  /** Desktop column count — match it to the row so no tile is left stretched. */
  columns?: 4 | 5;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-eyebrow font-semibold uppercase text-gold-800">
        {label}
      </p>
      <ul
        className={cn(
          "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4",
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5",
        )}
      >
        {logos.map((logo) => (
          <li
            key={logo.slug}
            className="flex min-h-[4.5rem] items-center justify-center rounded-xl
              border border-line bg-white px-4 py-4 transition-shadow duration-200
              hover:shadow-md"
          >
            <Image
              src={logoSrc(logo.slug)}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              style={{ height: logo.displayHeight, width: "auto" }}
              className="w-auto max-w-full object-contain"
              sizes="(min-width: 1024px) 160px, 140px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
