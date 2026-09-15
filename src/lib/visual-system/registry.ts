import type { VisualProductionState } from "@/lib/visual-factory";
import { productionAssets } from "./assets";

export type AssetNamespace = "LM-PC" | "LM-PA";
export type RegistryAsset = {
  contentId: string;
  namespace: AssetNamespace;
  surface: string;
  role: string;
  format: string;
  state: VisualProductionState | "PRODUCTION_PROOF";
  src: string;
  alt: string;
  publicationAuthorized: boolean;
};

/**
 * Single query surface for visual assets. Social content is deliberately not
 * promoted into web/product surfaces unless an explicit registry entry exists.
 */
export const visualAssetRegistry: readonly RegistryAsset[] = productionAssets.map((asset) => ({
  contentId: asset.id,
  namespace: "LM-PA" as const,
  surface: asset.surface,
  role: asset.role,
  format: asset.primaryFormat,
  state: asset.status,
  src: asset.repoPath,
  alt: `${asset.role} — ${asset.surface}`,
  publicationAuthorized: false,
}));

export function queryVisualAssets(query: Partial<Pick<RegistryAsset, "contentId" | "namespace" | "surface" | "role" | "format" | "state">>) {
  return visualAssetRegistry.filter((asset) =>
    Object.entries(query).every(([key, value]) => asset[key as keyof RegistryAsset] === value),
  );
}

export function getApprovedWebAsset(contentId: string) {
  return visualAssetRegistry.find(
    (asset) => asset.contentId === contentId && asset.namespace === "LM-PA" && asset.publicationAuthorized,
  ) ?? null;
}
