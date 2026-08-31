import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const manifestPath = resolve("public/internal-assets/legalmente/wave-01a/manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const assets = manifest.contentUnits.flatMap((unit) => [unit.vertical, unit.feed]);
const availability = assets.map((asset) => {
  const localPath = `/${asset.sourceName.startsWith("LM-") ? "internal-assets/legalmente/wave-01a/" : ""}${asset.sourceName}`;
  const absolutePath = resolve("public", localPath.slice(1));
  if (!existsSync(absolutePath)) throw new Error(`Missing review asset: ${absolutePath}`);
  const sha256 = createHash("sha256").update(readFileSync(absolutePath)).digest("hex");
  return { localPath, sha256 };
});

const { validateReviewRegistry } = await import("../src/lib/review/registry.ts");
const result = validateReviewRegistry(manifest, availability);
if (!result.ok) {
  throw new Error(`Review registry file proof failed: ${result.issues.map(({ path, message }) => `${path}: ${message}`).join("; ")}`);
}
console.log(`Review registry file proof passed: ${availability.length} assets exist and match manifest SHA-256.`);
