"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { primaryNav, servicesMenu } from "@/config/navigation";
import { bookingUrl, mailtoEnquiry, site, telHref } from "@/config/site";
import { useEscapeKey, useScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/**
 * Full-screen navigation drawer for mobile and tablet.
 *
 * Handles body scroll locking, Escape to close, a focus trap while open, and
 * focus restoration to the trigger on close.
 */
export function MobileNav({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  useScrollLock(open);
  useEscapeKey(open, onClose);

  // Collapse the nested services list whenever the drawer closes. This is
  // React's documented "adjust state when a prop changes" pattern — it runs
  // during render rather than queueing an extra pass from an effect.
  const [previousOpen, setPreviousOpen] = useState(open);
  if (previousOpen !== open) {
    setPreviousOpen(open);
    if (!open && servicesOpen) setServicesOpen(false);
  }

  // Move focus into the drawer once it opens.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  // Keep Tab focus inside the drawer while it is open.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleNavigate() {
    onClose();
    triggerRef.current?.focus();
  }

  return (
    <div
      className={cn(
        // `overflow-hidden` clips the off-canvas panel. Without it the closed
        // drawer, translated fully to the right, extends the document and
        // creates page-level horizontal scrolling at every width below lg.
        "fixed inset-0 z-50 overflow-hidden lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-purple-950/45 backdrop-blur-[2px] transition-opacity duration-250",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl",
          // Visibility is transitioned alongside the transform so the panel
          // stays visible while sliding out, then becomes properly hidden —
          // keeping its links out of the tab order when the drawer is closed.
          "transition-[transform,visibility] duration-300 ease-[var(--ease-out-brand)]",
          open ? "visible translate-x-0" : "invisible translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <Link href="/" onClick={handleNavigate} aria-label={`${site.name} home`}>
            <Logo height={34} withTagline={false} />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-full border
              border-line text-ink-secondary transition-colors hover:bg-purple-50
              hover:text-purple-800"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">Close navigation</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="mobile-services-panel"
                onClick={() => setServicesOpen((value) => !value)}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg
                  px-3 py-3 text-left text-h4 font-semibold text-ink-primary
                  transition-colors hover:bg-purple-50"
              >
                Services
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 text-purple-600 transition-transform duration-250",
                    servicesOpen && "rotate-180",
                  )}
                />
              </button>

              <div id="mobile-services-panel" hidden={!servicesOpen} className="pb-2">
                <Link
                  href="/services"
                  onClick={handleNavigate}
                  className="mx-3 mb-2 flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2
                    text-sm font-semibold text-purple-800 transition-colors hover:bg-purple-50"
                >
                  All services
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                {servicesMenu.map((column) => (
                  <div key={column.heading} className="mb-3">
                    <p className="text-eyebrow px-3 pb-1 pt-2 font-semibold uppercase text-gold-800">
                      {column.heading}
                    </p>
                    <ul>
                      {column.items.map((service) => {
                        const Icon = service.icon;
                        return (
                          <li key={service.slug}>
                            <Link
                              href={service.href}
                              onClick={handleNavigate}
                              className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5
                                text-[0.9375rem] text-ink-secondary transition-colors
                                hover:bg-purple-50 hover:text-purple-900"
                            >
                              <Icon
                                aria-hidden="true"
                                className="size-4 shrink-0 text-purple-500"
                              />
                              {service.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </li>

            {primaryNav
              .filter((link) => link.href !== "/services")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleNavigate}
                    className="flex min-h-11 items-center rounded-lg px-3 py-3 text-h4
                      font-semibold text-ink-primary transition-colors hover:bg-purple-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line bg-surface-subtle px-5 py-5">
          <Button href={bookingUrl} variant="primary" size="lg" fullWidth onClick={handleNavigate}>
            Schedule a Free Consultation
          </Button>
          <a
            href={telHref}
            className="flex min-h-11 items-center justify-center gap-2 rounded-pill border
              border-line-strong bg-white px-5 py-3 text-[0.9375rem] font-semibold
              text-ink-primary transition-colors hover:border-purple-300 hover:bg-purple-50"
          >
            <Phone aria-hidden="true" className="size-4 text-purple-700" />
            {site.contact.phoneDisplay}
          </a>
          <a
            href={mailtoEnquiry}
            className="flex min-h-11 items-center justify-center gap-2 text-sm font-medium
              text-ink-secondary transition-colors hover:text-purple-800"
          >
            <Mail aria-hidden="true" className="size-4" />
            {site.contact.emailEnquiry}
          </a>
        </div>
      </div>
    </div>
  );
}
