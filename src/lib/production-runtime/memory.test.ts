import assert from "node:assert/strict";
import { it } from "node:test";
import { importMasterMemory, memoryMatches, memoryReviewErrors } from "./memory";
import { containsNormativeCitation, formatContract } from "./contract";

it("blocks recent heading-only topics without inventing approval", () => {
  const source = '# Registro\n### LM-TEST-001 — Concepto de prueba reciente\nEstado: GENERADA / NO APROBADA\n### 2. Otra relación — Autor de prueba\nConcepto: Relación contractual de ejemplo';
  const memory = importMasterMemory(source, "2026-10-20T12:00:00Z");
  for (const topic of ["concepto de prueba reciente", "otra relación", "relación contractual de ejemplo"]) {
    assert.ok(memoryMatches(memory, topic).length);
    assert.ok(memoryReviewErrors(memory, { digest: memory.digest, reviewedBy: "editor", reviewedAt: "2026-10-20T12:01:00Z", comparedTopics: [topic], decision: "CLEAR" }, [topic], "2026-10-20T12:02:00Z").length);
  }
  assert.equal(memory.state, "REQUIRES_SEMANTIC_REVIEW");
  assert.match(memory.addenda, /NO APROBADA/);
});

it("does not mistake a topic containing concepto for a new table header", () => {
  const source = '| ID | Canal | Tema | Estado |\n|---|---|---|---|\n| X1 | General | Concepto de prueba | ENTREGADA |\n| X2 | LinkedIn | Figura siguiente | RECHAZADA |';
  const memory = importMasterMemory(source, "2026-10-20T12:00:00Z");
  assert.ok(memoryMatches(memory, "concepto de prueba").length);
  assert.ok(memoryMatches(memory, "figura siguiente").length);
  assert.ok(!memory.terms.includes("RECHAZADA"));
});

it("ignores illustrative headings and fields inside prompt code fences", () => {
  const source = '### LM-TEST-001 — Tema registrado\n```text\n### 2. Tema simulado\nConcepto: Ejemplo dentro de prompt\n| ID | Tema |\n| X | Tabla de ejemplo |\n```';
  const memory = importMasterMemory(source, "2026-10-20T12:00:00Z");
  assert.deepEqual(memory.terms, ["Tema registrado"]);
});

it("retains legacy Materia/tema and Materia y concepto tables", () => {
  const source = '| ID | Materia / tema normalizado | Estado |\n|---|---|---|\n| X1 | Procesal · figura anterior | ENTREGADA |\n\n| Pieza | Materia y concepto | Copy mostrado |\n|---|---|---|\n| 1 | CIVIL — FIGURA HISTÓRICA | Texto |';
  const memory = importMasterMemory(source, "2026-10-20T12:00:00Z");
  assert.ok(memoryMatches(memory, "figura anterior").length);
  assert.ok(memoryMatches(memory, "figura histórica").length);
});

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
