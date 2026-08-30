import fs from "node:fs";

const pagePath = "src/app/antes-de-firmar/page.tsx";
const source = fs.readFileSync(pagePath, "utf8");

const requiredMarkers = [
  "Sin puntos de atención en los checks declarados.",
  "El resultado solo refleja los checks estructurales declarados",
  "No confirma validez, seguridad ni conveniencia.",
  "no determina validez ni conveniencia",
];

const forbiddenMarkers = [
  "Orientación estructural disponible.",
  "PASS: todo está bien",
  "Puedes firmar",
  "Es válido",
];

for (const marker of requiredMarkers) {
  if (!source.includes(marker)) {
    throw new Error(`Missing Before Signing safety-copy marker: ${marker}`);
  }
}

for (const marker of forbiddenMarkers) {
  if (source.includes(marker)) {
    throw new Error(`Ambiguous or unsafe Before Signing copy found: ${marker}`);
  }
}

console.log("Before Signing copy proof passed: visible state is structural, bounded and non-validating.");
