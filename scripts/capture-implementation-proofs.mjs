import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.PROOF_BASE_URL ?? "http://127.0.0.1:3000";
const outputDir = path.resolve("implementation-proofs");

const viewports = [
  { name: "1440", width: 1440, height: 1000 },
  { name: "430", width: 430, height: 932 },
  { name: "390", width: 390, height: 844 },
  { name: "360", width: 360, height: 800 },
];

const surfaces = [
  { name: "home", route: "/" },
  { name: "explore", route: "/explorar" },
  { name: "world", route: "/mundo/vida-cotidiana" },
  { name: "series", route: "/serie/consentimiento-y-obligaciones" },
  { name: "chapter", route: "/capitulo/consentimiento-no-es-solo-firma" },
  { name: "concept", route: "/concepto/consentimiento" },
  { name: "process", route: "/proceso/organizar-hechos-y-prueba" },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];
let failed = false;

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      colorScheme: "light",
    });

    const page = await context.newPage();
    page.setDefaultNavigationTimeout(20_000);
    page.setDefaultTimeout(10_000);

    for (const surface of surfaces) {
      const url = new URL(surface.route, baseUrl).toString();
      const response = await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.locator("body").waitFor({ state: "visible" });

      await page.evaluate(async () => {
        const images = Array.from(document.images);
        for (const image of images) image.loading = "eager";

        await Promise.all(
          images.map(async (image) => {
            if (!image.complete) {
              await new Promise((resolve) => {
                const finish = () => resolve(undefined);
                image.addEventListener("load", finish, { once: true });
                image.addEventListener("error", finish, { once: true });
                setTimeout(finish, 5000);
              });
            }
            if (typeof image.decode === "function") {
              try {
                await image.decode();
              } catch {
                // A failed decorative image must still be visible to the proof checks below.
              }
            }
          }),
        );
      });

      await page.waitForTimeout(150);

      const status = response?.status() ?? 0;
      const metrics = await page.evaluate(() => {
        const root = document.documentElement;
        const images = Array.from(document.images);
        return {
          title: document.title,
          h1Count: document.querySelectorAll("h1").length,
          clientWidth: root.clientWidth,
          scrollWidth: root.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          imageCount: images.length,
          brokenImages: images.filter((image) => image.complete && image.naturalWidth === 0).length,
        };
      });

      const horizontalOverflow = Math.max(metrics.scrollWidth, metrics.bodyScrollWidth) > metrics.clientWidth + 1;
      const ok =
        status >= 200 &&
        status < 400 &&
        metrics.h1Count === 1 &&
        !horizontalOverflow &&
        metrics.brokenImages === 0;
      if (!ok) failed = true;

      const filename = `${surface.name}-${viewport.name}.png`;
      await page.screenshot({
        path: path.join(outputDir, filename),
        fullPage: true,
        animations: "disabled",
      });

      results.push({
        surface: surface.name,
        route: surface.route,
        viewport,
        status,
        h1Count: metrics.h1Count,
        clientWidth: metrics.clientWidth,
        scrollWidth: Math.max(metrics.scrollWidth, metrics.bodyScrollWidth),
        horizontalOverflow,
        imageCount: metrics.imageCount,
        brokenImages: metrics.brokenImages,
        screenshot: filename,
        ok,
      });
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const summary = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  reducedMotion: "reduce",
  surfaces: surfaces.map((item) => item.route),
  viewports,
  checks: {
    httpSuccess: true,
    exactlyOneH1: true,
    noHorizontalOverflow: true,
    noBrokenImages: true,
  },
  passed: !failed,
  results,
};

await writeFile(path.join(outputDir, "proof-summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");

if (failed) {
  console.error("Integrated proof QA failed. See implementation-proofs/proof-summary.json");
  process.exitCode = 1;
} else {
  console.log(`Integrated proof QA passed for ${results.length} surface/viewport combinations.`);
}
