"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  // Break the tagline onto a second line after "importados".
  const [taglineHead, taglineTail] = site.tagline.split(/(?<=importados)\s+/);

  // The footer is fixed at the bottom, revealed as the page content slides up
  // over it (parallax). Expose its height so the layout can reserve space.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--footer-h", `${el.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="fixed inset-x-0 bottom-0 -z-10 bg-brand-navy-dark text-brand-cream/70"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top: logo + tagline */}
        <div className="border-b border-brand-cream/10 py-12">
          <div className="max-w-md">
            <Image
              src="/logomark.svg"
              alt={site.name}
              width={328}
              height={111}
              className="h-8 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed">
              {taglineHead}
              {taglineTail && (
                <>
                  <br />
                  {taglineTail}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-8 py-12 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-cream">
              Productos
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/gomas" className="transition-colors hover:text-brand-yellow">
                  Gomas de camión
                </Link>
              </li>
              <li>
                <Link href="/aros" className="transition-colors hover:text-brand-yellow">
                  Aros
                </Link>
              </li>
              <li>
                <Link href="/camiones" className="transition-colors hover:text-brand-yellow">
                  Camiones importados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-cream">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/nosotros" className="transition-colors hover:text-brand-yellow">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-cream">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{site.phoneDisplay}</li>
              <li>{site.email}</li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            © {year} {site.name}. Todos los derechos reservados.
          </span>
          <span className="font-display font-bold uppercase tracking-widest">
            Importador directo · República Dominicana
          </span>
        </div>
      </div>
    </footer>
  );
}
