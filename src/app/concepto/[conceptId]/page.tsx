import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeShell } from "@/components/knowledge/KnowledgeShell";
import { concepts, getConcept, getProcess, getWorld } from "@/lib/knowledge-graph/content";
import { getLivingEntry } from "@/lib/knowledge-graph/engine";

export function generateStaticParams() {
  return concepts.map((item) => ({ conceptId: item.id }));
}

export default function ConceptPage({ params }: { params: { conceptId: string } }) {
  const concept = getConcept(params.conceptId);
  if (!concept) notFound();

  const relatedConcepts = concept.relatedConceptIds.map(getConcept).filter(Boolean);
  const relatedProcesses = concept.processIds.map(getProcess).filter(Boolean);
  const worldLinks = concept.appearsIn.map(getWorld).filter(Boolean);
  const dictionaryEntry = getLivingEntry(concept.id);

  return (
    <KnowledgeShell
      eyebrow="Concepto conectado"
      title={concept.title}
      summary={concept.summary}
      crumbs={[{ href: "/explorar", label: "Explorar" }, { href: `/concepto/${concept.id}`, label: concept.title }]}
      related={[
        ...relatedConcepts.map((item) => ({ href: `/concepto/${item!.id}`, label: item!.title, note: item!.summary })),
        ...relatedProcesses.map((item) => ({ href: `/proceso/${item!.id}`, label: item!.title, note: "Proceso relacionado" })),
      ].slice(0, 3)}
    >
      <div className="grid gap-10 lg:grid-cols-3">
        {dictionaryEntry ? <section className="lg:col-span-3 border-y border-[#102A43]/12 py-8"><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C77C4D]">En palabras sencillas</p><p className="mt-3 text-sm leading-7 text-[#102A43]/68">{dictionaryEntry.simpleDefinition}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C77C4D]">Definición técnica</p><p className="mt-3 text-sm leading-7 text-[#102A43]/68">{dictionaryEntry.technicalDefinition}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C77C4D]">Ejemplo</p><p className="mt-3 text-sm leading-7 text-[#102A43]/68">{dictionaryEntry.example}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C77C4D]">No concluir</p><p className="mt-3 text-sm leading-7 text-[#102A43]/68">{dictionaryEntry.limits}</p></div></div><div className="mt-8 grid gap-6 border-t border-[#102A43]/10 pt-6 md:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Provenance y territorio</p><p className="mt-2 text-sm leading-6 text-[#102A43]/65">{dictionaryEntry.sources[0]?.title} · {dictionaryEntry.territory}</p><p className="mt-2 text-xs text-[#102A43]/50">Esta referencia interna no sustituye una fuente jurídica primaria.</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Preguntas relacionadas</p><p className="mt-2 text-sm leading-6 text-[#102A43]/65">{dictionaryEntry.relatedQuestions.join(" · ")}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Siguiente aprendizaje</p>{dictionaryEntry.nextConceptId ? <Link className="mt-2 inline-block border-b border-[#102A43]/40 text-sm" href={`/concepto/${dictionaryEntry.nextConceptId}`}>{getConcept(dictionaryEntry.nextConceptId)?.title ?? "Explorar relación"} →</Link> : <p className="mt-2 text-sm text-[#102A43]/65">Volver a explorar relaciones.</p>}</div></div></section> : null}
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Dónde aparece</p>
          <div className="mt-5 space-y-3">
            {worldLinks.map((world) => world ? (
              <Link key={world.id} href={`/mundo/${world.id}`} className="block min-h-11 border-b border-[#102A43]/12 py-3 font-serif text-xl focus:outline-none focus:ring-2 focus:ring-[#102A43]">
                {world.title}
              </Link>
            ) : null)}
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Contexto</p>
          <p className="mt-5 text-sm leading-7 text-[#102A43]/66">
            {concept.historyNote ?? "Este concepto se explica primero por su función y sus relaciones. El contexto histórico o comparado solo aparece cuando ayuda a entenderlo mejor."}
          </p>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Territorio y límites</p>
          <p className="mt-5 text-sm leading-7 text-[#102A43]/66">{concept.jurisdictionNote}</p>
          <p className="mt-4 text-xs leading-5 text-[#102A43]/50">La explicación conceptual no sustituye la revisión de una situación individual.</p>
        </section>
      </div>
    </KnowledgeShell>
  );
}
