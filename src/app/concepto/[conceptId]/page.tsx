import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeShell } from "@/components/knowledge/KnowledgeShell";
import { Wave01aIntegrationPreview } from "@/components/knowledge/Wave01aIntegrationPreview";
import { concepts, getConcept, getProcess, getWorld } from "@/lib/knowledge-graph/content";
import { getWave01aInternalQaUnitForRoute, isWave01aInternalQaPreviewEnabled } from "@/lib/knowledge-graph/wave01a-provenance";

export function generateStaticParams() {
  return concepts.map((item) => ({ conceptId: item.id }));
}

export default function ConceptPage({ params }: { params: { conceptId: string } }) {
  const concept = getConcept(params.conceptId);
  if (!concept) notFound();

  const relatedConcepts = concept.relatedConceptIds.map(getConcept).filter(Boolean);
  const relatedProcesses = concept.processIds.map(getProcess).filter(Boolean);
  const worldLinks = concept.appearsIn.map(getWorld).filter(Boolean);
  const waveUnit = isWave01aInternalQaPreviewEnabled()
    ? getWave01aInternalQaUnitForRoute(`/concepto/${concept.id}`)
    : null;

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
      {waveUnit ? <Wave01aIntegrationPreview unit={waveUnit} /> : null}
    </KnowledgeShell>
  );
}
