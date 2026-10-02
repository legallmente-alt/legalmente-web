import { causalFixture } from "../visual-argument/test-fixtures";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  assertPublishBlocked,
  createEmptyQa,
  evaluateQa,
  normalizeQaResult,
  routeGeneration,
  selectAsset,
  type ImageGeneratorAdapter,
  type VisualProductionUnit,
  type VisualQaResult,
} from "./index";

const unit: VisualProductionUnit = {
  VISUAL_ARGUMENT: {
    contentId: "LM-PC-B1-01", legalBindingId: "claim", audience: "general", realQuestion: "pregunta", conflict: "conflicto", consequence: "consecuencia", learningGoal: "aprendizaje", visualFunction: "REVEAL", sceneStrategy: "DOCUMENT_EVIDENCE", imageArgument: "el sello roto revela acceso", dominantVisualLogic: "revelación material", expectedPerception: "apertura altera el cierre", subjectMode: "LEGAL_OBJECT", sceneSignature: "recipiente sellado", legalAnchorKeys: ["sello"], causalScene: causalFixture(),
  },
  CONTENT_ID: "LM-PC-B1-01",
  SERIES: "Bloque 1",
  TOPIC: "10 cosas que tu jefe no puede exigirte",
  SOURCE_REFS: ["drive://block1.txt#01"],
  CLAIM_REFS: ["drive://block1.txt#01"],
  TERRITORY: "Capa B panhispánica; plazos y montos varían por país",
  LEGAL_STATE: "APROBADO",
  COPY_EXACT: "copy aprobado",
  CHANNEL: "SOCIAL",
  FORMAT: "9:16",
  WIDTH: 1080,
  HEIGHT: 1920,
  ART_DIRECTION: "Fotografía documental de calle",
  VISUAL_METAPHOR: "cinta métrica que se detiene",
  SCENE: "taller mecánico",
  CAMERA: "plano medio",
  LIGHT: "luz natural única",
  PALETTE: ["#2B1B17", "#FCFAF2", "#0F2537", "#C5A059"],
  BRAND_OBJECT: "chapa integrada",
  TEXT_ZONE: "mitad inferior",
  SAFE_AREA: "x 80-1000; y 290-1630",
  GENERATION_PROMPT: "prompt",
  NEGATIVE_PROMPT: "collage, grid, watermark",
  GENERATOR: "test",
  MODEL: "test-model",
  GENERATION_DATE: "2026-08-30",
  REGEN_COUNT: 0,
  STATE: "IMAGE_READY",
  HASH: "a".repeat(64),
  COMPOSED_ASSET: "verified.png",
  PROVENANCE: { promptVersion: "v1", referenceAssets: [], copySource: "Drive", createdBy: "test" },
};

const adapter: ImageGeneratorAdapter = {
  name: "test",
  model: "test-model",
  capabilities: { text: false, referenceImage: true, inpainting: true, upscale: true, variation: true },
  async generate() { return { asset: "asset", provenance: {} }; },
};

function passingQa(): VisualQaResult {
  const qa = createEmptyQa();
  qa.mobilePreviews = [335, 270];
  qa.evidence = { asset: "verified.png", sha256: "a".repeat(64), width: 1080, height: 1920, observedRelation: "sello une tapa y recipiente", observedLegalAnchors: ["sello íntegro"], comprehensionWithoutText: "la apertura altera el sello", counterfactuals: causalFixture().counterfactuals, reviewedBy: "test reviewer", reviewedAt: "2026-09-26T12:00:00Z", observedCopy: unit.COPY_EXACT, textAlignment: "CENTER", essentialBoxes: {
    matter: { x: 140, y: 380, width: 800, height: 50 }, concept: { x: 140, y: 460, width: 800, height: 100 }, answer: { x: 140, y: 620, width: 800, height: 180 }, brand: { x: 380, y: 1350, width: 300, height: 60 }, focus: { x: 200, y: 850, width: 600, height: 450 },
  } };
  qa.scores = Object.fromEntries(Object.keys(qa.scores).map((key) => [key, 4]));
  qa.scores.LEGAL_COPY_EXACT = 5;
  qa.scores.PSEUDOTEXT_ZERO = 5;
  qa.hardGates = Object.fromEntries(Object.keys(qa.hardGates).map((key) => [key, "PASS"]));
  qa.visualArtQa = "PASS";
  qa.editorialCompositionQa = "PASS";
  qa.classification = "B_STATIC";
  qa.nextAction = "HUMAN_REVIEW";
  return qa;
}

describe("VisualProductionUnit", () => {
  it("routes clean-copy providers to full composite and fallback providers to programmatic text", () => {
    assert.equal(routeGeneration({ ...adapter, capabilities: { ...adapter.capabilities, text: false } }, unit), "PROGRAMMATIC_TEXT_COMPOSITION");
    assert.equal(routeGeneration({ ...adapter, capabilities: { ...adapter.capabilities, text: true } }, unit), "FULL_COMPOSITE_GENERATION");
  });

  it("blocks content that is not approved", () => {
    assert.equal(routeGeneration(adapter, { ...unit, LEGAL_STATE: "HOLD_SOURCE" }), "COPY_BLOCK");
  });

  it("fails closed for publication", () => {
    assert.throws(() => assertPublishBlocked(unit), /PUBLICATION_GATE_CLOSED/);
  });

  it("keeps a failed QA result out of publication candidates", () => {
    const qa = createEmptyQa();
    const evaluated = evaluateQa(unit, qa);
    assert.equal(evaluated.STATE, "REWORK_REQUIRED");
    assert.equal(evaluated.QA_RESULTS?.classification, "C_REWORK");
  });

  it("normalizes a self-reported B_STATIC artifact to C_REWORK when a hard gate fails", () => {
    const qa = passingQa();
    qa.hardGates.NO_MURKY_DARK = "FAIL";
    const normalized = normalizeQaResult(qa);
    const evaluated = evaluateQa(unit, qa);
    assert.equal(normalized.classification, "C_REWORK");
    assert.equal(normalized.nextAction, "LOCAL_FIX");
    assert.equal(evaluated.STATE, "REWORK_REQUIRED");
  });

  it("fails closed while any hard gate remains NOT_CHECKED", () => {
    const qa = passingQa();
    qa.hardGates.NO_UNREADABLE_MOBILE_COPY = "NOT_CHECKED";
    const evaluated = evaluateQa(unit, qa);
    assert.equal(evaluated.STATE, "REWORK_REQUIRED");
  });

  it("allows fully checked QA to reach human visual review", () => {
    const qa = passingQa();
    qa.scores.ANIMATION_POTENTIAL = 3;
    const evaluated = evaluateQa(unit, qa);
    assert.equal(evaluated.STATE, "READY_FOR_HUMAN_VISUAL_REVIEW");
    assert.equal(evaluated.QA_RESULTS?.classification, "B_STATIC");
  });

  it("selects assets through registry fields instead of W01-style constants", () => {
    const found = selectAsset([{ CONTENT_ID: "LM-PA-W01", CHANNEL: "WEB", FORMAT: "16:9", STATE: "IMAGE_READY" }], { CHANNEL: "WEB", STATE: "IMAGE_READY" });
    assert.equal(found?.CONTENT_ID, "LM-PA-W01");
  });
});

it("rejects QA copied from another image or text outside central crop", () => {
  let qa = passingQa();
  qa.evidence!.sha256 = "b".repeat(64);
  assert.equal(evaluateQa(unit, qa).STATE, "REWORK_REQUIRED");
  qa = passingQa();
  qa.evidence!.essentialBoxes.matter.y = 170;
  assert.equal(evaluateQa(unit, qa).STATE, "REWORK_REQUIRED");
  qa = passingQa();
  qa.evidence!.essentialBoxes.answer.x = 100;
  assert.equal(evaluateQa(unit, qa).STATE, "REWORK_REQUIRED");
});

for (const score of ["SCENE_SPECIFICITY", "LEGAL_ANCHOR_CLARITY", "CONCEPT_VISUAL_CAUSALITY", "CONCEPT_FIT", "REPRESENTATIONAL_NOVELTY"]) {
  it(`regenerates when ${score} is weak even with beautiful art and passing booleans`, () => {
    const qa = passingQa(); qa.scores[score] = 0;
    const result = evaluateQa(unit, qa);
    assert.equal(result.STATE, "REWORK_REQUIRED");
    assert.equal(result.QA_RESULTS?.nextAction, "REGENERATE");
  });
}
for (const gate of ["NO_COMMERCIAL_ART", "NO_GENERIC_CAST_FILLER", "INTERCHANGEABILITY_TEST", "NO_DECORATIVE_DOCUMENTS", "SUBJECT_MODE_COHERENT"]) {
  it(`regenerates for failed ${gate}`, () => {
    const qa = passingQa(); qa.hardGates[gate] = "FAIL";
    assert.equal(evaluateQa(unit, qa).QA_RESULTS?.nextAction, "REGENERATE");
  });
}
it("cannot approve an image with no observed causal evidence", () => {
  const qa = passingQa(); qa.evidence!.observedRelation = "";
  assert.equal(evaluateQa(unit, qa).STATE, "REWORK_REQUIRED");
});
it("cannot approve an interchangeable real image through all-PASS score fields", () => {
  const qa = passingQa(); qa.evidence!.counterfactuals = qa.evidence!.counterfactuals.map(c => ({ ...c, reusableByChangingTextOnly: true }));
  assert.equal(evaluateQa(unit, qa).STATE, "REWORK_REQUIRED");
});
