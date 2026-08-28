import type { Metadata } from "next";
import { site } from "@/data/site";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Somos importadores directos de gomas de camión, aros y camiones, con precios de importador en República Dominicana.",
};

export default function NosotrosPage() {
  return (
    <div>
      {/* Statement: who we are */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-navy-dark/70">
            <span className="text-brand-red">•</span> Nosotros
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-navy-dark sm:text-6xl lg:text-7xl">
            Importador directo de gomas, aros y camiones en República Dominicana
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl">
            En {site.name} traemos gomas nuevas (no recauchadas), aros y
            camiones directamente desde Canadá. Ofrecemos a transportistas y
            flotas precios de importador, sin intermediarios y desde una sola
            unidad hasta contenedores completos.
          </p>
        </div>
      </section>

      {/* Detail */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-5 leading-relaxed text-black/70">
          <p>
            Trabajamos con gomas nuevas, no recauchadas, en las medidas más
            usadas por camiones y tractocamiones en República Dominicana, junto
            con aros de aluminio y hierro para cada medida.
          </p>
          <p>
            También importamos camiones directamente desde Canadá, con y sin
            camarote, coordinando cada pedido de principio a fin para que
            recibas exactamente lo que necesitas.
          </p>
          <p>
            No vendemos en línea: coordinamos todo por WhatsApp, de forma rápida
            y clara, desde la primera consulta hasta la entrega. Así confirmamos
            disponibilidad, medidas y precio de importador antes de cada compra.
          </p>
        </div>

        <a
          href={buildGeneralWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sweep relative mt-10 inline-flex h-14 items-center justify-center gap-2 bg-brand-yellow px-8 text-sm font-semibold text-brand-navy-dark"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span>Contáctanos</span>
        </a>
      </section>
    </div>
  );
}
