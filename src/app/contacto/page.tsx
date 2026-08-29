import Link from "next/link";

export default function ContactoPage() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-[900px] px-5 py-20 text-[#102A43] md:px-8 md:py-28">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#102A43]/55">
        Canal no habilitado
      </p>
      <h1 className="max-w-[14ch] font-serif text-4xl leading-[1.02] tracking-[-0.025em] md:text-6xl">
        Contacto todavía no recibe casos ni datos personales.
      </h1>
      <div className="mt-8 max-w-[64ch] space-y-5 text-base leading-7 text-[#102A43]/76 md:text-lg">
        <p>
          LegalMente mantiene este canal cerrado mientras termina las reglas de privacidad, retención, seguridad y atención responsable.
        </p>
        <p>
          No envíes nombres, documentos, expedientes, datos de salud, información de un proceso ni detalles identificables de una situación jurídica por esta vía.
        </p>
        <p>
          La plataforma actual está orientada a educación y preparación general; no sustituye asesoría profesional para un caso concreto.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/explorar"
          className="inline-flex min-h-11 items-center border border-[#102A43] px-5 py-3 text-sm font-semibold text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2"
        >
          Explorar LegalMente →
        </Link>
        <Link
          href="/confianza"
          className="inline-flex min-h-11 items-center px-2 py-3 text-sm font-semibold text-[#102A43]/72 underline decoration-[#102A43]/30 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2"
        >
          Fuentes y límites
        </Link>
      </div>
    </main>
  );
}
