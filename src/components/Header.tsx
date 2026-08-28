"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { useScrolled } from "@/hooks/useScrolled";
import { DominicanFlag } from "@/components/DominicanFlag";
import { CartButton } from "@/components/CartButton";
import { MenuIcon, CloseIcon } from "@/components/CartIcons";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

const navLinks = [
  { href: "/gomas", label: "Gomas" },
  { href: "/aros", label: "Aros" },
  { href: "/camiones", label: "Camiones" },
  { href: "/nosotros", label: "Nosotros" },
];

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change and on Escape.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close menu on navigation
    setMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // On the homepage the header is a fixed overlay that fills white once scrolled.
  const whiteBar = overlay && scrolled;

  const lineBg = whiteBar ? "bg-brand-navy-dark/15" : "bg-brand-cream/20";
  const navIdle = whiteBar
    ? "text-brand-navy-dark/50 hover:text-brand-navy-dark"
    : "text-brand-cream/50 hover:text-brand-cream";
  const textColor = whiteBar ? "text-brand-navy-dark" : "text-brand-cream";

  const rootClass = overlay
    ? `fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        whiteBar ? "bg-white" : "bg-transparent"
      } ${textColor}`
    : "relative z-30 bg-brand-navy-dark text-brand-cream";

  return (
    <header className={rootClass}>
      {/* Menu row. Height equals the sidebar width (56px). */}
      <div className="relative flex h-14 items-stretch">
        {/* Bottom frame-line: draws left to right */}
        <span
          className={`intro-line-x pointer-events-none absolute bottom-0 left-0 h-px w-full ${lineBg}`}
          style={{ animationDelay: "0.55s" }}
        />

        {/* Logo, divided from the nav by a vertical frame-line that draws down */}
        <Link
          href="/"
          className="intro-item relative flex items-center px-4 sm:px-8"
          style={{ animationDelay: "0.15s" }}
        >
          <Image
            src={whiteBar ? "/logomark-dark.svg" : "/logomark.svg"}
            alt={site.name}
            width={328}
            height={111}
            priority
            className="h-6 w-auto sm:h-7"
          />
          <span
            className={`intro-line-y pointer-events-none absolute right-0 top-0 h-full w-px ${lineBg}`}
            style={{ animationDelay: "0.62s" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 px-8 font-display text-lg font-bold uppercase tracking-wide lg:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`intro-item transition-colors ${navIdle}`}
              style={{ animationDelay: `${0.25 + i * 0.07}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster. On mobile: cart + hamburger. On desktop: flag + cart + CTA. */}
        <div className="ml-auto flex items-stretch">
          <span
            className="intro-item relative hidden items-center px-5 lg:flex"
            style={{ animationDelay: "0.6s" }}
          >
            <span
              className={`intro-line-y pointer-events-none absolute left-0 top-0 h-full w-px ${lineBg}`}
              style={{ animationDelay: "0.68s" }}
            />
            <DominicanFlag className="h-4 w-auto" />
          </span>

          <CartButton
            whiteBar={whiteBar}
            lineBg={lineBg}
            className="intro-item"
            style={{ animationDelay: "0.64s" }}
          />

          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep intro-item relative hidden items-center bg-brand-yellow px-8 font-display text-base font-bold uppercase tracking-wide text-brand-navy-dark lg:flex"
            style={{ animationDelay: "0.67s" }}
          >
            <span>Contáctanos</span>
          </a>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            className={`intro-item relative flex items-center px-4 transition-colors sm:px-5 lg:hidden ${
              whiteBar
                ? "text-brand-navy-dark/80 hover:text-brand-navy-dark"
                : "text-brand-cream/90 hover:text-brand-cream"
            }`}
            style={{ animationDelay: "0.66s" }}
          >
            <span
              className={`intro-line-y pointer-events-none absolute left-0 top-0 h-full w-px ${lineBg}`}
              style={{ animationDelay: "0.7s" }}
            />
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu. Opens with the tiles animation: three navy
          panels (50/25/25) slide down to cover the screen, then the content
          fades in. */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden ${
          menuOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Tile panels. The box-shadow bleeds each panel's navy 1px past its
            edges so the sub-pixel seam between panels never shows the page
            behind it (a Chrome fractional-width rendering artifact). */}
        <div className="absolute inset-0 flex overflow-hidden">
          {[50, 25, 25].map((w, i) => (
            <div
              key={i}
              className={`h-full bg-brand-navy-dark transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? "translate-y-0" : "-translate-y-full"
              }`}
              style={{
                width: `${w}%`,
                transitionDelay: menuOpen ? `${i * 0.09}s` : `${(2 - i) * 0.09}s`,
                boxShadow: "0 0 0 1px var(--brand-navy-dark)",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className={`absolute inset-0 flex flex-col text-brand-cream transition-[opacity,transform] duration-300 ${
            menuOpen
              ? "translate-y-0 opacity-100 delay-[320ms]"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          {/* Top bar: logo + boxed close, aligned with the header row */}
          <div className="relative flex h-14 items-stretch">
            <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-brand-cream/15" />
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="relative flex items-center px-4 sm:px-8"
            >
              <Image
                src="/logomark.svg"
                alt={site.name}
                width={328}
                height={111}
                className="h-6 w-auto sm:h-7"
              />
              {/* Vertical separator after the logo, matching the hero header */}
              <span className="pointer-events-none absolute right-0 top-0 h-full w-px bg-brand-cream/15" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              className="relative ml-auto flex items-center px-4 text-brand-yellow transition-colors hover:text-brand-cream sm:px-5"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-full w-px bg-brand-cream/15" />
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Nav (sits in the upper part of the screen) */}
          <nav className="flex flex-1 flex-col justify-start gap-1 px-6 pt-[9vh]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="w-fit font-display text-5xl font-extrabold uppercase leading-tight tracking-tight text-brand-cream transition-colors hover:text-brand-yellow"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials (Facebook + Instagram) + flag */}
          <div className="flex items-center justify-between px-6 pb-5">
            <div className="flex items-center gap-5">
              {[
                { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
                { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
              ].map(({ href, label, Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-brand-cream/80 transition-colors hover:text-brand-yellow"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ) : (
                  <span
                    key={label}
                    aria-label={label}
                    className="text-brand-cream/80"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                ),
              )}
            </div>
            <div className="flex items-center gap-2">
              <DominicanFlag className="h-4 w-auto" />
              <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-cream/80">
                RD
              </span>
            </div>
          </div>

          {/* Contact CTA */}
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep relative flex h-16 w-full items-center justify-center gap-2 bg-brand-yellow font-display text-base font-bold uppercase tracking-wide text-brand-navy-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>Contáctanos</span>
          </a>
        </div>
      </div>
    </header>
  );
}
