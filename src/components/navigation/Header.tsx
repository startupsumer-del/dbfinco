"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ServicesMegaMenu } from "@/components/navigation/ServicesMegaMenu";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/config/navigation";
import { bookingUrl, site, telHref } from "@/config/site";
import { useEscapeKey } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/**
 * Sticky site header with three deliberate navigation modes:
 *
 *   < 1024px  — full-screen drawer (MobileNav)
 *   1024px+   — horizontal nav with the Services mega-menu and one CTA
 *   1280px+   — the phone number is added alongside the CTA
 *
 * The mega-menu opens on hover for pointer users and on click/Enter for
 * touch and keyboard users, so nothing depends on hover alone.
 */
export function Header() {
  const pathname = usePathname();
  /**
   * The mega-menu has three states, held as one value so every transition is
   * a functional update and no two signals can race:
   *   "closed" — hidden
   *   "hover"  — opened by the pointer; closes when the pointer leaves
   *   "pinned" — opened deliberately by click or keyboard; stays until dismissed
   */
  const [megaMode, setMegaMode] = useState<"closed" | "hover" | "pinned">(
    "closed",
  );
  const megaOpen = megaMode !== "closed";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const megaId = useId();
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMega = useCallback(() => setMegaMode("closed"), []);
  useEscapeKey(megaOpen, () => {
    closeMega();
    megaTriggerRef.current?.focus();
  });

  // Close every overlay when the route changes. Adjusting state during
  // render is the supported pattern for reacting to a changed input — an
  // effect here would queue an extra render pass on every navigation.
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    if (megaOpen) setMegaMode("closed");
    if (drawerOpen) setDrawerOpen(false);
  }

  // Add a border and shadow once the page scrolls away from the top.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss the mega-menu on a click anywhere outside it.
  useEffect(() => {
    if (!megaOpen) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        megaPanelRef.current?.contains(target) ||
        megaTriggerRef.current?.contains(target)
      ) {
        return;
      }
      setMegaMode("closed");
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [megaOpen]);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  function openOnHover() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    // Only pointer devices that can genuinely hover should trigger this.
    if (!window.matchMedia("(hover: hover)").matches) return;
    setMegaMode((mode) => (mode === "pinned" ? "pinned" : "hover"));
  }

  function closeOnHoverOut() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      // A menu the user deliberately opened stays open until they dismiss it;
      // only a hover-opened menu closes when the pointer leaves.
      setMegaMode((mode) => (mode === "hover" ? "closed" : mode));
    }, 140);
  }

  /**
   * Standard disclosure behaviour: the trigger pins the menu open, and a
   * second deliberate press closes it. Because a pointer user's hover has
   * already moved the menu into "hover", their click promotes it to "pinned"
   * rather than closing it.
   */
  function handleTriggerClick() {
    setMegaMode((mode) => (mode === "pinned" ? "closed" : "pinned"));
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow duration-250",
          scrolled ? "border-b border-line shadow-sm" : "border-b border-transparent",
        )}
      >
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className="shrink-0 rounded-sm"
            >
              {/* Tagline is dropped below lg so the mark stays legible and clear
                  of the menu button on small screens. */}
              <span className="lg:hidden">
                <Logo height={26} withTagline={false} priority />
              </span>
              <span className="hidden lg:block">
                <Logo height={50} priority />
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                <li
                  onMouseEnter={openOnHover}
                  onMouseLeave={closeOnHoverOut}
                >
                  <button
                    ref={megaTriggerRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls={megaId}
                    onClick={handleTriggerClick}
                    className={cn(
                      "flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-[0.9375rem]",
                      "font-medium transition-colors duration-200",
                      isActive("/services")
                        ? "text-purple-900"
                        : "text-ink-secondary hover:text-purple-900",
                    )}
                  >
                    Services
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-transform duration-250",
                        megaOpen && "rotate-180",
                      )}
                    />
                  </button>
                </li>

                {primaryNav
                  .filter((link) => link.href !== "/services")
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center rounded-lg px-3 py-2 text-[0.9375rem]",
                          "font-medium transition-colors duration-200",
                          isActive(link.href)
                            ? "text-purple-900"
                            : "text-ink-secondary hover:text-purple-900",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <a
                href={telHref}
                className="hidden min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-[0.9375rem]
                  font-semibold text-ink-primary transition-colors hover:text-purple-800 xl:flex"
              >
                <Phone aria-hidden="true" className="size-4 text-purple-700" />
                <span className="sr-only">Call DB FinCo on </span>
                {site.contact.phoneDisplay}
              </a>
              <a
                href={telHref}
                aria-label={`Call DB FinCo on ${site.contact.phoneDisplay}`}
                className="flex size-11 items-center justify-center rounded-full border border-line
                  text-purple-700 transition-colors hover:border-purple-300 hover:bg-purple-50 xl:hidden"
              >
                <Phone aria-hidden="true" className="size-4" />
              </a>
              <Button href={bookingUrl} size="md">
                Schedule a Free Consultation
              </Button>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={telHref}
                aria-label={`Call DB FinCo on ${site.contact.phoneDisplay}`}
                className="flex size-11 items-center justify-center rounded-full border border-line
                  text-purple-700 transition-colors hover:border-purple-300 hover:bg-purple-50"
              >
                <Phone aria-hidden="true" className="size-[1.125rem]" />
              </a>
              <button
                ref={drawerTriggerRef}
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-expanded={drawerOpen}
                aria-haspopup="dialog"
                className="flex size-11 items-center justify-center rounded-full border border-line
                  text-ink-primary transition-colors hover:border-purple-300 hover:bg-purple-50"
              >
                <Menu aria-hidden="true" className="size-5" />
                <span className="sr-only">Open navigation menu</span>
              </button>
            </div>
          </div>
        </div>

        {megaOpen ? (
          <div onMouseEnter={openOnHover} onMouseLeave={closeOnHoverOut}>
            <ServicesMegaMenu id={megaId} onNavigate={closeMega} panelRef={megaPanelRef} />
          </div>
        ) : null}

      </header>

      {/* Deliberately a sibling of the header, not a child of it. The header
          carries `backdrop-blur`, and an element with a backdrop-filter forms
          the containing block for its `position: fixed` descendants — which
          sized the drawer to the 64px header instead of the viewport and cut
          off everything below its own title row. */}
      <MobileNav
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={drawerTriggerRef}
      />
    </>
  );
}
