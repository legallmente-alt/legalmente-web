import assert from "node:assert/strict";
import test from "node:test";

import { NEED_ROUTE_SEEDS, routeMatterCoverage, validateNeedRoutePortfolio } from "./need-routes";

test("need-first seed portfolio is broad and structurally valid", () => {
  assert.deepEqual(validateNeedRoutePortfolio(), []);
  assert.equal(NEED_ROUTE_SEEDS.length, 10);
  assert.ok(routeMatterCoverage().size >= 8);
});

test("seed portfolio spans basic, needs, professional and corporate product layers", () => {
  const layers = new Set(NEED_ROUTE_SEEDS.map((route) => route.productLayer));
  assert.ok(layers.has("LEGALMENTE_BASIC"));
  assert.ok(layers.has("LEGALMENTE_NEEDS"));
  assert.ok(layers.has("LEGALMENTE_PROFESSIONAL"));
  assert.ok(layers.has("LEGALMENTE_CORPORATE"));
});

test("no seed presents an unverified explicit territory as ready", () => {
  assert.equal(NEED_ROUTE_SEEDS.some((route) => route.territoryMode === "EXPLICIT_TERRITORY"), false);
  assert.ok(NEED_ROUTE_SEEDS.every((route) => route.researchState === "RESEARCH_REQUIRED"));
});

test("contracts do not monopolize the seed portfolio", () => {
  const routesMentioningContracts = NEED_ROUTE_SEEDS.filter((route) => route.matterLabels.includes("contratos"));
  assert.ok(routesMentioningContracts.length < NEED_ROUTE_SEEDS.length / 2);
});
