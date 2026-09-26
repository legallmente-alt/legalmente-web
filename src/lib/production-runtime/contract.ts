import { createHash } from "node:crypto";
import type { ProductionPiece } from "../production-policy";
import type { VisualProductionUnit } from "../visual-factory";
import type { VisualArgumentPlan } from "../visual-argument";

export const CONTRACT_VERSION = "2026-09-26";
export type Box = { x: number; y: number; width: number; height: number };
export type ArtifactEvidence = {
  asset: string;
  sha256: string;
  width: number;
  height: number;
};

export function formatContract(format: string) {
  if (format === "9:16") return { width: 1080, height: 1920, safe: { x: 100, y: 365, width: 880, height: 1145 }, crop: { x: 0, y: 285, width: 1080, height: 1350 } };
  if (format === "4:5") return { width: 1080, height: 1350, safe: { x: 100, y: 100, width: 880, height: 1150 }, crop: { x: 0, y: 0, width: 1080, height: 1350 } };
  throw new Error(`Unsupported production format: ${format}`);
}

export function exactCopy(piece: ProductionPiece): string {
  return [piece.matterLabel, piece.topicLabel, piece.centralIdea, piece.reflection].filter(Boolean).join("\n\n");
}

export function containsNormativeCitation(text: string): boolean {
  return /\b(?:art(?:[íi]culo)?s?\.?\s*\d|ley\s+(?:n[úu]m(?:ero)?\.?\s*)?\d|c[oó]digo\s+(?:civil|penal|de\s+comercio)|\b(?:LFT|LOPJ|LEC|CST|BOE|DOF)\b)/iu.test(text);
}

export function validateEditorialContract(piece: ProductionPiece, unit: VisualProductionUnit): string[] {
  const errors: string[] = [];
  let spec;
  try { spec = formatContract(piece.format); } catch (error) { return [String(error)]; }
  if (unit.WIDTH !== spec.width || unit.HEIGHT !== spec.height) errors.push(`${piece.id}: requested dimensions must be ${spec.width}x${spec.height}.`);
  if (unit.COPY_EXACT !== exactCopy(piece)) errors.push(`${piece.id}: COPY_EXACT must bind matter, concept, answer and optional reflection exactly.`);
  if (containsNormativeCitation(unit.COPY_EXACT)) errors.push(`${piece.id}: normative citations belong outside the image.`);
  if (!piece.sourceIds?.length || !unit.SOURCE_REFS.length || !unit.CLAIM_REFS.length || !unit.TERRITORY.trim()) errors.push(`${piece.id}: source, claim and scope bindings are required for every channel.`);
  if (piece.sourceIds?.some((source) => !unit.SOURCE_REFS.includes(source))) errors.push(`${piece.id}: sources changed between candidate and visual unit.`);
  if (piece.centralIdea.trim().endsWith("?")) errors.push(`${piece.id}: the central idea must answer the question, not repeat it.`);
  if (piece.centralIdea.length > 280 || (piece.reflection?.length ?? 0) > 120) errors.push(`${piece.id}: executive copy is too dense; shorten it before generation.`);
  return errors;
}

/** The executable prompt is compiled from the validated records, never a stale free-form prompt. */
export function compileProductionPrompt(piece: ProductionPiece, unit: VisualProductionUnit, argument: VisualArgumentPlan, hasText: boolean): string {
  const spec = formatContract(piece.format);
  return [
    `LegalMente. Contrato ${CONTRACT_VERSION}. Una pieza individual ${spec.width}×${spec.height}, ${piece.format}.`,
    `Materia: ${piece.matterLabel}. Concepto: ${piece.topicLabel}. Aprendizaje: ${piece.centralIdea}.`,
    `Tensión: ${argument.conflict}. Consecuencia: ${argument.consequence}.`,
    `Escena única: ${piece.scenario}. Acción y relación visible: ${argument.imageArgument}.`,
    `Técnica principal: ${piece.artisticStyle}. Material: ${piece.material}. Luz: ${piece.lighting}.`,
    `Composición: ${piece.composition}. Cámara: ${piece.framing}. Presencia humana: ${piece.humanPresence}.`,
    `La imagen debe explicar el tema. Rechazar arte intercambiable, publicidad, producto de lujo y decoración sin función jurídica.`,
    `LegalMente pertenece físicamente a ${piece.brandObject}, con textura, perspectiva y luz coherentes.`,
    `Todo elemento esencial —texto, foco causal y marca— dentro de x=${spec.safe.x}–${spec.safe.x + spec.safe.width}, y=${spec.safe.y}–${spec.safe.y + spec.safe.height}.`,
    piece.format === "9:16" ? "El recorte central 4:5 elimina 285px arriba y abajo. Esas franjas sólo contienen fondo prescindible. Dejar márgenes adicionales holgados." : "Componer 4:5 nativo, con márgenes holgados.",
    "Texto horizontal estrictamente centrado sobre x=540; equilibrio axial. Materia secundaria, concepto dominante, respuesta completa; reflexión sólo si cabe sin encoger.",
    hasText ? `Texto literal, sin añadir ni alterar palabras:\n${exactCopy(piece)}` : "Generar arte base sin texto editorial. Reservar zona natural lisa para la composición posterior; no colocar texto inventado.",
    "No collage, grid, mazo, balanza genérica, sepia, oscuridad ilegible, logo flotante, referencias normativas, recuadros o bandas comerciales.",
    `Exclusiones específicas: ${unit.NEGATIVE_PROMPT}`,
  ].join("\n\n");
}

/** Host-side observation. Reads PNG bytes; never trusts requested dimensions or a provider label. */
export function inspectPngBytes(bytes: Buffer, asset: string): ArtifactEvidence {
  if (bytes.length < 45 || bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" || bytes.toString("ascii", 12, 16) !== "IHDR") throw new Error("Expected a PNG artifact, not a URL or provider receipt.");
  let cursor = 8;
  let data = false;
  let end = false;
  while (cursor + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(cursor);
    if (cursor + 12 + length > bytes.length) throw new Error("Truncated PNG artifact.");
    const type = bytes.toString("ascii", cursor + 4, cursor + 8);
    if (type === "IDAT" && length > 0) data = true;
    if (type === "IEND") { end = true; break; }
    cursor += 12 + length;
  }
  if (!data || !end) throw new Error("Incomplete PNG artifact.");
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
  if (width < 1 || height < 1) throw new Error("Invalid PNG dimensions.");
  return { asset, width, height, sha256: createHash("sha256").update(bytes).digest("hex") };
}

export function artifactErrors(evidence: ArtifactEvidence, unit: VisualProductionUnit): string[] {
  const spec = formatContract(unit.FORMAT);
  const errors: string[] = [];
  if (!/^[a-f0-9]{64}$/.test(evidence.sha256)) errors.push("Artifact requires a measured SHA-256.");
  if (evidence.width !== spec.width || evidence.height !== spec.height) errors.push(`DIMENSIONS_MISMATCH: measured ${evidence.width}x${evidence.height}; required ${spec.width}x${spec.height}.`);
  return errors;
}

export function boxInside(box: Box, container: Box): boolean {
  return Object.values(box).every(Number.isFinite) && box.width > 0 && box.height > 0 && box.x >= container.x && box.y >= container.y && box.x + box.width <= container.x + container.width && box.y + box.height <= container.y + container.height;
}
