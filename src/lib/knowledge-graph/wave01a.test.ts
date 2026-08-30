import assert from "node:assert/strict";
import { test } from "node:test";
import { getWave01aForRoute, wave01aIntegrationUnits } from "./wave01a";

test("Wave 01A preserves the six approved claims and three stable content IDs", () => {
  assert.deepEqual(
    wave01aIntegrationUnits.map((unit) => unit.contentId),
    ["LM-PC-013", "LM-PC-031", "LM-PC-065"],
  );
  assert.deepEqual(
    wave01aIntegrationUnits.flatMap((unit) => unit.claimIds),
    [
      "LM-PC-013-CL-01",
      "LM-PC-013-CL-02",
      "LM-PC-031-CL-01",
      "LM-PC-031-CL-02",
      "LM-PC-065-CL-01",
      "LM-PC-065-CL-02",
    ],
  );
});

test("only LM-PC-013 has a candidate route in the existing graph", () => {
  assert.equal(getWave01aForRoute("/proceso/leer-antes-de-aceptar")?.contentId, "LM-PC-013");
  assert.equal(getWave01aForRoute("/capitulo/deber-profesional"), null);
  assert.equal(getWave01aForRoute("/concepto/representacion"), null);
  assert.equal(wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-031")?.candidateRoute, null);
  assert.equal(wave01aIntegrationUnits.find((unit) => unit.contentId === "LM-PC-065")?.candidateRoute, null);
});

test("unmapped units remain separated and do not turn representation into a supported claim", () => {
  const separated = wave01aIntegrationUnits.filter((unit) => unit.integrationState === "SEPARATED_PENDING_BINDING");
  assert.deepEqual(separated.map((unit) => unit.contentId), ["LM-PC-031", "LM-PC-065"]);
  const societaria = separated.find((unit) => unit.contentId === "LM-PC-065");
  assert.ok(societaria);
  assert.match(societaria.copy, /representación queda separada/);
  assert.doesNotMatch(societaria.copy, /facultades de representación/);
});

test("all Wave 01A alt text strings describe the real scenes instead of invented diagrams", () => {
  for (const unit of wave01aIntegrationUnits) {
    assert.ok(unit.altText.length > 40);
    assert.doesNotMatch(unit.altText, /hojas transparentes|Tablero editorial|Tres objetos de archivo conectados/);
  }
});
