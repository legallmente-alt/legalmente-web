import assert from "node:assert/strict";
import { test } from "node:test";
import { getWave01aForRoute, wave01aIntegrationUnits } from "./wave01a";

test("Wave 01A preserves the six approved claims and three stable content IDs", () => {
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

test("only the two approved existing process routes are candidates and LM-PC-065 has none", () => {
  assert.equal(getWave01aForRoute("/proceso/leer-antes-de-aceptar")?.contentId, "LM-PC-013");
  assert.equal(getWave01aForRoute("/proceso/organizar-hechos-y-prueba")?.contentId, "LM-PC-031");
  assert.equal(getWave01aForRoute("/capitulo/deber-profesional"), null);
  assert.equal(getWave01aForRoute("/concepto/representacion"), null);
  assert.equal(wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-031")?.candidateRoute, "/proceso/organizar-hechos-y-prueba");
  assert.equal(wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-065")?.candidateRoute, null);
});

test("resolved semantic bindings remain non-public and do not create false claim parents", () => {
  const separated = wave01aIntegrationUnits.filter((unit) => unit.integrationState === "SEMANTIC_BINDING_RESOLVED_INTEGRATION_NOT_APPROVED");
  assert.deepEqual(separated.map((unit) => unit.contentId), ["LM-PC-065"]);
  assert.equal(wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-031")?.semanticBindingDecision, "BIND_TO_EXISTING_PARENT:organizar-hechos-y-prueba");
  assert.equal(separated.find((unit) => unit.contentId === "LM-PC-065")?.semanticBindingDecision, "RELATED_ONLY");
  const societaria = separated.find((unit) => unit.contentId === "LM-PC-065");
  assert.ok(societaria);
  assert.match(societaria.copy, /representación queda separada/);
  assert.doesNotMatch(societaria.copy, /facultades de representación/);
});

test("all Wave 01A alt text strings describe the real scenes instead of invented diagrams", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.ok(unit.altText.length > 40);
    assert.doesNotMatch(unit.altText, /hojas transparentes|Tablero editorial|Tres objetos de archivo conectados/);
  }
});

test("visual QA, human provenance and authorization remain separate", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.equal(unit.visualAssetState, "EXISTS");
    assert.equal(unit.visualQaState, "PASS");
    assert.equal(unit.visualGateProvenance, "VALID_HUMAN_PROVENANCE");
    assert.equal(unit.visualState, "VISUAL_QA_PASS_PROVENANCE_VALID_HUMAN");
    assert.equal(unit.visualGateAuthorization, "HUMAN_VISUAL_GATE_APPROVED");
    assert.equal(unit.copyChannelQa, "PASS");
    assert.equal(unit.artBaseState, "READY");
    assert.equal(unit.socialCompositionState, "REVIEW_REQUIRED");
  }
});

test("live-state reconciliation invariants fail closed", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.notEqual(unit.visualGateProvenance, "UNRESOLVED");
    assert.notEqual(unit.visualState, "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED");
    assert.notEqual(unit.visualGateAuthorization, "NOT_RECORDED");
    assert.equal(unit.publicationState, "NOT_PUBLIC");
  }
  const lm031 = wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-031");
  const lm065 = wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-065");
  assert.equal(lm031?.integrationState, "EDUCATIONAL_INTEGRATION_APPROVED_EXISTING_PROCESS");
  assert.equal(lm031?.candidateRoute, "/proceso/organizar-hechos-y-prueba");
  assert.equal(lm065?.integrationState, "SEMANTIC_BINDING_RESOLVED_INTEGRATION_NOT_APPROVED");
  assert.notEqual(lm031?.semanticBindingState, undefined);
  assert.notEqual(lm065?.semanticBindingState, undefined);
});
