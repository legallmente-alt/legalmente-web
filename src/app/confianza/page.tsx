import Link from "next/link";

const trustLayers = [
  {
    index: "01",
    title: "Fuentes",
    body: "Una explicación jurídica debe poder distinguir la idea que enseña de la fuente que la sostiene. Cuando el contenido avance a producción pública, las referencias aplicables deben quedar visibles y trazables.",
  },
  {
    index: "02",
    title: "Territorio",
    body: "Los conceptos pueden compartir una lógica general, pero nombres, requisitos, procedimientos y efectos pueden cambiar entre países y materias. LegalMente debe mostrar ese alcance en lugar de ocultarlo.",
  },
  {
    index: "03",
    title: "Límites",
    body: "Aprender, organizar información y preparar preguntas no equivale a recibir una conclusión jurídica individual. Una situación concreta puede requerir revisión profesional y fuentes territoriales específicas.",
  },
  {
    index: "04",
    title: "Correcciones",
    body: "El conocimiento jurídico cambia. Una corrección material debe conservar contexto suficiente para entender qué cambió y por qué, sin borrar silenciosamente la historia de una pieza.",
  },
  {
    index: "05",
    title: "Datos",
    body: "Esta primera experiencia no solicita nombres, correos, documentos, expedientes ni detalles de casos. No incluye carga de archivos, pagos, cuentas ni almacenamiento de información personal.",
  },
] as const;

export default function ConfianzaPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="border-b border-[#102A43]/10">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Capa de confianza</p>
            <h1 className="mt-5 max-w-[11ch] font-serif text-[clamp(2.8rem,7vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.045em]">
              Saber qué estás leyendo también importa.
            </h1>
          </div>
          <div className="max-w-[58ch] lg:pb-2">
            <p className="text-lg leading-8 text-[#102A43]/68">
              LegalMente separa cuatro preguntas que no deberían mezclarse: qué fuente sostiene una explicación, dónde aplica, cuál es su límite y cómo se corrige cuando cambia.
            </p>
            <Link
              href="/explorar"
              className="group mt-8 inline-flex min-h-12 items-center gap-2 border-b border-[#102A43]/60 px-1 py-2 text-sm font-semibold transition-colors hover:border-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
            >
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none">←</span>
              Volver a explorar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 md:py-16">
        <div className="divide-y divide-[#102A43]/12 border-y border-[#102A43]/12">
          {trustLayers.map((layer) => (
            <article key={layer.title} className="grid gap-4 py-7 md:grid-cols-[64px_0.65fr_1.35fr] md:items-start md:gap-8 md:py-10">
              <span className="text-xs tabular-nums text-[#102A43]/35">{layer.index}</span>
              <h2 className="font-serif text-3xl tracking-[-0.03em]">{layer.title}</h2>
              <p className="max-w-[64ch] text-sm leading-7 text-[#102A43]/64">{layer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-[12ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">
            La confianza no es un sello. Es información visible.
          </h2>
          <div>
            <p className="max-w-[54ch] text-sm leading-7 text-[#F5F0E8]/66">
              Fuentes, territorio y límites deben acompañar la experiencia cuando sean relevantes. La autorización de publicación sigue siendo una decisión humana separada.
            </p>
            <Link
              href="/explorar"
              className="group mt-7 inline-flex min-h-12 items-center gap-2 border-b border-[#F5F0E8]/45 px-1 py-2 text-sm font-semibold text-[#F5F0E8] transition-colors hover:border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#63D7B0] focus:ring-offset-4 focus:ring-offset-[#102A43]"
            >
              Volver a explorar <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
