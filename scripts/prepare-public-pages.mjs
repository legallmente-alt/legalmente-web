import { existsSync, rmSync } from "node:fs";
import path from "node:path";

const internalPath = path.resolve("out/internal");
if (existsSync(internalPath)) {
  rmSync(internalPath, { recursive: true, force: true });
  console.log("Removed internal routes from the public Pages artifact.");
} else {
  console.log("No internal routes found in the public Pages artifact.");
}
