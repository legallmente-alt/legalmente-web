import { notFound } from "next/navigation";

import { EditorialCard, LegalStateBadge } from "@/components/legalmente/ProductPrimitives";
import { productionAssetPack } from "@/lib/visual-system";

export const dynamic = "force-static";

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

      <footer className="border-t border-tinta/15 pt-6 text-sm leading-6 text-tinta/65">
        Asset pack: {productionAssetPack.count} proofs registrados · importación binaria pendiente · publicación bloqueada.
      </footer>
    </main>
  );
}
