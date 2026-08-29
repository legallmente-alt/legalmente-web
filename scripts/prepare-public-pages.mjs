import { existsSync, rmSync } from "node:fs";
import path from "node:path";

const protectedPaths = [
  ["out/internal", "internal routes"],
  ["out/internal-assets", "internal review assets"],
  ["out/_next/static/chunks/app/internal", "internal route chunks"],
];

for (const [relativePath, label] of protectedPaths) {
  const protectedPath = path.resolve(relativePath);
  if (existsSync(protectedPath)) {
    rmSync(protectedPath, { recursive: true, force: true });
    console.log(`Removed ${label} from the public Pages artifact.`);
  } else {
    console.log(`No ${label} found in the public Pages artifact.`);
  }
}
