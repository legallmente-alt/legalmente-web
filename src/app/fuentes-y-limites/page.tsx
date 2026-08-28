export default function SourcesAndLimitsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-oro">Confianza</p>
        <h1 className="font-serif text-4xl leading-tight text-crema sm:text-5xl">Fuentes, territorio y límites visibles.</h1>
        <p className="text-crema/70">LegalMente busca que puedas distinguir qué está explicado, qué está calculado y qué todavía necesita revisión profesional.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card title="Territorio">Las herramientas laborales actuales están delimitadas a México y deben mostrar su alcance antes del resultado.</Card>
        <Card title="Fuentes">Cada regla implementable debe conservar fuente, fecha efectiva y versión del paquete jurídico que la respalda.</Card>
        <Card title="Stop conditions">Si faltan datos, existe salario variable, transición histórica o una controversia material, el motor debe detenerse o pedir revisión.</Card>
        <Card title="No asesoría automática">Una herramienta puede organizar información o calcular un componente delimitado; no decide validez, estrategia, procedencia litigiosa ni conveniencia.</Card>
      </section>

      <section className="rounded-2xl border border-crema/10 bg-white/[0.03] p-6 text-sm leading-7 text-crema/70">
        <h2 className="font-serif text-2xl text-crema">Estado de esta versión</h2>
        <p className="mt-3">Esta rama implementa prototipos internos. Construir código no equivale a autorizar publicación. La autorización pública permanece separada de la producción y requiere controles legales, visuales, móviles, de procedencia y decisión humana.</p>
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="rounded-2xl border border-crema/10 bg-white/[0.03] p-5"><h2 className="font-serif text-xl text-oro">{title}</h2><p className="mt-2 text-sm leading-6 text-crema/65">{children}</p></article>;
}
