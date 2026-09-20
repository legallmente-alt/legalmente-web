import { worlds, series, chapters, concepts, processes } from "./content";

export const catalogKinds = { mundo: "Mundo", serie: "Serie", capitulo: "Capítulo", concepto: "Concepto", proceso: "Proceso" } as const;
export type CatalogKind = keyof typeof catalogKinds;
export type CatalogEntry = { href: string; kind: CatalogKind; title: string; summary: string; worldIds: string[] };
const chapterWorld = (seriesId: string) => series.find(item => item.id === seriesId)?.worldId;

// Only the educational route content is indexed. Editorial operations and drafts
// are deliberately outside this public catalog.
export const catalogEntries: CatalogEntry[] = [
  ...worlds.map(item => ({ ...item, kind: "mundo" as const, worldIds: [item.id] })),
  ...series.map(item => ({ ...item, kind: "serie" as const, worldIds: [item.worldId] })),
  ...chapters.map(item => ({ ...item, kind: "capitulo" as const, worldIds: [chapterWorld(item.seriesId)!] })),
  ...concepts.map(item => ({ ...item, kind: "concepto" as const, worldIds: [...item.appearsIn] })),
  ...processes.map(item => ({ ...item, kind: "proceso" as const, worldIds: [...new Set([
    ...chapters.filter(chapter => chapter.processIds.includes(item.id)).map(chapter => chapterWorld(chapter.seriesId)!),
    ...concepts.filter(concept => concept.processIds.includes(item.id)).flatMap(concept => [...concept.appearsIn]),
  ])] })),
].map(({ id, kind, title, summary, worldIds }) => ({ href: `/${kind}/${id}`, kind, title, summary, worldIds }));

export function normalizeSearch(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("es").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function filterCatalog(entries: readonly CatalogEntry[], query = "", kind = "", worldId = ""): CatalogEntry[] {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return entries.filter(entry => {
    if (kind && entry.kind !== kind) return false;
    if (worldId && !entry.worldIds.includes(worldId)) return false;
    const searchable = normalizeSearch(`${entry.title} ${entry.summary}`);
    return terms.every(term => searchable.includes(term));
  });
}
