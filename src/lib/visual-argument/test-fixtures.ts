import type { CausalScene } from "./causality";
/** Synthetic fixtures exercise plumbing only; never production or legal evidence. */
export function causalFixture(key = "custodia", mode = "LEGAL_OBJECT"): CausalScene {
  const kind: Record<string, CausalScene["elements"][number]["kind"]> = {
    DOCUMENT_OBJECT: "DOCUMENT", LEGAL_OBJECT: "OBJECT", ARCHITECTURE_SPACE: "SPACE",
    PROCESS_MECHANISM: "PROCESS", FORENSIC_EVIDENCE: "EVIDENCE", MATERIAL_ABSTRACTION: "MATERIAL",
    ENVIRONMENT_CONTEXT: "SPACE", HUMAN_INTERACTION: "HUMAN", HUMAN_SOLITARY: "HUMAN",
  };
  return {
    concept: key, legalRelation: `relación-${key}`, scene: `escena-${key}`,
    visibleMechanism: "Un sello continuo une el recipiente con su cierre; abrirlo rompe la unión.",
    comprehensionWithoutText: "La apertura deja una alteración física verificable en el sello.",
    elements: [
      { id: "container", kind: kind[mode], physicalIdentity: `recipiente-${key}`, legalFunction: "conservar el objeto confiado", observableAction: "permanece cerrado", necessary: true },
      { id: "seal", kind: mode === "HUMAN_INTERACTION" ? "HUMAN" : "EVIDENCE", physicalIdentity: `sello-${key}`, legalFunction: "revelar acceso al contenido", observableAction: "une tapa y recipiente", necessary: true },
    ],
    relations: [{ from: "seal", to: "container", action: "une el cierre" }], anchorElementIds: ["seal"],
    counterfactuals: ["competencia", "filiación", "prescripción"].map(otherConcept => ({ otherConcept, reusableByChangingTextOnly: false, reason: "El mecanismo de integridad de un recipiente no expresa esa relación." })),
    review: { sceneSpecific: true, explainsLearning: true, legalAnchorsVisible: true, commercial: false, genericCastFiller: false, decorativeDocuments: false, subjectModeCoherent: true, reviewedBy: "synthetic fixture" },
  };
}
