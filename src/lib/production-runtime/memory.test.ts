import assert from "node:assert/strict";
import { it } from "node:test";
import { importMasterMemory, memoryMatches, memoryReviewErrors } from "./memory";
import { containsNormativeCitation, formatContract } from "./contract";

const markdown = '```json\n{"entries":[{"title":"Novación contractual","aliases":["novación extintiva"]}]}\n```\n\n## Adenda posterior\n| ID | Materia / concepto normalizado | Imagen final |\n|---|---|---|\n| R-01 | Apostilla | foto.png |\n\nCorrección: tanda previa DESCARTADA, NO APROBADA.';
it("imports live addenda and aliases instead of freezing the embedded JSON", () => {
  const memory = importMasterMemory(markdown, "2026-09-26T12:00:00Z");
  assert.equal(memoryMatches(memory, "apostilla").length, 1);
  assert.equal(memoryMatches(memory, "novacion extintiva").length, 1);
  assert.match(memory.addenda, /DESCARTADA/);
  assert.equal(memory.state, "REQUIRES_SEMANTIC_REVIEW");
});
it("blocks stale reviews and snapshots even when the candidate title is new", () => {
  const memory = importMasterMemory(markdown, "2026-09-26T12:00:00Z");
  const review = { digest: memory.digest, reviewedBy: "editor", reviewedAt: "2026-09-26T12:10:00Z", comparedTopics: ["nuevo tema"], decision: "CLEAR" as const };
  assert.equal(memoryReviewErrors(memory, review, ["nuevo tema"], "2026-09-26T13:00:00Z").length, 0);
  assert.ok(memoryReviewErrors(memory, review, ["nuevo tema"], "2026-09-28T13:00:00Z").length);
  const changed = importMasterMemory(markdown + "\nOtra corrección", memory.fetchedAt);
  assert.ok(memoryReviewErrors(changed, review, ["nuevo tema"], "2026-09-26T13:00:00Z").length);
});
it("rejects a missing or malformed canonical memory", () => {
  assert.throws(() => importMasterMemory("empty", "2026-09-26T12:00:00Z"));
  assert.throws(() => importMasterMemory("```json\n{bad}\n```", "2026-09-26T12:00:00Z"));
});
it("keeps legal sources outside image copy and exposes exact crop dimensions", () => {
  assert.ok(containsNormativeCitation("Art. 14 de la LFT"));
  assert.ok(containsNormativeCitation("Código Civil"));
  assert.equal(containsNormativeCitation("Sus efectos dependen de la ley aplicable."), false);
  assert.equal(formatContract("9:16").crop.y, 285);
  assert.equal(formatContract("4:5").height, 1350);
});

it("indexes the live document's unfenced JSON and later addenda together", () => {
  const source = '# Registro\n{\n  "entries": [{"title":"Novación", "aliases":["Novación contractual"]}]\n}\n## Adenda\n| Canal | Tema |\n| --- | --- |\n| General | Apostilla |';
  const memory = importMasterMemory(source, "2026-09-26T12:00:00Z");
  assert.equal(memoryMatches(memory, "novación").length, 2);
  assert.equal(memoryMatches(memory, "apostilla").length, 1);
  assert.match(memory.addenda, /Adenda/);
});
