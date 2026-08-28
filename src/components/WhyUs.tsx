import Image from "next/image";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { PriceIcon, NewIcon, BoxIcon, TruckIcon } from "@/components/WhyUsIcons";

const stats = [
  { label: "Gomas nuevas", value: "100%" },
  { label: "Importado desde", value: "Canadá" },
  { label: "Compra mínima", value: "1 unidad" },
];

const features = [
  {
    Icon: PriceIcon,
    title: "Precios de importador",
    description: "Trabajamos directo con el importador, sin intermediarios.",
  },
  {
    Icon: NewIcon,
    title: "No recauchadas",
    description: "Todas nuestras gomas son nuevas, nunca recauchadas.",
  },
  {
    Icon: BoxIcon,
    title: "De unidad a contenedor",
    description: "Desde una sola unidad hasta contenedores completos.",
  },
  {
    Icon: TruckIcon,
    title: "Directo de Canadá",
    description: "Camiones con y sin camarote, importados desde Canadá.",
  },
];

export function WhyUs() {
  return (
    <section className="flex min-h-screen items-center bg-brand-cream">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading, CTA, stats */}
          <div className="flex flex-col justify-between gap-12">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-navy-dark/70">
                <span className="text-brand-red">•</span> Por qué elegirnos
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl">
                <span className="text-brand-navy-dark">Calidad importada</span>
                <br />
                <span className="text-brand-navy-dark/40">
                  a precio de importador
                </span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-black/60">
                Trabajamos directo con el importador para ofrecerte gomas, aros
                y camiones de calidad, sin intermediarios y al mejor precio.
              </p>
              <a
                href={buildGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep relative mt-8 inline-flex h-14 items-center bg-brand-yellow px-8 font-display text-sm font-bold uppercase tracking-wide text-brand-navy-dark"
              >
                <span>Contáctanos</span>
              </a>
            </div>

            <dl className="border-t border-brand-navy-dark/10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between border-b border-brand-navy-dark/10 py-4"
                >
                  <dt className="font-medium text-black/60">{s.label}</dt>
                  <dd className="font-display text-2xl font-extrabold uppercase text-brand-navy-dark">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: image + 2x2 feature grid */}
          <div className="flex flex-col gap-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-navy-dark">
              <Image
                src="/products/gomas.jpg"
                alt={site.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`${
                    i % 2 === 0
                      ? "border-r border-brand-navy-dark/10 pr-6"
                      : "pl-6"
                  } ${i < 2 ? "border-b border-brand-navy-dark/10 pb-6" : "pt-6"}`}
                >
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-navy-dark/[.06] text-brand-navy-dark">
                    <f.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight text-brand-navy-dark">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-black/60">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
