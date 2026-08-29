import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outputRoot = join(process.cwd(), "out");
const requiredRoutes = [
  "index.html",
  "404.html",
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
const publicFiles = readdirSync(outputRoot, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => join(entry.parentPath, entry.name));
const internalLeaks = publicFiles.filter((file) => /[\\/]internal([\\/]|[-_]|$)|product-lab|wave01a/i.test(file));
if (internalLeaks.length > 0) {
  throw new Error(`Public artifact exposes internal files:\n${internalLeaks.join("\n")}`);
}

const robotsPath = join(outputRoot, "robots.txt");
const headersPath = join(outputRoot, "_headers");
if (!existsSync(robotsPath) || !existsSync(headersPath)) {
  throw new Error("Public artifact is missing robots.txt or _headers.");
}
const sitemapPath = join(outputRoot, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  throw new Error("Public artifact is missing sitemap.xml.");
}
const sitemap = readFileSync(sitemapPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length < 40 || sitemapUrls.some((url) => /\/internal|product-lab|wave01a/i.test(url))) {
  throw new Error("Sitemap is missing public educational URLs or exposes an internal URL.");
}

const home = readFileSync(join(outputRoot, "index.html"), "utf8");
const requiredHomeSignals = ["Entender el Derecho empieza por una pregunta", "Antes de firmar"];
const missingSignals = requiredHomeSignals.filter((signal) => !home.includes(signal));
if (missingSignals.length > 0) {
  throw new Error(`Home is missing expected educational signals: ${missingSignals.join(", ")}`);
}

const notFoundPage = readFileSync(join(outputRoot, "404.html"), "utf8");
if (!notFoundPage.includes("404")) {
  throw new Error("404 page is present but does not contain a 404 marker.");
}

const htmlFiles = readdirSync(outputRoot, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => join(entry.parentPath, entry.name));
const brokenLinks = [];
for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1];
    if (href.startsWith("/_next/") || href.startsWith("/assets/") || href.startsWith("/internal")) continue;
    const pathname = decodeURIComponent(href.split("#")[0].split("?")[0]);
    const candidates = pathname.endsWith("/")
      ? [join(outputRoot, pathname, "index.html")]
      : [join(outputRoot, pathname), join(outputRoot, `${pathname}.html`), join(outputRoot, pathname, "index.html")];
    if (!candidates.some((candidate) => existsSync(candidate))) {
      brokenLinks.push(`${htmlFile.replace(`${outputRoot}/`, "")}: ${href}`);
    }
  }
}
if (brokenLinks.length > 0) {
  throw new Error(`Broken public links found:\n${brokenLinks.join("\n")}`);
}

console.log(`Public route proof passed: ${requiredRoutes.length} routes, ${htmlFiles.length} HTML files, ${sitemapUrls.length} sitemap URLs, internal route absent, links valid, security files present.`);
