import Link from "next/link";

export default function Footer() {
  const linkClass = "inline-flex min-h-11 items-center py-3 text-[#102A43]/72 hover:text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2";

  return (
    <footer className="border-t border-[#102A43]/12 bg-[#F5F0E8]">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-10 text-sm text-[#102A43]/66 md:grid-cols-[1fr_auto] md:px-8">
        <div className="max-w-[62ch] space-y-2">
          <p className="font-semibold text-[#102A43]">LegalMente</p>
          <p>
            Educación y preparación jurídica. El contenido no sustituye asesoría profesional ni determina por sí solo qué regla aplica a un caso concreto.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-x-5 gap-y-3 md:justify-end">
          <Link className={linkClass} href="/confianza">Fuentes y límites</Link>
          <Link className={linkClass} href="/sobre">Sobre LegalMente</Link>
        </div>
      </div>
    </footer>
  );
}
