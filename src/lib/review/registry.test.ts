import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

import wave01aManifest from "../../../public/internal-assets/legalmente/wave-01a/manifest.json";

import { getInternalReviewUnit, validateReviewRegistry, wave01aReviewRegistry } from "./registry";

const expectedAssetPaths = wave01aReviewRegistry.flatMap((unit) => unit.assets.map((asset) => asset.localPath));
const availableAssetPaths = expectedAssetPaths.filter((assetPath) => existsSync(resolve(process.cwd(), `public${assetPath}`)));

function manifestFixture() {
  return JSON.parse(JSON.stringify(wave01aManifest)) as { contentUnits: Record<string, unknown>[] };
}

test("adapts the existing Wave 01A manifest into three traceable review units", () => {
  const result = validateReviewRegistry(wave01aManifest, availableAssetPaths);

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.registry.length, 3);
  assert.deepEqual(result.registry.map((unit) => unit.contentId), ["LM-PC-013", "LM-PC-031", "LM-PC-065"]);
  assert.equal(result.registry.every((unit) => unit.state === "HUMAN_REVIEW_REQUIRED"), true);
  assert.equal(result.registry.every((unit) => unit.relatedContent === "PENDING_MAPPING"), true);
  assert.equal(result.registry.every((unit) => unit.assets.some((asset) => asset.format === "9:16")), true);
  assert.equal(result.registry.every((unit) => unit.assets.some((asset) => asset.format === "4:5")), true);
});

test("fails closed when Drive provenance is missing", () => {
  const fixture = manifestFixture();
  const vertical = fixture.contentUnits[0].vertical as Record<string, unknown>;
  vertical.driveFileId = "";

  const result = validateReviewRegistry(fixture);

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.issues[0].message, /Drive provenance is required/);
});

test("fails closed when a review unit is mapped as approved or not pending", () => {
  const fixture = manifestFixture();
  fixture.contentUnits[0].state = "APPROVED";
  fixture.contentUnits[0].relatedContent = "/concepto/obligacion";

  const result = validateReviewRegistry(fixture);

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.issues.map(({ message }) => message).join(" "), /HUMAN_REVIEW_REQUIRED|PENDING_MAPPING/);
});

test("fails closed when the two required formats are incomplete or local files are absent", () => {
  const fixture = manifestFixture();
  delete fixture.contentUnits[0].feed;

  const missingFormat = validateReviewRegistry(fixture);
  assert.equal(missingFormat.ok, false);
  if (!missingFormat.ok) assert.match(missingFormat.issues[0].message, /exactly two internal assets/);

  const absentLocalFile = validateReviewRegistry(wave01aManifest, ["/internal-assets/legalmente/wave-01a/LM-PC-013_visual.png"]);
  assert.equal(absentLocalFile.ok, false);
  if (!absentLocalFile.ok) assert.match(absentLocalFile.issues.map(({ message }) => message).join(" "), /local asset is unavailable/);
});

test("fails closed on duplicate Content IDs and exposes no inferred route", () => {
  const fixture = manifestFixture();
  fixture.contentUnits[1].contentId = fixture.contentUnits[0].contentId;

  const result = validateReviewRegistry(fixture);

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.issues[0].message, /duplicate contentId/);
  assert.equal(getInternalReviewUnit("LM-PC-999"), null);
});
