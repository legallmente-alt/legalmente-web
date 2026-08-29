import type { SVGProps } from "react";

import type { SymbolId, VisualState } from "./tokens";
import { visualTokens } from "./tokens";

type SymbolProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  id: SymbolId;
  label: string;
  state?: VisualState;
  size?: 24 | 32 | 48;
};

function StateOverlay({ state }: { state?: VisualState }) {
  if (!state) return null;
  switch (state) {
    case "pass":
      return <circle cx="19" cy="5" r="1.25" fill="currentColor" stroke="none" />;
    case "requireInput":
      return <path d="M20 8h2v8h-2" />;
    case "reviewRequired":
      return <path d="M16.5 4.5h4v4M20.5 15.5v4h-4" />;
    case "hold":
      return <path d="M18 4h4M18 20h4" />;
    case "outOfScope":
      return <path d="M17 5h5v5M19 18h3" />;
  }
}

function BaseSymbol({ id }: { id: SymbolId }) {
  switch (id) {
    case "learn":
      return <><path d="M3 5.5c3-1 5.5-.5 9 2v11c-3.5-2.5-6-3-9-2z" /><path d="M21 5.5c-3-1-5.5-.5-9 2v11c3.5-2.5 6-3 9-2z" /><path d="M12 7.5v11" /><circle cx="5.3" cy="8" r=".8" fill="currentColor" stroke="none" /></>;
    case "resolve":
      return <><path d="M3 5c4 0 5.5 3 8 6" /><path d="M3 19c4 0 5.5-3 8-6" /><circle cx="12" cy="12" r="1.4" /><path d="M13.5 12H21" /><path d="m18.5 9.5 2.5 2.5-2.5 2.5" /></>;
    case "prepare":
      return <><path d="M5 3h9l5 5v13H5z" /><path d="M14 3v5h5" /><path d="m8 11 1.4 1.4L12 10" /><path d="m8 15 1.4 1.4L12 14" /><path d="m8 19 1.4 1.4L12 18" /></>;
    case "case":
      return <><path d="M3 8h7l2-2h9v14H3z" /><path d="M7 10h10v7H7z" /><path d="M8.5 12.5h7" /></>;
    case "source":
      return <><circle cx="4.5" cy="12" r="1.5" /><path d="M6 12c3.5 0 4-5 7-5" /><path d="M13 4h7v16h-7z" /><path d="M15.5 9h2M15.5 12h2M15.5 15h2" /></>;
    case "territory":
      return <><path d="M5 3H3v7M19 3h2v7M3 14v7h7M21 14v7h-7" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>;
    case "compare":
      return <><path d="M4 5h9v13H4z" /><path d="M11 7h9v13h-9" /><path d="M7 11h10" /></>;
    case "alert":
      return <><path d="M3 8v8h5M21 8v8h-5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><path d="M8.5 9.5c-1 1.4-1 3.6 0 5M15.5 9.5c1 1.4 1 3.6 0 5" /></>;
    case "contract":
      return <><path d="M3 5h7v14H3zM14 5h7v14h-7" /><path d="M10 10h4v4h-4" /><circle cx="12" cy="12" r="1.3" /></>;
    case "company":
      return <><rect x="3" y="6" width="5" height="12" rx="1" /><rect x="9.5" y="3" width="5" height="15" rx="1" /><rect x="16" y="8" width="5" height="10" rx="1" /><path d="M8 12h1.5M14.5 12H16" /></>;
    case "labor":
      return <><rect x="5" y="4" width="14" height="16" rx="2" /><circle cx="7" cy="8" r=".8" fill="currentColor" stroke="none" /><circle cx="7" cy="12" r=".8" fill="currentColor" stroke="none" /><circle cx="7" cy="16" r=".8" fill="currentColor" stroke="none" /><circle cx="17" cy="8" r=".8" fill="currentColor" stroke="none" /><circle cx="17" cy="12" r=".8" fill="currentColor" stroke="none" /><circle cx="17" cy="16" r=".8" fill="currentColor" stroke="none" /><path d="M10 12h4M12 10v4" /></>;
    case "evidence":
      return <><path d="M4 3H2v6M20 3h2v6M2 15v6h6M22 15v6h-6" /><rect x="8.5" y="8.5" width="7" height="7" rx="1.2" /><path d="M4.5 18c2.5-1 3-3 4-4" /><circle cx="4" cy="18" r="1" /></>;
  }
}

export function LegalMenteSymbol({ id, label, state, size = 24, style, ...props }: SymbolProps) {
  const stroke = size === 48 ? visualTokens.stroke.icon48 : size === 32 ? visualTokens.stroke.icon32 : visualTokens.stroke.icon24;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: visualTokens.color.ink, ...style }}
      {...props}
    >
      <title>{label}</title>
      <BaseSymbol id={id} />
      <StateOverlay state={state} />
    </svg>
  );
}

export const symbolImplementationStatus = "VECTOR_CANDIDATE_REQUIRES_ART_QA" as const;
