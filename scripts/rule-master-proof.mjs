import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "src/lib/legal-core/cultural-atlas.ts",
  "src/lib/legal-core/graduation-wave-1.ts",
  "src/lib/legal-core/topic-radar.ts",
  "scripts/visual-rotation-engine.mjs",
  "data/visual-combination-registry.json",
  "docs/CONTINUATION_MAP_PHASE1_V1.md",
  "docs/VISUAL_ROTATION_SYSTEM_V1.md",
];

for (const relative of requiredFiles) {
  if (!fs.existsSync(path.join(root, relative))) throw new Error(`RULE_MASTER_MISSING_FILE:${relative}`);
}

const atlas = fs.readFileSync(path.join(root, "src/lib/legal-core/cultural-atlas.ts"), "utf8");
const requiredAtlasFields = ["reference", "conduct", "conflict", "rule", "limit", "sourceLabel", "sourceUrl", "sourceArticles", "questions", "routeCandidate", "visualWorld", "visualSchool", "framing", "status"];
for (const field of requiredAtlasFields) {
  if (!atlas.includes(`${field}:`)) throw new Error(`RULE_MASTER_MISSING_ATLAS_FIELD:${field}`);
}
if (!atlas.includes('status: "INTERNAL_REVIEW_ONLY"')) throw new Error("RULE_MASTER_ATLAS_NOT_FAIL_CLOSED");

const graduation = fs.readFileSync(path.join(root, "src/lib/legal-core/graduation-wave-1.ts"), "utf8");
if (!graduation.includes('liveGate: "FOUNDER_LITERALITY_PENDING"')) throw new Error("RULE_MASTER_GRADUATION_GATE_MISSING");
if (!graduation.includes('status: "READY_FOR_PRODUCT"')) throw new Error("RULE_MASTER_PRODUCT_STATUS_MISSING");

const registryDocument = JSON.parse(fs.readFileSync(path.join(root, "data/visual-combination-registry.json"), "utf8"));
const registry = Array.isArray(registryDocument) ? registryDocument : registryDocument.entries;
if (!Array.isArray(registry) || registry.length < 1) throw new Error("RULE_MASTER_VISUAL_REGISTRY_EMPTY");
for (const item of registry) {
  if (!item.fingerprint && !item.combinationKey) throw new Error("RULE_MASTER_VISUAL_FINGERPRINT_MISSING");
}

const publicPrep = fs.readFileSync(path.join(root, "scripts/prepare-public-pages.mjs"), "utf8");
if (!publicPrep.includes("internal")) throw new Error("RULE_MASTER_PUBLIC_INTERNAL_EXCLUSION_UNPROVEN");

console.log(`Rule Master proof passed: ${requiredFiles.length} continuity files, ${registry.length} visual fingerprints, internal review states preserved, public exclusion present.`);
