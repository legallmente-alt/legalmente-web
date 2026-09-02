"use client";

import { useMemo, useState } from "react";
import { topicRadar, topicRadarAudits, topicRadarMeta } from "@/lib/legal-core/topic-radar";

export default function TopicRadarPage() {
  const [selectedId, setSelectedId] = useState(topicRadar[0].id);
  const selected = useMemo(() => topicRadar.find((item) => item.id === selectedId) ?? topicRadar[0], [selectedId]);
  const audit = topicRadarAudits[selected.id];

  return (
    <main className="mx-auto max-w-[1280px] space-y-12 px-5 py-10 text-tinta md:px-8">
      <header className="max-w-4xl space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-tinta/60">LegalMente · radar interno</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">Qué cosa no va con la otra.</h1>
        <p className="max-w-[70ch] text-base leading-7 text-tinta/75">Una herramienta de trabajo para convertir situaciones cotidianas en relaciones, elementos jurídicos, incompatibilidades, límites y preguntas útiles. No dicta una conclusión sobre un caso individual.</p>
        <div className="border-l-2 border-oro bg-white/60 p-4 text-sm leading-6 text-tinta/75">
          <strong>Estado:</strong> {topicRadarMeta.status}. {topicRadarMeta.sourceNote}
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="space-y-3" aria-label="Temas del radar">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">{topicRadar.length} patrones estructurales</p>
            <p className="mt-2 text-sm leading-6 text-tinta/65">Selecciona una tensión para ver su estructura completa.</p>
          </div>
          {topicRadar.map((item, index) => {
            const active = item.id === selected.id;
            return (
              <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={active} className={`w-full border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-tinta ${active ? "border-tinta bg-tinta text-[#F5F0E8]" : "border-tinta/15 bg-white/55 hover:border-tinta/40"}`}>
                <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${active ? "text-[#F5F0E8]/60" : "text-tinta/45"}`}>0{index + 1} · {item.axis}</span>
                <span className="mt-2 block font-serif text-xl leading-tight">{item.title}</span>
              </button>
            );
          })}
        </div>

        <article className="space-y-8 border border-tinta/15 bg-white/65 p-5 md:p-8" aria-live="polite">
          <header className="space-y-4 border-b border-tinta/12 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">{selected.axis}</p>
              <div className="flex flex-wrap gap-2"><span className="border border-oro px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-tinta/65">{audit.status}</span><span className="border border-tinta/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-tinta/55">{selected.reviewState}</span></div>
            </div>
            <h2 className="max-w-[18ch] font-serif text-4xl leading-[1.02] tracking-[-0.03em] md:text-5xl">{selected.title}</h2>
            <p className="max-w-[68ch] text-base leading-7 text-tinta/75">{selected.humanQuestion}</p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border-l-2 border-[#D97745] pl-4"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/48">Elemento presente</p><p className="mt-2 font-serif text-2xl leading-tight">{selected.presentLabel}</p></div>
            <div className="border-l-2 border-oro pl-4"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/48">Elemento pretendido</p><p className="mt-2 font-serif text-2xl leading-tight">{selected.intendedLabel}</p></div>
          </div>

          <section className="border-y border-tinta/12 py-6" aria-labelledby="result-title">
            <p id="result-title" className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/48">Salida provisional</p>
            <h3 className="mt-2 font-serif text-3xl">{selected.resultLabel}</h3>
            <p className="mt-3 max-w-[68ch] text-sm leading-6 text-tinta/72">{selected.resultExplanation}</p>
          </section>

          <section className="border-t border-tinta/12 pt-6"><h3 className="font-serif text-2xl">Auditoría de fuentes</h3><p className="mt-3 text-sm leading-6 text-tinta/75">{audit.sourceBasis}</p><p className="mt-3 text-xs leading-5 text-tinta/60"><strong>Artículos / precedentes declarados:</strong> {audit.sourceArticles.join(" · ")}</p><p className="mt-2 text-xs leading-5 text-tinta/60">{audit.auditNote}</p></section>

          <dl className="grid gap-x-8 gap-y-5 text-sm leading-6 md:grid-cols-2">
            <div><dt className="font-semibold text-tinta/55">Relación</dt><dd>{selected.relationship}</dd></div>
            <div><dt className="font-semibold text-tinta/55">Objeto</dt><dd>{selected.object}</dd></div>
            <div><dt className="font-semibold text-tinta/55">Territorio</dt><dd>{selected.territory}</dd></div>
            <div><dt className="font-semibold text-tinta/55">Fuente declarada</dt><dd><a className="underline underline-offset-2" href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceLabel}</a><span className="block text-xs text-tinta/55">{selected.sourceVersion}</span></dd></div>
          </dl>

          <div className="grid gap-8 border-t border-tinta/12 pt-6 md:grid-cols-2">
            <section><h3 className="font-serif text-2xl">Evidencia relevante</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-tinta/72">{selected.evidence.map((item) => <li key={item} className="border-l border-tinta/25 pl-3">{item}</li>)}</ul></section>
            <section><h3 className="font-serif text-2xl">Lo que falta saber</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-tinta/72">{selected.missing.map((item) => <li key={item} className="border-l border-tinta/25 pl-3">{item}</li>)}</ul></section>
          </div>

          <section className="border-t border-tinta/12 pt-6"><h3 className="font-serif text-2xl">Regla y límite</h3><p className="mt-3 text-sm leading-6 text-tinta/75"><strong>Regla:</strong> {selected.rule}</p><p className="mt-2 text-sm leading-6 text-tinta/65"><strong>Límite:</strong> {selected.limit}</p></section>

          <section className="border-t border-tinta/12 pt-6" aria-labelledby="questions-title"><h3 id="questions-title" className="font-serif text-2xl">Tres preguntas para continuar</h3><ol className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-3">{selected.nextQuestions.map((question, index) => <li key={question} className="border border-tinta/12 bg-[#F5F0E8]/65 p-4"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/45">0{index + 1}</span><p className="mt-3">{question}</p></li>)}</ol></section>

          <footer className="border-t border-tinta/12 pt-5 text-xs leading-5 text-tinta/55">Fuente y claims requieren verificación jurídica y de vigencia antes de publicación. Esta ruta permanece en Product Lab interno.</footer>
        </article>
      </section>
    </main>
  );
}
