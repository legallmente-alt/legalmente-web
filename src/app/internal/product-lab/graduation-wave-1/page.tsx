"use client";

import { useMemo, useState } from "react";
import { graduationWave1 } from "@/lib/legal-core/graduation-wave-1";

export default function GraduationWave1Page() {
  const [selectedId, setSelectedId] = useState(graduationWave1[0].id);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const selected = useMemo(() => graduationWave1.find((item) => item.id === selectedId) ?? graduationWave1[0], [selectedId]);
  const selectedAnswers = answers[selected.id] ?? [];

  function updateAnswer(index: number, value: string) {
    setAnswers((current) => ({ ...current, [selected.id]: current[selected.id]?.map((answer, answerIndex) => answerIndex === index ? value : answer) ?? selected.selector.map((_, selectorIndex) => selectorIndex === index ? value : "") }));
  }

  return (
    <main className="mx-auto max-w-[1280px] space-y-12 px-5 py-10 text-tinta md:px-8 print:max-w-none print:px-0 print:py-0">
      <header className="max-w-4xl space-y-5 print:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-tinta/60">LegalMente · Wave 1 · preview interno</p>
          <span className="border border-oro px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-tinta/65 print:border-tinta">FOUNDER_LITERALITY_PENDING</span>
        </div>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">Tres preguntas para graduar.</h1>
        <p className="max-w-[70ch] text-base leading-7 text-tinta/75">Previsualización de los tres primeros candidatos. El producto ya puede estructurarlos; la publicación LIVE sigue bloqueada hasta la confirmación humana de literalidad, vigencia, territorio y copy.</p>
        <div className="border-l-2 border-oro bg-white/60 p-4 text-sm leading-6 text-tinta/75 print:bg-transparent"><strong>Regla:</strong> esta herramienta ordena hechos y preguntas. No dictamina un caso, no recibe documentos y no sustituye la revisión de un abogado.</div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <nav className="space-y-3 print:hidden" aria-label="Candidatos de graduación">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">Lote 1 · {graduationWave1.length} candidatos</p>
          {graduationWave1.map((candidate, index) => {
            const active = candidate.id === selected.id;
            return <button key={candidate.id} type="button" onClick={() => setSelectedId(candidate.id)} aria-pressed={active} className={`w-full border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-tinta ${active ? "border-tinta bg-tinta text-[#F5F0E8]" : "border-tinta/15 bg-white/55 hover:border-tinta/40"}`}><span className={`text-xs font-semibold uppercase tracking-[0.12em] ${active ? "text-[#F5F0E8]/60" : "text-tinta/45"}`}>0{index + 1} · {candidate.subject}</span><span className="mt-2 block font-serif text-xl leading-tight">{candidate.title}</span><span className={`mt-3 block text-xs ${active ? "text-[#F5F0E8]/60" : "text-tinta/55"}`}>{candidate.targetPath}</span></button>;
          })}
        </nav>

        <article className="space-y-8 border border-tinta/15 bg-white/65 p-5 md:p-8 print:border-0 print:bg-transparent print:p-0">
          <header className="space-y-4 border-b border-tinta/12 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-tinta/50">{selected.subject}</p><span className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/55">{selected.badge}</span></div>
            <h2 className="max-w-[18ch] font-serif text-4xl leading-[1.02] tracking-[-0.03em] md:text-5xl">{selected.title}</h2>
            <p className="max-w-[70ch] text-base leading-7 text-tinta/75">{selected.humanQuestion}</p>
          </header>

          <section className="space-y-5 print:hidden" aria-labelledby="selector-title">
            <div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/50">Selector de hechos</p><h3 id="selector-title" className="mt-2 font-serif text-3xl">Ordena antes de concluir.</h3></div>
            <div className="grid gap-4 md:grid-cols-3">{selected.selector.map((field, index) => <fieldset key={field.prompt} className="border border-tinta/12 bg-[#F5F0E8]/65 p-4"><legend className="max-w-full text-sm font-semibold leading-5">{field.prompt}</legend><div className="mt-3 space-y-2">{field.options.map((option) => <label key={option} className="flex gap-2 text-sm leading-5"><input type="radio" name={`${selected.id}-${index}`} checked={selectedAnswers[index] === option} onChange={() => updateAnswer(index, option)} className="mt-1 accent-[#102A43]" />{option}</label>)}</div></fieldset>)}</div>
          </section>

          <section className="border border-[#C77C4D] bg-[#C77C4D]/10 p-5" aria-labelledby="incompatibility-title"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9B542E]">Incompatibilidad</p><h3 id="incompatibility-title" className="mt-2 font-serif text-3xl">Lo que queda excluido de la conclusión rápida.</h3><p className="mt-3 text-sm leading-6 text-tinta/78">{selected.incompatibility}</p></section>

          <dl className="grid gap-x-8 gap-y-5 text-sm leading-6 md:grid-cols-2"><div><dt className="font-semibold text-tinta/55">Ruta objetivo</dt><dd>{selected.targetPath}</dd></div><div><dt className="font-semibold text-tinta/55">Estado de producto</dt><dd>{selected.status}</dd></div><div><dt className="font-semibold text-tinta/55">Fuente primaria</dt><dd><a className="underline underline-offset-2 print:no-underline" href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceLabel}</a></dd></div><div><dt className="font-semibold text-tinta/55">Artículos / precedente</dt><dd>{selected.sourceArticles.join(" · ")}</dd></div></dl>

          <section className="grid gap-8 border-t border-tinta/12 pt-6 md:grid-cols-2"><div><h3 className="font-serif text-2xl">Lo que falta saber</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-tinta/72">{selected.missing.map((item) => <li key={item} className="border-l border-tinta/25 pl-3">{item}</li>)}</ul></div><div><h3 className="font-serif text-2xl">Límite explícito</h3><p className="mt-3 text-sm leading-6 text-tinta/72">{selected.limit}</p></div></section>

          <section className="border-t border-tinta/12 pt-6"><h3 className="font-serif text-2xl">3 preguntas clave para el abogado</h3><ol className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-3">{selected.questions.map((question, index) => <li key={question} className="border border-tinta/12 bg-[#F5F0E8]/65 p-4"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-tinta/45">0{index + 1}</span><p className="mt-3">{question}</p></li>)}</ol></section>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-tinta/12 pt-5 text-xs leading-5 text-tinta/55"><span>Fuente, vigencia, territorio y copy pendientes de gate Founder.</span><button type="button" onClick={() => window.print()} className="border border-tinta/30 px-4 py-2 font-semibold text-tinta print:hidden">Imprimir / guardar PDF</button></footer>
        </article>
      </section>
    </main>
  );
}
