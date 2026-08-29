import Image from "next/image";
import type { Wave01aIntegrationUnit } from "@/lib/knowledge-graph/wave01a";

export function Wave01aIntegrationPreview({ unit }: { unit: Wave01aIntegrationUnit }) {
  return (
    <section
      aria-labelledby={`${unit.contentId}-integration-title`}
      data-content-id={unit.contentId}
      data-copy-state={unit.copyState}
      data-visual-state={unit.visualState}
      data-integration-state={unit.integrationState}
      data-publication-state={unit.publicationState}
      className="mt-12 border-y border-[#102A43]/15 bg-white/65 py-8 md:py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Unidad educativa · {unit.contentId}</p>
          <h2 id={`${unit.contentId}-integration-title`} className="mt-3 max-w-[18ch] font-serif text-3xl leading-tight md:text-4xl">Contexto para seguir aprendiendo</h2>
          <p className="mt-4 text-sm leading-6 text-[#102A43]/68">{unit.copy}</p>
          <p className="mt-5 border-l-2 border-[#D97745] pl-3 text-sm leading-6 text-[#102A43]/62">{unit.qualifier} Información educativa; no asesoría individual.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <figure>
            <Image src={unit.visualAsset} alt={unit.altText} width={1664} height={2080} className="aspect-[4/5] w-full object-cover" loading="lazy" unoptimized />
            <figcaption className="mt-2 text-xs leading-5 text-[#102A43]/48">Apoyo visual editorial; no representa una conclusión jurídica.</figcaption>
          </figure>
          <div className="space-y-5 text-sm leading-6 text-[#102A43]/68">
            <dl className="grid gap-3 border-y border-[#102A43]/12 py-4">
              <div><dt className="font-semibold text-[#102A43]">Fuente y artículos</dt><dd>{unit.sourceContext}</dd></div>
              <div><dt className="font-semibold text-[#102A43]">Territorio</dt><dd>{unit.territory}</dd></div>
              <div><dt className="font-semibold text-[#102A43]">Claims vinculados</dt><dd>{unit.claimIds.join(" · ")}</dd></div>
            </dl>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#102A43]/50">Continuidad</p>
              <p className="mt-2">{unit.previousLearning}</p>
              <p className="mt-2"><strong>Siguiente aprendizaje:</strong> {unit.nextLearning}</p>
            </div>
            <a className="inline-flex min-h-11 items-center border-b border-[#102A43]/60 px-1 font-semibold underline-offset-4 hover:border-[#102A43] hover:underline focus:outline-none focus:ring-2 focus:ring-[#102A43]" href={unit.sourceUrl} target="_blank" rel="noreferrer">Abrir fuente oficial <span aria-hidden="true" className="ml-2">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
