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
  motifKeys?: readonly string[];
  incompatibleFamilies?: readonly string[];
};

export type VisualArgumentBatchResult = {
  ok: boolean;
  errors: readonly string[];
  warnings: readonly string[];
  distinctFunctions: number;
  distinctSceneStrategies: number;
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
  const errors: string[] = [];
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
  })) {
    if (!nonEmpty(value)) errors.push(`${plan.contentId || "UNKNOWN"}: ${field} is required.`);
  }
  if (!VISUAL_FUNCTIONS.includes(plan.visualFunction)) errors.push(`${plan.contentId || "UNKNOWN"}: unsupported visualFunction.`);
  if (!SCENE_STRATEGIES.includes(plan.sceneStrategy)) errors.push(`${plan.contentId || "UNKNOWN"}: unsupported sceneStrategy.`);
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
  options: { expectedSize?: number; minimumDistinctFunctions?: number; minimumDistinctSceneStrategies?: number; maximumMetaphorShare?: number } = {},
): VisualArgumentBatchResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const expectedSize = options.expectedSize ?? plans.length;
  const minimumDistinctFunctions = options.minimumDistinctFunctions ?? (expectedSize >= 10 ? 5 : Math.min(3, expectedSize));
  const minimumDistinctSceneStrategies = options.minimumDistinctSceneStrategies ?? (expectedSize >= 10 ? 5 : Math.min(3, expectedSize));
  const maximumMetaphorShare = options.maximumMetaphorShare ?? 0.3;

  if (plans.length !== expectedSize) errors.push(`Expected ${expectedSize} visual argument plans; received ${plans.length}.`);
  if (new Set(plans.map((plan) => plan.contentId)).size !== plans.length) errors.push("Visual argument plans require unique contentId values.");
  plans.forEach((plan) => errors.push(...validateVisualArgumentPlan(plan)));

  const fingerprints = plans.map(visualArgumentFingerprint);
  if (new Set(fingerprints).size !== fingerprints.length) errors.push("Batch repeats the same visual argument; changing style later would not create substantive visual variety.");

  const distinctFunctions = new Set(plans.map((plan) => plan.visualFunction)).size;
  if (plans.length > 1 && distinctFunctions < minimumDistinctFunctions) errors.push(`Batch uses only ${distinctFunctions} visual functions; at least ${minimumDistinctFunctions} are required for this preflight.`);

  const distinctSceneStrategies = new Set(plans.map((plan) => plan.sceneStrategy)).size;
  if (plans.length > 1 && distinctSceneStrategies < minimumDistinctSceneStrategies) errors.push(`Batch uses only ${distinctSceneStrategies} scene strategies; at least ${minimumDistinctSceneStrategies} are required.`);

  const metaphorCount = plans.filter((plan) => plan.sceneStrategy === "METAPHOR").length;
  if (plans.length > 0 && metaphorCount / plans.length > maximumMetaphorShare) errors.push(`Metaphor is overused (${metaphorCount}/${plans.length}); it is one scene strategy, not the default visual grammar.`);

  const motifs = plans.flatMap((plan) => plan.motifKeys ?? []).map(normalize).filter(Boolean);
  if (new Set(motifs).size !== motifs.length) errors.push("Batch repeats a motif key; use cooldown/history before reusing keys, doors, shadows, cracks, scales or equivalent devices.");

  const linkedInPlans = plans.filter((plan) => plan.channel === "linkedin-legalmente");
  if (linkedInPlans.length >= 4) {
    const operationalCount = linkedInPlans.filter((plan) => LINKEDIN_OPERATIONAL_STRATEGIES.includes(plan.sceneStrategy)).length;
    if (operationalCount / linkedInPlans.length < 0.75) errors.push("LinkedIn LegalMente requires at least 75% operational scenes: assets, processes, governance, evidence, consequences or real decisions.");
  }

  plans.forEach((plan) => {
    if (plan.channel && visualFunctionChannelFit(plan.visualFunction, plan.channel) === "COMPATIBLE") warnings.push(`${plan.contentId}: visual function ${plan.visualFunction} is compatible but not preferred for ${plan.channel}; human review should confirm the choice.`);
  });
  warnings.push("This preflight validates bindings, intent and diversity only; legal review, rendered-image QA and Founder curation remain mandatory.");
  return { ok: errors.length === 0, errors, warnings, distinctFunctions, distinctSceneStrategies };
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
  renderedQaStillRequired: true,
  humanCurationStillRequired: true,
});
