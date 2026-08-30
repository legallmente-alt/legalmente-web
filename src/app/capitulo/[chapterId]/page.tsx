import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeShell } from "@/components/knowledge/KnowledgeShell";
import { chapters, getChapter, getChapterSiblings, getConcept, getProcess, getSeries, getWorld } from "@/lib/knowledge-graph/content";

export function generateStaticParams() {
  return chapters.map((item) => ({ chapterId: item.id }));
}

export default async function ChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params;
  const chapter = getChapter(chapterId);
  if (!chapter) notFound();
  const parent = getSeries(chapter.seriesId);
  if (!parent) notFound();
  const world = getWorld(parent.worldId);
  if (!world) notFound();

  const siblings = getChapterSiblings(chapter);
  const conceptList = chapter.conceptIds.map(getConcept).filter(Boolean);
  const processList = chapter.processIds.map(getProcess).filter(Boolean);

  return (
    <KnowledgeShell
      eyebrow={`Capítulo ${chapter.number} de ${parent.chapterIds.length}`}
      title={chapter.title}
      summary={chapter.summary}
      crumbs={[
        { href: "/explorar", label: "Explorar" },
        { href: `/mundo/${world.id}`, label: world.title },
        { href: `/serie/${parent.id}`, label: parent.title },
        { href: `/capitulo/${chapter.id}`, label: `Capítulo ${chapter.number}` },
      ]}
      previous={siblings.previous ? { href: `/capitulo/${siblings.previous.id}`, label: siblings.previous.title } : null}
      next={siblings.next ? { href: `/capitulo/${siblings.next.id}`, label: siblings.next.title } : null}
      related={[
        ...conceptList.map((concept) => ({ href: `/concepto/${concept!.id}`, label: concept!.title, note: "Abrir como concepto conectado" })),
        ...processList.map((process) => ({ href: `/proceso/${process!.id}`, label: process!.title, note: "Ver proceso relacionado" })),
      ].slice(0, 3)}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Conceptos en este capítulo</p>
          <div className="mt-5 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">
            {conceptList.map((concept) => concept ? (
              <Link key={concept.id} href={`/concepto/${concept.id}`} className="group block py-5 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <strong className="font-serif text-2xl">{concept.title}</strong>
                    <p className="mt-2 text-sm leading-6 text-[#102A43]/62">{concept.summary}</p>
                  </div>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
                </div>
              </Link>
            ) : null)}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Proceso o práctica relacionada</p>
          {processList.length ? (
            <div className="mt-5 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">
              {processList.map((process) => process ? (
                <Link key={process.id} href={`/proceso/${process.id}`} className="group block py-5 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <strong className="font-serif text-2xl">{process.title}</strong>
                      <p className="mt-2 text-sm leading-6 text-[#102A43]/62">{process.summary}</p>
                    </div>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
                  </div>
                </Link>
              ) : null)}
            </div>
          ) : (
            <p className="mt-5 max-w-[48ch] border-t border-[#102A43]/12 pt-5 text-sm leading-6 text-[#102A43]/58">
              Este capítulo es conceptual. Si más adelante existe un proceso relacionado, aparecerá aquí sin romper el orden de la serie.
            </p>
          )}
        </div>
      </div>
    </KnowledgeShell>
  );
}
