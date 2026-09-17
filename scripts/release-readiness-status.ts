import fs from "node:fs";
import path from "node:path";
import { evaluateReleaseReadiness, type ReleaseReadinessInput } from "../src/lib/release-readiness/index";

type ReleaseStateFile = ReleaseReadinessInput & {
  schemaVersion: string;
  asOf: string;
  evidenceHead: string;
  notes?: readonly string[];
};

const filePath = path.resolve(process.cwd(), process.argv[2] ?? "data/release/current-readiness-2026-09-11.json");
const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as ReleaseStateFile;

if (parsed.schemaVersion !== "release-readiness-v1") {
  throw new Error(`Unsupported release-readiness schema: ${parsed.schemaVersion}`);
}

const result = evaluateReleaseReadiness(parsed);
const output = {
  asOf: parsed.asOf,
  evidenceHead: parsed.evidenceHead,
  status: result.status,
  missing: result.missing,
  deploymentAuthorized: result.deploymentAuthorized,
  publicationAuthorized: result.publicationAuthorized,
  notes: parsed.notes ?? [],
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
