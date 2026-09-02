"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { LANGS, LANG_META } from "@/data/dictionary";
import { FLAGS } from "@/components/Flags";

/**
 * Language toggle shown where the flag used to sit. `variant="bar"` is the
 * compact dropdown in the header; `variant="menu"` is the inline flag row in
 * the mobile menu.
 */
export function LanguageSwitcher({
  variant = "bar",
  tone = "dark",
}: {
  variant?: "bar" | "menu";
  /** "light" over the hero photo, "dark" on the white/navy surfaces. */
  tone?: "light" | "dark";
}) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const CurrentFlag = FLAGS[lang];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "menu") {
    return (
      <div className="flex items-center gap-3" aria-label={t.header.language}>
        {LANGS.map((l) => {
          const Flag = FLAGS[l];
          const active = l === lang;
          return (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-label={LANG_META[l].label}
              aria-pressed={active}
              className={`flex items-center gap-1.5 transition-opacity ${
                active ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`}
            >
              <Flag className="h-4 w-auto ring-1 ring-brand-cream/20" />
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-cream">
                {LANG_META[l].short}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  const triggerColor =
    tone === "light"
      ? "text-brand-cream hover:text-brand-cream"
      : "text-brand-navy-dark hover:text-brand-navy-dark";

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.header.language}
        className={`flex items-center gap-1.5 transition-colors ${triggerColor}`}
      >
        <CurrentFlag className="h-4 w-auto" />
        <span className="font-display text-xs font-bold uppercase tracking-widest">
          {LANG_META[lang].short}
        </span>
        <svg
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden border border-black/10 bg-white py-1 shadow-xl"
        >
          {LANGS.map((l) => {
            const Flag = FLAGS[l];
            const active = l === lang;
            return (
              <li key={l} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? "bg-brand-navy-dark/[.06] font-semibold text-brand-navy-dark"
                      : "text-black/70 hover:bg-brand-navy-dark/[.04]"
                  }`}
                >
                  <Flag className="h-4 w-auto ring-1 ring-black/10" />
                  <span>{LANG_META[l].label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
