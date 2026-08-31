import assert from "node:assert/strict";
import test from "node:test";

import { pilotContentBriefs, validatePilotContentBriefs } from "./pilot-briefs";

test("pilot brief registry is structurally closed", () => {
  assert.equal(pilotContentBriefs.length, 5);
  assert.deepEqual(validatePilotContentBriefs(), []);
  assert.ok(pilotContentBriefs.every((brief) => brief.status === "RESEARCH_REQUIRED"));
});

test("cinema pilot remains explicitly not ready without a fabricated graph link", () => {
  const brief = pilotContentBriefs.find(({ contentType }) => contentType === "CINEMA_LAW");
  assert.ok(brief);
  assert.equal(brief.chapterId, null);
  assert.equal(brief.humanGate, "NOT_READY");
  assert.match(brief.stopCondition, /derechos|fuente jurídica|revisión humana/);
});

test("publicable content cannot bypass claims and source readiness", () => {
  const invalid = pilotContentBriefs.map((brief, index) => index === 0 ? { ...brief, status: "PUBLICABLE" as const } : brief);
  const issues = validatePilotContentBriefs(invalid);
  assert.ok(issues.some((message) => message.includes("cannot be publicable without claims and sources")));
});

test("broken relationship is reported instead of silently accepted", () => {
  const invalid = pilotContentBriefs.map((brief, index) => index === 0 ? { ...brief, relatedContentId: "missing-content" } : brief);
  const issues = validatePilotContentBriefs(invalid);
  assert.ok(issues.some((message) => message.includes("related content does not resolve: missing-content")));
});
