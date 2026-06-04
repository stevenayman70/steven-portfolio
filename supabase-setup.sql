-- Run this in Supabase SQL Editor → New Query

create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  short_desc    text not null,
  long_desc     text,
  category      text not null check (category in ('ai-automation','n8n','serenoil','robotics','web','youtube')),
  tech_stack    text[] default '{}',
  thumbnail_url text,
  github_url    text,
  live_url      text,
  youtube_url   text,
  status        text not null default 'In Progress' check (status in ('Completed','In Progress','Case Study')),
  featured      boolean not null default false,
  sort_order    int,
  created_at    timestamptz not null default now()
);

-- Public read (anon key can SELECT)
alter table public.projects enable row level security;

create policy "Public read"
  on public.projects for select
  using (true);

create policy "Service role full access"
  on public.projects for all
  using (auth.role() = 'service_role');
