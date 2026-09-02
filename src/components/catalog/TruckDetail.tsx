"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { trucks } from "@/data/trucks";
import { RelatedProducts } from "@/components/RelatedProducts";
import { TruckInquiryForm } from "@/components/catalog/TruckInquiryForm";
import { AuthDialog } from "@/components/AuthDialog";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

function FormIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
    </svg>
  );
}

export function TruckDetail({ slug }: { slug: string }) {
  const { t } = useLang();
  const { user } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const truck = trucks.find((item) => item.slug === slug);
  if (!truck) notFound();
  const loc = t.catalog.trucks[truck.slug as keyof typeof t.catalog.trucks];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden bg-brand-navy">
        <Image
          src={truck.image ?? "/products/camiones.jpg"}
          alt={loc.name}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <span className="w-fit bg-brand-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy-dark">
        {t.catalog.cab[truck.cabType]}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-navy-dark">
        {loc.name}
      </h1>
      <p className="mt-4 text-black/70">{loc.description}</p>
      <p className="mt-6 text-sm leading-relaxed text-black/50">
        {t.truckForm.intro}
      </p>
      <button
        type="button"
        onClick={() => (user ? setFormOpen(true) : setAuthOpen(true))}
        className="btn-sweep relative mt-4 inline-flex h-14 items-center justify-center gap-2 bg-brand-yellow px-8 text-sm font-semibold text-brand-navy-dark"
      >
        <FormIcon className="h-5 w-5" />
        <span>{t.truckForm.open}</span>
      </button>

      {authOpen && (
        <AuthDialog
          message={t.auth.needAccount}
          onClose={() => setAuthOpen(false)}
          onAuthed={() => setFormOpen(true)}
        />
      )}

      {formOpen && (
        <TruckInquiryForm
          cabType={truck.cabType}
          onClose={() => setFormOpen(false)}
        />
      )}

      <RelatedProducts currentHref={`/camiones/${truck.slug}`} />
    </div>
  );
}
