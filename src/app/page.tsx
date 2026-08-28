import Link from "next/link";

const doors = [
  { title: "Aprender", text: "Quiero entender un tema jurídico sin empezar por tecnicismos.", href: "/catalogo", cta: "Explorar temas" },
  { title: "Resolver una situación", text: "Me está pasando algo y necesito ordenar qué importa antes de decidir.", href: "/casos", cta: "Ver situaciones" },
  { title: "Preparar o revisar algo", text: "Tengo un documento, contrato o decisión y quiero revisar su estructura.", href: "/herramientas/antes-de-firmar", cta: "Empezar preflight" },
  { title: "Tu caso", text: "Necesito saber qué información falta y cuándo una herramienta ya no es suficiente.", href: "/fuentes-y-limites", cta: "Entender los límites" },
];

const tools = [
  ["Vacaciones MX", "/herramientas/vacaciones-mx", "Días proporcionales y prima vacacional dentro del alcance congelado."],
  ["Aguinaldo MX", "/herramientas/aguinaldo-mx", "Estimación anual o proporcional sobre salario diario fijo."],
  ["Finiquito devengado MX", "/herramientas/finiquito-devengado-mx", "Solo prestaciones devengadas; no calcula liquidación total."],
] as const;

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section className="grid gap-10 py-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-oro">Educación + preparación jurídica</p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-crema sm:text-6xl lg:text-7xl">
            Entiende el problema antes de convertirlo en un trámite.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-crema/70 sm:text-lg">
            LegalMente organiza conocimiento, herramientas preventivas y rutas de siguiente paso con territorio, fuentes y límites visibles.
          </p>
        </div>
        <div className="rounded-2xl border border-oro/20 bg-oro/[0.05] p-6 text-sm leading-6 text-crema/70">
          <span className="text-xs uppercase tracking-[0.18em] text-oro">Estado</span>
          <p className="mt-3">Esta versión contiene experiencias internas en construcción. Producir una herramienta no equivale a autorizar su publicación.</p>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-oro">Empieza por tu necesidad</p>
          <h2 className="mt-2 font-serif text-3xl text-crema sm:text-4xl">Cuatro puertas. Sin obligarte a conocer el nombre jurídico.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {doors.map((door) => (
            <Link key={door.title} href={door.href} className="group rounded-2xl border border-crema/10 bg-white/[0.03] p-6 transition hover:border-oro/45 hover:bg-white/[0.05]">
              <h3 className="font-serif text-2xl text-crema group-hover:text-oro">{door.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-crema/65">{door.text}</p>
              <span className="mt-5 inline-flex text-sm text-oro">{door.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-oro">Herramientas · México</p>
            <h2 className="mt-2 font-serif text-3xl text-crema">Calcula solo lo que está delimitado.</h2>
          </div>
          <Link href="/herramientas" className="text-sm text-oro hover:underline">Ver todas →</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {tools.map(([title, href, text]) => (
            <Link key={href} href={href} className="rounded-2xl border border-crema/10 p-5 transition hover:border-oro/40">
              <h3 className="font-serif text-xl text-crema">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-crema/60">{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 rounded-3xl border border-crema/10 bg-white/[0.025] p-7 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-oro">Confianza antes que automatización</p>
          <h2 className="mt-2 font-serif text-2xl text-crema">Fuentes, territorio, versión y stop conditions forman parte del producto.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-crema/65">Cuando una situación sale del alcance determinista, la experiencia debe decirlo en lugar de inventar una respuesta.</p>
        </div>
        <Link href="/fuentes-y-limites" className="rounded-xl border border-oro/40 px-5 py-3 text-sm text-oro hover:bg-oro/10">Ver cómo funciona</Link>
      </section>
    </div>
  );
}
