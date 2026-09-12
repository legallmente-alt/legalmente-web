import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ef9882a7.legalmente-educativo.pages.dev"),
  title: "LegalMente — conocimiento jurídico para orientarte mejor",
  description:
    "LegalMente convierte preguntas jurídicas en rutas de comprensión, preparación, fuentes y siguientes pasos, con límites territoriales visibles.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "LegalMente",
    title: "LegalMente — conocimiento jurídico para orientarte mejor",
    description:
      "Rutas educativas para comprender situaciones jurídicas, preparar preguntas y seguir fuentes con límites visibles.",
  },
  twitter: {
    card: "summary",
    title: "LegalMente — conocimiento jurídico para orientarte mejor",
    description:
      "Rutas educativas para comprender situaciones jurídicas, preparar preguntas y seguir fuentes con límites visibles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#F5F0E8] text-[#102A43] antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
