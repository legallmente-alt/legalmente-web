export const BASE_ART_CHARACTER_POLICY = "ZERO_CHARACTERS" as const;

export type PhysicalBrandSurface =
  | "PLAQUE"
  | "SEAL"
  | "BOOK_SPINE"
  | "NOTEBOOK"
  | "FOLDER"
  | "GLASS"
  | "METAL"
  | "WOOD"
  | "STONE"
  | "OTHER_PHYSICAL_SURFACE";

export type EditorialTextRole =
  | "TITLE"
  | "QUESTION"
  | "QUOTE"
  | "AUTHOR"
  | "STEPS"
  | "COMPARISON"
  | "BODY_COPY"
  | "SOURCE_LABEL";

export type EditorialTextLayer = {
  role: EditorialTextRole;
  exactText: string;
  contentPackField: string;
  sourceBound: boolean;
};

export type VisualCompositionPlan = {
  contentId: string;
  baseArt: {
    generatedByVisualProvider: true;
    characterPolicy: typeof BASE_ART_CHARACTER_POLICY;
    containsLetters: false;
    containsNumbers: false;
    containsPseudoText: false;
    reservedBrandSurface: PhysicalBrandSurface;
  };
  deterministicComposition: {
    required: true;
    brandText: "LegalMente";
    brandPhysicallyIntegrated: true;
    arbitraryOverlayForbidden: true;
    watermarkForbidden: true;
    editorialText: readonly EditorialTextLayer[];
  };
  qa: {
    exactTextAgainstApprovedContent: boolean;
    mobileReadable: boolean;
    perspectiveCoherent: boolean;
    materialCoherent: boolean;
    lightCoherent: boolean;
    noCollage: boolean;
    noImproperRepetition: boolean;
    humanReviewRequired: true;
  };
};

export type VisualCompositionDecision = {
  state: "READY_FOR_BASE_ART" | "READY_FOR_COMPOSITION" | "READY_FOR_HUMAN_QA" | "BLOCKED";
  reasons: readonly string[];
};

const hasText = (value: string) => value.trim().length > 0;

export function validateVisualCompositionPlan(plan: VisualCompositionPlan): string[] {
  const errors: string[] = [];

  if (!hasText(plan.contentId)) errors.push("CONTENT_ID_REQUIRED");
  if (plan.baseArt.characterPolicy !== BASE_ART_CHARACTER_POLICY) errors.push("BASE_ART_MUST_USE_ZERO_CHARACTER_POLICY");
  if (plan.baseArt.containsLetters) errors.push("BASE_ART_CONTAINS_LETTERS");
  if (plan.baseArt.containsNumbers) errors.push("BASE_ART_CONTAINS_NUMBERS");
  if (plan.baseArt.containsPseudoText) errors.push("BASE_ART_CONTAINS_PSEUDOTEXT");
  if (!plan.deterministicComposition.required) errors.push("DETERMINISTIC_COMPOSITION_REQUIRED");
  if (plan.deterministicComposition.brandText !== "LegalMente") errors.push("BRAND_TEXT_MUST_BE_EXACT_LEGALMENTE");
  if (!plan.deterministicComposition.brandPhysicallyIntegrated) errors.push("BRAND_MUST_BE_PHYSICALLY_INTEGRATED");
  if (!plan.deterministicComposition.arbitraryOverlayForbidden) errors.push("ARBITRARY_OVERLAY_MUST_BE_FORBIDDEN");
  if (!plan.deterministicComposition.watermarkForbidden) errors.push("WATERMARK_MUST_BE_FORBIDDEN");

  for (const layer of plan.deterministicComposition.editorialText) {
    if (!hasText(layer.exactText)) errors.push(`EDITORIAL_TEXT_REQUIRED:${layer.role}`);
    if (!hasText(layer.contentPackField)) errors.push(`CONTENT_PACK_BINDING_REQUIRED:${layer.role}`);
    if ((layer.role === "QUOTE" || layer.role === "AUTHOR" || layer.role === "SOURCE_LABEL") && !layer.sourceBound) {
      errors.push(`SOURCE_BINDING_REQUIRED:${layer.role}`);
    }
  }

  return errors;
}

/**
 * The image provider only produces character-free base art. Typography belongs
 * to a deterministic composition stage and never changes legal/content authority.
 */
export function resolveVisualCompositionDecision(
  plan: VisualCompositionPlan,
  stage: "BEFORE_BASE_ART" | "AFTER_BASE_ART" | "AFTER_COMPOSITION",
): VisualCompositionDecision {
  const errors = validateVisualCompositionPlan(plan);
  if (errors.length > 0) return { state: "BLOCKED", reasons: errors };

  if (stage === "BEFORE_BASE_ART") return { state: "READY_FOR_BASE_ART", reasons: [] };
  if (stage === "AFTER_BASE_ART") return { state: "READY_FOR_COMPOSITION", reasons: [] };

  const qa = plan.qa;
  const qaFailures = [
    ["TEXT_EXACT_QA", qa.exactTextAgainstApprovedContent],
    ["MOBILE_READABILITY_QA", qa.mobileReadable],
    ["PERSPECTIVE_QA", qa.perspectiveCoherent],
    ["MATERIAL_QA", qa.materialCoherent],
    ["LIGHT_QA", qa.lightCoherent],
    ["NO_COLLAGE_QA", qa.noCollage],
    ["ANTI_REPETITION_QA", qa.noImproperRepetition],
  ] as const;

  const failed = qaFailures.filter(([, pass]) => !pass).map(([name]) => name);
  if (failed.length > 0) return { state: "BLOCKED", reasons: failed };
  return { state: "READY_FOR_HUMAN_QA", reasons: [] };
}
