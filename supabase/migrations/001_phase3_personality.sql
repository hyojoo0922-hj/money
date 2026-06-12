-- Phase 3-1: Personality score tables
-- Covers: answers, personality_scores, personality_score_logs
-- Does NOT require personality_traits FK yet (trait keys validated in code)

-- ── answers ────────────────────────────────────────────────────────────────
create table if not exists answers (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  question_id     text not null,
  option_id       text not null,
  short_answer    text check (char_length(short_answer) <= 100),
  trait_delta     jsonb not null default '{}',
  weight_type     text not null default 'behavior',
  answered_at     timestamptz not null default now()
);

alter table answers enable row level security;

create policy "users can insert own answers"
  on answers for insert
  with check (auth.uid() = user_id);

create policy "users can read own answers"
  on answers for select
  using (auth.uid() = user_id);

-- ── personality_scores ─────────────────────────────────────────────────────
create table if not exists personality_scores (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  trait_key       text not null,
  score           numeric not null default 50
                  check (score >= 0 and score <= 100),
  last_updated_at timestamptz not null default now(),
  unique (user_id, trait_key)
);

alter table personality_scores enable row level security;

create policy "users can read own scores"
  on personality_scores for select
  using (auth.uid() = user_id);

create policy "users can insert own scores"
  on personality_scores for insert
  with check (auth.uid() = user_id);

create policy "users can update own scores"
  on personality_scores for update
  using (auth.uid() = user_id);

-- ── personality_score_logs ─────────────────────────────────────────────────
create table if not exists personality_score_logs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade not null,
  trait_key        text not null,
  previous_score   numeric not null,
  new_score        numeric not null,
  delta            numeric not null,
  source_answer_id uuid references answers(id),
  created_at       timestamptz not null default now()
);

alter table personality_score_logs enable row level security;

create policy "users can insert own score logs"
  on personality_score_logs for insert
  with check (auth.uid() = user_id);

create policy "users can read own score logs"
  on personality_score_logs for select
  using (auth.uid() = user_id);

-- ── indexes ────────────────────────────────────────────────────────────────
create index if not exists idx_answers_user_id
  on answers (user_id);

create index if not exists idx_personality_scores_user_trait
  on personality_scores (user_id, trait_key);

create index if not exists idx_personality_score_logs_user_id
  on personality_score_logs (user_id);

create index if not exists idx_personality_score_logs_answer
  on personality_score_logs (source_answer_id);
