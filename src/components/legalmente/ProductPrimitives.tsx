import type { ReactNode } from "react";

import { LegalMenteSymbol, visualTokens, type CardFamily, type SymbolId, type VisualState } from "@/lib/visual-system";

const stateCopy: Record<VisualState, { label: string; shape: string }> = {
  pass: { label: "Listo para continuar", shape: "●" },
  requireInput: { label: "Falta información", shape: "◫" },
  reviewRequired: { label: "Revisión requerida", shape: "◎" },
  hold: { label: "En espera", shape: "Ⅱ" },
  outOfScope: { label: "Fuera de alcance", shape: "↗" },
};

export function toVisualState(state: "PASS" | "REQUIRE_INPUT" | "REVIEW_REQUIRED" | "HOLD" | "OUT_OF_SCOPE"): VisualState {
  return state === "PASS" ? "pass" : state === "REQUIRE_INPUT" ? "requireInput" : state === "REVIEW_REQUIRED" ? "reviewRequired" : state === "HOLD" ? "hold" : "outOfScope";
}

export function LegalStateBadge({ state, symbol = "alert", reason }: { state: VisualState; symbol?: SymbolId; reason?: string }) {
  const copy = stateCopy[state];
  return (
    <div
      role="status"
      aria-label={reason ? `${copy.label}: ${reason}` : copy.label}
      className="flex min-h-11 items-center gap-3 border border-tinta/20 bg-white/80 px-3 py-2 text-sm font-medium text-tinta"
    >
      <LegalMenteSymbol id={symbol} label={copy.label} state={state} size={24} aria-hidden="true" />
      <span aria-hidden="true" className="font-serif text-base">{copy.shape}</span>
      <span>{copy.label}</span>
      {reason ? <span className="ml-auto max-w-[28ch] text-xs font-normal text-tinta/70">{reason}</span> : null}
    </div>
  );
}

type EditorialCardProps = {
  family: CardFamily;
  title: string;
  meta?: string;
  symbol: SymbolId;
  state?: VisualState;
  children?: ReactNode;
  href?: string;
};

const ratioClass: Record<CardFamily, string> = {
  world: "aspect-[4/5]",
  series: "aspect-video",
  chapter: "aspect-[3/2]",
  piece: "aspect-[9/16]",
  tool: "aspect-square",
  trust: "aspect-[4/3]",
};

export function EditorialCard({ family, title, meta, symbol, state, children, href }: EditorialCardProps) {
  const content = (
    <>
      <div className={`${ratioClass[family]} relative overflow-hidden bg-crema`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-crema to-tinta/10" aria-hidden="true" />
        <div className="absolute right-4 top-4 rounded-full bg-white/85 p-2 shadow-sm">
          <LegalMenteSymbol id={symbol} label={title} state={state} size={32} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 border-l-2 border-oro pl-3 text-xs uppercase tracking-[0.08em] text-tinta/65">
          {family}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="font-serif text-2xl leading-tight text-tinta">{title}</h3>
          {meta ? <p className="mt-2 text-sm leading-6 text-tinta/70">{meta}</p> : null}
        </div>
        {state ? <LegalStateBadge state={state} symbol={symbol} /> : null}
        {children}
      </div>
    </>
  );

  const className = "block overflow-hidden border border-tinta/15 bg-white shadow-sm transition-transform focus:outline-none focus:ring-2 focus:ring-tinta focus:ring-offset-2 motion-reduce:transition-none hover:-translate-y-1 motion-reduce:hover:translate-y-0";
  const style = { transitionDuration: `${visualTokens.motion.shortMs}ms`, transitionTimingFunction: visualTokens.motion.easing };

  return href ? <a href={href} className={className} style={style}>{content}</a> : <article className={className} style={style}>{content}</article>;
}
