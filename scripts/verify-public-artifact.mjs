import { access, readFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve(process.env.PUBLIC_ARTIFACT_DIR ?? "out");
const requiredFiles = ["_headers", "robots.txt"];

const assertExists = async (relativePath) => {
  const absolutePath = path.join(outputDir, relativePath);
  try {
    await access(absolutePath);
  } catch {
    throw new Error(`Missing required public artifact file: ${relativePath}`);
  }
};

for (const file of requiredFiles) await assertExists(file);

try {
  await access(path.join(outputDir, "internal"));
  throw new Error("Public artifact contains the blocked /internal/ surface");
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const robots = await readFile(path.join(outputDir, "robots.txt"), "utf8");
if (!robots.includes("Disallow: /internal/")) {
  throw new Error("robots.txt must disallow /internal/");
}

const headers = await readFile(path.join(outputDir, "_headers"), "utf8");
for (const requiredHeader of ["X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) {
  if (!headers.includes(requiredHeader)) {
    throw new Error(`_headers is missing the baseline security header: ${requiredHeader}`);
  }
}

console.log(`Public artifact verification passed: ${outputDir}`);
