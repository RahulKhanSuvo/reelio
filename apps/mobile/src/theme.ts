/**
 * Reelio design tokens — single source of truth for every visual value.
 * The app is a fixed dark brand design (pure black + yellow accent),
 * so colors are fixed rather than light/dark semantic pairs.
 */
export const colors = {
  bg: "#000000",
  surface: "#1c1c1e",
  surfaceRaised: "#2a2a2e",
  surfaceSoft: "rgba(255,255,255,0.08)",
  label: "#ffffff",
  labelSecondary: "rgba(235,235,245,0.6)",
  labelTertiary: "rgba(235,235,245,0.35)",
  accent: "#ffd60a",
  onAccent: "#000000",
  overlay: "rgba(0,0,0,0.55)",
  hairline: "rgba(255,255,255,0.12)",
} as const;

/** 4-point grid */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/** boxShadow strings — modern shadow syntax, not legacy shadowColor/elevation */
export const shadows = {
  card: "0 1px 2px rgba(0,0,0,0.05)",
  raised: "0 4px 12px rgba(0,0,0,0.10)",
  overlay: "0 8px 24px rgba(0,0,0,0.18)",
} as const;

export const motion = {
  fast: 150,
  base: 250,
  slow: 400,
} as const;

export const type = {
  largeTitle: { fontSize: 32, fontWeight: "800", color: colors.label },
  title: { fontSize: 26, fontWeight: "700", color: colors.label },
  headline: { fontSize: 17, fontWeight: "600", color: colors.label },
  body: { fontSize: 15, fontWeight: "400", color: colors.label },
  subhead: { fontSize: 13, fontWeight: "400", color: colors.labelSecondary },
  caption: { fontSize: 12, fontWeight: "400", color: colors.labelSecondary },
} as const;
