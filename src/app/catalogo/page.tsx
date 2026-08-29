import Link from "next/link";
import { chapters, concepts, processes, series, worlds } from "@/lib/knowledge-graph/content";

const sections = [
  { label: "Mundos", count: worlds.length, note: "Contextos donde las preguntas jurídicas ocurren.", href: "/explorar#mundos" },
  { label: "Series", count: series.length, note: "Recorridos que ordenan una pregunta en capítulos.", href: "/explorar" },
  { label: "Capítulos", count: chapters.length, note: "Piezas breves para avanzar sin perder el hilo.", href: "/explorar" },
  { label: "Conceptos", count: concepts.length, note: "Ideas que cruzan mundos y materias.", href: "/concepto/consentimiento" },
  { label: "Procesos", count: processes.length, note: "Formas de ordenar hechos, evidencia y preguntas.", href: "/proceso/organizar-hechos-y-prueba" },
] as const;

export default function CatalogoPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="border-b border-[#102A43]/10">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/48">Mapa de aprendizaje</p>
          <h1 className="mt-5 max-w-[10ch] font-serif text-[clamp(3rem,8vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.05em]">Todo se conecta.</h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#102A43]/68">
            El catálogo no es un índice para memorizar. Es un mapa para entrar por una situación, seguir un concepto, ordenar un proceso y descubrir qué puede ayudar después.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#102A43]/58">
            <span><strong className="text-[#102A43]">{worlds.length}</strong> mundos</span>
            <span><strong className="text-[#102A43]">{series.length}</strong> series</span>
            <span><strong className="text-[#102A43]">{chapters.length}</strong> capítulos</span>
            <span><strong className="text-[#102A43]">{concepts.length}</strong> conceptos</span>
            <span><strong className="text-[#102A43]">{processes.length}</strong> procesos</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-16">
        <div className="divide-y divide-[#102A43]/12 border-y border-[#102A43]/12">
          {sections.map((section, index) => (
            <Link key={section.label} href={section.href} className="group grid gap-4 py-7 focus:outline-none focus:ring-2 focus:ring-[#102A43] md:grid-cols-[56px_0.7fr_1.4fr_auto] md:items-center md:gap-8 md:py-9">
              <span className="text-xs tabular-nums text-[#102A43]/36">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-serif text-3xl tracking-[-0.03em]">{section.label}</span>
              <span className="max-w-[48ch] text-sm leading-6 text-[#102A43]/62">{section.note}</span>
              <span className="flex items-center gap-3 text-sm font-semibold">
                <span className="text-2xl font-normal text-[#102A43]/40">{section.count}</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#102A43]/10 bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Primer paso</p>
            <h2 className="mt-4 max-w-[12ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">Empieza por lo que te pasó.</h2>
          </div>
          <div>
            <p className="max-w-[58ch] text-sm leading-7 text-[#F5F0E8]/68">
              No necesitas conocer la categoría correcta antes de empezar. Una situación puede llevarte a un concepto; un concepto, a un proceso; y un proceso, a sus fuentes, territorio y límites.
            </p>
            <Link href="/explorar" className="group mt-7 inline-flex min-h-12 items-center gap-2 border-b border-[#F5F0E8]/55 px-1 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#63D7B0] focus:ring-offset-4 focus:ring-offset-[#102A43]">
              Abrir el mapa <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
