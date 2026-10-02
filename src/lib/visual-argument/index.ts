import { validateCausalScene, representationFingerprint, type CausalScene } from "./causality";
export { validateCausalScene, representationFingerprint, type CausalScene } from "./causality";
export const VISUAL_FUNCTIONS = [
  "EXPLAIN", "SEPARATE", "COMPARE", "REVEAL", "WARN", "TENSION",
  "HUMANIZE", "SHOW_PROCESS", "SHOW_CONSEQUENCE", "MATERIALIZE_ABSTRACTION",
  "PROVOKE_REFLECTION",
] as const;

export type VisualFunction = (typeof VISUAL_FUNCTIONS)[number];

export const VISUAL_ARGUMENT_CHANNELS = [
  "instagram", "linkedin-legalmente", "linkedin-founder", "website",
] as const;

export type VisualArgumentChannel = (typeof VISUAL_ARGUMENT_CHANNELS)[number];

export const SCENE_STRATEGIES = [
  "REAL_SITUATION",
  "HUMAN_DECISION",
  "CONSEQUENCE",
  "PROCESS",
  "ASSET_STRUCTURE",
  "GOVERNANCE_OPERATION",
  "DOCUMENT_EVIDENCE",
  "ARCHITECTURE",
  "MATERIAL_CONTRAST",
  "METAPHOR",
] as const;

export type SceneStrategy = (typeof SCENE_STRATEGIES)[number];

export const SUBJECT_MODES = [
  "HUMAN_INTERACTION",
  "HUMAN_SOLITARY",
  "DOCUMENT_OBJECT",
  "LEGAL_OBJECT",
  "ARCHITECTURE_SPACE",
  "PROCESS_MECHANISM",
  "FORENSIC_EVIDENCE",
  "MATERIAL_ABSTRACTION",
  "ENVIRONMENT_CONTEXT",
] as const;

export type SubjectMode = (typeof SUBJECT_MODES)[number];

const HUMAN_CENTERED_SUBJECT_MODES: readonly SubjectMode[] = [
  "HUMAN_INTERACTION",
  "HUMAN_SOLITARY",
];

const CHANNEL_FUNCTION_PREFERENCES: Readonly<Record<VisualArgumentChannel, readonly VisualFunction[]>> = {
  instagram: ["TENSION", "REVEAL", "HUMANIZE", "PROVOKE_REFLECTION", "SHOW_CONSEQUENCE"],
  "linkedin-legalmente": ["EXPLAIN", "SEPARATE", "COMPARE", "SHOW_PROCESS", "SHOW_CONSEQUENCE", "WARN"],
  "linkedin-founder": ["PROVOKE_REFLECTION", "HUMANIZE", "REVEAL", "TENSION", "SHOW_CONSEQUENCE"],
  website: ["EXPLAIN", "SHOW_PROCESS", "SEPARATE", "COMPARE", "MATERIALIZE_ABSTRACTION"],
};

const LINKEDIN_OPERATIONAL_STRATEGIES: readonly SceneStrategy[] = [
  "REAL_SITUATION", "HUMAN_DECISION", "CONSEQUENCE", "PROCESS", "ASSET_STRUCTURE",
  "GOVERNANCE_OPERATION", "DOCUMENT_EVIDENCE", "ARCHITECTURE",
];

export type VisualArgumentPlan = {
  causalScene: CausalScene;
  contentId: string;
  legalBindingId: string;
  channel?: VisualArgumentChannel;
  audience: string;
  realQuestion: string;
  conflict: string;
  consequence: string;
  learningGoal: string;
  visualFunction: VisualFunction;
  sceneStrategy: SceneStrategy;
  imageArgument: string;
  dominantVisualLogic: string;
  expectedPerception: string;
  subjectMode: SubjectMode;
  sceneSignature: string;
  legalAnchorKeys: readonly string[];
  castPattern?: string;
  motifKeys?: readonly string[];
  incompatibleFamilies?: readonly string[];
};

export type VisualArgumentBatchResult = {
  ok: boolean;
  errors: readonly string[];
  warnings: readonly string[];
  distinctFunctions: number;
  distinctSceneStrategies: number;
  distinctSubjectModes: number;
};

const normalize = (value: string): string => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const nonEmpty = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function visualArgumentFingerprint(plan: VisualArgumentPlan): string {
  return [plan.visualFunction, plan.sceneStrategy, plan.conflict, plan.consequence, plan.imageArgument]
    .map(normalize)
    .join("|");
}

export function visualFunctionChannelFit(
  visualFunction: VisualFunction,
  channel: VisualArgumentChannel,
): "PREFERRED" | "COMPATIBLE" {
  return CHANNEL_FUNCTION_PREFERENCES[channel].includes(visualFunction) ? "PREFERRED" : "COMPATIBLE";
}

export function validateVisualArgumentPlan(plan: VisualArgumentPlan): string[] {
  const errors: string[] = validateCausalScene(plan.causalScene, plan.subjectMode);
  for (const [field, value] of Object.entries({
    contentId: plan.contentId,
    legalBindingId: plan.legalBindingId,
    audience: plan.audience,
    realQuestion: plan.realQuestion,
    conflict: plan.conflict,
    consequence: plan.consequence,
    learningGoal: plan.learningGoal,
    imageArgument: plan.imageArgument,
    dominantVisualLogic: plan.dominantVisualLogic,
    expectedPerception: plan.expectedPerception,
    sceneSignature: plan.sceneSignature,
  })) {
    if (!nonEmpty(value)) errors.push(`${plan.contentId || "UNKNOWN"}: ${field} is required.`);
  }
  if (!VISUAL_FUNCTIONS.includes(plan.visualFunction)) errors.push(`${plan.contentId || "UNKNOWN"}: unsupported visualFunction.`);
  if (!SCENE_STRATEGIES.includes(plan.sceneStrategy)) errors.push(`${plan.contentId || "UNKNOWN"}: unsupported sceneStrategy.`);
  if (!SUBJECT_MODES.includes(plan.subjectMode)) errors.push(`${plan.contentId || "UNKNOWN"}: unsupported subjectMode.`);
  if (!plan.legalAnchorKeys?.length || plan.legalAnchorKeys.some((key) => !nonEmpty(key))) errors.push(`${plan.contentId || "UNKNOWN"}: at least one legalAnchorKey is required so the scene is anchored to the topic.`);
  if (HUMAN_CENTERED_SUBJECT_MODES.includes(plan.subjectMode) && !nonEmpty(plan.castPattern)) errors.push(`${plan.contentId || "UNKNOWN"}: human-centered scenes require castPattern so repeated people arrangements can be blocked.`);
  if (plan.channel && !VISUAL_ARGUMENT_CHANNELS.includes(plan.channel)) errors.push(`${plan.contentId || "UNKNOWN"}: unsupported channel.`);
  if (nonEmpty(plan.imageArgument) && normalize(plan.imageArgument) === normalize(plan.learningGoal)) {
    errors.push(`${plan.contentId}: imageArgument must translate the learning goal into a visual relation, not repeat it.`);
  }
  if (plan.sceneStrategy === "METAPHOR" && (!plan.motifKeys || plan.motifKeys.length === 0)) {
    errors.push(`${plan.contentId}: metaphor requires motifKeys so repetition can be measured.`);
  }
  return errors;
}

export function validateVisualArgumentBatch(
  plans: readonly VisualArgumentPlan[],
  options: {
    expectedSize?: number;
    minimumDistinctFunctions?: number;
    minimumDistinctSceneStrategies?: number;
    minimumDistinctSubjectModes?: number;
    maximumMetaphorShare?: number;
    maximumGeneralHumanCenteredShare?: number;
    mode?: string;
    carousel?: boolean;
    humanNeedJustification?: string;
  } = {},
): VisualArgumentBatchResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const expectedSize = options.expectedSize ?? plans.length;
  const continuity = options.carousel || options.mode?.startsWith("LINKEDIN_");
  const minimumDistinctFunctions = options.minimumDistinctFunctions ?? (continuity ? 1 : expectedSize >= 10 ? 5 : Math.min(3, expectedSize));
  const minimumDistinctSceneStrategies = options.minimumDistinctSceneStrategies ?? (continuity ? 1 : expectedSize >= 10 ? 5 : Math.min(3, expectedSize));
  const maximumMetaphorShare = options.maximumMetaphorShare ?? 0.3;
  const minimumDistinctSubjectModes = options.minimumDistinctSubjectModes ?? (options.mode && options.mode !== "LEGALMENTE_GENERAL" ? 1 : expectedSize >= 10 ? 6 : 1);
  const maximumGeneralHumanCenteredShare = options.maximumGeneralHumanCenteredShare ?? 0.4;

  if (plans.length !== expectedSize) errors.push(`Expected ${expectedSize} visual argument plans; received ${plans.length}.`);
  if (new Set(plans.map((plan) => plan.contentId)).size !== plans.length) errors.push("Visual argument plans require unique contentId values.");
  plans.forEach((plan) => errors.push(...validateVisualArgumentPlan(plan)));

  const physicalFingerprints = plans.filter(p => validateCausalScene(p.causalScene, p.subjectMode).length === 0).map(p => representationFingerprint(p.causalScene));
  if (new Set(physicalFingerprints).size !== physicalFingerprints.length) errors.push("REPRESENTATIONAL_NOVELTY: the same physical scene is reused across concepts; changing cast or style is insufficient.");
  const fingerprints = plans.map(visualArgumentFingerprint);
  if (new Set(fingerprints).size !== fingerprints.length) errors.push("Batch repeats the same visual argument; changing style later would not create substantive visual variety.");

  const distinctFunctions = new Set(plans.map((plan) => plan.visualFunction)).size;
  if (plans.length > 1 && distinctFunctions < minimumDistinctFunctions) warnings.push(`Batch uses only ${distinctFunctions} visual functions; at least ${minimumDistinctFunctions} are the exploratory target; concept fit takes precedence.`);

  const distinctSceneStrategies = new Set(plans.map((plan) => plan.sceneStrategy)).size;
  if (plans.length > 1 && distinctSceneStrategies < minimumDistinctSceneStrategies) warnings.push(`Batch uses only ${distinctSceneStrategies} scene strategies; exploratory target ${minimumDistinctSceneStrategies}, never force variety.`);

  const distinctSubjectModes = new Set(plans.map((plan) => plan.subjectMode)).size;
  if (plans.length > 1 && distinctSubjectModes < minimumDistinctSubjectModes) warnings.push(`Batch uses only ${distinctSubjectModes} subject modes; at least ${minimumDistinctSubjectModes} are the diversity target. Do not force an unsuitable subject: record the conceptual need and inspect the real batch.`);

  const sceneSignatures = plans.map((plan) => normalize(plan.sceneSignature)).filter(Boolean);
  if (new Set(sceneSignatures).size !== sceneSignatures.length) errors.push("Batch repeats the same scene signature; changing people, gender or style does not make the scene new.");

  const castPatterns = plans
    .filter((plan) => HUMAN_CENTERED_SUBJECT_MODES.includes(plan.subjectMode))
    .map((plan) => normalize(plan.castPattern ?? ""))
    .filter(Boolean);
  if (new Set(castPatterns).size !== castPatterns.length) errors.push("Batch repeats a human cast pattern; do not recycle the same pair, trio or meeting arrangement.");

  const generalPlans = plans.filter((plan) => options.mode === "LEGALMENTE_GENERAL" || (!options.mode && normalize(plan.audience).includes("legalmente general")));
  if (generalPlans.length >= 5) {
    const humanCenteredCount = generalPlans.filter((plan) => HUMAN_CENTERED_SUBJECT_MODES.includes(plan.subjectMode)).length;
    if (humanCenteredCount / generalPlans.length > maximumGeneralHumanCenteredShare && !nonEmpty(options.humanNeedJustification)) {
      errors.push(`LegalMente general overuses people-centered scenes (${humanCenteredCount}/${generalPlans.length}); maximum share is ${maximumGeneralHumanCenteredShare} unless the batch explicitly overrides it.`);
    }
  }

  const metaphorCount = plans.filter((plan) => plan.sceneStrategy === "METAPHOR").length;
  if (plans.length >= 4 && metaphorCount / plans.length > maximumMetaphorShare) warnings.push(`Metaphor is overused (${metaphorCount}/${plans.length}); it is one scene strategy, not the default visual grammar.`);

  const motifs = plans.flatMap((plan) => plan.motifKeys ?? []).map(normalize).filter(Boolean);
  if (new Set(motifs).size !== motifs.length) errors.push("Batch repeats a motif key; use cooldown/history before reusing keys, doors, shadows, cracks, scales or equivalent devices.");

  const linkedInPlans = plans.filter((plan) => plan.channel === "linkedin-legalmente");
  if (linkedInPlans.length >= 4) {
    const operationalCount = linkedInPlans.filter((plan) => LINKEDIN_OPERATIONAL_STRATEGIES.includes(plan.sceneStrategy)).length;
    if (operationalCount / linkedInPlans.length < 0.75) warnings.push("Legacy heuristic suggests 75% operational scenes for LinkedIn LegalMente; inspect conceptual fit: assets, processes, governance, evidence, consequences or real decisions.");
  }

  plans.forEach((plan) => {
    if (plan.channel && visualFunctionChannelFit(plan.visualFunction, plan.channel) === "COMPATIBLE") warnings.push(`${plan.contentId}: visual function ${plan.visualFunction} is compatible but not preferred for ${plan.channel}; human review should confirm the choice.`);
  });
  warnings.push("This preflight validates bindings, intent and diversity only; legal review, rendered-image QA and Founder curation remain mandatory.");
  return { ok: errors.length === 0, errors, warnings, distinctFunctions, distinctSceneStrategies, distinctSubjectModes };
}

export const VISUAL_ARGUMENT_INVARIANTS = Object.freeze({
  legalBindingPrecedesVisualInterpretation: true,
  realQuestionAndConsequencePrecedeStyle: true,
  imageMustCarryMeaningBeforeStyle: true,
  functionSelectedBeforeArtFamily: true,
  sceneStrategySelectedBeforeArtFamily: true,
  metaphorIsOptionalNotDefault: true,
  channelProfileGuidesFunctionChoice: true,
  nominalStyleChangeDoesNotProveNovelty: true,
  subjectModeVarietyRequired: true,
  repeatedHumanArrangementIsNotNovelty: true,
  legalAnchorMustCarryTopicMeaning: true,
  renderedQaStillRequired: true,
  humanCurationStillRequired: true,
});
