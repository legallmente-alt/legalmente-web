import fs from "node:fs";

const pagePath = "src/app/internal/product-lab/page.tsx";
const source = fs.readFileSync(pagePath, "utf8");

const requiredMarkers = [
  "contentId:",
  "question:",
  "candidateRoute:",
  'data-review-state="HUMAN_REVIEW_REQUIRED"',
  "México — PILOT_RESEARCH_TERRITORY",
  "no muestra claims jurídicos",
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

console.log("Internal review surface proof passed: review-only fields present, juridical claims and source bindings absent.");
