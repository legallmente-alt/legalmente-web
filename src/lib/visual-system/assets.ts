export type ArtLane = "UMBRAL_CLARO" | "ARCHIVO_VIVO" | "SENAL_EN_TRANSITO" | "CADENA_DE_CUSTODIA_DOMESTICA";
export type ProductionAssetStatus = "PRODUCTION_PROOF";
export type BinaryAvailability = "PENDING_BINARY_IMPORT" | "LOCAL";

export type ProductionAsset = {
  id: string;
  role: "WORLD_CATEGORY" | "SERIES" | "TOOL_PREPARATION" | "TRUST_SOURCE_TERRITORY" | "EDITORIAL_CONTENT";
  surface: string;
  artLane: ArtLane;
  primaryFormat: "16:9" | "4:5" | "9:16" | "1:1";
  assetFile: string;
  repoPath: string;
  textZone: string;
  safeArea: string;
  mobileQa: "PASS_360PX_VISUAL_QA";
  pseudotext: "PASS_NO_BAKED_LEGAL_COPY";
  status: ProductionAssetStatus;
  availability: BinaryAvailability;
};

const pathFor = (file: string) => `/production-assets/${file}`;

export const productionAssets: readonly ProductionAsset[] = [
  { id: "LM-PA-W01", role: "WORLD_CATEGORY", surface: "home_hero_web", artLane: "UMBRAL_CLARO", primaryFormat: "16:9", assetFile: "LM-PA-W01_HOME_reference.png", repoPath: pathFor("LM-PA-W01_HOME_reference.png"), textZone: "upper-left negative space", safeArea: "center object and both upper corners", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-W02", role: "WORLD_CATEGORY", surface: "history_landing", artLane: "ARCHIVO_VIVO", primaryFormat: "16:9", assetFile: "LM-PA-W02_HISTORY.png", repoPath: pathFor("LM-PA-W02_HISTORY.png"), textZone: "top-left or top-center", safeArea: "wide upper and lower breathing room", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-W03", role: "WORLD_CATEGORY", surface: "cinema_law_landing", artLane: "SENAL_EN_TRANSITO", primaryFormat: "4:5", assetFile: "LM-PA-W03_CINEMA_LAW.png", repoPath: pathFor("LM-PA-W03_CINEMA_LAW.png"), textZone: "upper-left", safeArea: "beam-to-object causal line", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-W04", role: "WORLD_CATEGORY", surface: "evidence_landing", artLane: "CADENA_DE_CUSTODIA_DOMESTICA", primaryFormat: "16:9", assetFile: "LM-PA-W04_EVIDENCE.png", repoPath: pathFor("LM-PA-W04_EVIDENCE.png"), textZone: "lower-left", safeArea: "center and lower third", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-S01", role: "SERIES", surface: "before_signing_social_video", artLane: "UMBRAL_CLARO", primaryFormat: "9:16", assetFile: "LM-PA-S01_BEFORE_SIGNING.png", repoPath: pathFor("LM-PA-S01_BEFORE_SIGNING.png"), textZone: "upper-center", safeArea: "central object and upper third", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-S02", role: "SERIES", surface: "vacaciones_social", artLane: "SENAL_EN_TRANSITO", primaryFormat: "4:5", assetFile: "LM-PA-S02_VACACIONES.png", repoPath: pathFor("LM-PA-S02_VACACIONES.png"), textZone: "upper-left", safeArea: "green state and central page", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-S03", role: "SERIES", surface: "aguinaldo_social", artLane: "CADENA_DE_CUSTODIA_DOMESTICA", primaryFormat: "4:5", assetFile: "LM-PA-S03_AGUINALDO.png", repoPath: pathFor("LM-PA-S03_AGUINALDO.png"), textZone: "top third", safeArea: "central envelope and blank card", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-S04", role: "SERIES", surface: "finiquito_social_video", artLane: "ARCHIVO_VIVO", primaryFormat: "9:16", assetFile: "LM-PA-S04_FINiquito.png", repoPath: pathFor("LM-PA-S04_FINiquito.png"), textZone: "lower third", safeArea: "three modules and sealed folder", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-T01", role: "TOOL_PREPARATION", surface: "checklist_tool_tile", artLane: "ARCHIVO_VIVO", primaryFormat: "1:1", assetFile: "LM-PA-T01_CHECKLIST.png", repoPath: pathFor("LM-PA-T01_CHECKLIST.png"), textZone: "lower-right", safeArea: "center and right side", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-T02", role: "TOOL_PREPARATION", surface: "source_reader_web", artLane: "UMBRAL_CLARO", primaryFormat: "16:9", assetFile: "LM-PA-T02_SOURCE_READER.png", repoPath: pathFor("LM-PA-T02_SOURCE_READER.png"), textZone: "upper-right", safeArea: "upper and lower fields", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-T03", role: "TOOL_PREPARATION", surface: "documentation_tool_tile", artLane: "CADENA_DE_CUSTODIA_DOMESTICA", primaryFormat: "1:1", assetFile: "LM-PA-T03_DOCUMENTATION.png", repoPath: pathFor("LM-PA-T03_DOCUMENTATION.png"), textZone: "upper-left", safeArea: "central evidence group", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-T04", role: "TOOL_PREPARATION", surface: "territory_filter_tile", artLane: "UMBRAL_CLARO", primaryFormat: "1:1", assetFile: "LM-PA-T04_TERRITORY_FILTER.png", repoPath: pathFor("LM-PA-T04_TERRITORY_FILTER.png"), textZone: "left side", safeArea: "center boundary gesture and threshold", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-R01", role: "TRUST_SOURCE_TERRITORY", surface: "source_module_web", artLane: "ARCHIVO_VIVO", primaryFormat: "16:9", assetFile: "LM-PA-R01_SOURCES.png", repoPath: pathFor("LM-PA-R01_SOURCES.png"), textZone: "right third", safeArea: "bookmark and folder stack centered", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-R02", role: "TRUST_SOURCE_TERRITORY", surface: "territory_module_social", artLane: "UMBRAL_CLARO", primaryFormat: "4:5", assetFile: "LM-PA-R02_TERRITORY.png", repoPath: pathFor("LM-PA-R02_TERRITORY.png"), textZone: "upper-left", safeArea: "thresholds and boundary plane", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-R03", role: "TRUST_SOURCE_TERRITORY", surface: "version_correction_icon_support", artLane: "ARCHIVO_VIVO", primaryFormat: "1:1", assetFile: "LM-PA-R03_VERSION_CORRECTION.png", repoPath: pathFor("LM-PA-R03_VERSION_CORRECTION.png"), textZone: "lower third", safeArea: "central tab and correction arrow", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-R04", role: "TRUST_SOURCE_TERRITORY", surface: "limits_stop_module_social", artLane: "SENAL_EN_TRANSITO", primaryFormat: "4:5", assetFile: "LM-PA-R04_LIMITS_STOP.png", repoPath: pathFor("LM-PA-R04_LIMITS_STOP.png"), textZone: "top quarter", safeArea: "barrier and exit centered", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-E01", role: "EDITORIAL_CONTENT", surface: "cinema_law_editorial_cover", artLane: "SENAL_EN_TRANSITO", primaryFormat: "4:5", assetFile: "LM-PA-E01_CINEMA_LAW_COVER.png", repoPath: pathFor("LM-PA-E01_CINEMA_LAW_COVER.png"), textZone: "upper-left", safeArea: "beam and envelope centered", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-E02", role: "EDITORIAL_CONTENT", surface: "history_editorial_cover", artLane: "ARCHIVO_VIVO", primaryFormat: "4:5", assetFile: "LM-PA-E02_HISTORY_COVER.png", repoPath: pathFor("LM-PA-E02_HISTORY_COVER.png"), textZone: "right third", safeArea: "turning page and ruler", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-E03", role: "EDITORIAL_CONTENT", surface: "evidence_explainer_social_video", artLane: "CADENA_DE_CUSTODIA_DOMESTICA", primaryFormat: "9:16", assetFile: "LM-PA-E03_EVIDENCE_COVER.png", repoPath: pathFor("LM-PA-E03_EVIDENCE_COVER.png"), textZone: "bottom third", safeArea: "hand object and sleeve centered", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
  { id: "LM-PA-E04", role: "EDITORIAL_CONTENT", surface: "everyday_law_editorial_cover", artLane: "CADENA_DE_CUSTODIA_DOMESTICA", primaryFormat: "4:5", assetFile: "LM-PA-E04_EVERYDAY_LAW_COVER.png", repoPath: pathFor("LM-PA-E04_EVERYDAY_LAW_COVER.png"), textZone: "left third", safeArea: "hand card and doorway", mobileQa: "PASS_360PX_VISUAL_QA", pseudotext: "PASS_NO_BAKED_LEGAL_COPY", status: "PRODUCTION_PROOF", availability: "PENDING_BINARY_IMPORT" },
] as const;

export const productionAssetPack = {
  driveFolder: "https://drive.google.com/drive/folders/1LWz9iYtXb-gkvCSWnxpSAVugFZVpIFJP",
  manifestId: "1s_NTt_0dlAPsuAYBlpATjzVi-JPwsur_",
  count: productionAssets.length,
  status: "PRODUCTION_PROOF",
  publicationReady: false,
  artQaPending: true,
  binaryImportPending: true,
} as const;

export function getProductionAsset(id: string) {
  return productionAssets.find((asset) => asset.id === id) ?? null;
}
