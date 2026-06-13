-- Phase 3-3: Evolution system
-- Creates: profiles, evolution_generations, evolution_ticket_ledger
-- profiles.evolution_tickets starts at 2 for every new user (signup trigger)

-- ── profiles ───────────────────────────────────────────────────────────────
create table if not exists profiles (
  user_id            uuid primary key references auth.users(id) on delete cascade,
  character_id       text not null default 'F_A',
  display_name       text not null default '나',
  level              int  not null default 1,
  evolution_tickets  int  not null default 2
                     check (evolution_tickets >= 0),
  total_tickets_used int  not null default 0,
  created_at         timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "users can read own profile"
  on profiles for select
  using (auth.uid() = user_id);

create policy "users can insert own profile"
  on profiles for insert
  with check (auth.uid() = user_id);

create policy "users can update own profile"
  on profiles for update
  using (auth.uid() = user_id);

-- Trigger: grant 2 tickets on profile creation
-- (Edge Function uses service role, so the insert happens in onboarding flow)
-- The default value handles it — no trigger needed.

-- ── evolution_generations ──────────────────────────────────────────────────
create table if not exists evolution_generations (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  character_id        text not null,
  archetype_key       text not null,
  image_url           text,
  status              text not null default 'pending'
                      check (status in ('pending', 'ready', 'failed')),
  generation_type     text not null default 'free_ticket'
                      check (generation_type in ('free_ticket', 'level_milestone', 'paid')),
  ticket_reserved     boolean not null default false,
  ticket_consumed     boolean not null default false,
  level_at_generation int  not null default 1,
  prompt_version      text not null default 'v1',
  openai_cost_usd     numeric,
  generated_at        timestamptz not null default now(),
  -- One active row per (user, character, archetype) combination
  unique (user_id, character_id, archetype_key)
);

alter table evolution_generations enable row level security;

create policy "users can read own generations"
  on evolution_generations for select
  using (auth.uid() = user_id);

-- Write operations are service-role only (Edge Function)
-- No insert/update policies for users — Edge Function uses service role key

-- ── evolution_ticket_ledger ────────────────────────────────────────────────
create table if not exists evolution_ticket_ledger (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  event_type      text not null
                  check (event_type in ('granted', 'spent', 'refunded')),
  delta           int  not null,
  balance_after   int  not null,
  reason          text not null
                  check (reason in ('signup_bonus', 'free_ticket_spend', 'level_milestone', 'admin')),
  generation_id   uuid references evolution_generations(id),
  created_at      timestamptz not null default now()
);

alter table evolution_ticket_ledger enable row level security;

create policy "users can read own ledger"
  on evolution_ticket_ledger for select
  using (auth.uid() = user_id);

-- Write operations are service-role only (Edge Function)

-- ── indexes ────────────────────────────────────────────────────────────────
create index if not exists idx_evolution_generations_user
  on evolution_generations (user_id);

create index if not exists idx_evolution_generations_lookup
  on evolution_generations (user_id, character_id, archetype_key);

create index if not exists idx_evolution_ticket_ledger_user
  on evolution_ticket_ledger (user_id);
