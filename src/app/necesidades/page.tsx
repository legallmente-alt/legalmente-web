import Link from "next/link";

import { NEED_ROUTE_SEEDS } from "@/lib/product-directive/need-routes";

const implementedRouteBySlug: Record<string, string> = {
  "antes-de-firmar": "/antes-de-firmar",
};

function layerLabel(layer: string): string {
  switch (layer) {
    case "LEGALMENTE_BASIC":
      return "Base";
    case "LEGALMENTE_CORPORATE":
      return "Corporativo";
    case "LEGALMENTE_PROFESSIONAL":
      return "Profesional";
    default:
      return "Necesidad";
  }
}

export default function NeedsPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Conocimiento · aprendizaje · aplicación</p>
        <h1 className="mt-5 max-w-[13ch] font-serif text-[clamp(3rem,8vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
          Empieza por lo que necesitas entender.
        </h1>
        <p className="mt-8 max-w-[68ch] text-lg leading-8 text-[#102A43]/68">
          No necesitas conocer primero la rama del Derecho. LegalMente puede partir de una situación concreta y conectarla con conceptos, materias, evidencia, límites y —cuando realmente cambia la respuesta— territorio.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#102A43]/60">
          <Link href="/explorar" className="underline decoration-[#102A43]/25 underline-offset-4 hover:decoration-[#102A43]">Explorar por conceptos y mundos</Link>
          <span aria-hidden="true">·</span>
          <Link href="/catalogo" className="underline decoration-[#102A43]/25 underline-offset-4 hover:decoration-[#102A43]">Ver catálogo</Link>
        </div>
      </section>

      <section className="border-t border-[#102A43]/10">
        <div className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-x-8 md:grid-cols-2">
            {NEED_ROUTE_SEEDS.map((route, index) => {
              const href = implementedRouteBySlug[route.slug];
              const content = (
                <div className="grid min-h-56 grid-cols-[36px_1fr] gap-4 border-t border-[#102A43]/12 py-6 md:gap-6">
                  <span className="pt-1 text-xs tabular-nums text-[#102A43]/35">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#102A43]/48">{layerLabel(route.productLayer)}</span>
                      {href ? (
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#167D68]">Ruta disponible</span>
                      ) : (
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#102A43]/35">En investigación</span>
                      )}
                    </div>
                    <h2 className="mt-3 font-serif text-2xl tracking-[-0.02em]">{route.title}</h2>
                    <p className="mt-3 max-w-[50ch] text-sm leading-6 text-[#102A43]/65">{route.needOrQuestion}</p>
                    <p className="mt-5 text-xs leading-5 text-[#102A43]/48">Conecta: {route.matterLabels.join(" · ")}</p>
                    {href ? <span className="mt-5 inline-block text-sm font-semibold">Abrir ruta →</span> : null}
                  </div>
                </div>
              );

              return href ? (
                <Link key={route.id} href={href} className="group focus:outline-none focus:ring-2 focus:ring-[#102A43]">
                  {content}
                </Link>
              ) : (
                <article key={route.id}>{content}</article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#102A43]/10 bg-[#102A43] text-[#F5F0E8]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Cómo escala una ruta</p>
            <h2 className="mt-4 max-w-[12ch] font-serif text-4xl tracking-[-0.035em] md:text-5xl">De una pregunta a conocimiento conectado.</h2>
          </div>
          <ol className="divide-y divide-[#F5F0E8]/12 border-t border-[#F5F0E8]/12 text-sm leading-6 text-[#F5F0E8]/68">
            <li className="py-4"><strong className="mr-3 text-[#F5F0E8]">01</strong> Identificar la necesidad sin exigir vocabulario jurídico.</li>
            <li className="py-4"><strong className="mr-3 text-[#F5F0E8]">02</strong> Conectar los conceptos y materias que realmente importan.</li>
            <li className="py-4"><strong className="mr-3 text-[#F5F0E8]">03</strong> Separar lo general de lo que depende del territorio o de hechos específicos.</li>
            <li className="py-4"><strong className="mr-3 text-[#F5F0E8]">04</strong> Convertir el aprendizaje en checklist, comparación, herramienta o siguiente pregunta.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
