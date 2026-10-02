import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { importMasterMemory, memoryMatches } from "../src/lib/production-runtime/memory";
import { inspectPngBytes, artifactErrors } from "../src/lib/production-runtime/contract";
import { prepareVisualBatch, type VisualBatchInput } from "../src/lib/production-runtime";
import { bindTopicCandidate } from "../src/lib/production-runtime/candidate";
import { evaluateQa, type VisualProductionUnit, type VisualQaResult } from "../src/lib/visual-factory";
import type { TopicCandidate } from "../src/lib/intelligence-front";

const [command, ...args] = process.argv.slice(2);
async function json(path: string) { return JSON.parse(await readFile(path, "utf8")); }
async function save(path: string, value: unknown) {
  const full = resolve(path);
  if (/(?:^|[\\/])public(?:[\\/]|$)/.test(full)) throw new Error("Production receipts and private memory must stay outside public/.");
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, JSON.stringify(value, null, 2) + "\n", { flag: "wx", mode: 0o600 });
}

async function main() {
  if (command === "memory") {
    const [source, output, fetchedAt] = args;
    if (!source || !output || !fetchedAt) throw new Error("memory <fresh-drive-export.md> <private-snapshot.json> <provider-fetch-ISO-time>");
    const snapshot = importMasterMemory(await readFile(source, "utf8"), fetchedAt);
    await save(output, snapshot);
    console.log(JSON.stringify({ digest: snapshot.digest, terms: snapshot.terms.length, state: snapshot.state, addendaIncluded: snapshot.addenda.length > 0 }));
  } else if (command === "check-topic") {
    const [memoryPath, ...words] = args;
    const snapshot = await json(memoryPath);
    console.log(JSON.stringify({ matches: memoryMatches(snapshot, words.join(" ")), semanticReviewStillRequired: true }, null, 2));
  } else if (command === "prepare") {
    const [jobPath, memoryPath, output] = args;
    const job = await json(jobPath) as Omit<VisualBatchInput, "adapter" | "memory" | "inspectArtifact"> & { candidates: TopicCandidate[]; provider: { name: string; model: string; text: boolean } };
    if (job.candidates.length !== job.pieces.length) throw new Error("Every piece requires its intelligence-front candidate.");
    const units = job.units.map((unit) => {
      const piece = job.pieces.find((item) => item.id === unit.CONTENT_ID);
      const candidate = job.candidates.find((item) => item.id === unit.CONTENT_ID);
      const argument = job.visualArguments.find((item) => item.contentId === unit.CONTENT_ID);
      if (!piece || !candidate || !argument) throw new Error("Missing topic/piece/visual binding.");
      return bindTopicCandidate(candidate, piece, unit, argument);
    });
    const result = prepareVisualBatch({ ...job, policy: { ...job.policy, now: new Date().toISOString() }, units, memory: await json(memoryPath),
      adapter: { name: job.provider.name, model: job.provider.model, capabilities: { text: job.provider.text, referenceImage: true, inpainting: false, upscale: false, variation: false }, async generate() { throw new Error("This bridge prepares prompts; it does not pretend to call a provider."); } },
      inspectArtifact: async (asset) => inspectPngBytes(await readFile(asset), asset),
    });
    await save(output, result);
    console.log(JSON.stringify({ status: result.status, errors: result.errors, units: result.units.length, publicationAuthorized: false }));
    if (result.status !== "GENERATION_READY") process.exitCode = 2;
  } else if (command === "inspect") {
    const [asset, format, output] = args;
    const measured = inspectPngBytes(await readFile(asset), resolve(asset));
    const errors = artifactErrors(measured, { FORMAT: format } as VisualProductionUnit);
    const result = { ...measured, status: errors.length ? "ARTIFACT_BLOCKED" : "IMAGE_READY_FOR_QA", errors, publicationAuthorized: false };
    if (output) await save(output, result);
    console.log(JSON.stringify(result, null, 2));
    if (errors.length) process.exitCode = 2;
  } else if (command === "review") {
    const [unitPath, asset, qaPath, output] = args;
    const unit = await json(unitPath) as VisualProductionUnit;
    const qa = await json(qaPath) as VisualQaResult;
    const measured = inspectPngBytes(await readFile(asset), asset);
    const result = evaluateQa({ ...unit, COMPOSED_ASSET: asset, HASH: measured.sha256 }, qa);
    // Actual bytes override claims supplied by the QA receipt.
    const errors = [...(result.QA_RESULTS?.technicalErrors ?? []), ...artifactErrors(measured, unit)];
    if (qa.evidence?.width !== measured.width || qa.evidence?.height !== measured.height) errors.push("QA dimensions do not match measured bytes.");
    if (errors.length) result.STATE = "REWORK_REQUIRED";
    await save(output, { ...result, technicalErrors: errors, publicationAuthorized: false });
    console.log(JSON.stringify({ status: result.STATE, errors, publicationAuthorized: false }));
    if (result.STATE !== "READY_FOR_HUMAN_VISUAL_REVIEW") process.exitCode = 2;
  } else throw new Error("Commands: memory, check-topic, prepare, inspect, review. See docs/PRODUCTION_ENGINE_RUNBOOK.md.");
}
main().catch((error) => { console.error(String(error)); process.exitCode = 1; });
