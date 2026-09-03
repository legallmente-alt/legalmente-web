import { strict as assert } from "node:assert";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { ContentPacketSchema } from "./content-factory";

const source = { authority: "DOF" as const, article: "Artículo exacto", territory: "MX-FED" as const, verifiedAt: "2026-09-03T12:00:00Z", url: "https://www.dof.gob.mx/" };
const packet = {
  contentId: "LM-TEST-01",
  territory: "MX-FED" as const,
  sourceClaims: [source],
  payload: {
    archetype: "A" as const,
    eyebrow: "Mito legal",
    mythQuote: "Un contrato privado siempre transfiere la propiedad.",
    verdict: "Falso de pleno derecho" as const,
    legalExplanation: "La explicación debe contrastarse con la fuente exacta.",
    positiveLawArticle: source,
    practicalAction: "Conserva el contrato y pide revisión profesional.",
    threeQuestions: ["¿Qué documento falta?", "¿Qué territorio aplica?", "¿Qué debo comprobar?"] as [string, string, string],
    webCtaRoute: "/antes-de-firmar/",
  },
};

test("acepta un paquete válido y estricto", () => {
  assert.equal(ContentPacketSchema.parse(packet).payload.archetype, "A");
});

test("rechaza campos desconocidos", () => {
  assert.throws(() => ContentPacketSchema.parse({ ...packet, extra: true }));
});

test("rechaza territorio de fuente inconsistente", () => {
  assert.throws(() => ContentPacketSchema.parse({ ...packet, payload: { ...packet.payload, positiveLawArticle: { ...source, territory: "ES" } } }));
});

test("rechaza CTA externa", () => {
  assert.throws(() => ContentPacketSchema.parse({ ...packet, payload: { ...packet.payload, webCtaRoute: "https://example.com" } }));
});

test("acepta autoridades oficiales adicionales con territorio y fecha verificables", () => {
  for (const [authority, territory, url] of [
    ["AEPD", "ES", "https://www.aepd.es/"],
    ["INAI", "MX-FED", "https://home.inai.org.mx/"],
    ["SIC", "CO", "https://www.sic.gov.co/"],
    ["OIT", "MX-FED", "https://www.ilo.org/"],
  ] as const) {
    const officialSource = { authority, article: "Fuente oficial por verificar en contexto", territory, verifiedAt: "2026-09-03T12:00:00Z", url };
    assert.doesNotThrow(() => ContentPacketSchema.parse({
      ...packet,
      territory,
      sourceClaims: [officialSource],
      payload: { ...packet.payload, positiveLawArticle: officialSource },
    }));
  }
});

test("las salidas del generador son deterministas y no incluyen PII", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "legalmente-factory-"));
  const input = path.join(dir, "packet.json");
  await (await import("node:fs/promises")).writeFile(input, JSON.stringify(packet));
  const run = async (name: string) => {
    const out = path.join(dir, name);
    const child = await import("node:child_process");
    child.execFileSync("npx", ["tsx", "scripts/generate-content-pack.ts", "--input", input, "--out", out], { cwd: path.resolve(__dirname, "../.."), stdio: "pipe" });
    return Promise.all(["copy_social.md", "visual_prompt.json", "handshake_web.json"].map((file) => readFile(path.join(out, file), "utf8")));
  };
  const [first, second] = await Promise.all([run("a"), run("b")]);
  assert.deepEqual(first, second);
  assert.ok(!first.join("\n").match(/correo|teléfono|domicilio|CURP|RFC/i));
  await rm(dir, { recursive: true, force: true });
});
