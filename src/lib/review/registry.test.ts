import assert from "node:assert/strict";
import test from "node:test";

import wave01aManifest from "../../../public/internal-assets/legalmente/wave-01a/manifest.json";

import {
  getInternalReviewUnit,
  validateReviewRegistry,
  wave01aLocalAssetAvailability,
  wave01aReviewRegistry,
  wave01aReviewSnapshot,
} from "./registry";

function manifestFixture() {
  return structuredClone(wave01aManifest) as { contentUnits: Record<string, unknown>[]; visibility: string };
}

function assertInvalid(result: ReturnType<typeof validateReviewRegistry>, message: RegExp) {
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.issues.map(({ message: issueMessage }) => issueMessage).join(" "), message);
}

test("adapts the existing Wave 01A manifest only after local SHA-256 verification", () => {
  const result = validateReviewRegistry(wave01aManifest, wave01aLocalAssetAvailability);

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.registry.length, 3);
  assert.deepEqual(result.registry.map((unit) => unit.contentId), ["LM-PC-013", "LM-PC-031", "LM-PC-065"]);
  assert.equal(result.registry.every((unit) => unit.state === "HUMAN_REVIEW_REQUIRED"), true);
  assert.equal(result.registry.every((unit) => unit.relatedContent === "PENDING_MAPPING"), true);
  assert.equal(result.registry.every((unit) => unit.assets.some((asset) => asset.format === "9:16")), true);
  assert.equal(result.registry.every((unit) => unit.assets.some((asset) => asset.format === "4:5")), true);
  assert.equal(wave01aLocalAssetAvailability.length, 6);
});

test("makes evidence semantics explicit instead of implying history, transport, or approval", () => {
  assert.deepEqual(wave01aReviewSnapshot.evidence, {
    provenance: "DRIVE_IDS_FROM_MANIFEST",
    fileVerification: "LOCAL_PATH_AND_SHA256_MATCH",
    changeHistory: "NOT_IMPLEMENTED",
    signalTransport: "NOT_IMPLEMENTED",
    approvalEvidence: "NOT_PRESENT",
  });
});

test("fails closed when availability is omitted or incomplete", () => {
  assertInvalid(validateReviewRegistry(wave01aManifest), /availability and SHA-256 must be verified/);
  assertInvalid(validateReviewRegistry(wave01aManifest, [wave01aLocalAssetAvailability[0]]), /unavailable or was not checked/);
});

test("rejects protocol-like, traversal, relative, spaced, and malformed candidate routes", () => {
  for (const candidateRoute of ["//dominio.example", "/../escape", "/ruta//doble", "../relative", "not/a/route", "/ruta con espacios", "/ruta?redirect=otro", "/ruta#fragment"]) {
    const fixture = manifestFixture();
    fixture.contentUnits[0].candidateRoute = candidateRoute;
    assertInvalid(validateReviewRegistry(fixture, wave01aLocalAssetAvailability), /single internal route path/);
  }

  const validFixture = manifestFixture();
  validFixture.contentUnits[0].candidateRoute = "/proceso/ruta-valida_v1";
  const valid = validateReviewRegistry(validFixture, wave01aLocalAssetAvailability);
  assert.equal(valid.ok, true);
});

test("binds source names to their Content ID and rejects traversal or wrong-format names", () => {
  for (const sourceName of [
    "../LM-PC-013_visual.png",
    "subdir/LM-PC-013_visual.png",
    "LM-PC-031_visual.png",
    "LM-PC-013_visual_4x5.png",
    "LM-PC-013\\visual.png",
  ]) {
    const fixture = manifestFixture();
    (fixture.contentUnits[0].vertical as Record<string, unknown>).sourceName = sourceName;
    assertInvalid(validateReviewRegistry(fixture, wave01aLocalAssetAvailability), /sourceName must|without traversal|dimensions do not match/);
  }
});

test("rejects reused Drive IDs and duplicate local associations in Wave 01A", () => {
  const driveFixture = manifestFixture();
  (driveFixture.contentUnits[1].vertical as Record<string, unknown>).driveFileId = (driveFixture.contentUnits[0].vertical as Record<string, unknown>).driveFileId;
  assertInvalid(validateReviewRegistry(driveFixture, wave01aLocalAssetAvailability), /Drive ID already used/);

  const duplicateFixture = manifestFixture();
  duplicateFixture.contentUnits[1] = structuredClone(duplicateFixture.contentUnits[0]);
  assertInvalid(validateReviewRegistry(duplicateFixture, wave01aLocalAssetAvailability), /local asset already used|Drive ID already used|duplicate contentId/);
});

test("rejects contradictory assets and legacy vertical/feed representations", () => {
  const fixture = manifestFixture();
  fixture.contentUnits[0].assets = structuredClone([fixture.contentUnits[0].vertical, fixture.contentUnits[0].feed]);
  (fixture.contentUnits[0].vertical as Record<string, unknown>).driveFileId = "CONTRADICTORY_UNUSED_VERTICAL";

  assertInvalid(validateReviewRegistry(fixture, wave01aLocalAssetAvailability), /contradict the legacy/);
});

test("rejects empty, public, and malformed manifests", () => {
  const empty = manifestFixture();
  empty.contentUnits = [];
  assertInvalid(validateReviewRegistry(empty, wave01aLocalAssetAvailability), /manifest cannot be empty/);

  const publicManifest = manifestFixture();
  publicManifest.visibility = "public";
  assertInvalid(validateReviewRegistry(publicManifest, wave01aLocalAssetAvailability), /visibility must remain internal-review-only/);

  const malformed = manifestFixture();
  malformed.contentUnits[1] = null as unknown as Record<string, unknown>;
  assertInvalid(validateReviewRegistry(malformed, wave01aLocalAssetAvailability), /content unit must be an object/);
});

test("rejects changed dimensions and changed file content", () => {
  const dimensionsFixture = manifestFixture();
  (dimensionsFixture.contentUnits[0].vertical as Record<string, unknown>).width = 1441;
  assertInvalid(validateReviewRegistry(dimensionsFixture, wave01aLocalAssetAvailability), /dimensions do not match/);

  const hashFixture = manifestFixture();
  (hashFixture.contentUnits[0].vertical as Record<string, unknown>).sha256 = "0000000000000000000000000000000000000000000000000000000000000000";
  assertInvalid(validateReviewRegistry(hashFixture, wave01aLocalAssetAvailability), /local asset hash does not match/);
});

test("deep-freezes the runtime snapshot; TypeScript readonly is not the only protection", () => {
  assert.equal(Object.isFrozen(wave01aReviewRegistry), true);
  assert.equal(Object.isFrozen(wave01aReviewRegistry[0]), true);
  assert.equal(Object.isFrozen(wave01aReviewRegistry[0].assets[0]), true);
  assert.throws(() => {
    (wave01aReviewRegistry[0].assets[0] as { sourceName: string }).sourceName = "MUTATED.png";
  }, TypeError);
  assert.equal(wave01aReviewRegistry[0].assets[0].sourceName, "LM-PC-013_visual.png");
});

test("unknown lookup returns no inferred route or approval", () => {
  assert.equal(getInternalReviewUnit("LM-PC-999"), null);
  assert.equal(wave01aReviewSnapshot.evidence.approvalEvidence, "NOT_PRESENT");
});
