import type { Config } from "tailwindcss";

// Paleta oficial LegalMente — Realismo Cinematografico Editorial
// Fuente: Psyche-creation/docs/legalmente-marca-y-estilo.md (decision 23-ago-2026)
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crema: "#EDE7DA",
        oro: "#C8A24A",
        tinta: "#0E1A24",
        acento: {
          oxblood: "#5E2129",
          esmeralda: "#1F4B3F",
          indigo: "#2B2E6B",
          cobre: "#B5651D",
          terracota: "#A44A3F",
          acero: "#3D4C5A",
          miel: "#C98A2C",
          ciruela: "#4B2142",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
