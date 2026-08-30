import assert from "node:assert/strict";
import { test } from "node:test";

import { getWave01aCandidateForRoute, wave01aIntegrationUnits } from "./wave01a";

test("Wave 01A preserves the three content IDs and six approved claim IDs", () => {
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

test("only LM-PC-013 retains an internal-only candidate route", () => {
  assert.equal(getWave01aCandidateForRoute("/proceso/leer-antes-de-aceptar")?.contentId, "LM-PC-013");
  assert.equal(getWave01aCandidateForRoute("/proceso/organizar-hechos-y-prueba"), null);
  assert.equal(getWave01aCandidateForRoute("/capitulo/deber-profesional"), null);
  assert.equal(getWave01aCandidateForRoute("/concepto/representacion"), null);
});

test("all units keep visual, integration and publication gates fail-closed", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.equal(unit.copyState, "READY_FOR_COPY");
    assert.equal(unit.visualAssetState, "EXISTS");
    assert.equal(unit.visualQaState, "PASS");
    assert.equal(unit.visualGateProvenance, "UNRESOLVED");
    assert.equal(unit.visualState, "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED");
    assert.equal(unit.visualGateAuthorization, "NOT_RECORDED");
    assert.equal(unit.integrationQaState, "NOT_RUN");
    assert.equal(unit.publicationState, "NOT_PUBLIC");
  }
});

test("semantic candidates cannot create a public integration", () => {
  const lm013 = wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-013");
  const lm031 = wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-031");
  const lm065 = wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-065");

  assert.equal(lm013?.integrationState, "PRODUCT_REVIEW_REQUIRED");
  assert.equal(lm031?.integrationState, "SEPARATED_PENDING_BINDING");
  assert.equal(lm031?.semanticBindingDecision, "CANDIDATE_EXISTING_PROCESS:organizar-hechos-y-prueba");
  assert.equal(lm031?.candidateRoute, null);
  assert.equal(lm065?.integrationState, "RELATED_ONLY_NO_PUBLIC_INTEGRATION");
  assert.equal(lm065?.candidateRoute, null);
  assert.match(lm065?.copy ?? "", /representación queda separada/);
  assert.doesNotMatch(lm065?.copy ?? "", /facultades de representación/);
});
