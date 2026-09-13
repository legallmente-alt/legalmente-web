import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compileBaseArtPrompt } from "./prompt";
import { compileNegativePrompt } from "./negative";
import type { ImageGenerationBrief } from "./types";

const brief: ImageGenerationBrief = {
  contentId: "LM-IMG-1", mode: "LEGALMENTE_GENERAL", matter: "notarial", editorialFamily: "diferencia",
  need: "evitar confusion", coreConcept: "instrumento publico", resolvedQuestion: "que diferencia un instrumento de una copia",
  emotion: "claridad", tension: "dos documentos parecen equivalentes", consequence: "una persona puede atribuirles el mismo valor",
  argument: {
    contentId: "LM-IMG-1", legalBindingId: "CLAIM-1", audience: "general", realQuestion: "cual vale",
    conflict: "dos documentos similares", consequence: "confusion", learningGoal: "distinguir", visualFunction: "SEPARATE",
    sceneStrategy: "DOCUMENT_EVIDENCE", imageArgument: "dos documentos comparten mesa pero solo uno conserva una cadena material de autenticidad",
    dominantVisualLogic: "evidencia documental", expectedPerception: "diferencia verificable",
  },
  artDirection: "grabado contemporaneo con relieve", composition: "diagonal asimetrica", camera: "cenital oblicua",
  lighting: "luz lateral limpia", material: "papel algodon y metal", humanPresence: "manos parciales",
  brandSurface: "placa de laton en el escritorio", format: "9:16", copyExact: "ESTE TEXTO NO DEBE LLEGAR AL MODELO",
  recentStyleKeys: ["oleo oscuro"],
};

describe("image generator prompt", () => {
  it("keeps exact copy out, reserves physical branding and stays panhispanic-neutral", () => {
    const prompt = compileBaseArtPrompt(brief);
    assert.equal(prompt.includes(brief.copyExact), false);
    assert.match(prompt, /brand surface/i);
    assert.match(prompt, /No letters/i);
    assert.match(prompt, /no flags/i);
  });

  it("carries recent visual keys into the negative prompt", () => {
    assert.match(compileNegativePrompt(brief), /recently used: oleo oscuro/i);
  });
});
