import { readFileSync } from "node:fs";
import { join } from "node:path";

const snapshot = JSON.parse(readFileSync(join(process.cwd(), "docs/instagram-audit-snapshot.json"), "utf8"));
const requiredSnapshotKeys = ["account", "auditedAt", "followers", "mediaCount", "sampleSize", "insightsSample", "editorialDecision", "publicationStatus"];
const missing = requiredSnapshotKeys.filter((key) => !(key in snapshot));
if (missing.length) throw new Error(`Instagram snapshot missing: ${missing.join(", ")}`);
if (snapshot.publicationStatus !== "AUDIT_ONLY_NOT_PUBLISHED") throw new Error("Audit snapshot must not imply publication.");
if (snapshot.sampleSize < 5 || snapshot.insightsSample.length < 3) throw new Error("Audit snapshot is too small for editorial comparison.");

const spec = readFileSync(join(process.cwd(), "docs/SOCIAL_CONTENT_SPEC_V1.md"), "utf8");
for (const field of ["contentId", "territory", "asOf", "source", "certainty", "qualifier", "assetProvenance", "accessibility", "humanReview", "status"]) {
  if (!spec.includes(`| \`${field}\``)) throw new Error(`Social content contract missing field: ${field}`);
}
for (const state of ["DRAFT", "HUMAN_REVIEW_REQUIRED", "READY_FOR_PUBLICATION", "PUBLISHED", "NOT_PUBLIC"]) {
  if (!spec.includes(`\`${state}\``)) throw new Error(`Social content contract missing state: ${state}`);
}

console.log(`Social content contract passed: ${snapshot.insightsSample.length} insight samples, ${requiredSnapshotKeys.length} snapshot keys, provenance and review gates present.`);
