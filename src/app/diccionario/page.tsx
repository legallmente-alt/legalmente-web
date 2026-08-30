"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getLivingEntry, livingDictionary, searchHumanQuestion } from "@/lib/knowledge-graph/engine";

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchHumanQuestion(query), [query]);
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Diccionario vivo</p>
        <h1 className="mt-5 max-w-[11ch] font-serif text-[clamp(3rem,8vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.05em]">Entra por cómo lo dices.</h1>
        <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#102A43]/68">Busca una duda cotidiana y encuentra conceptos relacionados, territorio, fuentes y límites. La búsqueda es determinista: no inventa una respuesta ni sustituye una revisión individual.</p>
        <label className="mt-10 block max-w-3xl"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Pregunta humana</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. ¿quién puede firmar por la empresa?" className="mt-3 min-h-14 w-full border-b-2 border-[#102A43] bg-transparent px-1 text-lg outline-none placeholder:text-[#102A43]/35 focus:border-[#C77C4D]" /></label>
        {query ? <section aria-live="polite" className="mt-10 max-w-3xl"><p className="text-sm text-[#102A43]/55">{results.length ? `${results.length} rutas encontradas` : "No encontramos una coincidencia suficiente. Prueba con otra formulación."}</p><div className="mt-4 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">{results.map(({ entry, score }) => <Link key={entry.conceptId} href={`/concepto/${entry.conceptId}`} className="group block py-5 focus:outline-none focus:ring-2 focus:ring-[#102A43]"><div className="flex items-start justify-between gap-5"><div><h2 className="font-serif text-2xl">{entry.term}</h2><p className="mt-2 text-sm leading-6 text-[#102A43]/65">{entry.simpleDefinition}</p><p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#C77C4D]">Coincidencia {Math.round(score * 100)}% · {entry.territory}</p></div><span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span></div></Link>)}</div></section> : <section className="mt-14"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Explora conceptos respaldados</p><div className="mt-5 grid gap-x-8 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12 md:grid-cols-2">{livingDictionary.map((entry) => <Link key={entry.conceptId} href={`/concepto/${entry.conceptId}`} className="group py-5 focus:outline-none focus:ring-2 focus:ring-[#102A43]"><div className="flex items-start justify-between gap-4"><div><h2 className="font-serif text-2xl">{entry.term}</h2><p className="mt-2 text-sm leading-6 text-[#102A43]/62">{entry.everydayNames.slice(0, 3).join(" · ")}</p></div><span aria-hidden="true">↗</span></div></Link>)}</div></section>}
        <p className="mt-12 border-l-2 border-[#C77C4D] pl-4 text-sm leading-6 text-[#102A43]/62">La presencia de una fuente en una entrada no convierte esta página en asesoría legal. Revisa siempre territorio, hechos, versión y límites.</p>
      </section>
    </main>
  );
}

void getLivingEntry;
