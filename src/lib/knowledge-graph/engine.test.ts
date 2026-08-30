import { test } from "node:test";
import assert from "node:assert/strict";
import { livingDictionary, searchHumanQuestion, validateLivingDictionary } from "./engine";
import { channelFormats, validateProductionUnit } from "../production/operating-contract";

test("living dictionary is sourced, related and territorially bounded", () => {
  assert.equal(livingDictionary.length, 8);
  assert.equal(validateLivingDictionary(), true);
  for (const entry of livingDictionary) assert.ok(entry.sources.length && entry.limits && entry.territory);
});

test("human questions resolve to existing concepts deterministically", () => {
  assert.equal(searchHumanQuestion("quién puede firmar por la empresa")[0]?.entry.conceptId, "representacion");
  assert.equal(searchHumanQuestion("esto es mío").length > 0, true);
  assert.equal(searchHumanQuestion("qué estoy aceptando")[0]?.entry.conceptId, "consentimiento");
});

test("production contract catches broken derivatives and enforces formats", () => {
  const valid = { contentId: "LM-PC-013", masterTitle: "Consentimiento", stage: "READY_FOR_VISUAL" as const, specializedStates: ["NOT_PUBLIC"] as const, claimRefs: ["claim-1"], territory: "México", derivatives: [{ id: "LM-PC-013-instagram", contentId: "LM-PC-013", parentId: "LM-PC-013", channel: "INSTAGRAM" as const, format: channelFormats.INSTAGRAM.format, width: 1080, height: 1350, territory: "México", claimRefs: ["claim-1"], assetProvenance: "registry:LM-PC-013", state: "NOT_PUBLIC" as const }] };
  assert.deepEqual(validateProductionUnit(valid), []);
  assert.ok(validateProductionUnit({ ...valid, derivatives: [{ ...valid.derivatives[0], width: 1000 }] }).some((item) => item.includes("formato")));
  assert.ok(validateProductionUnit({ ...valid, derivatives: [{ ...valid.derivatives[0], parentId: "other" }] }).some((item) => item.includes("parent")));
});
