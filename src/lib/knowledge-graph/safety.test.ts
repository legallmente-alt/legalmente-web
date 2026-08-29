import assert from "node:assert/strict";
import test from "node:test";

import {
  getRelationalSafetyRules,
  hasDisposition,
  relationalSafetyRules,
} from "./safety";

const highRiskRoutes = [
  "health-medicine",
  "crime-behavior",
  "mobility-transport",
  "technology-ai",
] as const;

test("high-risk relational worlds fail closed with territorial and do-not-automate rules", () => {
  for (const routeId of highRiskRoutes) {
    assert.equal(hasDisposition(routeId, "TERRITORIAL_RESEARCH_REQUIRED"), true, routeId);
    assert.equal(hasDisposition(routeId, "DO_NOT_AUTOMATE"), true, routeId);
    assert.ok(getRelationalSafetyRules(routeId).length >= 3, routeId);
  }
});

test("relational safety rules never encode publication or approval state", () => {
  const serialized = JSON.stringify(relationalSafetyRules).toUpperCase();
  assert.equal(serialized.includes("PUBLIC_READY"), false);
  assert.equal(serialized.includes("APROBADO"), false);
  assert.equal(serialized.includes("PUBLICATION_AUTHORIZED"), false);
});

test("medical and criminal boundaries block individualized fault conclusions", () => {
  const health = getRelationalSafetyRules("health-medicine")
    .filter((rule) => rule.disposition === "DO_NOT_AUTOMATE")
    .map((rule) => rule.rule)
    .join(" ")
    .toLowerCase();
  const criminal = getRelationalSafetyRules("crime-behavior")
    .filter((rule) => rule.disposition === "DO_NOT_AUTOMATE")
    .map((rule) => rule.rule)
    .join(" ")
    .toLowerCase();

  assert.match(health, /malpractice|fault|damages/);
  assert.match(criminal, /guilty|offense|evasion/);
});
