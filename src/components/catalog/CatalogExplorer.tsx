"use client";

import { useState } from "react";
import Link from "next/link";
import { catalogKinds, filterCatalog, type CatalogEntry } from "@/lib/knowledge-graph/catalog";

type Props = { entries: CatalogEntry[]; worlds: { id: string; title: string }[] };
const control = "mt-2 min-h-12 w-full rounded border border-[#102A43]/30 bg-white px-3 py-3 text-base text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]";

export default function CatalogExplorer({ entries, worlds }: Props) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("");
  const [worldId, setWorldId] = useState("");
  const results = filterCatalog(entries, query, kind, worldId);
  return (
    <section id="buscar" aria-labelledby="catalog-search-title" className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
      <h2 id="catalog-search-title" className="font-serif text-4xl tracking-[-0.035em]">Encuentra por dónde empezar.</h2>
      <p id="catalog-search-help" className="mt-4 max-w-[65ch] leading-7 text-[#102A43]/75">Busca palabras en títulos y descripciones, o combina un tipo de contenido con un mundo. Puedes escribir con o sin acentos.</p>
      <div role="search" aria-label="Buscar en el catálogo" className="mt-8 grid gap-5 md:grid-cols-[2fr_1fr_1fr]">
        <label className="text-sm font-semibold">Buscar contenido
          <input type="search" aria-label="Buscar contenido" aria-describedby="catalog-search-help" value={query} onChange={event => setQuery(event.target.value)} placeholder="Por ejemplo: representación" className={control} />
        </label>
        <label className="text-sm font-semibold">Tipo de contenido
          <select aria-label="Tipo de contenido" value={kind} onChange={event => setKind(event.target.value)} className={control}>
            <option value="">Todos los tipos</option>
            {Object.entries(catalogKinds).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Mundo
          <select aria-label="Mundo" value={worldId} onChange={event => setWorldId(event.target.value)} className={control}>
            <option value="">Todos los mundos</option>
            {worlds.map(world => <option key={world.id} value={world.id}>{world.title}</option>)}
          </select>
        </label>
      </div>
      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
        <p role="status" aria-live="polite" aria-atomic="true" className="text-sm">{results.length} {results.length === 1 ? "resultado" : "resultados"}</p>
        {(query || kind || worldId) && <button type="button" onClick={() => { setQuery(""); setKind(""); setWorldId(""); }} className="min-h-12 rounded px-3 py-2 text-sm font-semibold underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#102A43]">Limpiar búsqueda y filtros</button>}
      </div>
      {results.length === 0 ? <p className="border-y border-[#102A43]/20 py-8 leading-7">No encontramos entradas con esa combinación. Prueba menos palabras o elimina un filtro.</p> : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map(entry => <li key={entry.href}>
            <Link href={entry.href} className="block h-full rounded border border-[#102A43]/20 p-6 transition-colors hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#102A43]/70">{catalogKinds[entry.kind]}</span>
              <h3 className="mt-3 font-serif text-2xl">{entry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#102A43]/75">{entry.summary}</p>
              <p className="mt-4 text-xs leading-5 text-[#102A43]/70">{entry.worldIds.map(id => worlds.find(world => world.id === id)?.title).filter(Boolean).join(" · ")}</p>
            </Link>
          </li>)}
        </ul>
      )}
    </section>
  );
}
