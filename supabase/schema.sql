-- Omoakins portfolio schema. Run once in the Supabase SQL editor.

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  position int not null default 0,
  status text not null default 'draft',          -- 'draft' | 'published'
  category text not null default 'product',      -- 'product' | 'campaigns' | 'brand-comms'
  subgroup text not null default '',             -- 'card-campaigns' | 'editorial' | 'events' | 'comms' | 'corporate' | ''
  badge text not null default '',                -- 'Shipped' | 'Case study' | 'In progress' | ''
  kind text not null default '',
  client text not null default '',
  year text not null default '',
  title text not null default '',
  summary text not null default '',
  tags text[] not null default '{}',
  meta jsonb not null default '[]',
  cover jsonb not null default '{}',
  theme jsonb not null default '{}',
  blocks jsonb not null default '[]',
  external_url text not null default '',
  external_label text not null default 'See the full case study on Behance',
  updated_at timestamptz not null default now()
);
create index if not exists case_studies_category_idx on public.case_studies (category);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'
);

-- Emails allowed into the admin.
create table if not exists public.admins (
  email text primary key
);

alter table public.case_studies enable row level security;
alter table public.site_settings enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where email = auth.jwt() ->> 'email');
$$;

-- Public reads published work and settings. Admins do everything.
drop policy if exists "public read published" on public.case_studies;
create policy "public read published" on public.case_studies for select using (status = 'published' or public.is_admin());
drop policy if exists "admin write studies" on public.case_studies;
create policy "admin write studies" on public.case_studies for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);
drop policy if exists "admin write settings" on public.site_settings;
create policy "admin write settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin read admins" on public.admins;
create policy "admin read admins" on public.admins for select using (public.is_admin());

-- Media bucket for uploads from the admin.
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "admin write media" on storage.objects;
create policy "admin write media" on storage.objects for all using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());

-- Replace with Timi's email:
-- insert into public.admins (email) values ('you@example.com');
