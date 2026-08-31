import fs from "node:fs";

const pagePath = "src/app/internal/product-lab/page.tsx";
const source = fs.readFileSync(pagePath, "utf8");
const publicBeforeSigningPath = "src/app/antes-de-firmar/page.tsx";
const publicBeforeSigningSource = fs.readFileSync(publicBeforeSigningPath, "utf8");
const requiredMarkers = [
  "wave01aReviewRegistry",
  "wave01aReviewSnapshot",
  "data-content-id={item.contentId}",
  "data-review-state={item.state}",
  "data-review-evidence={wave01aReviewSnapshot.evidence.fileVerification}",
  "no muestra el claim jurídico",
  "La fuente, el copy jurídico y el binding permanecen fuera de esta bandeja",
];
const forbiddenMarkers = [
  "claims:",
  "sourceLabel:",
  "sourceUrl:",
  "sourceVersion:",
  "Fuente oficial",
  "Copy educativo interno",
  "{item.claims",
  "{item.sourceUrl",
];

for (const marker of requiredMarkers) {
  if (!source.includes(marker)) {
    throw new Error(`Missing required internal-review marker: ${marker}`);
  }
}
for (const marker of forbiddenMarkers) {
  if (source.includes(marker)) {
    throw new Error(`Forbidden juridical surface found in Product Lab: ${marker}`);
  }
}

const publicForbiddenMarkers = [
  "@/lib/review/registry",
  "getInternalReviewUnit",
  "HUMAN_REVIEW_REQUIRED",
  "Contenido relacionado en revisión interna",
  "reviewContentIds",
];
for (const marker of publicForbiddenMarkers) {
  if (publicBeforeSigningSource.includes(marker)) {
    throw new Error(`Public Before Signing surface imports internal review state: ${marker}`);
  }
}
console.log("Internal review surface proof passed: registry stays review-only and public Before Signing does not import internal state.");
