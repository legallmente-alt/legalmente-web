import fs from "node:fs";

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ""; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell); cell = "";
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      continue;
    }
    cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [headers, ...data] = rows;
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

const file = process.argv[2];
if (!file) {
  console.error("Uso: node scripts/content-visual-preflight.mjs <visual-ready.csv>");
  process.exit(2);
}
const rows = parseCsv(fs.readFileSync(file, "utf8"));
const required = ["CONTENT_ID", "SPECIFIC_OBJECTS", "CAMERA", "LIGHT", "COLD_ELEMENT", "BRAND_INTEGRATION", "ANTI_DUPLICATE_VISUAL_NOTE"];
for (const field of required) if (!rows[0]?.[field] && rows.length) throw new Error(`VISUAL_PREFLIGHT_MISSING_COLUMN:${field}`);
if (rows.length < 1) throw new Error("VISUAL_PREFLIGHT_EMPTY_BATCH");

const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, " ");
const uniqueCount = (field) => new Set(rows.map((row) => normalize(row[field]))).size;
const repeated = (field) => rows.length - uniqueCount(field);
const failures = [];

if (uniqueCount("SPECIFIC_OBJECTS") < rows.length) failures.push("SPECIFIC_OBJECTS_NOT_UNIQUE");
for (const field of ["CAMERA", "LIGHT", "COLD_ELEMENT"]) {
  const minimumUnique = rows.length >= 5 ? Math.ceil(rows.length * 0.8) : rows.length;
  if (uniqueCount(field) < minimumUnique) failures.push(`${field}_DIVERSITY_BELOW_80_PERCENT`);
}
if (rows.some((row) => /pack anterior|diferencia visual de este pack es/i.test(row.ANTI_DUPLICATE_VISUAL_NOTE) && !row.ANTI_DUPLICATE_VISUAL_NOTE.includes(row.SPECIFIC_OBJECTS.trim()))) {
  failures.push("ANTI_DUPLICATE_NOTE_NOT_BOUND_TO_OBJECT");
}

console.log(JSON.stringify({ rows: rows.length, unique: Object.fromEntries(required.slice(1).map((field) => [field, uniqueCount(field)])), repeated: Object.fromEntries(required.slice(1).map((field) => [field, repeated(field)])), failures }, null, 2));
if (failures.length) {
  console.error(`VISUAL_PREFLIGHT_BLOCKED:${failures.join(",")}`);
  process.exit(1);
}
console.log("Visual content preflight passed: batch diversity thresholds and object binding satisfied.");
