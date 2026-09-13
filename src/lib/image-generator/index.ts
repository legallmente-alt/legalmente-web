export * from "./types";
export * from "./prompt";
export * from "./negative";
export * from "./validation";
export * from "./batch";
export * from "./runtime";

export const IMAGE_GENERATOR_INVARIANTS = Object.freeze({
  semanticMeaningBeforeStyle: true,
  editorialFunctionBeforeArtDirection: true,
  emotionChangesVisualTreatment: true,
  oneSceneOnly: true,
  baseArtContainsNoFinalCopy: true,
  canonicalTypographyAfterGeneration: true,
  batchDiversityRequired: true,
  founderCurationStillRequired: true,
  generationNeverAuthorizesPublication: true,
});
