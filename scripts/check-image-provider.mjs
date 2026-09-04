import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const deps = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) };

const geminiPackages = [
  "@google/genai",
  "@google/generative-ai",
  "google-generativeai",
];
const installedPackage = geminiPackages.find((name) => Boolean(deps[name]));
const envNames = ["GEMINI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];
const configuredEnv = envNames.find((name) => Boolean(process.env[name]?.trim()));

let state = "NOT_INSTALLED";
if (installedPackage && !configuredEnv) state = "INSTALLED_NOT_CONFIGURED";
if (installedPackage && configuredEnv) state = "CONFIGURED_NOT_PROVEN_USABLE";

const report = {
  provider: "GEMINI",
  state,
  package: installedPackage ?? null,
  credentialVariablePresent: configuredEnv ?? null,
  credentialValueExposed: false,
  liveCapabilityTestExecuted: false,
  note:
    state === "NOT_INSTALLED"
      ? "No supported Gemini SDK dependency is declared. Do not claim Gemini image generation is available."
      : state === "INSTALLED_NOT_CONFIGURED"
        ? "SDK is declared but no supported credential variable is present in this process."
        : "SDK and a credential variable are present, but a live generation call is still required before declaring the provider usable.",
};

console.log(JSON.stringify(report, null, 2));

// Fail closed only for an explicit requirement from CI/operator.
if (process.env.LEGALMENTE_REQUIRE_GEMINI === "1" && state !== "CONFIGURED_NOT_PROVEN_USABLE") {
  process.exitCode = 2;
}
