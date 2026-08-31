import wave01aManifest from "../../../public/internal-assets/legalmente/wave-01a/manifest.json";

export const reviewRegistryVersion = "wave-01a-review-registry-v1" as const;
export const internalReviewAssetRoot = "/internal-assets/legalmente/wave-01a" as const;

export type ReviewState = "HUMAN_REVIEW_REQUIRED";
export type RelatedContentState = "PENDING_MAPPING";
export type ReviewAssetFormat = "9:16" | "4:5";

export type InternalReviewAsset = {
  readonly driveFileId: string;
  readonly sourceName: string;
  readonly localPath: string;
  readonly format: ReviewAssetFormat;
  readonly width: number;
  readonly height: number;
};

export type InternalReviewUnit = {
  readonly contentId: string;
  readonly territory: string;
  readonly state: ReviewState;
  readonly relatedContent: RelatedContentState;
  readonly candidateRoute: string;
  readonly assets: readonly [InternalReviewAsset, InternalReviewAsset];
};

export type ReviewRegistryIssue = {
  readonly path: string;
  readonly message: string;
};

export type ReviewRegistryValidation =
  | { readonly ok: true; readonly registry: readonly InternalReviewUnit[]; readonly issues: readonly [] }
  | { readonly ok: false; readonly registry: readonly []; readonly issues: readonly ReviewRegistryIssue[] };

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function hasExpectedRatio(format: ReviewAssetFormat, width: number, height: number) {
  const expected = format === "9:16" ? 9 / 16 : 4 / 5;
  return Math.abs(width / height - expected) < 0.002;
}

function assetFormatFor(sourceName: string): ReviewAssetFormat | null {
  if (sourceName.endsWith("_visual.png")) return "9:16";
  if (sourceName.endsWith("_visual_4x5.png")) return "4:5";
  return null;
}

function localPathFor(sourceName: string) {
  return `${internalReviewAssetRoot}/${sourceName}`;
}

function issue(path: string, message: string): ReviewRegistryIssue {
  return { path, message };
}

function parseAsset(value: unknown, path: string): { asset: InternalReviewAsset } | { issue: ReviewRegistryIssue } {
  if (!isRecord(value)) return { issue: issue(path, "asset must be an object") };

  const driveFileId = value.driveFileId;
  const sourceName = value.sourceName;
  const width = value.width;
  const height = value.height;
  const format = isNonEmptyString(sourceName) ? assetFormatFor(sourceName) : null;

  if (!isNonEmptyString(driveFileId)) return { issue: issue(`${path}.driveFileId`, "Drive provenance is required") };
  if (!isNonEmptyString(sourceName)) return { issue: issue(`${path}.sourceName`, "sourceName is required") };
  if (!isPositiveInteger(width)) return { issue: issue(`${path}.width`, "width must be a positive integer") };
  if (!isPositiveInteger(height)) return { issue: issue(`${path}.height`, "height must be a positive integer") };
  if (!format) return { issue: issue(`${path}.sourceName`, "sourceName must identify a supported 9:16 or 4:5 asset") };
  if (!hasExpectedRatio(format, width, height)) return { issue: issue(path, `dimensions do not match ${format}`) };

  return {
    asset: {
      driveFileId,
      sourceName,
      localPath: localPathFor(sourceName),
      format,
      width,
      height,
    },
  };
}

function parseUnit(value: unknown, index: number): { unit: InternalReviewUnit } | { issue: ReviewRegistryIssue } {
  const path = `contentUnits[${index}]`;
  if (!isRecord(value)) return { issue: issue(path, "content unit must be an object") };

  const contentId = value.contentId;
  const territory = value.territory;
  const state = value.state;
  const relatedContent = value.relatedContent;
  const candidateRoute = value.candidateRoute;
  const assets = value.assets ?? [value.vertical, value.feed];

  if (!isNonEmptyString(contentId) || !/^LM-PC-\d{3}$/.test(contentId)) return { issue: issue(`${path}.contentId`, "contentId must use the LM-PC-000 format") };
  if (!isNonEmptyString(territory)) return { issue: issue(`${path}.territory`, "territory is required") };
  if (state !== "HUMAN_REVIEW_REQUIRED") return { issue: issue(`${path}.state`, "review state must remain HUMAN_REVIEW_REQUIRED") };
  if (relatedContent !== "PENDING_MAPPING") return { issue: issue(`${path}.relatedContent`, "unmapped content must remain PENDING_MAPPING") };
  if (!isNonEmptyString(candidateRoute) || !candidateRoute.startsWith("/")) return { issue: issue(`${path}.candidateRoute`, "candidateRoute must be an internal route path") };
  if (!Array.isArray(assets) || assets.length !== 2 || assets.some((asset) => !isRecord(asset))) return { issue: issue(`${path}.assets`, "exactly two internal assets are required") };

  const parsedAssets = assets.map((asset, assetIndex) => parseAsset(asset, `${path}.assets[${assetIndex}]`));
  const failed = parsedAssets.find((result): result is { issue: ReviewRegistryIssue } => "issue" in result);
  if (failed) return failed;

  const validAssets = parsedAssets.filter((result): result is { asset: InternalReviewAsset } => "asset" in result);
  const normalizedAssets = validAssets.map((result) => result.asset) as [InternalReviewAsset, InternalReviewAsset];
  const formats = new Set(normalizedAssets.map((asset) => asset.format));
  if (!formats.has("9:16") || !formats.has("4:5")) return { issue: issue(`${path}.assets`, "registry requires one 9:16 asset and one 4:5 asset") };

  return {
    unit: {
      contentId,
      territory,
      state,
      relatedContent,
      candidateRoute,
      assets: normalizedAssets,
    },
  };
}

export function validateReviewRegistry(raw: unknown, availablePaths?: readonly string[]): ReviewRegistryValidation {
  if (!isRecord(raw) || !Array.isArray(raw.contentUnits)) {
    return { ok: false, registry: [], issues: [issue("contentUnits", "manifest must contain a contentUnits array")] };
  }

  const parsed = raw.contentUnits.map((unit, index) => parseUnit(unit, index));
  const issues = parsed.flatMap((result) => ("issue" in result ? [result.issue] : []));
  if (issues.length > 0) return { ok: false, registry: [], issues };

  const registry = parsed.map((result) => ("unit" in result ? result.unit : null)).filter((unit): unit is InternalReviewUnit => unit !== null);
  const ids = new Set<string>();
  const duplicateIssues: ReviewRegistryIssue[] = [];
  for (const [index, unit] of registry.entries()) {
    if (ids.has(unit.contentId)) duplicateIssues.push(issue(`contentUnits[${index}].contentId`, `duplicate contentId: ${unit.contentId}`));
    ids.add(unit.contentId);
  }

  const missingPaths = (availablePaths ?? []).flatMap((path) => (path.startsWith("/") ? [] : [issue("availablePaths", `path must be absolute from public root: ${path}`)]));
  const unavailableAssets = registry.flatMap((unit, unitIndex) =>
    unit.assets.flatMap((asset, assetIndex) =>
      availablePaths && !availablePaths.includes(asset.localPath)
        ? [issue(`contentUnits[${unitIndex}].assets[${assetIndex}].localPath`, `local asset is unavailable: ${asset.localPath}`)]
        : [],
    ),
  );

  const allIssues = [...duplicateIssues, ...missingPaths, ...unavailableAssets];
  if (allIssues.length > 0) return { ok: false, registry: [], issues: allIssues };
  return { ok: true, registry, issues: [] };
}

export function assertReviewRegistry(raw: unknown, availablePaths?: readonly string[]): readonly InternalReviewUnit[] {
  const result = validateReviewRegistry(raw, availablePaths);
  if (!result.ok) {
    throw new Error(`Review registry validation failed: ${result.issues.map(({ path, message }) => `${path}: ${message}`).join("; ")}`);
  }
  return result.registry;
}

export const wave01aReviewRegistry = assertReviewRegistry(wave01aManifest);

export function getInternalReviewUnit(contentId: string) {
  return wave01aReviewRegistry.find((unit) => unit.contentId === contentId) ?? null;
}
