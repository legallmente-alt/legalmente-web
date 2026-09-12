import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export const ROTATION_AXES = [
  "world",
  "legalDomain",
  "concept",
  "visualSchool",
  "scenario",
  "revelation",
  "framing",
  "humanPresence",
  "brandObject",
  "dominantPalette",
];

export const FIVE_VARIATION_AXES = ["visualSchool", "scenario", "revelation", "framing", "humanPresence"];

const normalize = (value) => String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");

export function combinationKey(candidate) {
  const payload = ROTATION_AXES.map((axis) => `${axis}=${normalize(candidate[axis]) || "unknown"}`).join("|");
  return createHash("sha256").update(payload).digest("hex");
}

function compare(candidate, previous, axes) {
  return axes.filter((axis) => {
    const left = normalize(candidate[axis]);
    const right = normalize(previous?.[axis]);
    return left && right && left !== "unknown" && right !== "unknown";
  });
}

function changedAxes(candidate, previous, axes) {
  return compare(candidate, previous, axes).filter((axis) => normalize(candidate[axis]) !== normalize(previous[axis]));
}

export function evaluateCandidate(candidate, history, { minChangedAxes = 3, recentSchoolWindow = 5 } = {}) {
  const key = combinationKey(candidate);
  const exactCollision = history.find((item) => item.combinationKey === key);
  if (exactCollision) {
    return { state: "REJECTED_EXACT_COLLISION", combinationKey: key, collisionWith: exactCollision.assetId ?? exactCollision.contentId ?? "unknown" };
  }

  const previous = history.at(-1);
  const recentSchools = history.slice(-recentSchoolWindow).map((item) => normalize(item.visualSchool)).filter((value) => value && value !== "unknown");
  const candidateSchool = normalize(candidate.visualSchool);
  if (candidateSchool && recentSchools.includes(candidateSchool)) {
    return { state: "REJECTED_SCHOOL_RECENCY", combinationKey: key, collisionWith: "recent_visual_school" };
  }

  if (!previous) {
    return { state: "READY_FIRST_ENTRY", combinationKey: key, changedAxes: FIVE_VARIATION_AXES };
  }

  const comparableAxes = compare(candidate, previous, FIVE_VARIATION_AXES);
  if (comparableAxes.length < minChangedAxes) {
    return {
      state: "HOLD_INSUFFICIENT_HISTORY",
      combinationKey: key,
      comparableAxes,
      requiredComparableAxes: minChangedAxes,
      reason: "No se puede demostrar el mínimo de tres variaciones porque el registro anterior tiene ejes desconocidos.",
    };
  }

  const changed = changedAxes(candidate, previous, FIVE_VARIATION_AXES);
  if (changed.length < minChangedAxes) {
    return { state: "REJECTED_INSUFFICIENT_VARIATION", combinationKey: key, changedAxes: changed, required: minChangedAxes };
  }

  return { state: "READY", combinationKey: key, changedAxes: changed };
}

export function registerCandidate(candidate, history, metadata = {}) {
  const decision = evaluateCandidate(candidate, history);
  if (!["READY", "READY_FIRST_ENTRY"].includes(decision.state)) {
    return { decision, history };
  }
  return {
    decision,
    history: [...history, { ...candidate, ...metadata, combinationKey: decision.combinationKey, registeredAt: metadata.registeredAt ?? new Date().toISOString() }],
  };
}

export function loadRegistry(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , candidatePath, registryPath = "data/visual-combination-registry.json"] = process.argv;
  if (!candidatePath) {
    console.error("Uso: node scripts/visual-rotation-engine.mjs <candidate.json> [registry.json]");
    process.exit(2);
  }
  const candidate = loadRegistry(candidatePath);
  const registry = loadRegistry(registryPath);
  const history = registry.entries ?? registry;
  console.log(JSON.stringify(evaluateCandidate(candidate, history), null, 2));
}
