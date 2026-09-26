import { memoryReviewErrors, type MemorySnapshot } from "./memory";
import { artifactErrors, compileProductionPrompt, validateEditorialContract, type ArtifactEvidence } from "./contract";
import {
  validateProductionBatch,
  type ProductionBatchPolicy,
  type ProductionHistoryItem,
  type ProductionPiece,
} from "@/lib/production-policy";
import {
  routeGeneration,
  evaluateQa,
  type VisualQaResult,
  type ImageGeneratorAdapter,
  type VisualProductionUnit,
  type VisualRoute,
} from "@/lib/visual-factory";
import {
  validateVisualArgumentBatch,
  type VisualArgumentPlan,
} from "@/lib/visual-argument";

export type VisualExecutionReceipt = {
  contentId: string;
  route: VisualRoute;
  provider: string;
  model: string;
  asset: string;
  publicationAuthorized: false;
};

export type VisualBatchExecution = {
  status: "GENERATION_READY" | "MEMORY_BLOCKED" | "POLICY_BLOCKED" | "VISUAL_ARGUMENT_BLOCKED" | "LEGAL_BLOCKED" | "BINDING_BLOCKED" | "PROVIDER_BLOCKED" | "PROVIDER_FAILED" | "ARTIFACT_BLOCKED" | "IMAGE_READY_FOR_QA" | "QA_BLOCKED" | "READY_FOR_HUMAN_VISUAL_REVIEW";
  errors: readonly string[];
  warnings: readonly string[];
  units: readonly VisualProductionUnit[];
  receipts: readonly VisualExecutionReceipt[];
  publicationAuthorized: false;
};

function bindingErrors(pieces: readonly ProductionPiece[], units: readonly VisualProductionUnit[]): string[] {
  const errors: string[] = [];
  const unitIds = new Set(units.map((unit) => unit.CONTENT_ID));
  if (unitIds.size !== units.length) errors.push("Visual production units must have unique CONTENT_ID values.");
  for (const piece of pieces) {
    const unit = units.find((candidate) => candidate.CONTENT_ID === piece.id);
    if (!unit) {
      errors.push(`${piece.id}: no VisualProductionUnit is bound to this production piece.`);
      continue;
    }
    errors.push(...validateEditorialContract(piece, unit));
    if (unit.FORMAT !== piece.format) errors.push(`${piece.id}: visual unit format ${unit.FORMAT} does not match policy format ${piece.format}.`);
    if (unit.ART_DIRECTION !== piece.artisticStyle) errors.push(`${piece.id}: visual unit art direction does not match the validated production style.`);
    if (unit.VISUAL_METAPHOR !== piece.visualMetaphor) errors.push(`${piece.id}: visual metaphor changed after policy validation.`);
    if (unit.SCENE !== piece.scenario) errors.push(`${piece.id}: visual scene changed after policy validation.`);
    if (unit.BRAND_OBJECT !== piece.brandObject) errors.push(`${piece.id}: brand object changed after policy validation.`);
  }
  for (const unit of units) {
    if (!pieces.some((piece) => piece.id === unit.CONTENT_ID)) errors.push(`${unit.CONTENT_ID}: visual unit has no validated production piece.`);
  }
  return errors;
}

function visualArgumentBindingErrors(plans: readonly VisualArgumentPlan[], units: readonly VisualProductionUnit[]): string[] {
  const errors: string[] = [];
  for (const unit of units) {
    const plan = plans.find((candidate) => candidate.contentId === unit.CONTENT_ID);
    if (!plan) {
      errors.push(`${unit.CONTENT_ID}: no VisualArgumentPlan is bound to this production unit.`);
      continue;
    }
    if (!unit.CLAIM_REFS.includes(plan.legalBindingId)) {
      errors.push(`${unit.CONTENT_ID}: visual legalBindingId is not present in the unit CLAIM_REFS.`);
    }
  }
  for (const plan of plans) {
    if (!units.some((unit) => unit.CONTENT_ID === plan.contentId)) errors.push(`${plan.contentId}: visual argument has no production unit.`);
  }
  return errors;
}

/**
 * End-to-end provider-neutral execution boundary:
 * production policy -> binding check -> legal route -> provider generation.
 * It deliberately stops at IMAGE_READY_FOR_QA. QA, Founder review and
 * publication authorization remain separate human-governed gates.
 */
export type VisualBatchInput = {
  pieces: readonly ProductionPiece[];
  units: readonly VisualProductionUnit[];
  visualArguments: readonly VisualArgumentPlan[];
  history?: readonly ProductionHistoryItem[];
  policy: ProductionBatchPolicy;
  adapter: ImageGeneratorAdapter;
  inspectArtifact: (asset: string) => Promise<ArtifactEvidence>;
  reviewArtifact?: (unit: VisualProductionUnit) => Promise<VisualQaResult>;
  memory: MemorySnapshot;
  memoryReview: Parameters<typeof memoryReviewErrors>[1];
};

export function prepareVisualBatch(input: VisualBatchInput): VisualBatchExecution {
  const memoryErrors = input.memory && input.memoryReview
    ? memoryReviewErrors(input.memory, input.memoryReview, input.pieces.map((piece) => piece.topic), input.policy.now ?? new Date().toISOString())
    : ["A current canonical memory snapshot and its semantic review are required."];
  if (memoryErrors.length) return { status: "MEMORY_BLOCKED", errors: memoryErrors, warnings: [], units: input.units, receipts: [], publicationAuthorized: false };
  const policyResult = validateProductionBatch(input.pieces, input.history ?? [], input.policy);
  if (!policyResult.ok) {
    return {
      status: "POLICY_BLOCKED",
      errors: policyResult.errors,
      warnings: policyResult.warnings,
      units: input.units,
      receipts: [],
      publicationAuthorized: false,
    };
  }

  const visualArgumentResult = validateVisualArgumentBatch(input.visualArguments, {
    expectedSize: input.pieces.length,
  });
  if (!visualArgumentResult.ok) {
    return {
      status: "VISUAL_ARGUMENT_BLOCKED",
      errors: visualArgumentResult.errors,
      warnings: [...policyResult.warnings, ...visualArgumentResult.warnings],
      units: input.units,
      receipts: [],
      publicationAuthorized: false,
    };
  }

  const bindings = [
    ...bindingErrors(input.pieces, input.units),
    ...visualArgumentBindingErrors(input.visualArguments, input.units),
  ];
  if (bindings.length > 0) {
    return {
      status: "BINDING_BLOCKED",
      errors: bindings,
      warnings: [...policyResult.warnings, ...visualArgumentResult.warnings],
      units: input.units,
      receipts: [],
      publicationAuthorized: false,
    };
  }

  if (/higgsfield/i.test(input.adapter.name + " " + input.adapter.model)) return {
    status: "PROVIDER_BLOCKED", errors: ["Provider excluded by Founder instruction."], warnings: policyResult.warnings, units: input.units, receipts: [], publicationAuthorized: false,
  };
  const routes = input.units.map((unit) => ({ unit, route: routeGeneration(input.adapter, unit) }));
  const legalBlocks = routes.filter(({ route }) => route === "COPY_BLOCK");
  if (legalBlocks.length > 0) {
    return {
      status: "LEGAL_BLOCKED",
      errors: legalBlocks.map(({ unit }) => `${unit.CONTENT_ID}: legal state does not authorize image generation.`),
      warnings: [...policyResult.warnings, ...visualArgumentResult.warnings],
      units: input.units,
      receipts: [],
      publicationAuthorized: false,
    };
  }

  return { status: "GENERATION_READY", errors: [], warnings: [...policyResult.warnings, ...visualArgumentResult.warnings],
    units: input.units.map((unit) => ({ ...unit, GENERATION_PROMPT: compileProductionPrompt(input.pieces.find((piece) => piece.id === unit.CONTENT_ID)!, unit, input.visualArguments.find((plan) => plan.contentId === unit.CONTENT_ID)!, input.adapter.capabilities.text) })),
    receipts: [], publicationAuthorized: false };
}

export async function executeVisualBatch(input: VisualBatchInput): Promise<VisualBatchExecution> {
  const prepared = prepareVisualBatch(input);
  if (prepared.status !== "GENERATION_READY") return prepared;
  const policyResult = { warnings: prepared.warnings };
  const visualArgumentResult = { warnings: [] as string[] };
  const routes = prepared.units.map((unit) => ({ unit, route: routeGeneration(input.adapter, unit) }));
  const generatedUnits: VisualProductionUnit[] = [];
  const receipts: VisualExecutionReceipt[] = [];
  for (const { unit, route } of routes) {
    const piece = input.pieces.find((item) => item.id === unit.CONTENT_ID)!;
    const argument = input.visualArguments.find((item) => item.contentId === unit.CONTENT_ID)!;
    const prompt = compileProductionPrompt(piece, unit, argument, input.adapter.capabilities.text);
    let generated;
    try { generated = await input.adapter.generate({
      prompt,
      width: unit.WIDTH,
      height: unit.HEIGHT,
      referenceAssets: unit.PROVENANCE.referenceAssets,
    }); } catch (error) {
      return { status: "PROVIDER_FAILED", errors: [`${unit.CONTENT_ID}: provider failed: ${String(error)}`], warnings: policyResult.warnings, units: generatedUnits, receipts, publicationAuthorized: false };
    }
    let measured;
    try { measured = await input.inspectArtifact(generated.asset); } catch (error) {
      return { status: "ARTIFACT_BLOCKED", errors: [`${unit.CONTENT_ID}: artifact inspection failed: ${String(error)}`], warnings: policyResult.warnings, units: generatedUnits, receipts, publicationAuthorized: false };
    }
    const measuredErrors = artifactErrors(measured, unit);
    if (measured.asset !== generated.asset) measuredErrors.push("Artifact inspection refers to another asset.");
    if (measuredErrors.length) return { status: "ARTIFACT_BLOCKED", errors: measuredErrors, warnings: policyResult.warnings, units: generatedUnits, receipts: [...receipts, { contentId: unit.CONTENT_ID, route, provider: input.adapter.name, model: input.adapter.model, asset: generated.asset, publicationAuthorized: false }], publicationAuthorized: false };
    const nextUnit: VisualProductionUnit = {
      ...unit,
      GENERATION_PROMPT: prompt,
      HASH: measured.sha256,
      GENERATOR: input.adapter.name,
      MODEL: input.adapter.model,
      BASE_ASSET: route === "PROGRAMMATIC_TEXT_COMPOSITION" ? generated.asset : unit.BASE_ASSET,
      COMPOSED_ASSET: route === "FULL_COMPOSITE_GENERATION" ? generated.asset : unit.COMPOSED_ASSET,
      STATE: "IMAGE_READY",
      PROVENANCE: {
        ...unit.PROVENANCE,
        createdBy: `${input.adapter.name}/${input.adapter.model}`,
      },
    };
    generatedUnits.push(nextUnit);
    receipts.push({
      contentId: unit.CONTENT_ID,
      route,
      provider: input.adapter.name,
      model: input.adapter.model,
      asset: generated.asset,
      publicationAuthorized: false,
    });
    // One real image at a time: a base-only asset or absent review pauses the batch.
    if (route !== "FULL_COMPOSITE_GENERATION" || !input.reviewArtifact) return {
      status: "IMAGE_READY_FOR_QA", errors: [], warnings: [...policyResult.warnings, "Batch paused: inspect this image and compose base-only art before continuing."], units: generatedUnits, receipts, publicationAuthorized: false,
    };
    let qa;
    try { qa = await input.reviewArtifact(nextUnit); } catch (error) {
      return { status: "QA_BLOCKED", errors: [`QA failed: ${String(error)}`], warnings: policyResult.warnings, units: generatedUnits, receipts, publicationAuthorized: false };
    }
    const reviewed = evaluateQa(nextUnit, qa);
    generatedUnits[generatedUnits.length - 1] = reviewed;
    if (reviewed.STATE !== "READY_FOR_HUMAN_VISUAL_REVIEW") return {
      status: "QA_BLOCKED", errors: [`${unit.CONTENT_ID}: actual image requires correction before the next piece.`], warnings: policyResult.warnings, units: generatedUnits, receipts, publicationAuthorized: false,
    };
  }

  return {
    status: "READY_FOR_HUMAN_VISUAL_REVIEW",
    errors: [],
    warnings: [...policyResult.warnings, ...visualArgumentResult.warnings],
    units: generatedUnits,
    receipts,
    publicationAuthorized: false,
  };
}

export const VISUAL_RUNTIME_INVARIANTS = Object.freeze({
  policyValidationBeforeProviderCall: true,
  legalGateBeforeProviderCall: true,
  exactBindingBeforeProviderCall: true,
  visualArgumentBeforeProviderCall: true,
  generationNeverAuthorizesPublication: true,
  imageReadyStillRequiresQa: true,
});
