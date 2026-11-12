# SHIFTSAFE: Agent Rules

## Product
SHIFTSAFE is a women's workplace and commute safety web app connecting
three stakeholders: working women (employees), organisations, and
trusted contacts. The woman always controls what she shares.

## Stack
Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui,
react-hook-form + Zod, Supabase (Postgres, Auth, RLS, Realtime, Storage).
No separate Express backend. Maps: Leaflet + OpenStreetMap.

## Portals
/employee, /organisation, /companion: one app, one backend.
A user's portal is derived from relationships (org membership,
employee record, approved trusted-contact link), not a single role column.

## Hard rules
- Security is enforced by Supabase RLS and server-side checks, never by hiding UI.
- SUPABASE_SERVICE_ROLE_KEY is used only in server code. Never NEXT_PUBLIC.
- Never commit .env.local.
- NO cab assignment, driver management or fleet tables/features.
- Anonymous complaints must never store reporter id, IP or any identifying metadata.
- Location is collected only during an authorised journey or SOS session.
- Do not claim background location, push delivery or shake detection is guaranteed.
- Build ONE feature at a time. Do not create tables or pages outside the current task.
- Validate all input with Zod on the server.

## Workflow
schema -> RLS -> server action -> UI -> test with 3 accounts
(employee, trusted contact, org admin).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
