import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { founderSelectionMetrics } from "./learning";
import type { ImageGenerationBrief } from "./types";

const brief = (id: string, family: string): ImageGenerationBrief => ({
  contentId: id, mode: "LEGALMENTE_GENERAL", matter: id, editorialFamily: family, need: "informar",
  coreConcept: id, resolvedQuestion: id, emotion: "claridad", tension: id, consequence: id,
  argument: { contentId: id, legalBindingId: id, audience: "general", realQuestion: id, conflict: id,
    consequence: id, learningGoal: id, visualFunction: "EXPLAIN", sceneStrategy: "REAL_SITUATION",
    imageArgument: id, dominantVisualLogic: id, expectedPerception: id },
  artDirection: id, composition: id, camera: id, lighting: id, material: id, humanPresence: id,
  brandSurface: id, format: "9:16", copyExact: id,
});

describe("Founder selection learning", () => {
  it("reports selection rate with sample-size caution", () => {
    const briefs = [brief("a", "mito"), brief("b", "historia"), brief("c", "prueba")];
    const result = founderSelectionMetrics(briefs, [
      { contentId: "a", selected: true }, { contentId: "b", selected: false }, { contentId: "c", selected: true },
    ]);
    assert.equal(result.overall.generated, 3);
    assert.equal(result.overall.selected, 2);
    assert.equal(result.overall.rate, 2 / 3);
    assert.equal(result.overall.lowSample, true);
    assert.match(result.warnings[0], /not legal approval/i);
  });
});
