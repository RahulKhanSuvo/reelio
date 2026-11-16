# Reelio — agent guide

Reelio is a 500stories.app-style Instagram story/reels **template maker**: users pick an animated template, drop in their photos, and export a reel. This is a Turborepo + bun workspaces monorepo. Prioritize mobile-first patterns, performance, and cross-platform compatibility in `apps/mobile`.

**Product direction:** this is a real product intended for the stores, not a demo. Video export is **on-device** (no ffmpeg-kit — retired upstream; encoder selection is an open task requiring a dev build).

## Layout

```
apps/mobile        Expo app (SDK 58, Expo Router, RN 0.88) — gallery, editor, export
apps/web           Next.js 16 — landing page (/) + template admin panel (/admin, login at /admin/login)
packages/template-schema   Shared Zod schema: the template JSON format consumed by ALL apps
supabase/          SQL migrations + backend README (apply manually — see its README)
```

Key mobile internals:

- `src/app/` — routes ONLY. Every file is a screen; `_layout.tsx` defines navigators. Route files are thin wrappers; screen bodies live in `src/screens/`.
- `src/components/` — shared UI, kebab-case files, built once and reused (no copy-paste variants).
- `src/theme.ts` — the only place visual values live: colors, spacing (4-pt grid), radius, shadows (as `boxShadow` strings), type scale. Never hardcode hex/spacing in a component.
- `src/data/` — local catalogs (templates, guides, filters, images). Placeholder content until Supabase is wired; `src/data/images.ts` is the single swap point for placeholder Unsplash URLs.
- `src/components/template-canvas.tsx` — renders `@reelio/template-schema` JSON on a 1080×1920 canvas scaled to any width. Used by cards AND (later) the editor — one renderer, not two.

## Current status (update this as milestones land)

- ✅ Monorepo, schema, Supabase migration (`0001_init.sql`, **not yet applied** — steps in `supabase/README.md`)
- ✅ Main tabs: Home / Guides / Profile, floating glass tab bar, template renderer
- ⏳ Next: editor flow (template picker + editor with sheets: stickers, background, layers, text modal) — routes `/create` and `/template/[id]` do NOT exist yet
- ⏳ Later: on-device video export, onboarding quiz, paywall
- Stub pattern: features without routes get an `Alert` placeholder ("coming next") — never navigate to a nonexistent route (typed routes make that a compile error anyway)

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of `expo` in `apps/mobile/package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links; never answer from memory.

## Commands

Bun workspace — install from the repo root; app-level Expo CLI via `--cwd`.

```bash
bun install                                    # installs ALL workspaces (one lockfile)
bun run dev                                    # mobile + web dev servers via turbo
bun run lint / bun run typecheck               # turbo, all workspaces — run before declaring ANY task done
bunx --cwd apps/mobile expo start              # mobile dev server (QR → Expo Go)
bunx --cwd apps/mobile expo install <pkg>      # ALWAYS instead of bun/npm add — resolves SDK-compatible versions
bunx --cwd apps/mobile expo-doctor             # dependency/config diagnostics
bunx --cwd apps/web next dev                   # web: landing page + /admin
bunx eas-cli <command>                          # EAS builds/submits/OTA updates
```

## Hard-won gotchas (observed in this repo)

- **RN 0.88 types dropped `StyleSheet.absoluteFillObject`** — use `StyleSheet.absoluteFill`.
- **`typedRoutes` is ON** (`app.json` → experiments). `router.push` with a route that has no file fails typecheck. Create the route file first, or stub with `Alert`.
- **`boxShadow` strings** (`shadows` tokens), not legacy `shadowColor`/`elevation` props.
- **`fontWeight` must be a literal** (`"400" | "500" | ...`) — typed maps like `Record<string, TextStyle["fontWeight"]>`, not `Record<string, string>`.
- **Never put `*/` inside a block comment** (it closes the comment early — caused a real parse error in `src/theme.ts`).
- **`expo-doctor` duplicate-package warning is expected under bun** — same versions linked twice (bun hoisting). Harmless until the first native build; de-dup then, not now.
- **Next.js `cacheComponents`**: `new Date()` in prerendered pages fails the build — isolate into a `"use cache"` component (see `apps/web/app/page.tsx`).
- **Gradients in the schema are structured** `{ angle, colors }` (CSS `linear-gradient()` strings can't render in RN). Convert with the formula in `template-canvas.tsx`.
- `ios/`/`android/` don't exist (CNG). Never create/edit them by hand — configure via `app.json` + config plugins. Expo Go only bundles native modules; new native libs need a dev build.

## Conventions

- **Schema first:** template behavior (layers, frames, animations, backgrounds) is defined by `packages/template-schema` — change the schema + starter templates, and admin/mobile both follow. Types come from `z.infer`, never re-declared.
- **Reuse before writing:** check `src/components/` for an existing component (Chip, ProBadge, HeartButton, SectionHeader, TemplateCard, GuideCard, FilterCard, HeroBanner, FloatingTabBar, TemplateCanvas, ThemedText) before creating anything new.
- **No components inside `src/app/`.**
- **One source per list:** screens read from `src/data/*`, never inline arrays.
- **Animations:** entrance/loop transitions run through `AnimatedLayer` (Reanimated); keep scroll lists non-animated (`animate={false}`) for performance.
- Backend writes go through the admin panel (`/admin`), which writes the `templates` table validated against the schema; mobile fetches published templates.

## Git

- Remote: `git@github.com:RahulKhanSuvo/reelio.git`, branch `master`. Commit after each milestone.
- `.env.local` files (publishable Supabase keys) are gitignored — never commit env files.
