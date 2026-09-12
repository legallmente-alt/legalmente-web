import assert from "node:assert/strict";
import { test } from "node:test";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

test("bloquea el inventario real cuando cámara, luz y elemento frío son idénticos", () => {
  const realCsv = "/home/ubuntu/legalmente_content_sources/top20_visual.csv";
  assert.throws(() => execFileSync("node", ["scripts/content-visual-preflight.mjs", realCsv], { cwd: process.cwd(), encoding: "utf8", stdio: "pipe" }));
});

test("acepta un lote pequeño con objeto, cámara, luz y elemento frío distintos", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "legalmente-visual-preflight-"));
  const csv = [
    "CONTENT_ID,SPECIFIC_OBJECTS,CAMERA,LIGHT,COLD_ELEMENT,BRAND_INTEGRATION,ANTI_DUPLICATE_VISUAL_NOTE",
    "A,objetouno,macro,hard light,glass,brand,No repetir; diferencia visual: objetouno",
    "B,objetodos,wide,overcast,metal,brand,No repetir; diferencia visual: objetodos",
    "C,objetotres,portrait,neon-free,screen,brand,No repetir; diferencia visual: objetotres",
  ].join("\n");
  const file = path.join(dir, "pass.csv");
  fs.writeFileSync(file, csv);
  const output = execFileSync("node", ["scripts/content-visual-preflight.mjs", file], { cwd: process.cwd(), encoding: "utf8" });
  assert.match(output, /Visual content preflight passed/);
});
