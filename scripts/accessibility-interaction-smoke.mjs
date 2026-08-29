import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const baseUrl = process.env.PROOF_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/explorar",
  "/mundo/vida-cotidiana",
  "/serie/consentimiento-y-obligaciones",
  "/capitulo/consentimiento-no-es-solo-firma",
  "/concepto/consentimiento",
  "/proceso/organizar-hechos-y-prueba",
  "/confianza",
  "/preparar/contrato",
];
const viewports = [
  { name: "1440", width: 1440, height: 1000 },
  { name: "430", width: 430, height: 932 },
  { name: "390", width: 390, height: 844 },
  { name: "360", width: 360, height: 800 },
];

const browser = await chromium.launch({ headless: true });
const results = [];
let failed = false;

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();

    for (const route of routes) {
      const response = await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded" });
      await page.locator("body").waitFor({ state: "visible" });

      const audit = await page.evaluate(() => {
        const selector = "a[href],button,input,select,textarea,summary,[role='button']";
        const visible = Array.from(document.querySelectorAll(selector)).filter((el) => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden";
        });
        const unnamed = [];
        const smallTargets = [];
        const noFocusIndicator = [];

        for (const el of visible) {
          const r = el.getBoundingClientRect();
          const tag = el.tagName.toLowerCase();
          const href = el.getAttribute("href");
          const descriptor = href ? `${tag}[href=${href}]` : tag;
          const text = (el.textContent ?? "").trim();
          const name = el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || text || el.getAttribute("title") || ("value" in el ? String(el.value || "") : "");
          if (!name.trim()) unnamed.push(descriptor);
          if (r.width < 24 || r.height < 24) smallTargets.push(`${descriptor}:${Math.round(r.width)}x${Math.round(r.height)}`);

          el.focus();
          const fs = getComputedStyle(el);
          const hasOutline = fs.outlineStyle !== "none" && parseFloat(fs.outlineWidth || "0") > 0;
          const hasShadow = fs.boxShadow !== "none";
          const hasUnderline = fs.textDecorationLine.includes("underline");
          if (!hasOutline && !hasShadow && !hasUnderline) noFocusIndicator.push(descriptor);
        }
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

        const ids = Array.from(document.querySelectorAll("[id]")).map((el) => el.id).filter(Boolean);
        const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
        const levels = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((h) => Number(h.tagName.slice(1)));
        const headingJumps = levels.slice(1).filter((level, i) => level - levels[i] > 1).length;
        const navsWithoutLabel = Array.from(document.querySelectorAll("nav")).filter((nav) => !nav.getAttribute("aria-label") && !nav.getAttribute("aria-labelledby")).length;
        const imagesMissingAlt = Array.from(document.images).filter((img) => !img.hasAttribute("alt")).length;

        return {
          lang: document.documentElement.lang,
          h1Count: document.querySelectorAll("h1").length,
          mainCount: document.querySelectorAll("main").length,
          footerCount: document.querySelectorAll("footer").length,
          duplicateIds,
          headingJumps,
          navsWithoutLabel,
          imagesMissingAlt,
          unnamed: unnamed.slice(0, 10),
          smallTargets: smallTargets.slice(0, 10),
          noFocusIndicator: noFocusIndicator.slice(0, 10),
          interactiveCount: visible.length,
        };
      });

      const ok = (response?.status() ?? 0) < 400 &&
        audit.lang.toLowerCase().startsWith("es") &&
        audit.h1Count === 1 && audit.mainCount === 1 && audit.footerCount === 1 &&
        audit.duplicateIds.length === 0 && audit.headingJumps === 0 && audit.navsWithoutLabel === 0 &&
        audit.imagesMissingAlt === 0 && audit.unnamed.length === 0 && audit.smallTargets.length === 0 &&
        audit.noFocusIndicator.length === 0;

      if (!ok) failed = true;
      results.push({ route, viewport: viewport.name, ok, ...audit });
    }
    await context.close();
  }
} finally {
  await browser.close();
}

const report = { generatedAt: new Date().toISOString(), baseUrl, passed: !failed, results };
await writeFile("implementation-proofs/accessibility-interaction-summary.json", `${JSON.stringify(report, null, 2)}\n`, "utf8");

if (failed) {
  console.error("Accessibility/interaction smoke failed. See implementation-proofs/accessibility-interaction-summary.json");
  process.exitCode = 1;
} else {
  console.log(`Accessibility/interaction smoke passed for ${results.length} route/viewport combinations.`);
}
