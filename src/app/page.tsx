import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-oro">
          Divulgación jurídica panhispánica
        </p>
        <h1 className="text-4xl font-serif leading-tight text-crema sm:text-5xl">
          Derecho explicado con claridad, sin perder rigor.
        </h1>
        <p className="mx-auto max-w-2xl text-crema/80">
          LegalMente traduce conceptos, máximas y diferencias jurídicas al
          lenguaje cotidiano — para toda la comunidad de habla hispana,
          sin anclar el contenido a un solo país salvo que sea
          estrictamente necesario.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/catalogo"
            className="rounded-sm bg-oro px-6 py-3 text-sm uppercase tracking-wide text-tinta hover:bg-crema"
          >
            Explorar el archivo educativo
          </Link>
          <Link
            href="/documentos"
            className="rounded-sm border border-oro px-6 py-3 text-sm uppercase tracking-wide text-oro hover:bg-oro hover:text-tinta"
          >
            Área profesional · México
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        <Link href="/catalogo" className="rounded-sm border border-oro/40 bg-oro/[0.06] p-6 hover:border-oro">
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-oro">Educación panhispánica</p>
          <h2 className="mb-2 font-serif text-xl text-oro">Archivo LegalMente</h2>
          <p className="text-sm text-crema/70">
            Conceptos, diferencias y situaciones cotidianas explicadas con jurisdicción y límites visibles.
          </p>
        </Link>
        <div className="rounded-sm border border-oro/20 p-6">
          <h2 className="mb-2 font-serif text-xl text-oro">
            Áreas de práctica
          </h2>
          <p className="text-sm text-crema/70">
            Explora los temas jurídicos que cubrimos, organizados por
            claridad conceptual y utilidad real.
          </p>
        </div>
        <div className="rounded-sm border border-oro/20 p-6">
          <h2 className="mb-2 font-serif text-xl text-oro">
            Casos y ejemplos
          </h2>
          <p className="text-sm text-crema/70">
            Situaciones concretas que ilustran cómo aplican los conceptos
            explicados.
          </p>
        </div>
      </section>

      <section className="grid gap-6 border-y border-oro/25 py-10 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-oro">
            Área profesional separada · México
          </p>
          <h2 className="font-serif text-2xl text-crema">
            Un primer servicio pequeño, con alcance claro.
          </h2>
          <p className="text-sm leading-6 text-crema/70">
            El piloto de NDA corporativo preclasifica la operación y prepara un brief. No genera un contrato ni convierte el contenido educativo en asesoría; la revisión profesional se contrata por separado.
          </p>
        </div>
        <Link
          href="/documentos"
          className="rounded-sm bg-oro px-6 py-3 text-center text-sm font-medium text-tinta hover:bg-crema"
        >
          Probar la preclasificación
        </Link>
      </section>
    </div>
  );
}
