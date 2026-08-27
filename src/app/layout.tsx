import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LegalMente — divulgación jurídica panhispánica",
  description:
    "LegalMente: educación jurídica clara y panhispánica. Conceptos, máximas y diferencias legales explicadas con rigor y sin tecnicismos innecesarios.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen font-serif">
        <a
          href="#contenido-principal"
          className="sr-only z-50 rounded-sm bg-oro px-4 py-3 text-sm font-medium text-tinta focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <NavBar />
        <main id="contenido-principal" className="mx-auto max-w-6xl px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
