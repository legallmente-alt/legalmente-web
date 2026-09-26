import { createHash } from "node:crypto";

export const MASTER_MEMORY_ID = "1ISuXre1tVsSPNC3b6Tzjz-eAiOmv1FFr";
export type MemorySnapshot = {
  sourceId: string;
  fetchedAt: string;
  digest: string;
  terms: string[];
  sectionHeadings: string[];
  addenda: string;
  state: "REQUIRES_SEMANTIC_REVIEW";
};
export const normalizeTopic = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Index the whole live document. The embedded JSON is only one historical snapshot. */
export function importMasterMemory(markdown: string, fetchedAt: string, sourceId = MASTER_MEMORY_ID): MemorySnapshot {
  if (sourceId !== MASTER_MEMORY_ID) throw new Error("Use the canonical Drive memory, not a parallel list.");
  if (!Number.isFinite(Date.parse(fetchedAt)) || !markdown.trim()) throw new Error("Memory requires content and a fetch time.");
  const terms = new Set<string>();
  const blocks = [...markdown.matchAll(/```json\s*([\s\S]*?)```/g)];
  // The canonical document also contains an unfenced, top-level JSON snapshot.
  const rawBlocks = [...markdown.matchAll(/^(\{\s*\n[\s\S]*?^\})/gm)]
    .filter((raw) => !blocks.some((block) => raw.index! >= block.index! && raw.index! < block.index! + block[0].length));
  blocks.push(...rawBlocks);
  blocks.sort((a, b) => a.index! - b.index!);
  for (const block of blocks) {
    let parsed;
    try { parsed = JSON.parse(block[1]); } catch { throw new Error("Malformed memory JSON: refresh or repair the source before production."); }
    for (const entry of parsed.entries ?? []) {
      if (typeof entry.title === "string") terms.add(entry.title);
      for (const alias of entry.aliases ?? []) if (typeof alias === "string") terms.add(alias);
    }
  }
  let topicColumns: number[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.trim().startsWith("|")) { topicColumns = []; continue; }
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    const header = cells.flatMap((cell, index) => /(?:tema|concepto|materia.*normalizad)/i.test(cell) && !/fuente|estado|imagen/i.test(cell) ? [index] : []);
    if (header.length && cells.some((cell) => /^(ID|Canal|Materia|Tema|Concepto)/i.test(cell))) { topicColumns = header; continue; }
    if (cells.every((cell) => /^[-:\s]*$/.test(cell))) continue;
    for (const column of topicColumns) if (cells[column]) terms.add(cells[column]);
  }
  if (!terms.size) throw new Error("No memory entries found; refusing an empty anti-repetition index.");
  const lastBlock = blocks.at(-1);
  const offset = lastBlock ? (lastBlock.index ?? 0) + lastBlock[0].length : 0;
  return { sourceId, fetchedAt, digest: createHash("sha256").update(markdown).digest("hex"), terms: [...terms], sectionHeadings: markdown.split(/\r?\n/).filter((line) => /^#{1,4} /.test(line)), addenda: markdown.slice(offset), state: "REQUIRES_SEMANTIC_REVIEW" };
}

export function memoryMatches(snapshot: MemorySnapshot, topic: string): string[] {
  const query = normalizeTopic(topic);
  if (!query) return [];
  return snapshot.terms.filter((term) => {
    const normalized = normalizeTopic(term);
    return normalized === query || (` ${normalized} `).includes(` ${query} `);
  });
}

export function memoryReviewErrors(snapshot: MemorySnapshot, review: { digest: string; reviewedBy: string; reviewedAt: string; comparedTopics: readonly string[]; decision: "CLEAR" | "REWORK" }, topics: readonly string[], now: string): string[] {
  const errors: string[] = [];
  const current = Date.parse(now), fetched = Date.parse(snapshot.fetchedAt), reviewed = Date.parse(review.reviewedAt);
  if (![current, fetched, reviewed].every(Number.isFinite) || fetched > current || current - fetched > 86400000) errors.push("Memory snapshot is missing, future-dated or older than 24 hours; fetch Drive again.");
  if (review.digest !== snapshot.digest || !review.reviewedBy.trim() || reviewed < fetched || reviewed > current) errors.push("Semantic memory review must bind the current complete document digest and follow its fetch.");
  if (review.decision !== "CLEAR") errors.push("Semantic review requires rework.");
  for (const topic of topics) {
    if (!review.comparedTopics.some((item) => normalizeTopic(item) === normalizeTopic(topic))) errors.push(`${topic}: missing semantic novelty review.`);
    if (memoryMatches(snapshot, topic).length) errors.push(`${topic}: matches a registered topic; select a different topic or resolve its status in the canonical memory.`);
  }
  return errors;
}
