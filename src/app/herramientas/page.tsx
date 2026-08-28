import Link from "next/link";

const tools = [
  {
    href: "/herramientas/antes-de-firmar",
    title: "Antes de firmar",
    tag: "Confianza",
    text: "Checklist estructural para detectar vacíos antes de firmar. No dictamina validez ni conveniencia.",
  },
  {
    href: "/herramientas/vacaciones-mx",
    title: "Vacaciones MX",
    tag: "Cálculo",
    text: "Estimación interna de días proporcionales y prima vacacional dentro del alcance congelado.",
  },
  {
    href: "/herramientas/aguinaldo-mx",
    title: "Aguinaldo MX",
    tag: "Cálculo",
    text: "Aguinaldo anual o proporcional para salario diario fijo y periodo de un solo año calendario.",
  },
  {
    href: "/herramientas/finiquito-devengado-mx",
    title: "Finiquito devengado MX",
    tag: "Alcance restringido",
    text: "Solo prestaciones devengadas: salarios pendientes, aguinaldo, vacaciones y prima vacacional.",
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-oro">Herramientas · beta interna</p>
        <h1 className="font-serif text-4xl leading-tight text-crema sm:text-5xl">Entender primero. Calcular solo lo que sí está delimitado.</h1>
        <p className="text-crema/70">
          Estas experiencias están preparadas para pruebas internas. No son autorización de publicación ni prestación de servicios reales.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-crema/10 bg-white/[0.03] p-6 transition hover:border-oro/50 hover:bg-white/[0.05]">
            <span className="text-xs uppercase tracking-[0.18em] text-oro/80">{tool.tag}</span>
            <h2 className="mt-3 font-serif text-2xl text-crema group-hover:text-oro">{tool.title}</h2>
            <p className="mt-3 text-sm leading-6 text-crema/65">{tool.text}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
