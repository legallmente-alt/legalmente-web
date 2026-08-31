import { notFound } from "next/navigation";

import { EditorialCard, LegalStateBadge } from "@/components/legalmente/ProductPrimitives";
import { wave01aReviewRegistry, wave01aReviewSnapshot } from "@/lib/review/registry";
import { productionAssetPack } from "@/lib/visual-system";

export const dynamic = "force-static";

const wave01aReviewCopy: Record<string, { question: string; alt: string }> = {
  "LM-PC-013": {
    question: "¿Qué tiene que quedar claro sobre lo que las partes se comprometen a hacer o entregar?",
    alt: "Bodegón editorial con caja, regla y papel para LM-PC-013; no incorpora texto jurídico.",
  },
  "LM-PC-031": {
    question: "¿Qué elementos ayudan a describir una relación de trabajo sin asumir una conclusión sobre mi caso?",
    alt: "Bodegón editorial con herramientas, delantal y etiqueta en blanco para LM-PC-031; no incorpora texto jurídico.",
  },
  "LM-PC-065": {
    question: "¿Qué documentos y datos conviene ordenar para entender una sociedad mercantil?",
    alt: "Bodegón editorial con muestras, carpeta y placa en blanco para LM-PC-065; no incorpora texto jurídico.",
  },
};

const wave01aReviews = wave01aReviewRegistry.map((unit) => {
  const copy = wave01aReviewCopy[unit.contentId];
  const vertical = unit.assets.find((asset) => asset.format === "9:16");
  const feed = unit.assets.find((asset) => asset.format === "4:5");

  if (!copy || !vertical || !feed) {
    throw new Error(`Wave 01A review unit is incomplete: ${unit.contentId}`);
  }

  return {
    ...unit,
    ...copy,
    vertical: vertical.localPath,
    feed: feed.localPath,
  };
});

export default function InternalProductLabPage() {
  if (process.env.LEGALMENTE_PRODUCT_LAB_INTERNAL !== "1") notFound();

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
          <h2 id="wave-01a-title" className="font-serif text-3xl">Visuales preparados, claims todavía bajo revisión humana.</h2>
          <p className="text-base leading-7 text-tinta/70">Esta bandeja interna comprueba la presencia binaria y la relación candidata con rutas existentes. La bandeja no muestra el claim jurídico, no abre publicación y no convierte una fuente en aprobación. El territorio se recibe del registro y permanece pendiente de revisión humana.</p>
          <p className="text-xs leading-5 text-tinta/60">Evidencia estructural automatizada: {wave01aReviewSnapshot.evidence.fileVerification}. Historial: {wave01aReviewSnapshot.evidence.changeHistory}. Transporte: {wave01aReviewSnapshot.evidence.signalTransport}. Aprobación humana: {wave01aReviewSnapshot.evidence.approvalEvidence}.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {wave01aReviews.map((item) => (
            <article key={item.contentId} data-content-id={item.contentId} data-review-state={item.state} data-review-evidence={wave01aReviewSnapshot.evidence.fileVerification} className="overflow-hidden border border-tinta/15 bg-white shadow-sm">
              <picture>
                <source media="(min-width: 768px)" srcSet={item.vertical} />
                <img src={item.feed} alt={item.alt} className="aspect-[4/5] w-full object-cover lg:aspect-[9/16]" loading="lazy" decoding="async" />
              </picture>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">{item.contentId}</p>
                    <h3 className="mt-2 font-serif text-2xl">Unidad visual</h3>
                  </div>
                  <LegalStateBadge state="reviewRequired" symbol="source" reason="Claim y binding pendientes." />
                </div>
                <p className="text-sm leading-6 text-tinta/75">{item.question}</p>
                <dl className="grid gap-2 border-t border-tinta/10 pt-4 text-xs leading-5 text-tinta/65">
                  <div className="flex justify-between gap-4"><dt className="font-semibold">Territorio</dt><dd className="text-right">{item.territory}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="font-semibold">Ruta candidata</dt><dd className="text-right">{item.candidateRoute}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="font-semibold">Formatos</dt><dd className="text-right">{item.assets.map((asset) => asset.format).join(" · ")}</dd></div>
                </dl>
                <p className="border-t border-tinta/10 pt-4 text-xs leading-5 text-tinta/60">La fuente, el copy jurídico y el binding permanecen fuera de esta bandeja hasta completar la revisión humana correspondiente.</p>
                <p className="border-l-2 border-oro pl-3 text-xs leading-5 text-tinta/60">Solo revisión interna de asset/procedencia. La relación de ruta requiere decisión de producto y el claim requiere revisión humana.</p>
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
