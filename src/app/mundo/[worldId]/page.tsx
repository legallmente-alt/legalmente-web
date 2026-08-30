import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeShell } from "@/components/knowledge/KnowledgeShell";
import { getSeries, getWorld, worlds } from "@/lib/knowledge-graph/content";

export function generateStaticParams() {
  return worlds.map((world) => ({ worldId: world.id }));
}

export default async function WorldPage({ params }: { params: Promise<{ worldId: string }> }) {
  const { worldId } = await params;
  const world = getWorld(worldId);
  if (!world) notFound();

  const worldSeries = world.seriesIds.map(getSeries).filter(Boolean);
  const related = world.relatedWorldIds
    .map(getWorld)
    .filter(Boolean)
    .map((item) => ({ href: `/mundo/${item!.id}`, label: item!.title, note: item!.summary }));

  return (
    <KnowledgeShell
      eyebrow="Mundo de aprendizaje"
      title={world.title}
      summary={world.summary}
      crumbs={[{ href: "/explorar", label: "Explorar" }, { href: `/mundo/${world.id}`, label: world.title }]}
      related={related}
    >
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Cómo entrar</p>
          <p className="mt-4 max-w-[42ch] text-base leading-7 text-[#102A43]/68">
            Este mundo no es una carpeta cerrada. Sus series conectan conceptos, situaciones, procesos, evidencia, historia y territorios cuando realmente aportan contexto.
          </p>
        </div>

        <div className="divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">
          {worldSeries.map((item, index) => item ? (
            <Link key={item.id} href={`/serie/${item.id}`} className="group grid gap-3 py-6 focus:outline-none focus:ring-2 focus:ring-[#102A43] md:grid-cols-[44px_1fr_auto] md:items-center">
              <span className="text-xs tabular-nums text-[#102A43]/35">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong className="block font-serif text-2xl">{item.title}</strong>
                <span className="mt-2 block text-sm leading-6 text-[#102A43]/60">{item.summary}</span>
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
            </Link>
          ) : null)}
        </div>
      </div>
    </KnowledgeShell>
  );
}
