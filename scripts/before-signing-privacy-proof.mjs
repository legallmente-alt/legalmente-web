import { readFileSync } from "node:fs";
import path from "node:path";

const route = readFileSync(path.resolve("src/app/antes-de-firmar/page.tsx"), "utf8");
const forbidden = [
  /fetch\s*\(/,
  /axios/i,
  /localStorage/i,
  /sessionStorage/i,
  /indexedDB/i,
  /document\.cookie/i,
  /\bconsole\.(log|info|warn|error)\s*\(/,
  /FormData/i,
  /upload/i,
  /api\//i,
];
const found = forbidden.filter((pattern) => pattern.test(route)).map(String);
if (found.length) {
  throw new Error(`Before Signing route violates zero-PII proof: ${found.join(", ")}`);
}
for (const phrase of ["No introduzcas nombres", "no guarda información personal", "no determina validez", "Pregunta preparatoria", "window.print"]) {
  if (!route.includes(phrase)) throw new Error(`Missing safety/print copy: ${phrase}`);
}
console.log("Before Signing privacy proof passed: no network, storage, logging, upload or PII transport markers; safety and print copy present.");
