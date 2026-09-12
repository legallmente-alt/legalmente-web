import {
  validateProductionBatch,
  type ProductionBatchPolicy,
  type ProductionHistoryItem,
  type ProductionPiece,
} from "@/lib/production-policy";
import {
  routeGeneration,
  type ImageGeneratorAdapter,
  type VisualProductionUnit,
  type VisualRoute,
} from "@/lib/visual-factory";

export type VisualExecutionReceipt = {
  contentId: string;
  route: VisualRoute;
  provider: string;
  model: string;
  asset: string;
  publicationAuthorized: false;
};

export type VisualBatchExecution =
  | {
      status: "POLICY_BLOCKED" | "LEGAL_BLOCKED" | "BINDING_BLOCKED";
      errors: readonly string[];
      warnings: readonly string[];
      units: readonly VisualProductionUnit[];
      receipts: readonly [];
      publicationAuthorized: false;
    }
  | {
      status: "IMAGE_READY_FOR_QA";
      errors: readonly [];
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

/**
 * End-to-end provider-neutral execution boundary:
 * production policy -> binding check -> legal route -> provider generation.
 * It deliberately stops at IMAGE_READY_FOR_QA. QA, Founder review and
 * publication authorization remain separate human-governed gates.
 */
export async function executeVisualBatch(input: {
  pieces: readonly ProductionPiece[];
  units: readonly VisualProductionUnit[];
  history?: readonly ProductionHistoryItem[];
  policy: ProductionBatchPolicy;
  adapter: ImageGeneratorAdapter;
}): Promise<VisualBatchExecution> {
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

  const bindings = bindingErrors(input.pieces, input.units);
  if (bindings.length > 0) {
    return {
      status: "BINDING_BLOCKED",
      errors: bindings,
      warnings: policyResult.warnings,
      units: input.units,
      receipts: [],
      publicationAuthorized: false,
    };
  }

  const routes = input.units.map((unit) => ({ unit, route: routeGeneration(input.adapter, unit) }));
  const legalBlocks = routes.filter(({ route }) => route === "COPY_BLOCK");
  if (legalBlocks.length > 0) {
    return {
      status: "LEGAL_BLOCKED",
      errors: legalBlocks.map(({ unit }) => `${unit.CONTENT_ID}: legal state does not authorize image generation.`),
      warnings: policyResult.warnings,
      units: input.units,
      receipts: [],
      publicationAuthorized: false,
    };
  }

  const generatedUnits: VisualProductionUnit[] = [];
  const receipts: VisualExecutionReceipt[] = [];
  for (const { unit, route } of routes) {
    const generated = await input.adapter.generate({
      prompt: unit.GENERATION_PROMPT,
      width: unit.WIDTH,
      height: unit.HEIGHT,
      referenceAssets: unit.PROVENANCE.referenceAssets,
    });
    const nextUnit: VisualProductionUnit = {
      ...unit,
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
  }

  return {
    status: "IMAGE_READY_FOR_QA",
    errors: [],
    warnings: policyResult.warnings,
    units: generatedUnits,
    receipts,
    publicationAuthorized: false,
  };
}

export const VISUAL_RUNTIME_INVARIANTS = Object.freeze({
  policyValidationBeforeProviderCall: true,
  legalGateBeforeProviderCall: true,
  exactBindingBeforeProviderCall: true,
  generationNeverAuthorizesPublication: true,
  imageReadyStillRequiresQa: true,
});
