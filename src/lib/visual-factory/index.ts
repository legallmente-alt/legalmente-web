export type VisualProductionState =
  | "DRAFT"
  | "IMAGE_READY"
  | "STATIC_PUBLICATION_CANDIDATE"
  | "READY_FOR_HUMAN_VISUAL_REVIEW"
  | "REWORK_REQUIRED"
  | "REGENERATE_REQUIRED"
  | "PUBLICATION_NOT_AUTHORIZED"
  | "PUBLISHED";

export type VisualRoute =
  | "FULL_COMPOSITE_GENERATION"
  | "BASE_ART"
  | "PROGRAMMATIC_TEXT_COMPOSITION"
  | "EDIT_INPAINT"
  | "UPSCALE"
  | "LOCAL_FIX"
  | "REGENERATE"
  | "COPY_BLOCK";

export type VisualProductionUnit = {
  CONTENT_ID: string;
  SERIES: string;
  TOPIC: string;
  SOURCE_REFS: readonly string[];
  CLAIM_REFS: readonly string[];
  TERRITORY: string;
  LEGAL_STATE: "APROBADO" | "APTO_PARA_NARRATIVA" | "PENDIENTE" | "HOLD_SOURCE";
  COPY_EXACT: string;
  CHANNEL: "SOCIAL" | "WEB" | "VIDEO";
  FORMAT: string;
  WIDTH: number;
  HEIGHT: number;
  ART_DIRECTION: string;
  VISUAL_METAPHOR: string;
  SCENE: string;
  CAMERA: string;
  LIGHT: string;
  PALETTE: readonly string[];
  BRAND_OBJECT: string;
  TEXT_ZONE: string;
  SAFE_AREA: string;
  GENERATION_PROMPT: string;
  NEGATIVE_PROMPT: string;
  GENERATOR: string;
  MODEL: string;
  GENERATION_DATE: string;
  BASE_ASSET?: string;
  COMPOSED_ASSET?: string;
  QA_RESULTS?: VisualQaResult;
  REGEN_COUNT: number;
  STATE: VisualProductionState;
  DRIVE_ID?: string;
  HASH?: string;
  PROVENANCE: {
    promptVersion: string;
    referenceAssets: readonly string[];
    copySource: string;
    createdBy: string;
  };
};

export type VisualQaResult = {
  scores: Record<string, number>;
  hardGates: Record<string, "PASS" | "FAIL" | "NOT_CHECKED">;
  visualArtQa: "PASS" | "FAIL" | "NOT_CHECKED";
  editorialCompositionQa: "PASS" | "FAIL" | "NOT_CHECKED";
  mobilePreviews: readonly number[];
  classification: "A_HERO" | "B_STATIC" | "C_REWORK" | "UNCLASSIFIED_PENDING_IMAGE_QA";
  nextAction: "KEEP" | "LOCAL_FIX" | "REGENERATE" | "COPY_BLOCK" | "HUMAN_REVIEW";
};

export type ImageGeneratorAdapter = {
  name: string;
  model: string;
  capabilities: {
    text: boolean;
    referenceImage: boolean;
    inpainting: boolean;
    upscale: boolean;
    variation: boolean;
  };
  generate(input: { prompt: string; width: number; height: number; referenceAssets?: readonly string[] }): Promise<{ asset: string; provenance: Record<string, string> }>;
  edit?(input: { asset: string; prompt: string }): Promise<{ asset: string; provenance: Record<string, string> }>;
  upscale?(input: { asset: string }): Promise<{ asset: string; provenance: Record<string, string> }>;
};

const requiredScoreKeys = [
  "CONCEPT_FIT", "METAPHOR_CAUSALITY", "ART_DIRECTION", "ORIGINALITY", "COMPOSITION",
  "LIGHTING", "COLOR_BALANCE", "MOBILE_READABILITY", "TEXT_HIERARCHY", "TYPOGRAPHY",
  "TEXT_DENSITY", "SAFE_AREA", "BRAND_INTEGRATION", "PSEUDOTEXT_ZERO", "LEGAL_COPY_EXACT",
  "TERRITORY_VISIBLE_WHEN_REQUIRED", "ANIMATION_POTENTIAL",
] as const;

const hardGateKeys = [
  "NO_SEPIA_GENERIC", "NO_MURKY_DARK", "NO_CANVA_SCHOOL_SLIDE", "NO_COLLAGE", "NO_GRID",
  "NO_GENERIC_LEGAL_CLICHE", "NO_FLOATING_LOGO", "NO_REPEATED_COMPOSITION", "NO_TINY_BODY_COPY",
  "NO_TEXT_OVER_KEY_OBJECT", "NO_FAKE_LEGAL_TEXT", "NO_UNREADABLE_MOBILE_COPY",
] as const;

export function createEmptyQa(): VisualQaResult {
  return {
    scores: Object.fromEntries(requiredScoreKeys.map((key) => [key, 0])),
    hardGates: Object.fromEntries(hardGateKeys.map((key) => [key, "NOT_CHECKED"])),
    visualArtQa: "NOT_CHECKED",
    editorialCompositionQa: "NOT_CHECKED",
    mobilePreviews: [360, 390, 430],
    classification: "UNCLASSIFIED_PENDING_IMAGE_QA",
    nextAction: "HUMAN_REVIEW",
  };
}

export function routeGeneration(adapter: ImageGeneratorAdapter, unit: VisualProductionUnit): VisualRoute {
  if (unit.LEGAL_STATE !== "APROBADO" && unit.LEGAL_STATE !== "APTO_PARA_NARRATIVA") return "COPY_BLOCK";
  if (adapter.capabilities.text) return "FULL_COMPOSITE_GENERATION";
  return "PROGRAMMATIC_TEXT_COMPOSITION";
}

export function evaluateQa(unit: VisualProductionUnit, qa: VisualQaResult): VisualProductionUnit {
  const hardGateFailed = Object.values(qa.hardGates).includes("FAIL");
  const scoreValues = Object.values(qa.scores);
  const scoresReady = scoreValues.length === requiredScoreKeys.length && scoreValues.every((score) => score >= 0 && score <= 5);
  const artPass = qa.visualArtQa === "PASS" && qa.editorialCompositionQa === "PASS";
  const mobilePass = (qa.scores.MOBILE_READABILITY ?? 0) >= 4;
  const copyPass = (qa.scores.LEGAL_COPY_EXACT ?? 0) >= 4 && (qa.scores.PSEUDOTEXT_ZERO ?? 0) >= 4;

  let nextAction: VisualQaResult["nextAction"] = "HUMAN_REVIEW";
  let state: VisualProductionState = "READY_FOR_HUMAN_VISUAL_REVIEW";
  let classification: VisualQaResult["classification"] = "B_STATIC";

  if (!scoresReady || hardGateFailed || !artPass || !mobilePass || !copyPass) {
    nextAction = copyPass ? "LOCAL_FIX" : "COPY_BLOCK";
    state = "REWORK_REQUIRED";
    classification = "C_REWORK";
  } else if ((qa.scores.ANIMATION_POTENTIAL ?? 0) >= 4 && (qa.scores.ORIGINALITY ?? 0) >= 4) {
    classification = "A_HERO";
  }

  return {
    ...unit,
    QA_RESULTS: { ...qa, nextAction, classification },
    STATE: state,
  };
}

export function assertPublishBlocked(unit: VisualProductionUnit): void {
  if (unit.STATE !== "PUBLICATION_NOT_AUTHORIZED") {
    throw new Error("PUBLICATION_GATE_CLOSED: visual production never authorizes publication");
  }
}

export function selectAsset<T extends Pick<VisualProductionUnit, "CONTENT_ID" | "CHANNEL" | "FORMAT" | "STATE">>(
  assets: readonly T[],
  query: Partial<Pick<T, "CONTENT_ID" | "CHANNEL" | "FORMAT" | "STATE">>,
): T | null {
  return assets.find((asset) => Object.entries(query).every(([key, value]) => asset[key as keyof T] === value)) ?? null;
}

export { requiredScoreKeys, hardGateKeys };
