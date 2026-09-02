"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useLang } from "@/lib/i18n";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/SocialIcons";

// WhatsApp sits on top of the social icons.
const icons = [
  { href: buildGeneralWhatsAppLink(), label: "WhatsApp", Icon: WhatsAppIcon },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
];

// Every element in the rail starts its entrance at the same time.
const ENTER = { animationDelay: "1.5s" };

/**
 * Fixed left rail (frame). Transparent over the hero photo, fills white once the
 * page is scrolled, with its label, icons and frame-line switching to navy.
 */
export function HeroSidebar() {
  const scrolled = useScrolled();
  const { t } = useLang();
  const iconColor = scrolled ? "text-brand-navy-dark" : "text-white";

  // Retract the rail as the fixed footer is revealed, so it never sits over it.
  const [atFooter, setAtFooter] = useState(false);
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      setAtFooter(main.getBoundingClientRect().bottom <= window.innerHeight + 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <aside
      className={`fixed bottom-0 left-0 top-14 z-20 hidden w-14 flex-col items-center transition-[background-color,transform,opacity] duration-300 lg:flex ${
        scrolled ? "bg-white" : "bg-transparent"
      } ${atFooter ? "-translate-x-full opacity-0" : ""}`}
    >
      {/* Right frame-line, draws top to bottom early in the intro sequence */}
      <span
        className={`intro-line-y pointer-events-none absolute right-0 top-0 h-full w-px ${
          scrolled ? "bg-brand-navy-dark/15" : "bg-brand-cream/20"
        }`}
        style={{ animationDelay: "0.35s" }}
      />

      {/* Rotated label, centered vertically in the empty area above the icons.
          The flex-1 wrapper claims that space; the inner slides in from the left
          so the span can keep its rotation transform. */}
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="intro-slide-left" style={ENTER}>
          <span
            className={`font-display text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
              scrolled ? "text-brand-navy-dark" : "text-brand-cream/80"
            }`}
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {t.sidebar.label}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col">
        {icons.map(({ href, label, Icon }, i) => {
          const sepColor = scrolled
            ? "border-brand-navy-dark/15"
            : "border-brand-cream/20";
          // Separator above the first icon and between every icon.
          const top = i === 0 ? `border-t ${sepColor}` : "";
          const bottom = i < icons.length - 1 ? `border-b ${sepColor}` : "";
          const cls = `icon-btn intro-slide-left ${iconColor} ${top} ${bottom}`;
          return href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cls}
              style={ENTER}
            >
              <Icon className="h-4 w-4" />
            </a>
          ) : (
            <span key={label} className={cls} style={ENTER}>
              <Icon className="h-4 w-4" />
            </span>
          );
        })}
      </div>
    </aside>
  );
}
