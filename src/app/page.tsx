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
            className="rounded-sm border border-oro px-6 py-3 text-sm uppercase tracking-wide text-oro hover:bg-oro hover:text-tinta"
          >
            Ver catálogo editorial
          </Link>
          <Link
            href="/sobre"
            className="rounded-sm border border-crema/30 px-6 py-3 text-sm uppercase tracking-wide text-crema hover:border-crema"
          >
            Sobre LegalMente
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-sm border border-oro/20 p-6">
          <h2 className="mb-2 font-serif text-xl text-oro">
            Áreas de práctica
          </h2>
          <p className="text-sm text-crema/70">
            Explora las áreas jurídicas que cubrimos como contenido educativo,
            organizadas por claridad conceptual y utilidad real.
          </p>
        </div>
        <div className="rounded-sm border border-oro/20 p-6">
          <h2 className="mb-2 font-serif text-xl text-oro">
            Casos y ejemplos
          </h2>
          <p className="text-sm text-crema/70">
            Situaciones redactadas para explicar cómo funcionan los conceptos,
            sin convertir el contenido en asesoría individual.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-oro/30 bg-crema/[0.03] p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-oro/70">
              Ruta profesional separada · México
            </p>
            <h2 className="mt-2 font-serif text-2xl text-crema">
              Piloto de revisión acotada de NDA
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-crema/70">
              Estamos preparando un servicio limitado y gobernado. Todavía no
              acepta pagos ni documentos. Puedes revisar su alcance y probar el
              preflight sin compartir información personal o contractual.
            </p>
          </div>
          <Link
            href="/servicios/nda-mexico"
            className="inline-flex justify-center rounded-lg border border-oro px-5 py-3 text-sm font-semibold text-oro transition hover:bg-oro hover:text-tinta"
          >
            Ver piloto
          </Link>
        </div>
      </section>
    </div>
  );
}
