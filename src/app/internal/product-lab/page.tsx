import { notFound } from "next/navigation";

import { EditorialCard, LegalStateBadge } from "@/components/legalmente/ProductPrimitives";
import { getWave01aInternalQaManifest } from "@/lib/knowledge-graph/wave01a-provenance";
import { productionAssetPack } from "@/lib/visual-system";

export const dynamic = "force-static";

export default function InternalProductLabPage() {
  if (process.env.LEGALMENTE_PRODUCT_LAB_INTERNAL !== "1") notFound();
  const wave01aReviews = getWave01aInternalQaManifest().units;

  return (
    <main className="mx-auto max-w-[1180px] space-y-12 px-5 py-10 text-tinta md:px-8">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-tinta/60">LegalMente · laboratorio interno</p>
        <h1 className="font-serif text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.12] tracking-[-0.02em]">Producto, confianza y descubrimiento en una sola superficie.</h1>
        <p className="max-w-[65ch] text-base leading-7 text-tinta/75">Esta ruta no es pública por defecto. Ensambla el núcleo determinista, el sistema visual implementable y el catálogo de assets de producción sin activar servicios ni publicar claims.</p>
        <LegalStateBadge state="reviewRequired" symbol="source" reason="Arte final, copy jurídico y publicación conservan gates separados." />
      </header>

      <section aria-labelledby="doors-title" className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.08em] text-tinta/55">Puertas</p>
          <h2 id="doors-title" className="font-serif text-3xl">Qué quieres hacer</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <EditorialCard family="world" title="Aprender" meta="Conceptos, sistemas, historia y series jurídicas." symbol="learn" href="#discover" />
          <EditorialCard family="world" title="Resolver" meta="Entender una situación antes de decidir el siguiente paso." symbol="resolve" href="#tools" />
          <EditorialCard family="world" title="Preparar" meta="Checklists y herramientas estructuradas con límites visibles." symbol="prepare" href="#tools" />
          <EditorialCard family="world" title="Tu caso" meta="Identificar cuándo hace falta revisión profesional, sin automatizar el consejo individual." symbol="case" state="reviewRequired" href="#trust" />
        </div>
      </section>

      <section id="tools" aria-labelledby="tools-title" className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.08em] text-tinta/55">Herramientas internas</p>
          <h2 id="tools-title" className="font-serif text-3xl">Preparación con estados fail-closed</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <EditorialCard family="tool" title="Antes de firmar" meta="Lectura estructural preventiva; no dictamina validez." symbol="contract" state="pass" />
          <EditorialCard family="tool" title="Vacaciones MX" meta="Cálculo interno con revisión separada para adeudos históricos." symbol="labor" state="reviewRequired" />
          <EditorialCard family="tool" title="Aguinaldo MX" meta="Las ausencias genéricas deben clasificarse antes de descontarse." symbol="labor" state="requireInput" />
          <EditorialCard family="tool" title="Finiquito MX" meta="Solo componentes devengados dentro del alcance V1." symbol="compare" state="hold" />
        </div>
      </section>

      <section id="discover" aria-labelledby="discover-title" className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.08em] text-tinta/55">Explorar</p>
          <h2 id="discover-title" className="font-serif text-3xl">Mundos que la arquitectura ya puede soportar</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <EditorialCard family="series" title="Historia del Derecho" meta="Archivo, cambio institucional y continuidad editorial." symbol="learn" />
          <EditorialCard family="series" title="Cine y Derecho" meta="Análisis original sin depender de material audiovisual protegido." symbol="compare" />
          <EditorialCard family="series" title="Evidencia e investigación" meta="Prueba, método, cadena de custodia y límites." symbol="evidence" />
          <EditorialCard family="series" title="Sistemas jurídicos" meta="Civil law, common law y comparación sin falsa equivalencia." symbol="territory" />
        </div>
      </section>

      <section id="trust" aria-labelledby="trust-title" className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.08em] text-tinta/55">Confianza</p>
          <h2 id="trust-title" className="font-serif text-3xl">Fuentes, territorio, límites y versión</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <EditorialCard family="trust" title="Fuentes" meta="La procedencia vive fuera del arte y permanece legible como dato estructurado." symbol="source" state="pass" />
          <EditorialCard family="trust" title="Territorio" meta="Idioma, audiencia y jurisdicción se modelan por separado." symbol="territory" state="requireInput" />
          <EditorialCard family="trust" title="Revisión" meta="Los cambios de versión y correcciones deben quedar visibles." symbol="source" state="reviewRequired" />
          <EditorialCard family="trust" title="Límites" meta="HOLD y OUT_OF_SCOPE son resultados válidos del sistema." symbol="alert" state="outOfScope" />
        </div>
      </section>

      <section id="wave-01a-review" aria-labelledby="wave-01a-title" className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.08em] text-tinta/55">Wave 01A · revisión de integración</p>
          <h2 id="wave-01a-title" className="font-serif text-3xl">Copy delimitado; visuales bajo QA interna.</h2>
          <p className="text-base leading-7 text-tinta/70">Esta bandeja se construye sólo desde el manifiesto P0 validado: claims, fuente, territorio, qualifier y asset real. El receipt Founder registrado abre `READY_FOR_COPY`; visual, integración y publicación permanecen en gates separados. LM-PC-031 y LM-PC-065 siguen sin ruta pública.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {wave01aReviews.map((item) => (
            <article key={item.contentId} data-content-id={item.contentId} data-review-state={item.gates.integrationState} className="overflow-hidden border border-tinta/15 bg-white shadow-sm">
              <picture>
                <source media="(min-width: 768px)" srcSet={item.visualAssets.vertical} />
                <img src={item.visualAssets.feed} alt={item.altText} className="aspect-[4/5] w-full object-cover lg:aspect-[9/16]" loading="lazy" decoding="async" />
              </picture>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">{item.contentId}</p>
                    <h3 className="mt-2 font-serif text-2xl">Unidad visual</h3>
                  </div>
                  <LegalStateBadge state="reviewRequired" symbol="source" reason={`Visual gate: ${item.gates.visualGateProvenance}. Integración: ${item.gates.integrationState}.`} />
                </div>
                <p className="text-sm leading-6 text-tinta/75">{item.userJob}</p>
                <dl className="grid gap-2 border-t border-tinta/10 pt-4 text-xs leading-5 text-tinta/65">
                  <div className="flex justify-between gap-4"><dt className="font-semibold">Territorio</dt><dd className="text-right">{item.territory}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="font-semibold">Ruta candidata</dt><dd className="text-right">{item.candidateRoute ?? "Sin ruta: binding pendiente"}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="font-semibold">Formatos</dt><dd className="text-right">9:16 · 4:5</dd></div>
                </dl>
                <div className="space-y-3 border-t border-tinta/10 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">Copy educativo interno</p>
                    <a className="text-xs font-semibold underline underline-offset-2" href={item.sourceUrl} target="_blank" rel="noreferrer">Fuente oficial</a>
                  </div>
                  <p className="text-xs leading-5 text-tinta/60">Evidencia de copy registrada: {item.claims[0].source.verificationDate}</p>
                  <ul className="space-y-3 text-sm leading-6 text-tinta/80">
                    {item.claims.map((claim) => (
                      <li key={claim.claimId} className="border-l-2 border-oro pl-3">
                        <strong className="mr-2 text-xs uppercase tracking-[0.08em] text-tinta/55">Art. {claim.source.article}</strong>{claim.statement}
                        <span className="mt-1 block text-xs leading-5 text-tinta/60">Qualifier: {claim.qualifier}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="border-l-2 border-oro pl-3 text-xs leading-5 text-tinta/60">Solo revisión interna. Los claims cuentan con decisión Founder para `READY_FOR_COPY`; la relación de ruta, la integración y la publicación conservan gates independientes.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-tinta/15 pt-6 text-sm leading-6 text-tinta/65">
        Asset pack: {productionAssetPack.count} proofs registrados · Wave 01A importada solo para revisión interna · publicación bloqueada.
      </footer>
    </main>
  );
}
