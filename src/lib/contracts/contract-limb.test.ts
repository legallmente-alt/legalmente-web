import assert from "node:assert/strict";
import test from "node:test";

import { getConcept, getProcess } from "@/lib/knowledge-graph/content";
import { getInternalReviewUnit } from "@/lib/review/registry";

import { contractLimbPaths, getAffectedContractConsumers, getContractLimbPath } from "./contract-limb";

test("every Contracts limb path reuses existing Knowledge Engine and process IDs", () => {
  const contractTypes = contractLimbPaths.map((path) => path.contractType);
  assert.equal(new Set(contractTypes).size, contractTypes.length);

  for (const path of contractLimbPaths) {
    assert.ok(path.label.length > 0);
    assert.ok(path.focus.length > 0);
    assert.ok(getProcess(path.processId), `missing process: ${path.processId}`);
    assert.ok(path.conceptIds.length > 0);
    for (const conceptId of path.conceptIds) assert.ok(getConcept(conceptId), `missing concept: ${conceptId}`);
    for (const contentId of path.reviewContentIds) {
      const reviewUnit = getInternalReviewUnit(contentId);
      assert.ok(reviewUnit, `missing review unit: ${contentId}`);
      assert.equal(reviewUnit?.state, "HUMAN_REVIEW_REQUIRED");
    }
  }
});

test("supports promise of sale and sale as distinct educational selections", () => {
  const promise = getContractLimbPath("PROMESA_COMPRAVENTA");
  const sale = getContractLimbPath("COMPRAVENTA");

  assert.notEqual(promise.contractType, sale.contractType);
  assert.equal(promise.processId, "leer-antes-de-aceptar");
  assert.equal(sale.processId, "leer-antes-de-aceptar");
  assert.deepEqual(promise.conceptIds, ["consentimiento", "obligacion", "prueba"]);
  assert.deepEqual(sale.conceptIds, ["consentimiento", "obligacion", "prueba"]);
});

test("reverse circulation identifies affected consumers without changing their state", () => {
  assert.deepEqual(getAffectedContractConsumers({ kind: "CONCEPT", id: "consentimiento" }), contractLimbPaths.map((path) => path.contractType));
  assert.deepEqual(getAffectedContractConsumers({ kind: "PROCESS", id: "leer-antes-de-aceptar" }), contractLimbPaths.map((path) => path.contractType));
  assert.deepEqual(getAffectedContractConsumers({ kind: "REVIEW_CONTENT", id: "LM-PC-031" }), ["LABORAL"]);
  assert.deepEqual(getAffectedContractConsumers({ kind: "REVIEW_CONTENT", id: "UNKNOWN" }), []);
  assert.equal(getContractLimbPath("LABORAL").contractType, "LABORAL");
});

test("returns the same path by type and fails for an unknown type", () => {
  assert.equal(getContractLimbPath("LABORAL"), contractLimbPaths.find((path) => path.contractType === "LABORAL"));
  assert.throws(() => getContractLimbPath("UNKNOWN" as never), /Missing Contracts limb path/);
});
