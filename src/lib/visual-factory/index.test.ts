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
  PROVENANCE: { promptVersion: "v1", referenceAssets: [], copySource: "Drive", createdBy: "Manus AI" },
};

const adapter: ImageGeneratorAdapter = {
  name: "test",
  model: "test-model",
  capabilities: { text: false, referenceImage: true, inpainting: true, upscale: true, variation: true },
  async generate() { return { asset: "asset", provenance: {} }; },
};

function passingQa(): VisualQaResult {
  const qa = createEmptyQa();
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
    qa.classification = "B_STATIC";
    qa.nextAction = "HUMAN_REVIEW";
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
    assert.equal(evaluated.QA_RESULTS?.classification, "C_REWORK");
  });

  it("allows fully checked QA to reach human visual review", () => {
    const qa = passingQa();
    qa.scores.ANIMATION_POTENTIAL = 3;
    const evaluated = evaluateQa(unit, qa);
    assert.equal(evaluated.STATE, "READY_FOR_HUMAN_VISUAL_REVIEW");
    assert.equal(evaluated.QA_RESULTS?.classification, "B_STATIC");
    assert.equal(evaluated.QA_RESULTS?.nextAction, "HUMAN_REVIEW");
  });

  it("selects assets through registry fields instead of W01-style constants", () => {
    const found = selectAsset([{ CONTENT_ID: "LM-PA-W01", CHANNEL: "WEB", FORMAT: "16:9", STATE: "IMAGE_READY" }], { CHANNEL: "WEB", STATE: "IMAGE_READY" });
    assert.equal(found?.CONTENT_ID, "LM-PA-W01");
  });
});
