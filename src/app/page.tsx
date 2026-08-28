import Link from "next/link";

/**
 * LEGACY SCAFFOLD — NOT THE LEGALMENTE 2026 PRODUCT HOME.
 *
 * This page predates the current product/art system. It remains only so the
 * branch keeps a stable root route while the 2026 experience is rebuilt from
 * the approved product, art and UX contracts. Do not treat this composition
 * as visual direction or publication-ready UI.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1180px] px-5 py-10 text-crema md:px-8">
      <div className="mb-8 border border-oro/35 bg-tinta/80 p-4 text-sm leading-6 text-crema/80">
        <strong className="text-oro">SCaffold interno · visual no aprobado.</strong>{" "}
        Esta ruta conserva temporalmente la portada heredada. La experiencia
        LegalMente 2026 está en rediseño y requiere QA artístico antes de
        sustituirla.
      </div>

      <section className="space-y-6 text-center opacity-60" aria-label="Portada heredada no aprobada">
        <p className="text-sm uppercase tracking-[0.2em] text-oro">Divulgación jurídica panhispánica</p>
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Derecho explicado con claridad, sin perder rigor.</h1>
        <p className="mx-auto max-w-2xl text-crema/80">
          Esta composición es un scaffold heredado y no representa la dirección visual 2026 de LegalMente.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/internal/product-lab" className="border border-oro px-6 py-3 text-sm uppercase tracking-wide text-oro">
            Laboratorio interno
          </Link>
          <Link href="/sobre" className="border border-crema/30 px-6 py-3 text-sm uppercase tracking-wide text-crema">
            Sobre LegalMente
          </Link>
        </div>
      </section>
    </main>
  );
}
