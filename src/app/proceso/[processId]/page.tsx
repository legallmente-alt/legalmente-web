import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeShell } from "@/components/knowledge/KnowledgeShell";
import { getConcept, getProcess, processes } from "@/lib/knowledge-graph/content";

export function generateStaticParams() {
  return processes.map((item) => ({ processId: item.id }));
}

export default function ProcessPage({ params }: { params: { processId: string } }) {
  const process = getProcess(params.processId);
  if (!process) notFound();

  const concepts = process.relatedConceptIds.map(getConcept).filter(Boolean);

  return (
    <KnowledgeShell
      eyebrow="Proceso educativo"
      title={process.title}
      summary={process.summary}
      crumbs={[{ href: "/explorar", label: "Explorar" }, { href: `/proceso/${process.id}`, label: process.title }]}
      related={concepts.map((item) => ({ href: `/concepto/${item!.id}`, label: item!.title, note: item!.summary })).slice(0, 3)}
    >
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Secuencia</p>
          <ol className="mt-5 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">
            {process.steps.map((step, index) => (
              <li key={step} className="grid gap-4 py-5 sm:grid-cols-[48px_1fr]">
                <span className="text-xs tabular-nums text-[#102A43]/38">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base leading-7">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <aside>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Evidencia que puede aparecer</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[#102A43]/66">
            {process.evidence.map((item) => <li key={item} className="border-b border-[#102A43]/10 pb-3">{item}</li>)}
          </ul>
          <div className="mt-8 border-t border-[#D97745] pt-4">
            <strong className="text-sm">Territorio y límite</strong>
            <p className="mt-2 text-sm leading-6 text-[#102A43]/62">{process.territoryNote}</p>
          </div>
          <Link href="/explorar" className="mt-8 inline-flex min-h-11 items-center border-b border-[#102A43]/30 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#102A43]">Volver a explorar</Link>
        </aside>
      </div>
    </KnowledgeShell>
  );
}
