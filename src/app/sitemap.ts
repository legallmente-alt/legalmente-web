import type { MetadataRoute } from "next";
import { chapters, concepts, processes, series, worlds } from "@/lib/knowledge-graph/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ef9882a7.legalmente-educativo.pages.dev";

export const dynamic = "force-static";

const publicPaths = [
  "/",
  "/explorar",
  "/antes-de-firmar",
  "/casos",
  "/confianza",
  "/sobre",
  "/areas-de-practica",
  "/catalogo",
  "/contacto",
  ...worlds.map(({ id }) => `/mundo/${id}`),
  ...series.map(({ id }) => `/serie/${id}`),
  ...chapters.map(({ id }) => `/capitulo/${id}`),
  ...concepts.map(({ id }) => `/concepto/${id}`),
  ...processes.map(({ id }) => `/proceso/${id}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
