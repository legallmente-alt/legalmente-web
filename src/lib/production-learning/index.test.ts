import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { ProductionPiece } from "@/lib/production-policy";
import { buildLearningMemoryItem, derivePerformanceSignal, rankMeasuredUtility } from "./index";

const piece: ProductionPiece = {
  id: "LM-METRIC-001",
  legalDomainIds: ["PROCESS"],
  entryDoor: "garantia",
  topic: "imparcialidad",
  angle: "tension concreta",
  legalRelation: "garantia-limite",
  hook: "¿Qué protege la imparcialidad?",
  format: "9:16",
  matterLabel: "Procesal",
  topicLabel: "Imparcialidad",
  centralIdea: "Distinguir garantía, decisión y límite.",
  sourceIds: ["SRC-1"],
  artisticStyle: "fotografia editorial",
  visualMetaphor: "umbral simetrico",
  scenario: "pasillo institucional",
  material: "piedra y papel",
  lighting: "lateral de umbral",
  humanPresence: "silueta parcial",
  framing: "plano medio",
  composition: "simetria tensionada",
  brandObject: "placa fisica",
  visibleBrand: "LegalMente",
  brandIntegration: "PHYSICAL_SCENE",
  artBaseIsClean: true,
  typographyCompositor: "CANONICAL",
};

const observation = {
  contentId: piece.id,
  channel: "INSTAGRAM",
  observedAt: "2026-09-11T00:00:00Z",
  reach: 500,
  views: 800,
  interactions: 70,
  shares: 25,
  saves: 10,
  sourceRef: "drive://instagram-audit-2026-09-11",
} as const;

describe("production learning", () => {
  it("computes reusable audience rates without treating them as legal proof", () => {
    const signal = derivePerformanceSignal(observation);
    assert.equal(signal.utilityActions, 35);
    assert.equal(signal.utilityRateByReach, 0.07);
    assert.match(signal.warnings[0], /not proof of legal quality/i);
  });

  it("never promotes curation state from performance", () => {
    const memory = buildLearningMemoryItem(piece, {
      contentId: piece.id,
      state: "GENERATED",
      recordedAt: "2026-09-11T01:00:00Z",
      sourceRef: "human://generation-receipt",
    }, observation);
    assert.equal(memory.state, "GENERATED");
    assert.equal(memory.performance?.utilityRateByReach, 0.07);
  });

  it("keeps missing reach as null instead of inventing zero-performance conclusions", () => {
    const signal = derivePerformanceSignal({ ...observation, reach: null });
    assert.equal(signal.utilityRateByReach, null);
    assert.equal(signal.hasMeasuredReach, false);
  });

  it("rejects metrics attached to the wrong content id", () => {
    assert.throws(() => buildLearningMemoryItem(piece, {
      contentId: piece.id,
      state: "APPROVED",
      recordedAt: "2026-09-11T01:00:00Z",
      sourceRef: "human://approval",
    }, { ...observation, contentId: "LM-OTHER" }), /PERFORMANCE_ID_MISMATCH/);
  });

  it("ranks only measured utility rates", () => {
    const ranked = rankMeasuredUtility([
      observation,
      { ...observation, contentId: "LM-METRIC-002", reach: 100, shares: 1, saves: 1 },
      { ...observation, contentId: "LM-METRIC-003", reach: null },
    ]);
    assert.deepEqual(ranked.map((item) => item.contentId), ["LM-METRIC-001", "LM-METRIC-002"]);
  });
});
