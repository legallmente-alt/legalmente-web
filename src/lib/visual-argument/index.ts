export const VISUAL_FUNCTIONS = [
  "EXPLAIN",
  "SEPARATE",
  "COMPARE",
  "REVEAL",
  "WARN",
  "TENSION",
  "HUMANIZE",
  "SHOW_PROCESS",
  "SHOW_CONSEQUENCE",
  "MATERIALIZE_ABSTRACTION",
  "PROVOKE_REFLECTION",
] as const;

export type VisualFunction = (typeof VISUAL_FUNCTIONS)[number];

export type VisualArgumentPlan = {
  contentId: string;
  audience: string;
  conflict: string;
  learningGoal: string;
  visualFunction: VisualFunction;
  imageArgument: string;
  expectedPerception: string;
  incompatibleFamilies?: readonly string[];
};

export type VisualArgumentBatchResult = {
  ok: boolean;
  errors: readonly string[];
  warnings: readonly string[];
  distinctFunctions: number;
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
  return [plan.visualFunction, plan.conflict, plan.learningGoal, plan.imageArgument]
    .map(normalize)
    .join("|");
}

export function validateVisualArgumentPlan(plan: VisualArgumentPlan): string[] {
  const errors: string[] = [];
  for (const [field, value] of Object.entries({
    contentId: plan.contentId,
    audience: plan.audience,
    conflict: plan.conflict,
    learningGoal: plan.learningGoal,
    imageArgument: plan.imageArgument,
    expectedPerception: plan.expectedPerception,
  })) {
    if (!nonEmpty(value)) errors.push(`${plan.contentId || "UNKNOWN"}: ${field} is required.`);
  }
  if (!VISUAL_FUNCTIONS.includes(plan.visualFunction)) {
    errors.push(`${plan.contentId || "UNKNOWN"}: unsupported visualFunction.`);
  }
  if (nonEmpty(plan.imageArgument) && normalize(plan.imageArgument) === normalize(plan.learningGoal)) {
    errors.push(`${plan.contentId}: imageArgument must translate the learning goal into a visual relation, not repeat it.`);
  }
  return errors;
}

export function validateVisualArgumentBatch(
  plans: readonly VisualArgumentPlan[],
  options: { expectedSize?: number; minimumDistinctFunctions?: number } = {},
): VisualArgumentBatchResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const expectedSize = options.expectedSize ?? plans.length;
  const minimumDistinctFunctions = options.minimumDistinctFunctions ?? (expectedSize >= 10 ? 5 : Math.min(3, expectedSize));

  if (plans.length !== expectedSize) errors.push(`Expected ${expectedSize} visual argument plans; received ${plans.length}.`);
  if (new Set(plans.map((plan) => plan.contentId)).size !== plans.length) errors.push("Visual argument plans require unique contentId values.");
  plans.forEach((plan) => errors.push(...validateVisualArgumentPlan(plan)));

  const fingerprints = plans.map(visualArgumentFingerprint);
  if (new Set(fingerprints).size !== fingerprints.length) {
    errors.push("Batch repeats the same visual argument; changing style later would not create substantive visual variety.");
  }

  const distinctFunctions = new Set(plans.map((plan) => plan.visualFunction)).size;
  if (plans.length > 1 && distinctFunctions < minimumDistinctFunctions) {
    errors.push(`Batch uses only ${distinctFunctions} visual functions; at least ${minimumDistinctFunctions} are required for this preflight.`);
  }

  warnings.push("This preflight validates intent and functional diversity only; rendered-image QA and human curation remain mandatory.");
  return { ok: errors.length === 0, errors, warnings, distinctFunctions };
}

export const VISUAL_ARGUMENT_INVARIANTS = Object.freeze({
  imageMustCarryMeaningBeforeStyle: true,
  functionSelectedBeforeArtFamily: true,
  nominalStyleChangeDoesNotProveNovelty: true,
  renderedQaStillRequired: true,
  humanCurationStillRequired: true,
});
