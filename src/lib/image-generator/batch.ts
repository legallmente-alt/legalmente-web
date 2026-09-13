import type { ImageGenerationBrief } from "./types";
import { validateImageBrief } from "./validation";

const norm = (v: string): string => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const distinct = (v: readonly string[]): number => new Set(v.map(norm)).size;
const maxUse = (v: readonly string[]): number => Math.max(0, ...Object.values(v.map(norm).reduce<Record<string, number>>((a, x) => ({ ...a, [x]: (a[x] ?? 0) + 1 }), {})));

export function imageVisualFingerprint(b: ImageGenerationBrief): string {
  return [b.argument.visualFunction, b.argument.sceneStrategy, b.argument.imageArgument, b.artDirection, b.composition, b.camera, b.lighting, b.material, b.brandSurface].map(norm).join("|");
}

export function validateImageBatch(briefs: readonly ImageGenerationBrief[], expectedSize = 10): string[] {
  const errors = briefs.flatMap(validateImageBrief);
  if (briefs.length !== expectedSize) errors.push(`Expected ${expectedSize} image briefs; received ${briefs.length}.`);
  if (new Set(briefs.map((b) => b.contentId)).size !== briefs.length) errors.push("Image briefs require unique contentId values.");
  const general = briefs.every((b) => b.mode === "LEGALMENTE_GENERAL");
  if (general && distinct(briefs.map((b) => b.matter)) < Math.min(8, expectedSize)) errors.push("General batch lacks matter diversity.");
  if (distinct(briefs.map((b) => b.editorialFamily)) < Math.min(general ? 8 : 5, expectedSize)) errors.push("Batch lacks editorial-family diversity.");
  if (distinct(briefs.map((b) => b.emotion)) < Math.min(general ? 6 : 4, expectedSize)) errors.push("Batch lacks emotional rotation.");
  if (distinct(briefs.map((b) => b.artDirection)) < Math.min(general ? 7 : 4, expectedSize)) errors.push("Batch lacks art-direction diversity.");
  if (distinct(briefs.map((b) => b.argument.sceneStrategy)) < Math.min(general ? 6 : 4, expectedSize)) errors.push("Batch lacks scene-strategy diversity.");
  if (distinct(briefs.map((b) => b.composition)) < Math.min(general ? 7 : 4, expectedSize)) errors.push("Batch lacks composition diversity.");
  if (general && maxUse(briefs.map((b) => b.matter)) > 2) errors.push("General batch allows at most two pieces per matter.");
  if (general && briefs.filter((b) => b.isDigitalDataAi).length > 1) errors.push("General batch allows at most one digital/data/AI piece.");
  if (maxUse(briefs.map((b) => b.editorialFamily)) > 2) errors.push("One editorial family dominates the batch.");
  if (maxUse(briefs.map((b) => b.artDirection)) > 2) errors.push("One art direction dominates the batch.");
  if (maxUse(briefs.map((b) => b.composition)) > 2) errors.push("One composition dominates the batch.");
  if (new Set(briefs.map(imageVisualFingerprint)).size !== briefs.length) errors.push("Batch contains duplicate visual solutions.");
  return errors;
}
