import Link from "next/link";
import { worlds } from "@/lib/knowledge-graph/content";

const entryModes = [
  { label: "Una situación", note: "Empieza por algo que ocurrió o necesitas entender.", href: "/mundo/vida-cotidiana" },
  { label: "Un concepto", note: "Ve de una idea jurídica a sus relaciones y procesos.", href: "/concepto/consentimiento" },
  { label: "Un proceso", note: "Ordena hechos, evidencia y siguientes pasos sin convertirlo en asesoría individual.", href: "/proceso/organizar-hechos-y-prueba" },
  { label: "Explorar el Derecho", note: "Recorre mundos conectados por conducta, contexto, historia y territorio.", href: "#mundos" },
] as const;

export default function ExplorePage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Entrada relacional</p>
        <h1 className="mt-5 max-w-[12ch] font-serif text-[clamp(3rem,8vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.05em]">¿Qué quieres entender?</h1>
        <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#102A43]/68">
          No necesitas saber primero qué rama del Derecho corresponde. Entra por una situación, un concepto, un proceso o un mundo y sigue conexiones comprensibles.
        </p>

        <div className="mt-12 grid gap-x-8 gap-y-2 border-t border-[#102A43]/12 md:grid-cols-2">
          {entryModes.map((mode) => (
            <Link key={mode.label} href={mode.href} className="group min-h-36 border-b border-[#102A43]/12 py-6 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-serif text-2xl tracking-[-0.02em]">{mode.label}</h2>
                  <p className="mt-2 max-w-[45ch] text-sm leading-6 text-[#102A43]/62">{mode.note}</p>
                </div>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="mundos" className="border-t border-[#102A43]/10 bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-[700px]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Mundos conectados</p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.035em] md:text-5xl">Una puerta simple. Muchas conexiones detrás.</h2>
          </div>

          <div className="mt-12 divide-y divide-[#F5F0E8]/12 border-t border-[#F5F0E8]/12">
            {worlds.map((world, index) => (
              <Link key={world.id} href={`/mundo/${world.id}`} className="group grid min-h-28 gap-3 py-5 focus:outline-none focus:ring-2 focus:ring-[#63D7B0] md:grid-cols-[52px_0.8fr_1.2fr_auto] md:items-center md:gap-6">
                <span className="text-xs tabular-nums text-[#F5F0E8]/35">{String(index + 1).padStart(2, "0")}</span>
                <strong className="font-serif text-2xl">{world.title}</strong>
                <span className="text-sm leading-6 text-[#F5F0E8]/58">{world.summary}</span>
                <span className="text-[#63D7B0] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
