export const visualTokens = {
  color: {
    ink: "#102A43",
    paper: "var(--lm-color-paper)",
    metal: "var(--lm-color-metal)",
    signal: "var(--lm-color-signal)",
    glow: "var(--lm-color-glow)",
    mist: "var(--lm-color-mist)",
  },
  spacing: {
    unit: "var(--lm-spacing-unit)",
    mobileGutter: 20,
    desktopGutter: "var(--lm-spacing-desktop-gutter)",
    touchTarget: 44,
  },
  radius: {
    card: "var(--lm-radius-card)",
  },
  stroke: {
    icon24: 1.75,
    icon32: 2.25,
    icon48: 3,
  },
  motion: {
    shortMs: 240,
    baseMs: 400,
    longMs: 600,
    easing: "cubic-bezier(0.2,0.8,0.2,1)",
  },
} as const;

export type VisualState = "pass" | "requireInput" | "reviewRequired" | "hold" | "outOfScope";
export type SymbolId = "learn" | "resolve" | "prepare" | "case" | "source" | "territory" | "compare" | "alert" | "contract" | "company" | "labor" | "evidence";
export type CardFamily = "world" | "series" | "chapter" | "piece" | "tool" | "trust";

export const typographyRoles = {
  display: { mobile: "32-40px", desktop: "48-64px", lineHeight: 1.12, tracking: "-0.02em", maxLine: "12ch", minimumPx: 32 },
  editorial: { mobile: "24-32px", desktop: "32-40px", lineHeight: 1.25, tracking: "-0.01em", maxLine: "24ch", minimumPx: 20 },
  ui: { mobile: "16-18px", desktop: "16-20px", lineHeight: 1.5, tracking: "0", maxLine: "32ch", minimumPx: 14 },
  data: { mobile: "14-16px", desktop: "14-18px", lineHeight: 1.43, tracking: "0.01em", maxLine: "28ch", minimumPx: 13 },
  source: { mobile: "12-14px", desktop: "12-15px", lineHeight: 1.33, tracking: "0.02em", maxLine: "32ch", minimumPx: 12 },
  warning: { mobile: "14-16px", desktop: "14-16px", lineHeight: 1.29, tracking: "0.01em", maxLine: "28ch", minimumPx: 13 },
  caption: { mobile: "12-14px", desktop: "12-15px", lineHeight: 1.33, tracking: "0.01em", maxLine: "36ch", minimumPx: 12 },
} as const;

export const implementationReadiness = {
  direction: "IMPLEMENTATION_READY_DIRECTION",
  vectorStatus: "VECTOR_READY_SPEC",
  productionFinal: false,
  unresolvedSourceTokens: ["color.paper", "color.metal", "color.signal", "color.glow", "color.mist", "spacing.unit", "spacing.desktopGutter", "radius.card"],
} as const;
