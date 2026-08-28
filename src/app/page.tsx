import Link from "next/link";

function AssetField({
  assetId,
  label,
  className = "",
}: {
  assetId: "W01" | "W02" | "W03";
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}. Asset ${assetId} pendiente de importación binaria en esta rama aislada.`}
      data-asset-id={assetId}
      data-binary-status="pending"
      className={`relative overflow-hidden bg-[#102A43] text-[#F5F0E8] ${className}`}
    >
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute left-[8%] top-[10%] h-[58%] w-px bg-[#F5F0E8]/60" />
        <div className="absolute bottom-[14%] left-[8%] right-[8%] h-px bg-[#F5F0E8]/30" />
        <div className="absolute right-[9%] top-[12%] h-16 w-16 border-r border-t border-[#B68B4A]/80" />
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-xs uppercase tracking-[0.12em] text-[#F5F0E8]/66">
        <span>{label}</span>
        <span>{assetId}</span>
      </div>
    </div>
  );
}

const verbs = [
  ["Aprender", "Entender un concepto y de dónde sale."],
  ["Resolver", "Ordenar una situación antes de decidir."],
  ["Preparar", "Llegar mejor preparado a un documento o conversación."],
  ["Tu caso", "Reconocer cuándo hace falta criterio profesional."],
] as const;

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1320px] items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:py-16">
        <div className="order-2 max-w-[620px] lg:order-1">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/52">
            The Editorial Instrument · preview aislado
          </p>
          <h1 className="max-w-[11ch] font-serif text-[clamp(2.45rem,7.2vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#102A43]">
            Entiende qué importa antes de decidir qué sigue.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-[#102A43]/72 md:text-lg md:leading-8">
            LegalMente conecta una pregunta con contexto, una herramienta acotada, sus fuentes, su territorio y un siguiente paso comprensible.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/internal/product-lab"
              className="inline-flex min-h-12 items-center justify-center bg-[#102A43] px-6 text-sm font-semibold text-[#F5F0E8] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-4 motion-reduce:transform-none"
            >
              Abrir el instrumento
            </Link>
            <a
              href="#explorar"
              className="inline-flex min-h-12 items-center border-b border-[#102A43]/35 px-1 text-sm font-medium text-[#102A43]/72 hover:border-[#102A43] hover:text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-4"
            >
              Explorar primero
            </a>
          </div>

          <dl className="mt-12 grid max-w-[600px] grid-cols-2 gap-x-7 gap-y-6 border-t border-[#102A43]/12 pt-6 sm:grid-cols-4">
            {verbs.map(([term, description]) => (
              <div key={term} className="space-y-1.5">
                <dt className="text-sm font-semibold text-[#102A43]">{term}</dt>
                <dd className="text-xs leading-5 text-[#102A43]/58">{description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <AssetField
            assetId="W01"
            label="Umbral de entrada"
            className="aspect-[5/4] min-h-[330px] w-full lg:min-h-[610px] lg:aspect-auto"
          />
          <div className="mt-3 flex items-center justify-between text-xs text-[#102A43]/52">
            <span>Una acción enfocada.</span>
            <span>Un evento visual memorable.</span>
          </div>
        </div>
      </section>

      <section id="explorar" aria-labelledby="explorar-title" className="border-t border-[#102A43]/10 bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Continúa explorando</p>
              <h2 id="explorar-title" className="mt-4 max-w-[14ch] font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.035em]">
                No llegues a un callejón sin salida.
              </h2>
            </div>
            <p className="max-w-[42ch] text-sm leading-6 text-[#F5F0E8]/66">
              Cada entrada debe conducir a otra pieza útil: una historia, una herramienta, una fuente o una explicación relacionada.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-5">
            <Link href="/catalogo" className="group block focus:outline-none focus:ring-2 focus:ring-[#63D7B0] focus:ring-offset-4 focus:ring-offset-[#102A43]">
              <AssetField assetId="W02" label="Historia del Derecho" className="aspect-[16/10] w-full bg-[#173954]" />
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#F5F0E8]/48">Mundo destacado</p>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.025em]">Historia del Derecho</h3>
                </div>
                <span className="mt-2 text-sm text-[#63D7B0] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">Entrar →</span>
              </div>
            </Link>

            <Link href="/catalogo" className="group block self-end focus:outline-none focus:ring-2 focus:ring-[#63D7B0] focus:ring-offset-4 focus:ring-offset-[#102A43]">
              <AssetField assetId="W03" label="Cine y Derecho" className="aspect-[4/3] w-full bg-[#0B2235]" />
              <div className="mt-5 border-l border-[#D97745] pl-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#F5F0E8]/48">Siguiente entrada</p>
                <h3 className="mt-2 font-serif text-2xl">Cine y Derecho</h3>
                <p className="mt-2 max-w-[34ch] text-sm leading-6 text-[#F5F0E8]/62">Ficción, evidencia, responsabilidad y sistemas jurídicos vistos desde una escena.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="trust-title" className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 border-t border-[#102A43]/14 pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/48">Confianza en contexto</p>
            <h2 id="trust-title" className="mt-4 max-w-[15ch] font-serif text-3xl leading-tight tracking-[-0.025em] md:text-4xl">
              Fuente, territorio y límites cuando realmente importan.
            </h2>
          </div>
          <div className="grid gap-4 text-sm leading-6 text-[#102A43]/70 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            <div><strong className="block text-[#102A43]">Fuente</strong><span>De dónde sale la regla o explicación.</span></div>
            <div><strong className="block text-[#102A43]">Territorio</strong><span>Dónde puede cambiar la respuesta.</span></div>
            <div><strong className="block text-[#102A43]">Límite</strong><span>Qué no estamos automatizando.</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
