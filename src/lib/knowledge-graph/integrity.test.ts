import assert from "node:assert/strict";
import test from "node:test";

import { chapters, concepts, processes, series, worlds } from "./content";
import { validateKnowledgeGraph } from "./integrity";

test("current Knowledge Engine graph is internally closed", () => {
  const result = validateKnowledgeGraph({ worlds, series, chapters, concepts, processes });
  assert.deepEqual(result, { ok: true, issues: [] });
});

test("fails when a chapter points to a missing process", () => {
  const fixture = {
    worlds: structuredClone(worlds),
    series: structuredClone(series),
    chapters: structuredClone(chapters),
    concepts: structuredClone(concepts),
    processes: structuredClone(processes),
  };
  fixture.chapters[0].processIds = ["missing-process"];
  const result = validateKnowledgeGraph(fixture);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.issues.map(({ message }) => message).join(" "), /process does not resolve: missing-process/);
});

test("fails when parent membership and reverse membership disagree", () => {
  const fixture = {
    worlds: structuredClone(worlds),
    series: structuredClone(series),
    chapters: structuredClone(chapters),
    concepts: structuredClone(concepts),
    processes: structuredClone(processes),
  };
  fixture.chapters[0].seriesId = "empresa-que-obliga";
  const result = validateKnowledgeGraph(fixture);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.issues.some(({ message }) => message.includes("belongs to empresa-que-obliga")));
});

test("fails when a process points to a missing related concept", () => {
  const fixture = {
    worlds: structuredClone(worlds),
    series: structuredClone(series),
    chapters: structuredClone(chapters),
    concepts: structuredClone(concepts),
    processes: structuredClone(processes),
  };
  fixture.processes[0].relatedConceptIds = ["missing-concept"];
  const result = validateKnowledgeGraph(fixture);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.issues.map(({ message }) => message).join(" "), /concept does not resolve: missing-concept/);
});

test("current learning routes resolve their foundational entry nodes", () => {
  const result = validateKnowledgeGraph({ worlds, series, chapters, concepts, processes });
  assert.equal(result.ok, true);
});
