export const productionStages = ["RESEARCH", "SOURCE_REVIEW", "HUMAN_CLAIM_REVIEW", "READY_FOR_COPY", "COPY_PRODUCTION", "READY_FOR_VISUAL", "VISUAL_PRODUCTION", "VISUAL_QA", "CHANNEL_ADAPTATION", "COMPOSITION_QA", "PUBLICATION_DECISION", "PUBLISHED", "MEASUREMENT", "REUSE"] as const;
export type ProductionStage = typeof productionStages[number];
export type SpecializedState = "HUMAN_REVIEW_REQUIRED" | "READY_FOR_COPY_INTERNAL" | "PRODUCT_REVIEW_REQUIRED" | "VISUAL_QA_PASS" | "NOT_PUBLIC" | "PUBLISHED";
export type Channel = "MASTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN_LEGALMENTE" | "LINKEDIN_FOUNDER" | "WEB" | "VISUAL" | "QA";
export type DerivativeRecord = { id: string; contentId: string; parentId: string; channel: Channel; format?: "4:5" | "9:16" | "2:3" | "TEXT"; width?: number; height?: number; territory: string; claimRefs: readonly string[]; assetProvenance?: string; state: SpecializedState };
export type ContentProductionUnit = { contentId: string; masterTitle: string; stage: ProductionStage; specializedStates: readonly SpecializedState[]; claimRefs: readonly string[]; territory: string; derivatives: readonly DerivativeRecord[] };
export type AssetManifestRecord = { assetId: string; contentId: string; channel: "INSTAGRAM" | "FACEBOOK" | "LINKEDIN_LEGALMENTE" | "LINKEDIN_FOUNDER" | "VISUAL"; format: "4:5" | "9:16" | "2:3"; width: number; height: number; masterPrompt: string; provider: string; model: string; date: string; driveId?: string; hash?: string; altText: string; qa: "PASS" | "REVIEW_REQUIRED"; provenance: string; state: SpecializedState };

export const channelFormats = { INSTAGRAM: { format: "4:5", width: 1080, height: 1350 }, FACEBOOK: { format: "9:16", width: 1080, height: 1920 }, LINKEDIN_LEGALMENTE: { format: "4:5", width: 1080, height: 1350 }, LINKEDIN_FOUNDER: { format: "4:5", width: 1080, height: 1350 } } as const;

export function validateProductionUnit(unit: ContentProductionUnit): string[] {
  const errors: string[] = [];
  if (!unit.contentId || !unit.masterTitle || !unit.territory) errors.push("master, contentId y territorio son obligatorios");
  const ids = new Set<string>();
  for (const derivative of unit.derivatives) {
    if (ids.has(derivative.id)) errors.push(`derivado duplicado: ${derivative.id}`);
    ids.add(derivative.id);
    if (derivative.contentId !== unit.contentId || derivative.parentId !== unit.contentId) errors.push(`derivado sin parent canónico: ${derivative.id}`);
    if (!derivative.claimRefs.length) errors.push(`derivado sin claim: ${derivative.id}`);
    if (derivative.channel !== "MASTER" && !derivative.territory) errors.push(`copy sin territorio: ${derivative.id}`);
    if (["INSTAGRAM", "FACEBOOK", "LINKEDIN_LEGALMENTE", "LINKEDIN_FOUNDER"].includes(derivative.channel)) {
      const expected = channelFormats[derivative.channel as keyof typeof channelFormats];
      if (derivative.format !== expected.format || derivative.width !== expected.width || derivative.height !== expected.height) errors.push(`formato incorrecto: ${derivative.id}`);
    }
    if (["VISUAL", "INSTAGRAM", "FACEBOOK", "LINKEDIN_LEGALMENTE", "LINKEDIN_FOUNDER"].includes(derivative.channel) && !derivative.assetProvenance) errors.push(`asset sin provenance: ${derivative.id}`);
  }
  return errors;
}
