#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const file = path.join(root, "docs/content/legalmente-01-consentimiento/linkedin/post-v1.md");
const text = fs.readFileSync(file, "utf8");

const required = [
  "CONTENT_ID",
  "READY_FOR_COPY",
  "READY_FOR_PUBLICATION_DECISION",
  "PUBLICATION_BLOCKED",
  "Automatización | No habilitada",
  "Esta pieza es educativa",
  "no ofrece una conclusión para un caso concreto",
  "territorio aplicable",
  "No recibe documentos ni datos personales",
];

const forbidden = [
  /puedes firmar/i,
  /debes firmar/i,
  /no firmes/i,
  /es ilegal/i,
  /garantiza/i,
  /asesoría personalizada/i,
  /envía tu documento/i,
  /sube tu documento/i,
];

const errors = [];
for (const phrase of required) {
  if (!text.includes(phrase)) errors.push(`Falta requisito: ${phrase}`);
}

const copyStart = text.indexOf("## Copy final para LinkedIn");
const copyEnd = text.indexOf("## Primer comentario opcional");
if (copyStart < 0 || copyEnd < 0 || copyEnd <= copyStart) {
  errors.push("No se encontró el bloque de copy final de LinkedIn");
} else {
  const copy = text.slice(copyStart, copyEnd)
    .replace(/^## Copy final para LinkedIn\s*/m, "")
    .trim();
  const chars = copy.length;
  if (chars > 3000) errors.push(`El copy supera 3000 caracteres: ${chars}`);
  if (chars < 400) errors.push(`El copy es demasiado corto para la adaptación editorial: ${chars}`);
  for (const pattern of forbidden) {
    if (pattern.test(copy)) errors.push(`Aparece copy prohibido: ${pattern}`);
  }
}

if (errors.length) {
  console.error("LinkedIn content proof: FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("LinkedIn content proof: PASS");
console.log(`- source: ${path.relative(root, file)}`);
console.log("- publication: blocked pending human editorial decision");
