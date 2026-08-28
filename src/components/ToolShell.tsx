import Link from "next/link";
import { LEGAL_DATA_VERSION } from "@/lib/legal-rules";

export default function ToolShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <div className="inline-flex rounded-full border border-oro/30 bg-oro/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-oro">
          Beta interna · {eyebrow}
        </div>
        <h1 className="font-serif text-4xl leading-tight text-crema sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-6 text-crema/65">
          Herramienta educativa y preventiva. No sustituye una revisión profesional ni decide por ti.
        </p>
      </div>
      {children}
      <aside className="rounded-2xl border border-crema/10 bg-white/[0.03] p-5 text-sm leading-6 text-crema/65">
        <p className="font-medium text-crema">Fuentes, alcance y versión</p>
        <p className="mt-2">Territorio actual: México. Datos jurídicos: {LEGAL_DATA_VERSION}.</p>
        <p className="mt-2">Si tu situación no encaja en los supuestos mostrados, detén el cálculo y busca revisión profesional.</p>
      </aside>
      <Link href="/herramientas" className="inline-flex text-sm text-oro hover:underline">
        ← Volver a herramientas
      </Link>
    </div>
  );
}
