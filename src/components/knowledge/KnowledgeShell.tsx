import Link from "next/link";

export type Crumb = { href: string; label: string };
export type RelatedLink = { href: string; label: string; note?: string };

export function KnowledgeShell({
  eyebrow,
  title,
  summary,
  crumbs,
  children,
  previous,
  next,
  related = [],
}: {
  eyebrow: string;
  title: string;
  summary: string;
  crumbs?: readonly Crumb[];
  children: React.ReactNode;
  previous?: RelatedLink | null;
  next?: RelatedLink | null;
  related?: readonly RelatedLink[];
}) {
  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto max-w-[1120px] px-5 pb-10 pt-10 md:px-8 md:pb-16 md:pt-14">
        {crumbs?.length ? (
          <nav aria-label="Ruta de aprendizaje" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#102A43]/55">
            {crumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <Link className="min-h-11 content-center underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#102A43]" href={crumb.href}>
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">{eyebrow}</p>
        <h1 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.045em]">{title}</h1>
        <p className="mt-7 max-w-[66ch] text-[17px] leading-7 text-[#102A43]/70 md:text-lg md:leading-8">{summary}</p>
      </section>

      <section className="border-y border-[#102A43]/10 bg-white/35">
        <div className="mx-auto max-w-[1120px] px-5 py-10 md:px-8 md:py-14">{children}</div>
      </section>

      {(previous || next || related.length) && (
        <section className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
          {(previous || next) && (
            <div className="grid gap-4 border-b border-[#102A43]/12 pb-10 sm:grid-cols-2">
              <div>
                {previous ? (
                  <Link href={previous.href} className="block min-h-11 border-l border-[#102A43]/20 pl-4 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
                    <span className="text-xs uppercase tracking-[0.14em] text-[#102A43]/45">Anterior</span>
                    <strong className="mt-1 block font-serif text-xl">{previous.label}</strong>
                  </Link>
                ) : null}
              </div>
              <div className="sm:text-right">
                {next ? (
                  <Link href={next.href} className="block min-h-11 border-r border-[#102A43]/20 pr-4 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
                    <span className="text-xs uppercase tracking-[0.14em] text-[#102A43]/45">Siguiente</span>
                    <strong className="mt-1 block font-serif text-xl">{next.label}</strong>
                  </Link>
                ) : null}
              </div>
            </div>
          )}

          {related.length ? (
            <div className="pt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/45">Conecta con</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.href} href={item.href} className="min-h-28 border-t border-[#102A43]/16 py-4 focus:outline-none focus:ring-2 focus:ring-[#102A43]">
                    <strong className="font-serif text-xl">{item.label}</strong>
                    {item.note ? <span className="mt-2 block text-sm leading-6 text-[#102A43]/62">{item.note}</span> : null}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}
