import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const roots = ["src/app", "src/components", "src/lib"];
const textExtensions = new Set([".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx"]);

const guardedPatterns = [
  { id: "FORM", re: /<form\b/i, note: "user-submitted form surface" },
  { id: "INPUT", re: /<input\b/i, note: "user input control" },
  { id: "TEXTAREA", re: /<textarea\b/i, note: "user free-text input control" },
  { id: "LOCAL_STORAGE", re: /\blocalStorage\b/, note: "browser persistent storage" },
  { id: "SESSION_STORAGE", re: /\bsessionStorage\b/, note: "browser session storage" },
  { id: "DOCUMENT_COOKIE", re: /\bdocument\.cookie\b/, note: "client cookie access" },
  { id: "SEND_BEACON", re: /\bnavigator\.sendBeacon\b/, note: "background telemetry transport" },
  { id: "GTM", re: /googletagmanager|google-analytics|\bgtag\s*\(/i, note: "Google analytics/tagging" },
  { id: "POSTHOG", re: /\bposthog\b/i, note: "PostHog analytics" },
  { id: "MIXPANEL", re: /\bmixpanel\b/i, note: "Mixpanel analytics" },
  { id: "SEGMENT", re: /analytics\.track\s*\(|@segment\//i, note: "Segment analytics" },
  { id: "AMPLITUDE", re: /@amplitude\/|\bamplitude\.track\s*\(/i, note: "Amplitude analytics" },
  { id: "HOTJAR", re: /\bhotjar\b|static\.hotjar\.com/i, note: "Hotjar tracking" },
  { id: "CLARITY", re: /clarity\.ms|\bclarity\s*\(/i, note: "Microsoft Clarity tracking" },
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.isFile() && textExtensions.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

const files = [];
for (const root of roots) {
  try {
    if ((await stat(root)).isDirectory()) files.push(...(await walk(root));
  } catch {
    // Missing optional root is not itself a privacy failure.
  }
}

const findings = [];
for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const pattern of guardedPatterns) {
    if (pattern.re.test(content)) findings.push({ file, id: pattern.id, note: pattern.note });
  }
}

if (findings.length) {
  console.error("Privacy surface smoke FAILED. New collection/storage/tracking surfaces require explicit review before release.");
  for (const finding of findings) console.error(`- ${finding.id}: ${finding.file} — ${finding.note}`);
  process.exitCode = 1;
} else {
  console.log(`Privacy surface smoke PASS: ${files.length} source files checked; no guarded collection/storage/tracking surfaces detected.`);
}
