import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outputRoot = join(process.cwd(), "out");
const requiredRoutes = [
  "index.html",
  "explorar/index.html",
  "antes-de-firmar/index.html",
  "casos/index.html",
  "confianza/index.html",
  "sobre/index.html",
  "mundo/vida-cotidiana/index.html",
  "concepto/consentimiento/index.html",
  "proceso/organizar-hechos-y-prueba/index.html",
];

if (!existsSync(outputRoot)) {
  throw new Error("Public artifact missing: run build:public first.");
}

const missingRoutes = requiredRoutes.filter((route) => !existsSync(join(outputRoot, route)));
if (missingRoutes.length > 0) {
  throw new Error(`Missing public routes: ${missingRoutes.join(", ")}`);
}

const internalRoot = join(outputRoot, "internal");
if (existsSync(internalRoot)) {
  throw new Error("Public artifact exposes the internal route directory.");
}

const robotsPath = join(outputRoot, "robots.txt");
const headersPath = join(outputRoot, "_headers");
if (!existsSync(robotsPath) || !existsSync(headersPath)) {
  throw new Error("Public artifact is missing robots.txt or _headers.");
}

const home = readFileSync(join(outputRoot, "index.html"), "utf8");
const requiredHomeSignals = ["Entender el Derecho empieza por una pregunta", "Antes de firmar"];
const missingSignals = requiredHomeSignals.filter((signal) => !home.includes(signal));
if (missingSignals.length > 0) {
  throw new Error(`Home is missing expected educational signals: ${missingSignals.join(", ")}`);
}

console.log(`Public route proof passed: ${requiredRoutes.length} routes, internal route absent, security files present.`);
