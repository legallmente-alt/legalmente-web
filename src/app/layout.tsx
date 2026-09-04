import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LegalMente — entender el Derecho para decidir mejor",
  description:
    "LegalMente es una plataforma de educación y preparación jurídica que conecta situaciones, conceptos, procesos, fuentes y territorio con límites visibles.",
  keywords: [
    "educación jurídica",
    "preparación jurídica",
    "contratos",
    "hechos y evidencia",
    "LegalMente",
  ],
  openGraph: {
    title: "LegalMente — entender el Derecho para decidir mejor",
    description:
      "Explora conceptos, procesos y herramientas de preparación jurídica con fuentes, contexto y límites territoriales visibles.",
    type: "website",
    locale: "es_ES",
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
