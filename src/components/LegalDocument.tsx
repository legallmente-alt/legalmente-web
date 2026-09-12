import Link from "next/link";
import LegalScopeNotice from "@/components/LegalScopeNotice";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
};

export default function LegalDocument({ eyebrow, title, intro, updated, children }: LegalDocumentProps) {
  return (
    <main className="min-h-[70vh] text-[#102A43]">
      <section className="border-b border-[#102A43]/12 bg-[#F5F0E8]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#102A43]/50">{eyebrow}</p>
          <h1 className="mt-5 max-w-[14ch] font-serif text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.94] tracking-[-0.045em]">{title}</h1>
          <p className="mt-7 max-w-[68ch] text-lg leading-8 text-[#102A43]/70">{intro}</p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#102A43]/45">Versión pública: {updated}</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-16">
        <LegalScopeNotice />
        <div className="prose prose-slate mt-10 max-w-[76ch] prose-headings:font-serif prose-headings:font-medium prose-p:leading-7 prose-li:leading-7">
          {children}
        </div>
        <div className="mt-12 border-t border-[#102A43]/12 pt-6 text-sm text-[#102A43]/65">
          <Link href="/confianza" className="font-semibold underline underline-offset-4">Volver a fuentes y límites</Link>
        </div>
      </section>
    </main>
  );
}
