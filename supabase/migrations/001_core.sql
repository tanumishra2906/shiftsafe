-- SHIFTSAFE | Migration 001: core identity, organisations, employees, audit log
-- Run in Supabase Dashboard > SQL Editor (or save as supabase/migrations/001_core.sql)

-- ---------- ENUMS ----------
create type public.org_role as enum (
  'org_admin', 'hr_admin', 'safety_responder',
  'complaint_handler', 'ic_member', 'safety_liaison'
);
create type public.org_status as enum ('pending', 'verified', 'rejected');
create type public.employee_status as enum ('invited', 'active', 'inactive');

-- ---------- TABLES ----------
-- One row per auth user. A user's "portal" is derived from relationships, not a role column.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  official_email text not null,
  org_type text,
  office_address text,
  contact_number text,
  status public.org_status not null default 'pending',  -- verified manually for MVP
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- Staff roles inside an organisation (a user can hold several roles).
create table public.organisation_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.org_role not null,
  created_at timestamptz not null default now(),
  unique (org_id, user_id, role)
);

-- Employee records created by HR; user_id stays null until the employee claims the invite.
create table public.employees (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  employee_code text,
  full_name text not null,
  email text,
  department text,
  designation text,
  office_location text,
  status public.employee_status not null default 'invited',
  invite_code text unique default substr(replace(gen_random_uuid()::text, '-', ''), 1, 12),
  created_at timestamptz not null default now(),
  unique (org_id, employee_code)
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid,
  org_id uuid,
  action text not null,
  target_table text,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index on public.organisation_members (user_id);
create index on public.employees (org_id);
create index on public.employees (user_id);

-- ---------- AUTO-CREATE PROFILE ON SIGNUP ----------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- HELPER ----------
create or replace function public.has_org_role(p_org uuid, p_roles public.org_role[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.organisation_members m
    where m.org_id = p_org and m.user_id = auth.uid() and m.role = any(p_roles)
  );
$$;

-- ---------- RPC: create organisation (creator becomes org_admin) ----------
create or replace function public.create_organisation(
  p_name text, p_official_email text, p_org_type text,
  p_office_address text, p_contact_number text
) returns uuid language plpgsql security definer set search_path = public as $$
declare new_org uuid;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  insert into organisations (name, official_email, org_type, office_address, contact_number, created_by)
  values (p_name, p_official_email, p_org_type, p_office_address, p_contact_number, auth.uid())
  returning id into new_org;
  insert into organisation_members (org_id, user_id, role) values (new_org, auth.uid(), 'org_admin');
  insert into audit_logs (actor_id, org_id, action, target_table, target_id)
  values (auth.uid(), new_org, 'organisation_created', 'organisations', new_org);
  return new_org;
end $$;

-- ---------- RPC: employee claims invite code ----------
create or replace function public.claim_employee_invite(p_code text)
returns uuid language plpgsql security definer set search_path = public as $$
declare emp_id uuid; emp_org uuid;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  update employees
     set user_id = auth.uid(), status = 'active'
   where invite_code = p_code and user_id is null and status = 'invited'
   returning id, org_id into emp_id, emp_org;
  if emp_id is null then raise exception 'invalid or already used invite code'; end if;
  insert into audit_logs (actor_id, org_id, action, target_table, target_id)
  values (auth.uid(), emp_org, 'employee_invite_claimed', 'employees', emp_id);
  return emp_id;
end $$;

-- ---------- ROW LEVEL SECURITY ----------
alter table public.profiles enable row level security;
alter table public.organisations enable row level security;
alter table public.organisation_members enable row level security;
alter table public.employees enable row level security;
alter table public.audit_logs enable row level security;

-- profiles: own row only
create policy "profiles_select_own" on public.profiles for select using (id = auth.uid());
create policy "profiles_update_own" on public.profiles for update using (id = auth.uid());

-- organisations: members can read; only org_admin can edit. Creation goes through create_organisation().
create policy "orgs_select_members" on public.organisations for select
  using (exists (select 1 from public.organisation_members m
                 where m.org_id = organisations.id and m.user_id = auth.uid()));
create policy "orgs_update_admin" on public.organisations for update
  using (public.has_org_role(id, array['org_admin']::public.org_role[]));

-- organisation_members: see own memberships; org_admin sees and manages all in their org
create policy "members_select" on public.organisation_members for select
  using (user_id = auth.uid()
         or public.has_org_role(org_id, array['org_admin']::public.org_role[]));
create policy "members_admin_write" on public.organisation_members for all
  using (public.has_org_role(org_id, array['org_admin']::public.org_role[]))
  with check (public.has_org_role(org_id, array['org_admin']::public.org_role[]));

-- employees: employee sees own row; org_admin/hr_admin manage the org's employees
create policy "employees_select" on public.employees for select
  using (user_id = auth.uid()
         or public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[]));
create policy "employees_hr_write" on public.employees for all
  using (public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[]))
  with check (public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[]));

-- audit_logs: no client writes at all; org_admin can read their org's logs
create policy "audit_select_admin" on public.audit_logs for select
  using (org_id is not null
         and public.has_org_role(org_id, array['org_admin']::public.org_role[]));

-- ---------- FUNCTION PERMISSIONS ----------
-- Only signed-in users may call these. Anonymous visitors may not.
revoke all on function public.create_organisation(text, text, text, text, text) from public, anon;
grant execute on function public.create_organisation(text, text, text, text, text) to authenticated;

revoke all on function public.claim_employee_invite(text) from public, anon;
grant execute on function public.claim_employee_invite(text) to authenticated;

revoke all on function public.has_org_role(uuid, public.org_role[]) from public, anon;
grant execute on function public.has_org_role(uuid, public.org_role[]) to authenticated;

-- Trigger function: runs on signup, never called directly.
revoke all on function public.handle_new_user() from public, anon, authenticated;
