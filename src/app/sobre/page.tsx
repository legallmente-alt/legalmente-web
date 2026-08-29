import Link from "next/link";

const principles = [
  ["Aprender por relaciones", "Una situación puede llevar a un concepto, una materia, un proceso, evidencia, territorio, fuentes y el siguiente aprendizaje útil."],
  ["No fingir universalidad", "Dos sistemas pueden compartir conceptos o funciones sin que sus reglas, formalidades o consecuencias sean idénticas."],
  ["Preparar antes de concluir", "Organizar hechos, distinguir conceptos y localizar fuentes puede mejorar una decisión sin convertir la plataforma en asesoría individual."],
] as const;

export default function SobrePage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Sobre LegalMente</p>
          <h1 className="mt-5 max-w-[12ch] font-serif text-[clamp(2.8rem,7vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.045em]">
            El Derecho se entiende mejor cuando puedes ver sus conexiones.
          </h1>
        </div>
        <div className="max-w-[56ch] lg:pb-2">
          <p className="text-lg leading-8 text-[#102A43]/68">
            LegalMente es una experiencia de educación y preparación jurídica panhispánica. Organiza conocimiento para que una persona pueda entrar por algo que ocurrió, una idea que quiere comprender o un proceso que necesita ordenar.
          </p>
          <p className="mt-5 text-sm leading-7 text-[#102A43]/58">
            El objetivo no es reducir el Derecho a un catálogo de definiciones ni asumir que una misma regla aplica en todos los países. La estructura conecta conceptos y hace visibles las diferencias territoriales cuando importan.
          </p>
        </div>
      </section>

      <section className="border-y border-[#102A43]/10 bg-white/35">
        <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 md:py-18">
          <div className="divide-y divide-[#102A43]/12 border-y border-[#102A43]/12">
            {principles.map(([title, body], index) => (
              <article key={title} className="grid gap-4 py-7 md:grid-cols-[64px_0.75fr_1.25fr] md:gap-8 md:py-9">
                <span className="text-xs tabular-nums text-[#102A43]/35">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="font-serif text-2xl tracking-[-0.025em]">{title}</h2>
                <p className="max-w-[62ch] text-sm leading-7 text-[#102A43]/62">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1320px] flex-col gap-5 px-5 py-12 md:px-8 md:py-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[54ch] text-sm leading-7 text-[#102A43]/62">
          Empieza por una pregunta y sigue únicamente las relaciones que te ayuden a entender mejor.
        </p>
        <div className="flex flex-wrap gap-5">
          <Link href="/explorar" className="inline-flex min-h-11 items-center border-b border-[#102A43]/30 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#102A43]">
            Explorar LegalMente
          </Link>
          <Link href="/confianza" className="inline-flex min-h-11 items-center border-b border-[#102A43]/30 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#102A43]">
            Fuentes y límites
          </Link>
        </div>
      </section>
    </main>
  );
}
