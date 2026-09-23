-- Omoakins content store: everything the dashboard edits.
--
-- One row per item (project, post, landing page, testimonial, site settings).
-- `draft` is what Timi is editing; `published` is what the live site shows.
-- Publishing copies draft -> published and rebuilds the site.

-- ---------- who may use the dashboard ----------
create table public.admins (
  email text primary key check (email = lower(email))
);
alter table public.admins enable row level security;
-- No policies on purpose: the list is only readable through is_admin() below.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where email = lower(auth.jwt() ->> 'email')
  );
$$;

-- ---------- content ----------
create table public.entries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('project', 'post', 'page', 'testimonial', 'settings')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  draft jsonb not null,
  published jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type, slug)
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger entries_touch before update on public.entries
  for each row execute function public.touch_updated_at();

alter table public.entries enable row level security;

-- The public site (and the build) reads published content only.
create policy "Anyone can read published entries"
  on public.entries for select to anon
  using (published is not null);

-- Visitors can never see drafts: anon only gets these columns.
revoke all on public.entries from anon;
grant select (id, type, slug, published, published_at) on public.entries to anon;

-- Timi (an admin) can do everything.
grant select, insert, update, delete on public.entries to authenticated;

create policy "Admins can read entries" on public.entries
  for select to authenticated using (public.is_admin());
create policy "Admins can add entries" on public.entries
  for insert to authenticated with check (public.is_admin());
create policy "Admins can edit entries" on public.entries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete entries" on public.entries
  for delete to authenticated using (public.is_admin());

-- ---------- images ----------
-- Public bucket: anyone can view an image by its URL; only admins can add, replace or remove.
-- SVG is left out because an SVG file can carry scripts.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
on conflict (id) do nothing;

create policy "Admins can list media" on storage.objects
  for select to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "Admins can upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "Admins can replace media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "Admins can delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
