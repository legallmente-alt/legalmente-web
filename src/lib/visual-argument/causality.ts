/** Structured preflight evidence, never a substitute for inspecting rendered pixels. */
export type CausalScene = {
  concept: string;
  legalRelation: string;
  scene: string;
  visibleMechanism: string;
  comprehensionWithoutText: string;
  elements: readonly {
    id: string;
    kind: "HUMAN" | "DOCUMENT" | "OBJECT" | "SPACE" | "EVIDENCE" | "MATERIAL" | "PROCESS";
    physicalIdentity: string;
    legalFunction: string;
    observableAction: string;
    necessary: boolean;
  }[];
  relations: readonly { from: string; to: string; action: string }[];
  anchorElementIds: readonly string[];
  counterfactuals: readonly { otherConcept: string; reusableByChangingTextOnly: boolean; reason: string }[];
  review: {
    sceneSpecific: boolean;
    explainsLearning: boolean;
    legalAnchorsVisible: boolean;
    commercial: boolean;
    genericCastFiller: boolean;
    decorativeDocuments: boolean;
    subjectModeCoherent: boolean;
    reviewedBy: string;
  };
};

const norm = (v: string) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const present = (v: unknown): v is string => typeof v === "string" && norm(v).length > 0;

/** Physical graph excludes concept, style, palette, camera, gender and free-form scene labels. */
export function representationFingerprint(scene: CausalScene): string {
  const identity = new Map(scene.elements.map(e => [e.id, `${e.kind}:${norm(e.physicalIdentity)}`]));
  return JSON.stringify([
    [...identity.values()].sort(),
    scene.relations.map(r => `${identity.get(r.from)}>${norm(r.action)}>${identity.get(r.to)}`).sort(),
  ]);
}

export function validateCausalScene(scene: CausalScene | undefined, subjectMode: string): string[] {
  if (!scene) return ["CONCEPT_VISUAL_CAUSALITY: causal scene evidence is required before art selection."];
  const errors: string[] = [];
  for (const key of ["concept", "legalRelation", "scene", "visibleMechanism", "comprehensionWithoutText"] as const) {
    if (!present(scene[key])) errors.push(`CONCEPT_VISUAL_CAUSALITY: ${key} is required.`);
  }
  if (!Array.isArray(scene.elements) || !Array.isArray(scene.relations) || !Array.isArray(scene.anchorElementIds) || !Array.isArray(scene.counterfactuals)) return [...errors, "CONCEPT_VISUAL_CAUSALITY: malformed scene graph."];
  const ids = new Set(scene.elements.map(e => e.id));
  if (ids.size !== scene.elements.length || scene.elements.length < 2) errors.push("SCENE_SPECIFICITY: unique physical elements and a visible relation are required.");
  const kinds = ["HUMAN", "DOCUMENT", "OBJECT", "SPACE", "EVIDENCE", "MATERIAL", "PROCESS"];
  for (const e of scene.elements) {
    if (![e.id, e.physicalIdentity, e.legalFunction, e.observableAction].every(present) || !kinds.includes(e.kind) || e.necessary !== true) errors.push(`NO_DECORATIVE_ELEMENTS: ${e.id} needs a necessary legal function and observable action.`);
    if (!scene.relations.some(r => r.from === e.id || r.to === e.id)) errors.push(`CONCEPT_VISUAL_CAUSALITY: ${e.id} is disconnected decoration.`);
  }
  if (!scene.relations.length || scene.relations.some(r => !ids.has(r.from) || !ids.has(r.to) || r.from === r.to || !present(r.action))) errors.push("CONCEPT_VISUAL_CAUSALITY: physical relations must connect actual elements.");
  if (!scene.anchorElementIds.length || scene.anchorElementIds.some(id => !ids.has(id))) errors.push("LEGAL_ANCHOR_CLARITY: anchors must identify visible scene elements.");
  const humanCount = scene.elements.filter(e => e.kind === "HUMAN").length;
  if ((subjectMode === "HUMAN_INTERACTION" && humanCount < 2) || (subjectMode === "HUMAN_SOLITARY" && humanCount !== 1)) errors.push("SUBJECT_MODE_COHERENT: human mode does not match the scene.");
  const expectedKind: Record<string, string> = { DOCUMENT_OBJECT: "DOCUMENT", LEGAL_OBJECT: "OBJECT", ARCHITECTURE_SPACE: "SPACE", PROCESS_MECHANISM: "PROCESS", FORENSIC_EVIDENCE: "EVIDENCE", MATERIAL_ABSTRACTION: "MATERIAL", ENVIRONMENT_CONTEXT: "SPACE" };
  if (expectedKind[subjectMode] && !scene.elements.some(e => e.kind === expectedKind[subjectMode])) errors.push("SUBJECT_MODE_COHERENT: the selected subject is absent.");
  const review = scene.review;
  if (!review || !present(review.reviewedBy)) errors.push("SCENE_SPECIFICITY: an accountable semantic review is required.");
  if (review) {
    for (const [field, code] of [["sceneSpecific", "SCENE_SPECIFICITY"], ["explainsLearning", "CONCEPT_VISUAL_CAUSALITY"], ["legalAnchorsVisible", "LEGAL_ANCHOR_CLARITY"], ["subjectModeCoherent", "SUBJECT_MODE_COHERENT"]] as const) if (review[field] !== true) errors.push(`${code}: semantic review did not pass.`);
    for (const [field, code] of [["commercial", "NO_COMMERCIAL_ART"], ["genericCastFiller", "NO_GENERIC_CAST_FILLER"], ["decorativeDocuments", "NO_DECORATIVE_DOCUMENTS"]] as const) if (review[field] !== false) errors.push(`${code}: rejected or unchecked.`);
  }
  if (scene.counterfactuals.length < 3 || new Set(scene.counterfactuals.map(c => present(c.otherConcept) ? norm(c.otherConcept) : "")).size < 3) errors.push("INTERCHANGEABILITY_TEST: compare three distinct other concepts.");
  for (const c of scene.counterfactuals) {
    if (!present(c.otherConcept) || norm(c.otherConcept) === norm(scene.concept) || !present(c.reason) || c.reusableByChangingTextOnly !== false) errors.push("INTERCHANGEABILITY_TEST: reusable or unexplained scene; redesign before generation.");
  }
  return errors;
}
