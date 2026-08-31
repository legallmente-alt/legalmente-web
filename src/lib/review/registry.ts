import wave01aManifest from "../../../public/internal-assets/legalmente/wave-01a/manifest.json";

export const reviewRegistryVersion = "wave-01a-review-registry-v2" as const;
export const internalReviewAssetRoot = "/internal-assets/legalmente/wave-01a" as const;
export const internalReviewManifestPath = "public/internal-assets/legalmente/wave-01a/manifest.json" as const;

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
  readonly sha256: string;
};

export type InternalReviewUnit = {
  readonly contentId: string;
  readonly territory: string;
  readonly state: ReviewState;
  readonly relatedContent: RelatedContentState;
  readonly candidateRoute: string;
  readonly assets: readonly [InternalReviewAsset, InternalReviewAsset];
};

export type InternalReviewAssetAvailability = {
  readonly localPath: string;
  readonly sha256: string;
};

export type ReviewRegistryIssue = {
  readonly path: string;
  readonly message: string;
};

export type ReviewRegistryEvidence = {
  readonly provenance: "DRIVE_IDS_FROM_MANIFEST";
  readonly fileVerification: "MANIFEST_SHA256_DECLARED" | "LOCAL_PATH_AND_SHA256_MATCH";
  readonly changeHistory: "NOT_IMPLEMENTED";
  readonly signalTransport: "NOT_IMPLEMENTED";
  readonly approvalEvidence: "NOT_PRESENT";
};

export type ReviewRegistrySnapshot = {
  readonly version: typeof reviewRegistryVersion;
  readonly sourceManifest: typeof internalReviewManifestPath;
  readonly visibility: "internal-review-only";
  readonly units: readonly InternalReviewUnit[];
  readonly evidence: ReviewRegistryEvidence;
};

export type ReviewRegistryValidation =
  | { readonly ok: true; readonly registry: readonly InternalReviewUnit[]; readonly issues: readonly [] }
  | { readonly ok: false; readonly registry: readonly []; readonly issues: readonly ReviewRegistryIssue[] };

type RecordValue = Record<string, unknown>;
type ParsedAssetResult = { readonly asset: InternalReviewAsset } | { readonly issue: ReviewRegistryIssue };
type ParsedAssetListResult = { readonly assets: readonly [InternalReviewAsset, InternalReviewAsset] } | { readonly issue: ReviewRegistryIssue };

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isSha256(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function hasExpectedDimensions(format: ReviewAssetFormat, width: number, height: number) {
  return format === "9:16"
    ? width === 1440 && height === 2560
    : width === 1664 && height === 2080;
}

function assetFormatFor(sourceName: string, contentId: string): ReviewAssetFormat | null {
  if (sourceName === `${contentId}_visual.png`) return "9:16";
  if (sourceName === `${contentId}_visual_4x5.png`) return "4:5";
  return null;
}

function isSafeSourceName(value: unknown, contentId: string): value is string {
  return isNonEmptyString(value) && !value.includes("/") && !value.includes("\\") && !value.includes("..") && assetFormatFor(value, contentId) !== null;
}

function localPathFor(sourceName: string) {
  return `${internalReviewAssetRoot}/${sourceName}`;
}

function issue(path: string, message: string): ReviewRegistryIssue {
  return { path, message };
}

function isInternalCandidateRoute(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  if (value === "/") return true;
  return /^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/.test(value);
}

function parseAsset(value: unknown, path: string, contentId: string): ParsedAssetResult {
  if (!isRecord(value)) return { issue: issue(path, "asset must be an object") };

  const driveFileId = value.driveFileId;
  const sourceName = value.sourceName;
  const width = value.width;
  const height = value.height;
  const sha256 = value.sha256;
  const format = isNonEmptyString(sourceName) ? assetFormatFor(sourceName, contentId) : null;

  if (!isNonEmptyString(driveFileId)) return { issue: issue(`${path}.driveFileId`, "Drive provenance is required") };
  if (!isNonEmptyString(sourceName)) return { issue: issue(`${path}.sourceName`, "sourceName is required") };
  if (sourceName.includes("/") || sourceName.includes("\\") || sourceName.includes("..")) return { issue: issue(`${path}.sourceName`, "sourceName must be a basename without traversal") };
  if (!isPositiveInteger(width)) return { issue: issue(`${path}.width`, "width must be a positive integer") };
  if (!isPositiveInteger(height)) return { issue: issue(`${path}.height`, "height must be a positive integer") };
  if (!format) return { issue: issue(`${path}.sourceName`, `sourceName must match ${contentId}_visual.png or ${contentId}_visual_4x5.png`) };
  if (!hasExpectedDimensions(format, width, height)) return { issue: issue(path, `dimensions do not match the Wave 01A ${format} contract`) };
  if (!isSha256(sha256)) return { issue: issue(`${path}.sha256`, "sha256 must be a lowercase 64-character digest") };

  return {
    asset: {
      driveFileId,
      sourceName,
      localPath: localPathFor(sourceName),
      format,
      width,
      height,
      sha256,
    },
  };
}

function parseAssetList(value: unknown, path: string, contentId: string): ParsedAssetListResult {
  if (!Array.isArray(value) || value.length !== 2 || value.some((asset) => !isRecord(asset))) {
    return { issue: issue(path, "exactly two internal assets are required") };
  }

  const parsedAssets = value.map((asset, assetIndex) => parseAsset(asset, `${path}[${assetIndex}]`, contentId));
  const failed = parsedAssets.find((result): result is { readonly issue: ReviewRegistryIssue } => "issue" in result);
  if (failed) return failed;

  const validAssets = parsedAssets.filter((result): result is { readonly asset: InternalReviewAsset } => "asset" in result);
  const normalizedAssets = validAssets.map((result) => result.asset) as [InternalReviewAsset, InternalReviewAsset];
  const formats = new Set(normalizedAssets.map((asset) => asset.format));
  if (!formats.has("9:16") || !formats.has("4:5")) return { issue: issue(path, "registry requires one 9:16 asset and one 4:5 asset") };

  return { assets: normalizedAssets };
}

function sameAsset(left: InternalReviewAsset, right: InternalReviewAsset) {
  return left.driveFileId === right.driveFileId &&
    left.sourceName === right.sourceName &&
    left.width === right.width &&
    left.height === right.height &&
    left.sha256 === right.sha256;
}

function sameAssetList(left: readonly InternalReviewAsset[], right: readonly InternalReviewAsset[]) {
  return left.length === right.length && left.every((asset, index) => sameAsset(asset, right[index]));
}

function parseUnit(value: unknown, index: number): { readonly unit: InternalReviewUnit } | { readonly issue: ReviewRegistryIssue } {
  const path = `contentUnits[${index}]`;
  if (!isRecord(value)) return { issue: issue(path, "content unit must be an object") };

  const contentId = value.contentId;
  const territory = value.territory;
  const state = value.state;
  const relatedContent = value.relatedContent;
  const candidateRoute = value.candidateRoute;
  const hasExplicitAssets = Object.prototype.hasOwnProperty.call(value, "assets");
  const hasLegacyAssets = Object.prototype.hasOwnProperty.call(value, "vertical") || Object.prototype.hasOwnProperty.call(value, "feed");

  if (!isNonEmptyString(contentId) || !/^LM-PC-\d{3}$/.test(contentId)) return { issue: issue(`${path}.contentId`, "contentId must use the LM-PC-000 format") };
  if (!isNonEmptyString(territory)) return { issue: issue(`${path}.territory`, "territory is required") };
  if (state !== "HUMAN_REVIEW_REQUIRED") return { issue: issue(`${path}.state`, "review state must remain HUMAN_REVIEW_REQUIRED") };
  if (relatedContent !== "PENDING_MAPPING") return { issue: issue(`${path}.relatedContent`, "unmapped content must remain PENDING_MAPPING") };
  if (!isInternalCandidateRoute(candidateRoute)) return { issue: issue(`${path}.candidateRoute`, "candidateRoute must be a single internal route path without traversal, query, hash, host, spaces, or backslashes") };
  if (!hasExplicitAssets && !hasLegacyAssets) return { issue: issue(`${path}.assets`, "an assets array or vertical/feed pair is required") };

  const explicitAssets = hasExplicitAssets ? parseAssetList(value.assets, `${path}.assets`, contentId) : null;
  const legacyAssets = hasLegacyAssets ? parseAssetList([value.vertical, value.feed], `${path}.vertical-feed`, contentId) : null;
  if (explicitAssets && "issue" in explicitAssets) return explicitAssets;
  if (legacyAssets && "issue" in legacyAssets) return legacyAssets;
  if (explicitAssets && legacyAssets && !sameAssetList(explicitAssets.assets, legacyAssets.assets)) {
    return { issue: issue(`${path}.assets`, "assets contradict the legacy vertical/feed representation") };
  }

  const parsedAssets = explicitAssets?.assets ?? legacyAssets?.assets;
  if (!parsedAssets) return { issue: issue(`${path}.assets`, "assets could not be normalized") };

  return {
    unit: {
      contentId,
      territory,
      state,
      relatedContent,
      candidateRoute,
      assets: parsedAssets,
    },
  };
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
  for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  return Object.freeze(value);
}

function sourceNamesFromManifest(raw: unknown): readonly string[] {
  if (!isRecord(raw) || !Array.isArray(raw.contentUnits)) return [];
  const names = raw.contentUnits.flatMap((unit) => {
    if (!isRecord(unit)) return [];
    const assets = Array.isArray(unit.assets) ? unit.assets : [unit.vertical, unit.feed];
    return assets.flatMap((asset) => isRecord(asset) && isNonEmptyString(asset.sourceName) ? [asset.sourceName] : []);
  });
  return [...new Set(names)];
}

export function getManifestAssetAvailability(raw: unknown): readonly InternalReviewAssetAvailability[] {
  if (!isRecord(raw) || !Array.isArray(raw.contentUnits)) return [];
  return raw.contentUnits.flatMap((unit) => {
    if (!isRecord(unit)) return [];
    const contentId = isNonEmptyString(unit.contentId) ? unit.contentId : "";
    const assets = Array.isArray(unit.assets) ? unit.assets : [unit.vertical, unit.feed];
    return assets.flatMap((asset) => {
      if (!isRecord(asset) || !isNonEmptyString(asset.sourceName) || !isSafeSourceName(asset.sourceName, contentId) || !isSha256(asset.sha256)) return [];
      return [{ localPath: localPathFor(asset.sourceName), sha256: asset.sha256 }];
    });
  });
}

export function validateReviewRegistry(raw: unknown, availableAssets?: readonly InternalReviewAssetAvailability[]): ReviewRegistryValidation {
  if (!isRecord(raw) || !Array.isArray(raw.contentUnits)) {
    return { ok: false, registry: [], issues: [issue("contentUnits", "manifest must contain a contentUnits array")] };
  }

  const manifestIssues: ReviewRegistryIssue[] = [];
  if (raw.visibility !== "internal-review-only") manifestIssues.push(issue("visibility", "manifest visibility must remain internal-review-only"));
  if (raw.contentUnits.length === 0) manifestIssues.push(issue("contentUnits", "manifest cannot be empty"));
  if (!availableAssets) manifestIssues.push(issue("availableAssets", "local asset availability and SHA-256 must be verified before the registry can be valid"));

  const parsed = raw.contentUnits.map((unit, index) => parseUnit(unit, index));
  const parseIssues = parsed.flatMap((result) => ("issue" in result ? [result.issue] : []));
  if (manifestIssues.length > 0 || parseIssues.length > 0) {
    return { ok: false, registry: [], issues: [...manifestIssues, ...parseIssues] };
  }

  const registry = parsed.map((result) => ("unit" in result ? result.unit : null)).filter((unit): unit is InternalReviewUnit => unit !== null);
  const driveIds = new Map<string, string>();
  const localPaths = new Map<string, string>();
  const duplicateIssues: ReviewRegistryIssue[] = [];
  for (const [unitIndex, unit] of registry.entries()) {
    for (const [assetIndex, asset] of unit.assets.entries()) {
      const assetPath = `contentUnits[${unitIndex}].assets[${assetIndex}]`;
      const priorDrivePath = driveIds.get(asset.driveFileId);
      if (priorDrivePath) duplicateIssues.push(issue(`${assetPath}.driveFileId`, `Drive ID already used at ${priorDrivePath}; shared assets require an explicit shared-asset contract`));
      else driveIds.set(asset.driveFileId, `${assetPath}.driveFileId`);

      const priorLocalPath = localPaths.get(asset.localPath);
      if (priorLocalPath) duplicateIssues.push(issue(`${assetPath}.localPath`, `local asset already used at ${priorLocalPath}; duplicate association is not allowed in Wave 01A`));
      else localPaths.set(asset.localPath, `${assetPath}.localPath`);
    }
  }

  const availabilityByPath = new Map<string, string>();
  const availabilityIssues: ReviewRegistryIssue[] = [];
  for (const [index, entry] of (availableAssets ?? []).entries()) {
    if (!isRecord(entry) || !isNonEmptyString(entry.localPath) || !isSha256(entry.sha256)) {
      availabilityIssues.push(issue(`availableAssets[${index}]`, "availability must contain an absolute localPath and a lowercase SHA-256 digest"));
      continue;
    }
    if (!entry.localPath.startsWith(`${internalReviewAssetRoot}/`)) availabilityIssues.push(issue(`availableAssets[${index}].localPath`, `localPath must stay inside ${internalReviewAssetRoot}`));
    if (availabilityByPath.has(entry.localPath)) availabilityIssues.push(issue(`availableAssets[${index}].localPath`, `duplicate availability path: ${entry.localPath}`));
    availabilityByPath.set(entry.localPath, entry.sha256);
  }

  const fileIssues = registry.flatMap((unit, unitIndex) =>
    unit.assets.flatMap((asset, assetIndex) => {
      const actualSha256 = availabilityByPath.get(asset.localPath);
      if (!actualSha256) return [issue(`contentUnits[${unitIndex}].assets[${assetIndex}].localPath`, `local asset is unavailable or was not checked: ${asset.localPath}`)];
      if (actualSha256 !== asset.sha256) return [issue(`contentUnits[${unitIndex}].assets[${assetIndex}].sha256`, `local asset hash does not match the manifest: ${asset.localPath}`)];
      return [];
    }),
  );

  const allIssues = [...duplicateIssues, ...availabilityIssues, ...fileIssues];
  if (allIssues.length > 0) return { ok: false, registry: [], issues: allIssues };
  return { ok: true, registry, issues: [] };
}

export function assertReviewRegistry(raw: unknown, availableAssets?: readonly InternalReviewAssetAvailability[]): readonly InternalReviewUnit[] {
  const result = validateReviewRegistry(raw, availableAssets);
  if (!result.ok) {
    throw new Error(`Review registry validation failed: ${result.issues.map(({ path, message }) => `${path}: ${message}`).join("; ")}`);
  }
  return deepFreeze(result.registry);
}

export const wave01aManifestAvailability = deepFreeze(getManifestAssetAvailability(wave01aManifest));

export const wave01aReviewSnapshot: ReviewRegistrySnapshot = deepFreeze({
  version: reviewRegistryVersion,
  sourceManifest: internalReviewManifestPath,
  visibility: "internal-review-only",
  units: assertReviewRegistry(wave01aManifest, wave01aManifestAvailability),
  evidence: {
    provenance: "DRIVE_IDS_FROM_MANIFEST",
    fileVerification: "MANIFEST_SHA256_DECLARED",
    changeHistory: "NOT_IMPLEMENTED",
    signalTransport: "NOT_IMPLEMENTED",
    approvalEvidence: "NOT_PRESENT",
  },
});

export const wave01aReviewRegistry = wave01aReviewSnapshot.units;

export function getInternalReviewUnit(contentId: string) {
  return wave01aReviewRegistry.find((unit) => unit.contentId === contentId) ?? null;
}
