import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LegalMente — conocimiento jurídico para orientarte mejor",
  description:
    "LegalMente convierte preguntas jurídicas en rutas de comprensión, preparación, fuentes y siguientes pasos, con límites territoriales visibles.",
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
