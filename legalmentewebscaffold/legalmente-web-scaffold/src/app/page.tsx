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
        <div className="flex justify-center gap-4 pt-4">
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
    </div>
  );
}
