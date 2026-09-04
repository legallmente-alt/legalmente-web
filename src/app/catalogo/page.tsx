import Link from "next/link";

const engines = [
  {
    title: "Conceptos jurídicos",
    text: "Explicaciones breves para distinguir ideas que suelen confundirse.",
    href: "/concepto/consentimiento",
    tag: "Entender",
  },
  {
    title: "Hechos y prueba",
    text: "Rutas para separar lo que un documento dice de lo que ocurrió.",
    href: "/proceso/organizar-hechos-y-prueba",
    tag: "Preparar",
  },
  {
    title: "Representación",
    text: "Preguntas para identificar quién actúa, con qué base y qué falta revisar.",
    href: "/proceso/verificar-representacion",
    tag: "Verificar",
  },
  {
    title: "Contratos y empresa",
    text: "Herramientas para ordenar objeto, obligaciones, pagos, fechas y territorio.",
    href: "/preparar/contrato",
    tag: "Ordenar",
  },
] as const;

export default function CatalogoPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-24">
        <div className="max-w-[760px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Biblioteca editorial</p>
          <h1 className="mt-5 max-w-[12ch] font-serif text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">Contenido para comprender y prepararte.</h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#102A43]/68">LegalMente no publica respuestas aisladas. Cada pieza forma parte de una ruta con contexto, fuentes, territorio y un siguiente aprendizaje.</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {engines.map((engine, index) => (
            <Link key={engine.title} href={engine.href} className="group border border-[#102A43]/15 bg-white/45 p-7 transition-colors hover:border-[#102A43]/40 focus:outline-none focus:ring-2 focus:ring-[#102A43] md:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#102A43]/45">{engine.tag}</span>
                <span className="text-xs tabular-nums text-[#102A43]/35">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-10 font-serif text-3xl tracking-[-0.03em]">{engine.title}</h2>
              <p className="mt-3 max-w-[42ch] text-sm leading-7 text-[#102A43]/64">{engine.text}</p>
              <span className="mt-7 inline-flex min-h-11 items-center border-b border-[#102A43]/45 text-sm font-semibold transition-transform group-hover:translate-x-1 motion-reduce:transform-none">Entrar en la ruta →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#102A43]/10 bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Una nota importante</p>
            <h2 className="mt-4 max-w-[12ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">La claridad también necesita límites.</h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-[#F5F0E8]/66">El contenido es educativo. Una situación concreta puede requerir fuentes territoriales, revisión profesional y datos que esta versión todavía no recibe.</p>
            <Link href="/confianza" className="mt-7 inline-flex min-h-12 items-center border-b border-[#F5F0E8]/50 text-sm font-semibold text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#63D7B0]">Conocer fuentes y límites →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
