import test from "node:test";
import assert from "node:assert/strict";
import { catalogEntries, filterCatalog } from "./catalog";
import { worlds, series, chapters, concepts, processes } from "./content";

test("catalog includes every educational route once and no operational route", () => {
  const expected = [worlds, series, chapters, concepts, processes].reduce((sum, items) => sum + items.length, 0);
  assert.equal(catalogEntries.length, expected);
  assert.equal(new Set(catalogEntries.map(entry => entry.href)).size, expected);
  for (const entry of catalogEntries) {
    assert.match(entry.href, /^\/(mundo|serie|capitulo|concepto|proceso)\/[^/]+$/);
    assert.ok(entry.worldIds.length);
    assert.ok(entry.worldIds.every(id => worlds.some(world => world.id === id)));
  }
});
test("search tolerates accents, case, punctuation and reordered words", () => {
  assert.deepEqual(filterCatalog(catalogEntries, "REPRESENTACION"), filterCatalog(catalogEntries, "representación"));
  assert.ok(filterCatalog(catalogEntries, "empresa, actuar").some(entry => entry.href === "/capitulo/representacion-empresa"));
});
test("type and world filters intersect and retain declared cross-world concepts", () => {
  const results = filterCatalog(catalogEntries, "consentimiento", "concepto", "salud-medicina");
  assert.deepEqual(results.map(entry => entry.href), ["/concepto/consentimiento"]);
  assert.deepEqual(filterCatalog(catalogEntries, "consentimiento", "concepto", "movilidad-transporte"), []);
  assert.ok(filterCatalog(catalogEntries, "", "proceso", "movilidad-transporte").some(entry => entry.href === "/proceso/organizar-hechos-y-prueba"));
});
test("empty query restores all entries and unmatched query produces no results", () => {
  assert.equal(filterCatalog(catalogEntries, "  ").length, catalogEntries.length);
  assert.deepEqual(filterCatalog(catalogEntries, "zzzzinexistente"), []);
});
