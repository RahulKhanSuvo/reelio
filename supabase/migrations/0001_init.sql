-- ============================================================================
-- 0001_init.sql — profiles (admin flag), templates, storage buckets.
-- Safe to paste into the Supabase SQL editor or apply via `supabase db push`.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user; is_admin gates the admin panel + writes
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

-- ---------------------------------------------------------------------------
-- templates: the JSON template definition shared by admin + mobile
-- ---------------------------------------------------------------------------
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles (id) on delete set null,
  name text not null,
  category text not null check (category in ('story', 'reel')),
  -- shape validated by @reelio/template-schema
  schema jsonb not null,
  preview_image_url text,
  preview_video_url text,
  published boolean not null default false
);

alter table public.templates enable row level security;

create policy "Anyone can read published templates"
  on public.templates for select
  using (published or public.is_admin());

create policy "Admins can insert templates"
  on public.templates for insert
  with check (public.is_admin());

create policy "Admins can update templates"
  on public.templates for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete templates"
  on public.templates for delete
  using (public.is_admin());

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists templates_touch_updated_at on public.templates;
create trigger templates_touch_updated_at
  before update on public.templates
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- storage: public-read buckets for template assets and previews
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('assets', 'assets', true), ('previews', 'previews', true)
on conflict (id) do nothing;

drop policy if exists "Public read template buckets" on storage.objects;
create policy "Public read template buckets"
  on storage.objects for select
  using (bucket_id in ('assets', 'previews'));

drop policy if exists "Admins manage template buckets" on storage.objects;
create policy "Admins manage template buckets"
  on storage.objects for all
  using (bucket_id in ('assets', 'previews') and public.is_admin())
  with check (bucket_id in ('assets', 'previews') and public.is_admin());
