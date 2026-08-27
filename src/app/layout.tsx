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
        <NavBar />
        <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
