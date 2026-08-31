import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const registry = readFileSync("src/lib/visual-system/assets.ts", "utf8");
const assetFiles = [...registry.matchAll(/assetFile: "(LM-PA-[A-Za-z0-9_]+\.png)"/g)].map((match) => match[1]);
const uniqueAssetFiles = [...new Set(assetFiles)];
if (uniqueAssetFiles.length !== 20) throw new Error(`Production asset proof failed: expected 20 unique assets, found ${uniqueAssetFiles.length}`);

function pngDimensions(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47 || buffer.readUInt32BE(4) !== 0x0d0a1a0a) throw new Error("invalid PNG signature");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const observations = uniqueAssetFiles.map((assetFile) => {
  const filePath = `public/internal-assets/legalmente/production-assets/${assetFile}`;
  if (!existsSync(filePath)) throw new Error(`Production asset proof failed: missing ${filePath}`);
  const buffer = readFileSync(filePath);
  const { width, height } = pngDimensions(buffer);
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  return { assetFile, bytes: buffer.length, width, height, sha256 };
});

if (observations.some(({ width, height }) => width < 100 || height < 100)) throw new Error("Production asset proof failed: an asset is below the minimum raster size");

console.log(JSON.stringify({ status: "PASS", assetCount: observations.length, observations }, null, 2));
