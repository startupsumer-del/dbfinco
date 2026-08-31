import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "gold" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "transition-[background-color,color,box-shadow,border-color,transform] duration-200 " +
  "ease-[var(--ease-out-brand)] whitespace-nowrap " +
  // 44px minimum touch target on every variant.
  "min-h-11 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-purple-800 text-white shadow-sm hover:bg-purple-700 hover:shadow-md " +
    "focus-visible:outline-purple-800",
  secondary:
    "border border-line-strong bg-white text-ink-primary hover:border-purple-300 " +
    "hover:bg-purple-50 focus-visible:outline-purple-700",
  gold:
    "bg-gold-600 text-purple-950 shadow-[var(--shadow-gold)] hover:bg-gold-500 " +
    "focus-visible:outline-gold-800",
  ghost:
    "text-purple-800 hover:bg-purple-50 focus-visible:outline-purple-700",
  inverse:
    "bg-white text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3.5 text-base sm:px-7",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Stretch to the full width of the parent — used for mobile CTAs. */
  fullWidth?: boolean;
}

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    fullWidth = false,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, fullWidth: _f, ...rest } =
      props;

    const isExternal = external ?? /^(https?:)?\/\//.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, fullWidth: _f, ...rest } =
    props as ButtonAsButton;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
