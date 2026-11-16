# my-mobile-app

Turborepo monorepo for a story/reels template maker (a "500 Stories"-style
product):

| Path | What it is |
| --- | --- |
| `apps/mobile` | Expo (SDK 58) app — template gallery, editor, export |
| `apps/web` | Next.js — marketing landing page + `/admin` template panel |
| `packages/template-schema` | Shared Zod schema for the template JSON format |
| `supabase/` | Migrations + backend docs (shared by all apps) |

## Commands (run from the repo root)

```sh
bun install            # install everything
bun run dev            # all apps via turbo (persistent)
bun run lint           # turbo lint
bun run typecheck      # turbo typecheck
bun run build          # turbo build
```

App-specific:

```sh
bunx --cwd apps/mobile expo start        # mobile dev server
bunx --cwd apps/web next dev             # web: landing page + /admin
```

## Environment

- `apps/mobile/.env.local` — `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_KEY`
- `apps/web/.env.local` — `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_KEY`

Keys are publishable (anon) keys; data access is guarded by RLS. See
`supabase/README.md` for schema setup and creating the first admin user.
