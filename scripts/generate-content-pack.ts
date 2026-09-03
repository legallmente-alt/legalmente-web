#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ContentPacketSchema, type ContentPacket, type ContentPayload } from "../src/schemas/content-factory";

const TOKENS = "Navy #102A43; Crema #F5F0E8; Turquesa #63D7B0; Terracota #C77C4D; Arena #E8E2D5";
const SAFE_CTA = /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?$/;

type Outputs = { copySocial: string; visualPrompt: object; handshakeWeb: object };

function arg(name: string): string {
  const index = process.argv.indexOf(name);
  const value = process.argv[index + 1];
  if (index < 0 || !value) throw new Error(`Uso: generate-content-pack --input <packet.json> [--out <dir>]`);
  return value;
}

function sourceLine(source: { authority: string; article: string; territory: string; verifiedAt: string; url: string }) {
  return `${source.authority}, ${source.article} (${source.territory}), verificada ${source.verifiedAt}: ${source.url}`;
}

function questionsBlock(questions: string[]) {
  return `### 3 Preguntas clave para tu abogado/notario\n${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`;
}

function visualPrompt(packet: ContentPacket): object {
  const p = packet.payload;
  const subject = p.archetype === "A" ? p.mythQuote : p.archetype === "B" ? `${p.conceptA.title} frente a ${p.conceptB.title}` : p.archetype === "C" ? p.conceptTitle : p.listTitle;
  return {
    contentId: packet.contentId,
    archetype: p.archetype,
    territory: packet.territory,
    prompt: `Fotografía editorial fotorrealista vertical 9:16 sobre ${subject}. Mostrar una transición visual concreta entre situación y acción, con claroscuro editorial, objetos materiales de prueba y una placa física de latón/bronce grabada LM LEGALMENTE integrada en la escena. No usar balanzas, mazos, estrados ni salas de juicio. Paleta: ${TOKENS}. Dejar zona segura superior y lateral para texto exacto.`,
    negativePrompt: "logos flotantes, marcas de agua, balanzas, mazos de madera, estrados, salas de juicio, texto inventado, datos personales, rostros identificables",
    textMode: "DETERMINISTIC_COMPOSITION_AFTER_IMAGE",
  };
}

function buildOutputs(packet: ContentPacket): Outputs {
  const p = packet.payload;
  let copySocial: string;
  if (p.archetype === "A") copySocial = `# ${p.eyebrow}\n\n> ${p.mythQuote}\n\n## ${p.verdict}\n\n${p.legalExplanation}\n\n**Artículo/fuente:** ${sourceLine(p.positiveLawArticle)}\n\n**Acción práctica:** ${p.practicalAction}\n\n${questionsBlock(p.threeQuestions)}\n\n[Continúa la ruta](${p.webCtaRoute})`;
  else if (p.archetype === "B") copySocial = `# ${p.eyebrow}\n\n## ${p.conceptA.title}\n${p.conceptA.definition}\n\n**Base:** ${sourceLine(p.conceptA.legalBasis)}\n\n## ${p.conceptB.title}\n${p.conceptB.definition}\n\n**Base:** ${sourceLine(p.conceptB.legalBasis)}\n\n**Regla práctica:** ${p.practicalRule}\n\n${questionsBlock(p.threeQuestions)}\n\n[Continúa la ruta](${p.webCtaRoute})`;
  else if (p.archetype === "C") copySocial = `# ${p.eyebrow}\n\n## ${p.conceptTitle}\n\n${p.functionalDefinition}\n\n**Interés protegido:** ${p.protectedInterest}\n\n**Límite:** ${p.boundaryLimit}\n\n**Fuente primaria:** ${sourceLine(p.primarySource)}\n\n${questionsBlock(p.threeQuestions)}\n\n[Continúa la ruta](${p.webCtaRoute})`;
  else copySocial = `# ${p.eyebrow}\n\n## ${p.listTitle}\n\n${p.riskSubtitle}\n\n${p.items.map((item, i) => `${i + 1}. ${item}`).join("\n")}\n\n**Regla de cierre:** ${p.goldenRuleClosure}\n\n${questionsBlock(p.threeQuestions)}\n\n[Continúa la ruta](${p.webCtaRoute})`;
  if (!SAFE_CTA.test((p as { webCtaRoute: string }).webCtaRoute)) throw new Error("CTA fuera de la ruta interna permitida");
  return {
    copySocial,
    visualPrompt: visualPrompt(packet),
    handshakeWeb: { contentId: packet.contentId, archetype: p.archetype, territory: packet.territory, ctaRoute: p.webCtaRoute, copySocial, piiPolicy: "CLIENT_ONLY_RAM_LOCALSTORAGE_NANOSTORES", status: "NO_VERIFICADO" },
  };
}

async function main() {
  const input = arg("--input");
  const out = process.argv.includes("--out") ? arg("--out") : path.join(process.cwd(), "output", path.basename(input, path.extname(input)));
  const packet = ContentPacketSchema.parse(JSON.parse(await readFile(input, "utf8")));
  const outputs = buildOutputs(packet);
  await mkdir(out, { recursive: true });
  await writeFile(path.join(out, "copy_social.md"), outputs.copySocial + "\n", "utf8");
  await writeFile(path.join(out, "visual_prompt.json"), JSON.stringify(outputs.visualPrompt, null, 2) + "\n", "utf8");
  await writeFile(path.join(out, "handshake_web.json"), JSON.stringify(outputs.handshakeWeb, null, 2) + "\n", "utf8");
  process.stdout.write(JSON.stringify({ contentId: packet.contentId, archetype: packet.payload.archetype, out, status: "NO_VERIFICADO" }) + "\n");
}

main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
