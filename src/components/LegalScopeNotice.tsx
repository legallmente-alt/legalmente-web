import Link from "next/link";

type LegalScopeNoticeProps = {
  compact?: boolean;
};

export default function LegalScopeNotice({ compact = false }: LegalScopeNoticeProps) {
  return (
    <aside
      aria-label="Alcance y límites de LegalMente"
      className={`border-l-2 border-[#D97745] bg-[#D97745]/8 text-[#102A43] ${compact ? "p-4 text-sm leading-6" : "p-5 text-sm leading-7 md:p-6"}`}
    >
      <p className="font-semibold uppercase tracking-[0.12em] text-[#102A43]/70">Alcance actual</p>
      <p className="mt-2">
        LegalMente ofrece educación y preparación general. No es un despacho, no presta asesoría jurídica individual y no determina la validez, exigibilidad o conveniencia de una decisión para un caso concreto.
      </p>
      <p className="mt-2 text-[#102A43]/70">
        Release educativo: México como territorio de referencia; sin recepción de casos, datos personales, documentos reales ni pagos.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-semibold">
        <Link className="underline decoration-[#102A43]/35 underline-offset-4 hover:decoration-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]" href="/terminos">Términos de uso</Link>
        <Link className="underline decoration-[#102A43]/35 underline-offset-4 hover:decoration-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]" href="/privacidad">Privacidad</Link>
        <Link className="underline decoration-[#102A43]/35 underline-offset-4 hover:decoration-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]" href="/disclosure">Disclosure y fuentes</Link>
      </div>
    </aside>
  );
}
