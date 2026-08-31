import { readFileSync } from "node:fs";

const page = readFileSync("src/app/antes-de-firmar/page.tsx", "utf8");
const requiredMarkers = [
  "Puntos de atención encontrados.",
  "Guía preliminar disponible.",
  "Qué revisó",
  "Qué no revisó",
  "Regla {result.provenance.ruleVersion}",
  "no determina validez ni conveniencia",
];
const forbiddenMarkers = [
  "Orientación estructural disponible.",
  "Todo está bien",
  "Fuente oficial",
  "dictamen jurídico",
];

for (const marker of requiredMarkers) {
  if (!page.includes(marker)) throw new Error(`Before Signing surface proof failed: missing ${marker}`);
}
for (const marker of forbiddenMarkers) {
  if (page.includes(marker)) throw new Error(`Before Signing surface proof failed: forbidden marker ${marker}`);
}

console.log("Before Signing surface proof passed: product states, scope and observed version are visible; approval-like wording is absent.");
