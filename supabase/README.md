# Supabase

Backend for all apps (mobile, admin, web). Project: `wfxvzhvjtdgoneqosgsk`.

## Apply the schema

Either paste `migrations/0001_init.sql` into the Supabase dashboard SQL editor,
or use the CLI:

```sh
bunx supabase login
bunx supabase link --project-ref wfxvzhvjtdgoneqosgsk
bunx supabase db push
```

## Create the first admin

1. Dashboard → Authentication → Add user → create an email/password user.
2. SQL editor:

```sql
update public.profiles
set is_admin = true
where id = (select id from auth.users where email = 'you@example.com');
```

3. Sign in at the admin panel: run `apps/web` (`bunx --cwd apps/web next dev`)
   and open `/admin`.

## Storage

- `assets` — template artwork: stickers, fonts, decorative PNGs (public read)
- `previews` — template preview images/videos shown in the gallery (public read)

Both buckets are created by the migration; only admins can write (enforced by
RLS policies).
