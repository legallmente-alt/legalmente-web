import { readFile } from "node:fs/promises";

const page = await readFile("src/app/diccionario/page.tsx", "utf8");
const forbidden = [/\bfetch\s*\(/i, /XMLHttpRequest/i, /WebSocket/i, /sendBeacon/i, /localStorage/i, /sessionStorage/i, /document\.cookie/i, /analytics/i, /server action/i, /<form\b/i, /onSubmit/i, /persist/i];
const findings = forbidden.filter((pattern) => pattern.test(page)).map((pattern) => pattern.toString());
const registered = page.match(/data-privacy-surface\s*=\s*["']ephemeral-local-search["']/g) ?? [];
const freeInputs = page.match(/<input\b/gi) ?? [];
if (registered.length !== 1 || freeInputs.length !== 1 || findings.length) {
  console.error("EPHEMERAL_LOCAL_SEARCH_V1 FAILED");
  console.error(JSON.stringify({ registered: registered.length, inputs: freeInputs.length, findings }, null, 2));
  process.exit(1);
}
if (!/type\s*=\s*["']search["']/i.test(page) || !/autoComplete=\s*["']off["']/i.test(page) || !/maxLength=\s*\{?160\}?/.test(page)) {
  console.error("EPHEMERAL_LOCAL_SEARCH_V1 FAILED: required search attributes missing");
  process.exit(1);
}
console.log("NO_COLLECTION_TECHNICAL_PASS: one marked local search surface; no transport, persistence, submit or analytics detected.");
