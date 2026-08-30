import assert from "node:assert/strict";
import { test } from "node:test";

import {
  assertWave01aPublicBuildClosed,
  assertWave01aPublicRenderBlocked,
  getWave01aInternalQaManifest,
  getWave01aInternalQaUnitForRoute,
  validateWave01aProvenanceManifest,
} from "./wave01a-provenance";

function cloneManifest() {
  return structuredClone(getWave01aInternalQaManifest());
}

test("P0 provenance manifest accepts only the exact Founder copy scope", () => {
  const manifest = getWave01aInternalQaManifest();
  assert.equal(manifest.manifestVersion, "P0-PROVENANCE-MANIFEST-RENDER-GATE/V1");
  assert.equal(manifest.renderClass, "INTERNAL_QA_ONLY");
  assert.equal(manifest.founderEvidence.authorizedGate, "CLAIM_APPROVAL");
  assert.equal(manifest.founderEvidence.authorizedState, "READY_FOR_COPY");
  assert.equal(manifest.founderEvidence.externalDocumentHash, "NOT_RECORDED");
  assert.equal(manifest.units.length, 3);
  assert.equal(manifest.units.flatMap((unit) => unit.claims).length, 6);
});

test("P0 blocks a source, claim or Founder-binding mutation", () => {
  const sourceMutation = cloneManifest();
  sourceMutation.units[0].claims[0].source.url = "https://example.com/not-an-official-source";
  assert.throws(() => validateWave01aProvenanceManifest(sourceMutation), /primary source mismatch/);

  const claimMutation = cloneManifest();
  claimMutation.units[1].claims[0].claimId = "LM-PC-013-CL-01";
  assert.throws(() => validateWave01aProvenanceManifest(claimMutation), /unexpected claim set/);

  const evidenceMutation = cloneManifest();
  (evidenceMutation.founderEvidence as { bindingFingerprint: string }).bindingFingerprint = "0".repeat(64);
  assert.throws(() => validateWave01aProvenanceManifest(evidenceMutation));
});

test("P0 blocks visual, integration and publication escalation", () => {
  const visualMutation = cloneManifest();
  (visualMutation.units[0].gates as { visualGateProvenance: string }).visualGateProvenance = "VALID_HUMAN_PROVENANCE";
  assert.throws(() => validateWave01aProvenanceManifest(visualMutation));

  const integrationMutation = cloneManifest();
  (integrationMutation.units[0].gates as { integrationState: string }).integrationState = "PUBLIC_INTEGRATION_APPROVED";
  assert.throws(() => validateWave01aProvenanceManifest(integrationMutation));

  const publicationMutation = cloneManifest();
  (publicationMutation.units[0].gates as { publicationState: string }).publicationState = "PUBLIC";
  assert.throws(() => validateWave01aProvenanceManifest(publicationMutation));
});

test("internal QA and public delivery are different gates", () => {
  assert.equal(getWave01aInternalQaUnitForRoute("/proceso/leer-antes-de-aceptar")?.contentId, "LM-PC-013");
  assert.equal(getWave01aInternalQaUnitForRoute("/proceso/organizar-hechos-y-prueba"), null);
  assert.doesNotThrow(() => assertWave01aPublicBuildClosed({}));
  assert.throws(
    () => assertWave01aPublicBuildClosed({ LEGALMENTE_WAVE01A_INTERNAL_REVIEW: "1" }),
    /forbidden in a public build/,
  );
  assert.throws(
    () => assertWave01aPublicBuildClosed({ LEGALMENTE_WAVE01A_INTEGRATION_PREVIEW: "1" }),
    /forbidden in a public build/,
  );
  assert.throws(() => assertWave01aPublicRenderBlocked(), /PUBLIC render is blocked/);
});
