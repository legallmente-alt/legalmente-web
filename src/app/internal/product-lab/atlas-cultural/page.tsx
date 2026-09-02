"use client";

import { useMemo, useState } from "react";
import { culturalAtlas, culturalAtlasMeta } from "@/lib/legal-core/cultural-atlas";

const kinds = ["TODOS", "CINE", "LITERATURA", "FILOSOFIA", "TECNOLOGIA"] as const;

export default function CulturalAtlasPage() {
  const [selectedId, setSelectedId] = useState(culturalAtlas[0].id);
  const [kind, setKind] = useState<(typeof kinds)[number]>("TODOS");
  const selected = useMemo(() => culturalAtlas.find((entry) => entry.id === selectedId) ?? culturalAtlas[0], [selectedId]);
  const visibleEntries = kind === "TODOS" ? culturalAtlas : culturalAtlas.filter((entry) => entry.kind === kind);

  return (
    <main className="mx-auto max-w-[1280px] space-y-12 px-5 py-10 text-tinta md:px-8 print:max-w-none print:px-0 print:py-0">
      <header className="max-w-5xl space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-tinta/60">LegalMente · {culturalAtlasMeta.status}</p>
        <h1 className="max-w-[14ch] font-serif text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.94] tracking-[-0.045em]">El derecho también vive en las historias.</h1>
        <p className="max-w-[70ch] text-base leading-7 text-tinta/75">{culturalAtlasMeta.subtitle}. El Atlas convierte una referencia cultural en una conducta observable, un conflicto jurídico, una regla, un límite y una siguiente pregunta.</p>
        <div className="border-l-2 border-oro bg-white/60 p-4 text-sm leading-6 text-tinta/75 print:bg-transparent"><strong>Uso:</strong> {culturalAtlasMeta.note} Esta superficie es una herramienta interna de vinculación editorial, no una biblioteca de opiniones legales.</div>
      </header>

      <section className="space-y-5 print:hidden" aria-label="Filtro del Atlas">
        <div className="flex flex-wrap gap-2">{kinds.map((item) => <button key={item} type="button" onClick={() => setKind(item)} className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] focus:outline-none focus:ring-2 focus:ring-tinta ${kind === item ? "border-tinta bg-tinta text-[#F5F0E8]" : "border-tinta/20 bg-white/50 text-tinta/65"}`}>{item}</button>)}</div>
        <p className="text-sm text-tinta/60">{visibleEntries.length} entradas visibles · selecciona una referencia para abrir su vínculo completo.</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <nav className="space-y-3 print:hidden" aria-label="Referencias culturales">
          {visibleEntries.map((entry) => { const active = entry.id === selected.id; return <button key={entry.id} type="button" onClick={() => setSelectedId(entry.id)} aria-pressed={active} className={`w-full border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-tinta ${active ? "border-tinta bg-tinta text-[#F5F0E8]" : "border-tinta/15 bg-white/55 hover:border-tinta/40"}`}><span className={`text-xs font-semibold uppercase tracking-[0.12em] ${active ? "text-[#F5F0E8]/60" : "text-tinta/45"}`}>{entry.kind}</span><span className="mt-2 block font-serif text-xl leading-tight">{entry.reference}</span><span className={`mt-2 block text-xs ${active ? "text-[#F5F0E8]/60" : "text-tinta/55"}`}>{entry.visualWorld} · {entry.framing}</span></button>; })}
        </nav>

        <article className="space-y-8 border border-tinta/15 bg-white/65 p-5 md:p-8 print:border-0 print:bg-transparent print:p-0">
          <header className="space-y-4 border-b border-tinta/12 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">{selected.kind} · {selected.status}</p><span className="border border-tinta/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-tinta/55">{selected.routeCandidate}</span></div>
            <h2 className="max-w-[18ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">{selected.reference}</h2>
            <p className="max-w-[70ch] text-base leading-7 text-tinta/75">{selected.workContext}</p>
          </header>

          <section className="grid gap-5 md:grid-cols-2"><div className="border-l-2 border-[#D97745] pl-4"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/48">Conducta observable</p><p className="mt-2 text-sm leading-6 text-tinta/75">{selected.conduct}</p></div><div className="border-l-2 border-oro pl-4"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/48">Conflicto subyacente</p><p className="mt-2 text-sm leading-6 text-tinta/75">{selected.conflict}</p></div></section>

          <section className="border border-[#C77C4D] bg-[#C77C4D]/10 p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9B542E]">Regla vinculada</p><h3 className="mt-2 font-serif text-3xl">La historia abre la pregunta; la fuente limita la respuesta.</h3><p className="mt-3 text-sm leading-6 text-tinta/78">{selected.rule}</p><p className="mt-4 border-t border-[#9B542E]/20 pt-4 text-sm leading-6 text-tinta/68"><strong>Límite:</strong> {selected.limit}</p></section>

          <dl className="grid gap-x-8 gap-y-5 text-sm leading-6 md:grid-cols-2"><div><dt className="font-semibold text-tinta/55">Fuente</dt><dd><a className="underline underline-offset-2 print:no-underline" href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceLabel}</a><span className="block text-xs text-tinta/55">{selected.sourceArticles}</span></dd></div><div><dt className="font-semibold text-tinta/55">Ruta futura</dt><dd>{selected.routeCandidate}</dd></div></dl>

          <section className="border-t border-tinta/12 pt-6"><h3 className="font-serif text-2xl">3 preguntas para aterrizar la historia</h3><ol className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-3">{selected.questions.map((question, index) => <li key={question} className="border border-tinta/12 bg-[#F5F0E8]/65 p-4"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/45">0{index + 1}</span><p className="mt-3">{question}</p></li>)}</ol></section>

          <section className="border-t border-tinta/12 pt-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/50">Huella visual para rotación</p><p className="mt-2 text-sm leading-6 text-tinta/68">{selected.visualWorld} · {selected.visualSchool} · {selected.framing}</p></div><button type="button" onClick={() => window.print()} className="border border-tinta/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-tinta print:hidden">Imprimir / guardar PDF</button></div></section>

          <footer className="border-t border-tinta/12 pt-5 text-xs leading-5 text-tinta/55">Estado: {selected.status}. Antes de crear una ruta pública deben verificarse el artículo exacto, la vigencia, el territorio, la licencia de la referencia cultural y el copy de salida.</footer>
        </article>
      </section>
    </main>
  );
}
