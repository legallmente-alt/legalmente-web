import { productionStages, type ContentProductionUnit, type ProductionStage } from "./operating-contract";

export const productionRegistry: readonly ContentProductionUnit[] = [
  { contentId: "LM-PC-013", masterTitle: "Objeto y alcance", stage: "VISUAL_QA", specializedStates: ["VISUAL_QA_PASS", "PRODUCT_REVIEW_REQUIRED", "NOT_PUBLIC"], claimRefs: ["LM-PC-013-CLAIM-1"], territory: "México", derivatives: [] },
  { contentId: "LM-PC-031", masterTitle: "Relación de trabajo", stage: "CHANNEL_ADAPTATION", specializedStates: ["VISUAL_QA_PASS", "PRODUCT_REVIEW_REQUIRED", "NOT_PUBLIC"], claimRefs: ["LM-PC-031-CLAIM-1"], territory: "México", derivatives: [] },
  { contentId: "LM-PC-065", masterTitle: "Sociedad mercantil", stage: "CHANNEL_ADAPTATION", specializedStates: ["VISUAL_QA_PASS", "PRODUCT_REVIEW_REQUIRED", "NOT_PUBLIC"], claimRefs: ["LM-PC-065-CLAIM-1"], territory: "México", derivatives: [] },
];

export function getProductionCounts(registry = productionRegistry) {
  return Object.fromEntries(productionStages.map((stage) => [`COUNT_${stage}`, registry.filter((unit) => unit.stage === stage).length])) as Record<`COUNT_${ProductionStage}`, number>;
}

export function getExecutableNextWork(registry = productionRegistry) {
  return registry.filter((unit) => unit.stage === "VISUAL_QA" && unit.specializedStates.includes("VISUAL_QA_PASS") && unit.specializedStates.includes("PRODUCT_REVIEW_REQUIRED") === false && unit.specializedStates.includes("NOT_PUBLIC") === true);
}
