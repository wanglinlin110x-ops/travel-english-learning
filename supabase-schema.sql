create table if not exists public.learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  item_type text not null check (item_type in ('vocabulary', 'phrase', 'listening', 'chat')),
  is_mastered boolean not null default false,
  is_completed boolean not null default false,
  is_favorite boolean not null default false,
  is_wrong boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

create table if not exists public.learning_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_scene_id text,
  last_module text not null default 'vocabulary',
  updated_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;
alter table public.learning_preferences enable row level security;

grant select, insert, update, delete on public.learning_progress to authenticated;
grant select, insert, update, delete on public.learning_preferences to authenticated;

drop policy if exists "Users read own learning progress" on public.learning_progress;
create policy "Users read own learning progress"
on public.learning_progress for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users insert own learning progress" on public.learning_progress;
create policy "Users insert own learning progress"
on public.learning_progress for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users update own learning progress" on public.learning_progress;
create policy "Users update own learning progress"
on public.learning_progress for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete own learning progress" on public.learning_progress;
create policy "Users delete own learning progress"
on public.learning_progress for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users read own learning preferences" on public.learning_preferences;
create policy "Users read own learning preferences"
on public.learning_preferences for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users insert own learning preferences" on public.learning_preferences;
create policy "Users insert own learning preferences"
on public.learning_preferences for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users update own learning preferences" on public.learning_preferences;
create policy "Users update own learning preferences"
on public.learning_preferences for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete own learning preferences" on public.learning_preferences;
create policy "Users delete own learning preferences"
on public.learning_preferences for delete
to authenticated
using ((select auth.uid()) = user_id);
