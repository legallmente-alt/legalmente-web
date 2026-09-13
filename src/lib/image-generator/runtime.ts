import { executeVisualBatch } from "@/lib/production-runtime";
import type { ProductionBatchPolicy, ProductionHistoryItem, ProductionPiece } from "@/lib/production-policy";
import type { ImageGeneratorAdapter, VisualProductionUnit } from "@/lib/visual-factory";
import type { VisualArgumentPlan } from "@/lib/visual-argument";
import { compileBaseArtPrompt } from "./prompt";
import { compileNegativePrompt } from "./negative";
import { validateImageBatch } from "./batch";
import type { ImageGenerationBrief } from "./types";

export async function executeImageBatch(input: {
  pieces: readonly ProductionPiece[];
  units: readonly VisualProductionUnit[];
  visualArguments: readonly VisualArgumentPlan[];
  imageBriefs: readonly ImageGenerationBrief[];
  history?: readonly ProductionHistoryItem[];
  policy: ProductionBatchPolicy;
  adapter: ImageGeneratorAdapter;
}) {
  const errors = validateImageBatch(input.imageBriefs, input.pieces.length);
  for (const piece of input.pieces) {
    if (input.imageBriefs.filter((b) => b.contentId === piece.id).length !== 1) errors.push(`${piece.id}: requires exactly one image brief.`);
  }
  if (errors.length) return { status: "IMAGE_BRIEF_BLOCKED" as const, errors, receipts: [] as const, publicationAuthorized: false as const };

  const units = input.units.map((unit) => {
    const brief = input.imageBriefs.find((b) => b.contentId === unit.CONTENT_ID)!;
    const negative = compileNegativePrompt(brief);
    return {
      ...unit,
      GENERATION_PROMPT: `${compileBaseArtPrompt(brief)} Avoid: ${negative}.`,
      NEGATIVE_PROMPT: negative,
      PROVENANCE: { ...unit.PROVENANCE, promptVersion: "image-generator-v2-2026-09-13" },
    };
  });

  return executeVisualBatch({ ...input, units });
}
