import { chapters, concepts, processes, series, worlds, type Chapter, type Concept, type Process, type Series, type World } from "./content";
import { foundationalNodes, learningRoutes } from "./model";

export type KnowledgeGraphCollections = {
  readonly worlds: readonly World[];
  readonly series: readonly Series[];
  readonly chapters: readonly Chapter[];
  readonly concepts: readonly Concept[];
  readonly processes: readonly Process[];
};

export type KnowledgeGraphIssue = {
  readonly path: string;
  readonly message: string;
};

export type KnowledgeGraphValidation =
  | { readonly ok: true; readonly issues: readonly [] }
  | { readonly ok: false; readonly issues: readonly KnowledgeGraphIssue[] };

const issue = (path: string, message: string): KnowledgeGraphIssue => ({ path, message });

function indexById<T extends { id: string }>(items: readonly T[], collection: string, issues: KnowledgeGraphIssue[]) {
  const index = new Map<string, T>();
  items.forEach((item, position) => {
    if (index.has(item.id)) issues.push(issue(`${collection}[${position}].id`, `duplicate ${collection} id: ${item.id}`));
    index.set(item.id, item);
  });
  return index;
}

function requireId(index: ReadonlyMap<string, unknown>, path: string, id: string, label: string, issues: KnowledgeGraphIssue[]) {
  if (!index.has(id)) issues.push(issue(path, `${label} does not resolve: ${id}`));
}

export function validateKnowledgeGraph(collections: KnowledgeGraphCollections): KnowledgeGraphValidation {
  const issues: KnowledgeGraphIssue[] = [];
  const worldById = indexById(collections.worlds, "worlds", issues);
  const seriesById = indexById(collections.series, "series", issues);
  const chapterById = indexById(collections.chapters, "chapters", issues);
  const conceptById = indexById(collections.concepts, "concepts", issues);
  const processById = indexById(collections.processes, "processes", issues);
  const nodeById = new Map(foundationalNodes.map((node) => [node.id, node]));
  const routeIds = new Set<string>();

  collections.worlds.forEach((world, position) => {
    world.seriesIds.forEach((seriesId, relationPosition) => {
      const series = seriesById.get(seriesId);
      requireId(seriesById, `worlds[${position}].seriesIds[${relationPosition}]`, seriesId, "series", issues);
      if (series && series.worldId !== world.id) issues.push(issue(`worlds[${position}].seriesIds[${relationPosition}]`, `series ${seriesId} belongs to ${series.worldId}, not ${world.id}`));
    });
    world.relatedWorldIds.forEach((relatedWorldId, relationPosition) => {
      requireId(worldById, `worlds[${position}].relatedWorldIds[${relationPosition}]`, relatedWorldId, "related world", issues);
    });
  });

  collections.series.forEach((series, position) => {
    requireId(worldById, `series[${position}].worldId`, series.worldId, "world", issues);
    series.chapterIds.forEach((chapterId, relationPosition) => {
      const chapter = chapterById.get(chapterId);
      requireId(chapterById, `series[${position}].chapterIds[${relationPosition}]`, chapterId, "chapter", issues);
      if (chapter && chapter.seriesId !== series.id) issues.push(issue(`series[${position}].chapterIds[${relationPosition}]`, `chapter ${chapterId} belongs to ${chapter.seriesId}, not ${series.id}`));
    });
  });

  collections.chapters.forEach((chapter, position) => {
    const parent = seriesById.get(chapter.seriesId);
    requireId(seriesById, `chapters[${position}].seriesId`, chapter.seriesId, "series", issues);
    if (parent && !parent.chapterIds.includes(chapter.id)) issues.push(issue(`chapters[${position}].id`, `chapter ${chapter.id} is not listed by its parent series ${chapter.seriesId}`));
    chapter.conceptIds.forEach((conceptId, relationPosition) => requireId(conceptById, `chapters[${position}].conceptIds[${relationPosition}]`, conceptId, "concept", issues));
    chapter.processIds.forEach((processId, relationPosition) => requireId(processById, `chapters[${position}].processIds[${relationPosition}]`, processId, "process", issues));
  });

  collections.concepts.forEach((concept, position) => {
    concept.appearsIn.forEach((worldId, relationPosition) => requireId(worldById, `concepts[${position}].appearsIn[${relationPosition}]`, worldId, "concept world", issues));
    concept.relatedConceptIds.forEach((relatedConceptId, relationPosition) => requireId(conceptById, `concepts[${position}].relatedConceptIds[${relationPosition}]`, relatedConceptId, "related concept", issues));
    concept.processIds.forEach((processId, relationPosition) => requireId(processById, `concepts[${position}].processIds[${relationPosition}]`, processId, "concept process", issues));
  });

  collections.processes.forEach((process, position) => {
    process.relatedConceptIds.forEach((conceptId, relationPosition) => requireId(conceptById, `processes[${position}].relatedConceptIds[${relationPosition}]`, conceptId, "process concept", issues));
  });

  learningRoutes.forEach((route, position) => {
    if (routeIds.has(route.id)) issues.push(issue(`learningRoutes[${position}].id`, `duplicate learning route id: ${route.id}`));
    routeIds.add(route.id);
    route.entryNodeIds.forEach((nodeId, relationPosition) => requireId(nodeById, `learningRoutes[${position}].entryNodeIds[${relationPosition}]`, nodeId, "entry node", issues));
  });

  return issues.length === 0 ? { ok: true, issues: [] } : { ok: false, issues };
}

export const currentKnowledgeGraphValidation = validateKnowledgeGraph({ worlds, series, chapters, concepts, processes });
if (!currentKnowledgeGraphValidation.ok) {
  throw new Error(`Knowledge graph integrity failed: ${currentKnowledgeGraphValidation.issues.map(({ path, message }) => `${path}: ${message}`).join("; ")}`);
}
