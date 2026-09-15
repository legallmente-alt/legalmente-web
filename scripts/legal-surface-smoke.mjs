import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outputRoot = join(process.cwd(), "out");
const requiredPages = [
  ["terminos", ["Términos públicos", "no presta asesoría jurídica individual"]],
  ["privacidad", ["Privacidad pública", "no está diseñado para recibir tus datos"]],
  ["disclosure", ["Transparencia editorial", "Una fuente no convierte automáticamente"]],
];

for (const [route, signals] of requiredPages) {
  const file = join(outputRoot, route, "index.html");
  if (!existsSync(file)) throw new Error(`Missing legal page: ${route}`);
  const html = readFileSync(file, "utf8");
  const missing = signals.filter((signal) => !html.includes(signal));
  if (missing.length) throw new Error(`${route} is missing: ${missing.join(", ")}`);
}

const footerPages = ["/terminos", "/privacidad", "/disclosure"];
const home = readFileSync(join(outputRoot, "index.html"), "utf8");
const missingFooterLinks = footerPages.filter((path) => !new RegExp(`href=\"${path}/?\"`).test(home));
if (missingFooterLinks.length) throw new Error(`Home is missing legal links: ${missingFooterLinks.join(", ")}`);

console.log("Legal surface smoke passed: terms, privacy, disclosure and footer links are present.");
