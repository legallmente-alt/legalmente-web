import { chromium } from "playwright";

const baseUrl = process.env.PROOF_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/explorar",
  "/catalogo",
  "/concepto/consentimiento",
  "/concepto/deber-profesional",
  "/concepto/representacion",
  "/proceso/leer-antes-de-aceptar",
  "/proceso/organizar-hechos-y-prueba",
  "/confianza",
  "/sobre",
  "/contacto",
];

const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push({ route: page.url(), type: "console", text: message.text() });
  });
  page.on("pageerror", (error) => errors.push({ route: page.url(), type: "pageerror", text: error.message }));
  for (const route of routes) {
    await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" });
    await page.locator("body").waitFor({ state: "visible" });
  }
} finally {
  await browser.close();
}
if (errors.length) {
  console.error(JSON.stringify(errors, null, 2));
  process.exit(1);
}
console.log(`console_smoke=PASS routes=${routes.length}`);
