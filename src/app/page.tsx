import Link from "next/link";
import { worlds } from "@/lib/knowledge-graph/content";

const assetBase = "/assets/legalmente/editorial-instrument";

const assets = {
  W01: {
    alt: "Libro abierto frente a un umbral iluminado, imagen editorial de entrada a LegalMente.",
    desktop: `${assetBase}/LM-PA-W01_home_1440.webp`,
    mobile: `${assetBase}/LM-PA-W01_home_430.webp`,
    mobile430: `${assetBase}/LM-PA-W01_home_430.webp`,
    mobile390: `${assetBase}/LM-PA-W01_home_390.webp`,
    mobile360: `${assetBase}/LM-PA-W01_home_360.webp`,
  },
  W02: {
    alt: "Página elevada y regla de latón en una escena de archivo, imagen editorial sobre historia del Derecho.",
    desktop: `${assetBase}/LM-PA-W02_history_1440.webp`,
    mobile: `${assetBase}/LM-PA-W02_history_responsive.webp`,
  },
  W03: {
    alt: "Escena editorial ficticia de Cine y Derecho: un haz de luz dirigido hacia un sobre; no representa un caso, tribunal ni resultado jurídico.",
    desktop: `${assetBase}/LM-PA-W03_cinema_law_1200.webp`,
    mobile: `${assetBase}/LM-PA-W03_cinema_law_mobile.webp`,
  },
} as const;

function AssetField({ assetId, className = "" }: { assetId: keyof typeof assets; className?: string }) {
  const asset = assets[assetId];

  return (
    <div
      data-asset-id={assetId}
      data-binary-status="local"
      data-context-guardrail={assetId === "W03" ? "cinema-law-only" : undefined}
      className={`relative overflow-hidden bg-[#102A43] ${className}`}
    >
      <picture>
        {assetId === "W01" ? (
          <>
            <source media="(max-width: 360px)" srcSet={assets.W01.mobile360} />
            <source media="(max-width: 390px)" srcSet={assets.W01.mobile390} />
            <source media="(max-width: 430px)" srcSet={assets.W01.mobile430} />
          </>
        ) : (
          <source media="(max-width: 768px)" srcSet={asset.mobile} />
        )}
        <img
          src={asset.desktop}
          alt={asset.alt}
          aria-describedby={assetId === "W03" ? "w03-context" : undefined}
          className="absolute inset-0 h-full w-full object-cover"
          loading={assetId === "W01" ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
    </div>
  );
}

const entryModes = [
  ["Una situación", "Empieza por algo que ocurrió o necesitas comprender.", "/mundo/vida-cotidiana"],
  ["Un concepto", "Ve de una idea jurídica a sus conexiones.", "/concepto/consentimiento"],
  ["Un proceso", "Ordena hechos, prueba y contexto antes de decidir.", "/proceso/organizar-hechos-y-prueba"],
  ["Explorar", "Recorre mundos, series y capítulos relacionados.", "/explorar"],
] as const;

export default function HomePage() {
  const featuredWorlds = worlds.slice(0, 4);

  return (
    <main className="overflow-hidden bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1320px] items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-16">
        <div className="order-2 max-w-[650px] lg:order-1">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">LegalMente · aprendizaje jurídico conectado</p>
          <h1 className="max-w-[10ch] font-serif text-[clamp(2.7rem,7.2vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
            Entender el Derecho empieza por una pregunta.
          </h1>
          <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-[#102A43]/70 md:text-lg md:leading-8">
            Entra por una situación, un concepto o un proceso. LegalMente conecta lo que estás viendo con su materia, su contexto, sus fuentes, su territorio y lo que conviene aprender después.
          </p>

          <Link
            href="/explorar"
            className="group mt-9 inline-flex min-h-14 w-full items-center justify-between gap-8 bg-[#102A43] px-7 text-base font-semibold text-[#F5F0E8] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-4 motion-reduce:transform-none sm:w-auto sm:min-w-72 sm:px-8"
          >
            <span>¿Qué quieres entender?</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
          </Link>

          <details className="group mt-10 border-t border-[#102A43]/10">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#102A43]/55 focus:outline-none focus:ring-2 focus:ring-[#102A43] [&::-webkit-details-marker]:hidden">
              <span>Otras formas de entrar</span>
              <span className="text-lg font-normal transition-transform duration-300 group-open:rotate-45 motion-reduce:transform-none" aria-hidden="true">+</span>
            </summary>
            <div className="divide-y divide-[#102A43]/8 border-t border-[#102A43]/8">
              {entryModes.map(([label, note, href]) => (
                <Link key={label} href={href} className="group grid min-h-[72px] grid-cols-[1fr_auto] items-center gap-6 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-[#102A43] underline decoration-transparent underline-offset-4 focus:ring-2 focus:ring-[#102A43] focus:decoration-[#102A43]">
                  <span>
                    <strong className="block text-sm font-medium text-[#102A43]/82">{label}</strong>
                    <span className="mt-1 block text-xs leading-5 text-[#102A43]/50">{note}</span>
                  </span>
                  <span className="text-[#102A43]/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#102A43] motion-reduce:transform-none" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </details>
        </div>

        <div className="order-1 lg:order-2">
          <AssetField assetId="W01" className="aspect-[3/4] min-h-[330px] w-full min-[431px]:aspect-[5/4] lg:min-h-[610px] lg:aspect-[16/9]" />
          <div className="mt-3 flex items-center justify-between text-xs text-[#102A43]/48">
            <span>Una pregunta.</span>
            <span>Una ruta clara para continuar.</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[#102A43]/10 bg-[#E7DED1]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/48">El corazón de LegalMente</p>
            <h2 className="mt-4 max-w-[10ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">El Derecho ocurre entre personas.</h2>
          </div>
          <div>
            <p className="max-w-[58ch] text-xl leading-8 text-[#102A43]/78 md:text-2xl md:leading-9">
              El <em>arte</em> nos enseña a mirar, la <em>justicia</em> nos obliga a preguntar y el <em>amor</em> —como el cuidado, la confianza y la responsabilidad— nos recuerda que detrás de cada regla hay una vida concreta. LegalMente conecta esas preguntas con rutas para <Link href="/mundo/vida-cotidiana" className="font-semibold underline decoration-[#D97745] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#102A43]">entender</Link>, <Link href="/concepto/consentimiento" className="font-semibold underline decoration-[#D97745] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#102A43]">consentir</Link>, <Link href="/proceso/organizar-hechos-y-prueba" className="font-semibold underline decoration-[#D97745] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#102A43]">ordenar lo ocurrido</Link> y seguir aprendiendo.
            </p>
            <p className="mt-6 text-sm leading-6 text-[#102A43]/58">No son temas separados: son distintas puertas para volver a la misma pregunta humana.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#102A43]/10 bg-white/35">
        <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Rutas destacadas</p>
              <h2 className="mt-4 max-w-[12ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">No memorices un índice. Sigue relaciones.</h2>
            </div>
            <p className="max-w-[58ch] text-sm leading-7 text-[#102A43]/62">
              Un mismo concepto puede aparecer en vida cotidiana, empresa, salud o tecnología. La navegación mantiene el orden sin fingir que cada materia vive aislada.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">
            {featuredWorlds.map((world, index) => (
              <Link key={world.id} href={`/mundo/${world.id}`} className="group grid min-h-28 gap-3 py-5 focus:outline-none focus:ring-2 focus:ring-[#102A43] md:grid-cols-[48px_0.8fr_1.2fr_auto] md:items-center md:gap-6">
                <span className="text-xs tabular-nums text-[#102A43]/35">{String(index + 1).padStart(2, "0")}</span>
                <strong className="font-serif text-2xl">{world.title}</strong>
                <span className="text-sm leading-6 text-[#102A43]/58">{world.summary}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          <Link href="/explorar#mundos" className="mt-7 inline-flex min-h-12 items-center gap-2 border-b border-[#102A43]/60 px-1 py-2 text-sm font-semibold underline-offset-4 transition-colors hover:border-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]">
            Ver todas las rutas <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="border-t border-[#102A43]/10 bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Continuidad editorial</p>
              <h2 className="mt-4 max-w-[14ch] font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.035em]">Cada página debe decirte qué sigue.</h2>
            </div>
            <p className="max-w-[42ch] text-sm leading-6 text-[#F5F0E8]/66">
              Series y capítulos conservan orden; los conceptos pueden cruzar materias; los procesos conectan hechos, prueba, territorio y fuentes cuando corresponde.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-5">
            <Link href="/mundo/historia-sistemas" className="group block focus:outline-none focus:ring-2 focus:ring-[#63D7B0] focus:ring-offset-4 focus:ring-offset-[#102A43]">
              <AssetField assetId="W02" className="aspect-[4/5] w-full md:aspect-[16/10]" />
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#F5F0E8]/48">Explorar origen y sistemas</p>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.025em]">Historia y derecho comparado</h3>
                </div>
                <span className="mt-2 text-sm text-[#63D7B0] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">Entrar →</span>
              </div>
            </Link>

            <Link href="/explorar" className="group block self-end focus:outline-none focus:ring-2 focus:ring-[#63D7B0] focus:ring-offset-4 focus:ring-offset-[#102A43]">
              <AssetField assetId="W03" className="aspect-[4/5] w-full" />
              <div id="w03-context" className="mt-5 border-l border-[#D97745] pl-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#F5F0E8]/48">Lectura cultural · Cine y Derecho</p>
                <h3 className="mt-2 font-serif text-2xl">Cine y Derecho</h3>
                <p className="mt-2 max-w-[34ch] text-sm leading-6 text-[#F5F0E8]/62">Una historia también puede abrir preguntas sobre conducta, prueba, poder, responsabilidad y contexto.</p>
                <p className="mt-3 max-w-[36ch] text-xs leading-5 text-[#F5F0E8]/48">Escena editorial: no representa un caso real, un tribunal ni un resultado jurídico.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
