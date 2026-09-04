import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const deps = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) };

const geminiSdkPackages = [
  "@google/genai",
  "@google/generative-ai",
  "google-generativeai",
];
const installedSdkPackage = geminiSdkPackages.find((name) => Boolean(deps[name]));
const localCliPackage = deps["@google/gemini-cli"] ? "@google/gemini-cli" : null;
const envNames = ["GEMINI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];
const configuredEnv = envNames.find((name) => Boolean(process.env[name]?.trim()));

let sdkState = "NOT_INSTALLED";
if (installedSdkPackage && !configuredEnv) sdkState = "INSTALLED_NOT_CONFIGURED";
if (installedSdkPackage && configuredEnv) sdkState = "CONFIGURED_NOT_PROVEN_USABLE";

const cliProbe = spawnSync("gemini", ["--version"], {
  encoding: "utf8",
  timeout: 5000,
  env: process.env,
});
const cliAvailable = cliProbe.status === 0 && Boolean(cliProbe.stdout?.trim());
const cliVersion = cliAvailable ? cliProbe.stdout.trim().split(/\r?\n/)[0] : null;
const cliState = cliAvailable ? "CLI_AVAILABLE_NOT_PROVEN_FOR_IMAGE_WORKFLOW" : "CLI_NOT_AVAILABLE_IN_THIS_ENVIRONMENT";

const report = {
  provider: "GEMINI",
  sdk: {
    state: sdkState,
    package: installedSdkPackage ?? null,
    credentialVariablePresent: configuredEnv ?? null,
    credentialValueExposed: false,
    liveCapabilityTestExecuted: false,
  },
  cli: {
    state: cliState,
    localPackageDeclared: localCliPackage,
    executableDetected: cliAvailable,
    version: cliVersion,
    environmentScope: "CURRENT_PROCESS_ENVIRONMENT_ONLY",
  },
  usableForProgrammaticImageGeneration: false,
  note:
    "Gemini SDK integration and Gemini CLI availability are separate facts. A CLI executable does not prove this repository can generate images programmatically, and CI cannot prove what is installed on a separate Claude Code workstation. Declare live image capability only after an authorized provider adapter and live capability test succeed.",
};

console.log(JSON.stringify(report, null, 2));

// Fail closed only when an operator explicitly requires a particular capability.
if (process.env.LEGALMENTE_REQUIRE_GEMINI_SDK === "1" && sdkState !== "CONFIGURED_NOT_PROVEN_USABLE") {
  process.exitCode = 2;
}
if (process.env.LEGALMENTE_REQUIRE_GEMINI_CLI === "1" && !cliAvailable) {
  process.exitCode = 3;
}
