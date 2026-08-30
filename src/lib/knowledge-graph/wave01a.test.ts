import assert from "node:assert/strict";
import { test } from "node:test";
import { getWave01aForRoute, wave01aIntegrationUnits } from "./wave01a";

test("Wave 01A preserves the six Founder-approved copy claims and three stable content IDs", () => {
  assert.deepEqual(
    wave01aIntegrationUnits.map((unit) => unit.contentId),
    ["LM-PC-013", "LM-PC-031", "LM-PC-065"],
  );
  assert.deepEqual(
    wave01aIntegrationUnits.flatMap((unit) => unit.claimIds),
    [
      "LM-PC-013-CL-01",
      "LM-PC-013-CL-02",
      "LM-PC-031-CL-01",
      "LM-PC-031-CL-02",
      "LM-PC-065-CL-01",
      "LM-PC-065-CL-02",
    ],
  );
});

test("only existing process routes remain candidates; no new route is invented", () => {
  assert.equal(getWave01aForRoute("/proceso/leer-antes-de-aceptar")?.contentId, "LM-PC-013");
  assert.equal(getWave01aForRoute("/proceso/organizar-hechos-y-prueba")?.contentId, "LM-PC-031");
  assert.equal(getWave01aForRoute("/capitulo/deber-profesional"), null);
  assert.equal(getWave01aForRoute("/concepto/representacion"), null);
  assert.equal(wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-065")?.candidateRoute, null);
});

test("candidate semantics do not create false claim parents or public integration", () => {
  const lm031 = wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-031");
  const lm065 = wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-065");
  assert.equal(lm031?.semanticBindingDecision, "CANDIDATE_EXISTING_PROCESS:organizar-hechos-y-prueba");
  assert.equal(lm031?.semanticBindingState, "CANDIDATE_EXISTING_PROCESS_REVIEW_REQUIRED");
  assert.equal(lm031?.integrationState, "PRODUCT_REVIEW_REQUIRED");
  assert.equal(lm065?.semanticBindingDecision, "RELATED_ONLY");
  assert.equal(lm065?.semanticBindingState, "RELATED_ONLY_NO_CLAIM_PARENT");
  assert.equal(lm065?.integrationState, "RELATED_ONLY_NO_PUBLIC_INTEGRATION");
  assert.doesNotMatch(lm065?.copy ?? "", /facultades de representación/);
});

test("all Wave 01A alt text strings describe real scenes rather than invented diagrams", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.ok(unit.altText.length > 40);
    assert.doesNotMatch(unit.altText, /hojas transparentes|Tablero editorial|Tres objetos de archivo conectados/);
  }
});

test("visual QA evidence does not substitute for a verified human visual gate", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.equal(unit.visualAssetState, "EXISTS");
    assert.equal(unit.visualQaState, "PASS");
    assert.equal(unit.visualGateProvenance, "UNRESOLVED");
    assert.equal(unit.visualState, "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED");
    assert.equal(unit.visualGateDecisionReceipt, null);
    assert.equal(unit.visualGateAuthorization, "NOT_RECORDED");
    assert.equal(unit.socialCompositionState, "REVIEW_REQUIRED");
  }
});

test("live-state reconciliation fails closed for visual provenance, integration, and publication", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.equal(unit.visualGateProvenance, "UNRESOLVED");
    assert.equal(unit.visualGateAuthorization, "NOT_RECORDED");
    assert.notEqual(unit.integrationState.includes("APPROVED"), true);
    assert.equal(unit.publicationState, "NOT_PUBLIC");
  }
});
