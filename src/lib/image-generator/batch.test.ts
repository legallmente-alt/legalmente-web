import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateImageBatch } from "./batch";
import type { ImageGenerationBrief } from "./types";
import type { SceneStrategy, VisualFunction } from "@/lib/visual-argument";

const matters = ["civil", "penal", "laboral", "mercantil", "notarial", "salud", "transito", "historia", "ambiental", "procesal"];
const families = ["mito", "diferencia", "historia", "prueba", "jurista", "costumbre", "error", "proceso", "etimologia", "conciliacion"];
const emotions = ["claridad", "tension", "cautela", "curiosidad", "alivio", "sorpresa", "serenidad", "urgencia"];
const functions: VisualFunction[] = ["EXPLAIN", "SEPARATE", "COMPARE", "REVEAL", "WARN", "TENSION", "HUMANIZE", "SHOW_PROCESS", "SHOW_CONSEQUENCE", "PROVOKE_REFLECTION"];
const scenes: SceneStrategy[] = ["REAL_SITUATION", "HUMAN_DECISION", "CONSEQUENCE", "PROCESS", "ASSET_STRUCTURE", "DOCUMENT_EVIDENCE", "ARCHITECTURE", "MATERIAL_CONTRAST", "GOVERNANCE_OPERATION", "METAPHOR"];

function make(i: number): ImageGenerationBrief {
  return {
    contentId: `LM-B-${i}`, mode: "LEGALMENTE_GENERAL", matter: matters[i], editorialFamily: families[i],
    need: `need-${i}`, coreConcept: `concept-${i}`, resolvedQuestion: `question-${i}`, emotion: emotions[i % emotions.length],
    tension: `tension-${i}`, consequence: `consequence-${i}`,
    argument: {
      contentId: `LM-B-${i}`, legalBindingId: `CLAIM-${i}`, audience: "general", realQuestion: `question-${i}`,
      conflict: `conflict-${i}`, consequence: `consequence-${i}`, learningGoal: `goal-${i}`, visualFunction: functions[i],
      sceneStrategy: scenes[i], imageArgument: `image-argument-${i}`, dominantVisualLogic: `logic-${i}`, expectedPerception: `perception-${i}`,
      ...(scenes[i] === "METAPHOR" ? { motifKeys: [`motif-${i}`] } : {}),
    },
    artDirection: `art-${i}`, composition: `composition-${i}`, camera: `camera-${i}`, lighting: `light-${i}`,
    material: `material-${i}`, humanPresence: `human-${i}`, brandSurface: `surface-${i}`, format: "9:16", copyExact: `copy-${i}`,
  };
}

describe("image batch diversity", () => {
  it("accepts a genuinely varied general batch", () => {
    assert.deepEqual(validateImageBatch(Array.from({ length: 10 }, (_, i) => make(i))), []);
  });

  it("rejects cosmetic variation over one editorial function", () => {
    const batch = Array.from({ length: 10 }, (_, i) => ({ ...make(i), editorialFamily: "definicion" }));
    assert.ok(validateImageBatch(batch).some((e) => /editorial/i.test(e)));
  });
});
