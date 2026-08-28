import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeShell } from "@/components/knowledge/KnowledgeShell";
import { getChapter, getSeries, getWorld, series } from "@/lib/knowledge-graph/content";

export function generateStaticParams() {
  return series.map((item) => ({ seriesId: item.id }));
}

export default function SeriesPage({ params }: { params: { seriesId: string } }) {
  const item = getSeries(params.seriesId);
  if (!item) notFound();
  const world = getWorld(item.worldId);
  if (!world) notFound();
  const chapterList = item.chapterIds.map(getChapter).filter(Boolean);

  return (
    <KnowledgeShell
      eyebrow={`Serie · ${chapterList.length} capítulos`}
      title={item.title}
      summary={item.summary}
      crumbs={[
        { href: "/explorar", label: "Explorar" },
        { href: `/mundo/${world.id}`, label: world.title },
        { href: `/serie/${item.id}`, label: item.title },
      ]}
      related={world.relatedWorldIds.slice(0, 3).map((id) => {
        const related = getWorld(id);
        return related ? { href: `/mundo/${related.id}`, label: related.title, note: related.summary } : { href: "/explorar", label: "Explorar" };
      })}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Orden de aprendizaje</p>
        <ol className="mt-5 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">
          {chapterList.map((chapter, index) => chapter ? (
            <li key={chapter.id}>
              <Link href={`/capitulo/${chapter.id}`} className="group grid min-h-32 gap-4 py-6 focus:outline-none focus:ring-2 focus:ring-[#102A43] md:grid-cols-[72px_1fr_auto] md:items-center">
                <span className="text-sm tabular-nums text-[#102A43]/40">{String(index + 1).padStart(2, "0")} / {String(chapterList.length).padStart(2, "0")}</span>
                <span>
                  <strong className="block font-serif text-2xl tracking-[-0.02em]">{chapter.title}</strong>
                  <span className="mt-2 block max-w-[62ch] text-sm leading-6 text-[#102A43]/62">{chapter.summary}</span>
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
              </Link>
            </li>
          ) : null)}
        </ol>
      </div>
    </KnowledgeShell>
  );
}
