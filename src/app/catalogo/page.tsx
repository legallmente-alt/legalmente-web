import Link from "next/link";
import { concepts, processes } from "@/lib/knowledge-graph/content";

const editorialFamilies = [
  { label: "Conceptos jurídicos", note: "Ideas de entrada que cambian de significado según la materia, los hechos y el territorio.", href: "/concepto/consentimiento" },
  { label: "Procesos de lectura", note: "Rutas para ordenar preguntas, hechos, evidencia y contexto antes de concluir.", href: "/proceso/organizar-hechos-y-prueba" },
  { label: "Mundos conectados", note: "Materias y situaciones que permiten ver cómo una misma idea aparece en contextos distintos.", href: "/explorar/#mundos" },
] as const;

export default function CatalogoPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="border-b border-[#102A43]/10">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Catálogo editorial</p>
            <h1 className="mt-5 max-w-[10ch] font-serif text-[clamp(3rem,8vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.05em]">Aprender por conexiones.</h1>
          </div>
          <div className="max-w-[60ch] lg:pb-2">
            <p className="text-lg leading-8 text-[#102A43]/68">El catálogo no es una lista de respuestas. Es un mapa de conceptos y procesos para seguir una pregunta sin ocultar sus límites.</p>
            <p className="mt-5 border-l-2 border-[#C77C4D] pl-4 text-sm leading-6 text-[#102A43]/62">Las entradas son educativas. No constituyen asesoría jurídica ni determinan qué regla aplica a una situación concreta.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {editorialFamilies.map((family) => (
            <Link key={family.label} href={family.href} className="group border-t border-[#102A43]/25 pt-5 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
              <div className="flex items-start justify-between gap-4"><h2 className="font-serif text-2xl tracking-[-0.025em]">{family.label}</h2><span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span></div>
              <p className="mt-3 text-sm leading-6 text-[#102A43]/62">{family.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-col gap-5 border-b border-[#F5F0E8]/15 pb-8 md:flex-row md:items-end md:justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Entradas conceptuales</p><h2 className="mt-3 max-w-[12ch] font-serif text-4xl tracking-[-0.035em] md:text-5xl">Una idea nunca viaja sola.</h2></div>
            <p className="max-w-[42ch] text-sm leading-6 text-[#F5F0E8]/62">Cada entrada indica dónde aparece, qué proceso la conecta y qué límite territorial conviene conservar visible.</p>
          </div>
          <div className="divide-y divide-[#F5F0E8]/12">
            {concepts.map((concept, index) => (
              <Link key={concept.id} href={`/concepto/${concept.id}`} className="group grid gap-3 py-6 focus:outline-none focus:ring-2 focus:ring-[#63D7B0] md:grid-cols-[52px_0.7fr_1.3fr_auto] md:items-center md:gap-6">
                <span className="text-xs tabular-nums text-[#F5F0E8]/35">{String(index + 1).padStart(2, "0")}</span>
                <strong className="font-serif text-2xl">{concept.title}</strong>
                <span className="text-sm leading-6 text-[#F5F0E8]/60">{concept.summary}</span>
                <span aria-hidden="true" className="text-[#63D7B0] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Rutas de proceso</p><h2 className="mt-4 max-w-[11ch] font-serif text-4xl tracking-[-0.035em] md:text-5xl">Antes de responder, ordena.</h2></div>
          <div className="divide-y divide-[#102A43]/12 border-y border-[#102A43]/12">
            {processes.map((process) => (
              <Link key={process.id} href={`/proceso/${process.id}`} className="group block py-6 focus:outline-none focus:ring-2 focus:ring-[#102A43]"><div className="flex items-start justify-between gap-6"><h3 className="font-serif text-2xl tracking-[-0.02em]">{process.title}</h3><span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span></div><p className="mt-2 max-w-[64ch] text-sm leading-6 text-[#102A43]/62">{process.summary}</p></Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
