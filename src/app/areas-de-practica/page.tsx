import Link from "next/link";

const areas = [
  {
    title: "Contratos y empresa",
    text: "Prepara conversaciones y acuerdos ordenando partes, objeto, obligaciones, pagos, fechas y territorio.",
    href: "/preparar/contrato",
    status: "Herramienta educativa",
  },
  {
    title: "Hechos y evidencia",
    text: "Aprende a distinguir lo que una persona afirma, lo que un documento dice y lo que puede acreditarse.",
    href: "/proceso/organizar-hechos-y-prueba",
    status: "Ruta de aprendizaje",
  },
  {
    title: "Representación y capacidad",
    text: "Identifica quién actúa, por qué base y qué información debe revisarse antes de confiar en una firma.",
    href: "/proceso/verificar-representacion",
    status: "Preparación general",
  },
  {
    title: "Consentimiento y obligaciones",
    text: "Explora cómo se relacionan voluntad, compromiso, conducta, incumplimiento y consecuencias jurídicas.",
    href: "/concepto/consentimiento",
    status: "Conceptos conectados",
  },
  {
    title: "Derecho cotidiano",
    text: "Situaciones comunes explicadas sin exigir que la persona conozca primero la rama jurídica correcta.",
    href: "/mundo/vida-cotidiana",
    status: "Entrada panhispánica",
  },
  {
    title: "Territorio y fuentes",
    text: "Comprende por qué una idea general puede cambiar cuando entran en juego un país, una autoridad o una formalidad local.",
    href: "/confianza",
    status: "Capa de confianza",
  },
] as const;

export default function AreasDePracticaPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-24">
        <div className="max-w-[760px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Mapa de LegalMente</p>
          <h1 className="mt-5 max-w-[12ch] font-serif text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">No necesitas saber la rama para empezar.</h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#102A43]/68">Entra por una situación, una pregunta o un proceso. Las áreas funcionan como rutas de comprensión y preparación; no representan servicios profesionales abiertos ni conclusiones para casos individuales.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {areas.map((area, index) => (
            <Link key={area.title} href={area.href} className="group border border-[#102A43]/15 bg-white/45 p-7 transition-colors hover:border-[#102A43]/40 focus:outline-none focus:ring-2 focus:ring-[#102A43] md:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#102A43]/45">{area.status}</span>
                <span className="text-xs tabular-nums text-[#102A43]/35">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-10 font-serif text-3xl tracking-[-0.03em]">{area.title}</h2>
              <p className="mt-3 max-w-[42ch] text-sm leading-7 text-[#102A43]/64">{area.text}</p>
              <span className="mt-7 inline-flex min-h-11 items-center border-b border-[#102A43]/45 text-sm font-semibold transition-transform group-hover:translate-x-1 motion-reduce:transform-none">Explorar ruta →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-t border-[#102A43]/10 bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="max-w-[12ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">La educación abre la puerta. El territorio decide cuánto puede avanzar.</h2>
          <div>
            <p className="text-sm leading-7 text-[#F5F0E8]/66">Cuando una respuesta dependa de una ley local, una formalidad, un documento o una situación concreta, LegalMente lo muestra como límite y no como certeza universal.</p>
            <Link href="/confianza" className="mt-7 inline-flex min-h-12 items-center border-b border-[#F5F0E8]/50 text-sm font-semibold text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#63D7B0]">Ver fuentes y límites →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
