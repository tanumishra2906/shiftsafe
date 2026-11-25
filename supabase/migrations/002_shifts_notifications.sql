-- SHIFTSAFE | Migration 002: shifts, notifications, verified-org rule
-- Run in Supabase Dashboard > SQL Editor AFTER 001_core.sql.
-- Run the main part first. The OPTIONAL block at the bottom is a separate query.

-- ---------- ENUMS ----------
create type public.shift_type as enum ('day', 'evening', 'night');
create type public.shift_status as enum ('scheduled', 'cancelled');

-- ---------- HELPER: is this organisation verified? ----------
create or replace function public.org_is_verified(p_org uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.organisations o where o.id = p_org and o.status = 'verified');
$$;

revoke all on function public.org_is_verified(uuid) from public, anon;
grant execute on function public.org_is_verified(uuid) to authenticated;

-- ---------- EMPLOYEES: only verified organisations can add employees ----------
-- (replaces the broad "employees_hr_write" policy from 001)
alter table public.employees
  add constraint employees_id_org_unique unique (id, org_id);

drop policy if exists "employees_hr_write" on public.employees;

create policy "employees_hr_insert" on public.employees for insert
  with check (
    public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[])
    and public.org_is_verified(org_id)
  );

create policy "employees_hr_update" on public.employees for update
  using (public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[]))
  with check (public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[]));
-- No delete policy: employees are deactivated (status = 'inactive'), never deleted.

-- ---------- SHIFTS ----------
create table public.shifts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  employee_id uuid not null,
  shift_type public.shift_type not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  office_location text,
  notes text,
  status public.shift_status not null default 'scheduled',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- the employee must belong to the same organisation as the shift
  constraint shifts_employee_same_org
    foreign key (employee_id, org_id) references public.employees (id, org_id) on delete cascade,
  constraint shifts_valid_range check (ends_at > starts_at),
  constraint shifts_max_length check (ends_at - starts_at <= interval '16 hours')
);

create index on public.shifts (org_id, starts_at);
create index on public.shifts (employee_id, starts_at);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger shifts_set_updated_at
  before update on public.shifts
  for each row execute function public.set_updated_at();

-- ---------- NOTIFICATIONS ----------
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  org_id uuid references public.organisations(id) on delete set null,
  type text not null,            -- shift_assigned | shift_updated | shift_cancelled
  title text not null,
  body text,
  data jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index on public.notifications (user_id, created_at desc);

-- ---------- SHIFT CHANGE TRIGGER: notify employee + audit log ----------
create or replace function public.handle_shift_change()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  emp_user uuid;
  n_type text;
  n_title text;
  n_body text;
begin
  select user_id into emp_user from employees where id = new.employee_id;

  if tg_op = 'INSERT' then
    n_type := 'shift_assigned';
    n_title := 'New shift assigned';
  elsif new.status = 'cancelled' and old.status <> 'cancelled' then
    n_type := 'shift_cancelled';
    n_title := 'A shift was cancelled';
  elsif new.status = 'scheduled' and (
        new.starts_at <> old.starts_at or new.ends_at <> old.ends_at
        or new.shift_type <> old.shift_type
        or new.office_location is distinct from old.office_location) then
    n_type := 'shift_updated';
    n_title := 'Your shift was updated';
  else
    return new;   -- nothing the employee needs to know about
  end if;

  n_body := to_char(new.starts_at at time zone 'Asia/Kolkata', 'DD Mon YYYY, HH12:MI AM')
            || ' to ' || to_char(new.ends_at at time zone 'Asia/Kolkata', 'HH12:MI AM')
            || ' (' || new.shift_type::text || ' shift)';

  if emp_user is not null then
    insert into notifications (user_id, org_id, type, title, body, data)
    values (emp_user, new.org_id, n_type, n_title, n_body, jsonb_build_object('shift_id', new.id));
  end if;

  insert into audit_logs (actor_id, org_id, action, target_table, target_id, metadata)
  values (auth.uid(), new.org_id, n_type, 'shifts', new.id,
          jsonb_build_object('employee_id', new.employee_id));

  return new;
end $$;

revoke all on function public.handle_shift_change() from public, anon, authenticated;

create trigger shifts_after_change
  after insert or update on public.shifts
  for each row execute function public.handle_shift_change();

-- ---------- ROSTER FUNCTION (shift list with employee names) ----------
-- Safety responders may see who is on shift, but NOT employee emails or invite codes,
-- so the roster goes through this function instead of opening the employees table.
create or replace function public.get_shift_roster(
  p_org uuid, p_from timestamptz, p_to timestamptz
) returns table (
  shift_id uuid, employee_id uuid, employee_name text, department text,
  designation text, shift_type public.shift_type, starts_at timestamptz,
  ends_at timestamptz, office_location text, notes text, status public.shift_status
) language plpgsql stable security definer set search_path = public as $$
begin
  if not public.has_org_role(p_org, array['org_admin','hr_admin','safety_responder']::public.org_role[]) then
    raise exception 'not allowed';
  end if;
  return query
    select s.id, s.employee_id, e.full_name, e.department, e.designation,
           s.shift_type, s.starts_at, s.ends_at, s.office_location, s.notes, s.status
    from public.shifts s
    join public.employees e on e.id = s.employee_id
    where s.org_id = p_org and s.starts_at < p_to and s.ends_at > p_from
    order by s.starts_at;
end $$;

revoke all on function public.get_shift_roster(uuid, timestamptz, timestamptz) from public, anon;
grant execute on function public.get_shift_roster(uuid, timestamptz, timestamptz) to authenticated;

-- ---------- ROW LEVEL SECURITY ----------
alter table public.shifts enable row level security;
alter table public.notifications enable row level security;

-- shifts: employee sees own; org_admin / hr_admin / safety_responder see the org's shifts
create policy "shifts_select" on public.shifts for select
  using (
    exists (select 1 from public.employees e
            where e.id = shifts.employee_id and e.user_id = auth.uid())
    or public.has_org_role(org_id, array['org_admin','hr_admin','safety_responder']::public.org_role[])
  );

-- shifts: only org_admin / hr_admin of a verified organisation create or change them
create policy "shifts_insert" on public.shifts for insert
  with check (
    public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[])
    and public.org_is_verified(org_id)
  );

create policy "shifts_update" on public.shifts for update
  using (public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[]))
  with check (public.has_org_role(org_id, array['org_admin','hr_admin']::public.org_role[]));
-- No delete policy: shifts are cancelled (status = 'cancelled'), never deleted.

-- notifications: a user reads only their own and may only mark them read
create policy "notifications_select_own" on public.notifications for select
  using (user_id = auth.uid());

create policy "notifications_update_own" on public.notifications for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());

revoke update on public.notifications from authenticated, anon;
grant update (read_at) on public.notifications to authenticated;
-- No insert policy: only the shift trigger (security definer) creates notifications.

-- =====================================================================
-- OPTIONAL: prevent double-booking the same employee. Run this as a
-- SEPARATE query after everything above succeeded. If it errors, skip
-- it and tell me; the app still works without it.
-- =====================================================================
-- create extension if not exists btree_gist;
-- alter table public.shifts
--   add constraint shifts_no_overlap
--   exclude using gist (
--     employee_id with =,
--     tstzrange(starts_at, ends_at) with &&
--   ) where (status = 'scheduled');
