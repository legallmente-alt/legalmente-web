import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { evaluateReleaseReadiness, type ReleaseReadinessInput } from "./index";

type CurrentState = ReleaseReadinessInput & {
  schemaVersion: string;
  asOf: string;
  evidenceHead: string;
  notes?: readonly string[];
};

function loadCurrentState(): CurrentState {
  const filePath = path.resolve(process.cwd(), "data/release/current-readiness-2026-09-11.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as CurrentState;
}

describe("current LegalMente release state", () => {
  it("remains fail-closed for the two currently verified release blockers", () => {
    const current = loadCurrentState();
    assert.equal(current.schemaVersion, "release-readiness-v1");

    const result = evaluateReleaseReadiness(current);
    assert.equal(result.status, "BLOCKED");
    assert.deepEqual(result.missing, [
      "REAL_VISUAL_BATCH_QA_COMPLETE",
      "REVIEWED_LIBRARY_THRESHOLD_SET",
    ]);
    assert.equal(result.deploymentAuthorized, false);
    assert.equal(result.publicationAuthorized, false);
  });
});
