# GitHub Copilot instructions — AccessHub

Purpose: Short, actionable guide for AI agents to be productive in this repo. Focus on architecture, auth/db conventions, local workflows, and files to inspect when changing behavior.

## Big picture (why)
- Frontend: React + TypeScript + Vite. Entry: `frontend/src` (PWA-ready approach).
- Backend: Node.js + Express + TypeScript. Entry: `backend/src/server.ts` and `backend/src/controllers`.
- Database/Auth: Supabase (Postgres). The app uses Supabase Auth tokens end-to-end and Row Level Security (RLS) policies + triggers to enforce ownership.

## Key integration & data flow (most important when changing auth/data logic)
- Authentication flow: frontend uses Supabase client (`frontend/src/lib/supabase.ts`) to manage sessions. Axios `api` interceptor (`frontend/src/services/api.ts`) attaches access token:

  `Authorization: Bearer <access_token>`

- Backend receives token, creates a Supabase client using that token (`backend/src/services/supabase.ts`) and validates it in `backend/src/middlewares/auth.ts` via `supabase.auth.getUser()`.
- Database enforces per-row ownership with RLS policies (see `database/migrations/polices_rls_*.sql`) and a trigger function (`database/migrations/triggers_function.sql`) that sets `user_id := auth.uid()` if not provided.
- Controllers follow the pattern: use `req.user!.id` to set ownership (example: `backend/src/controllers/clients.controller.ts`). Prefer using the auth middleware and rely on RLS for enforcement.

## Conventions & patterns to follow
- File layout: controllers -> routes -> middlewares -> services. Match existing patterns when adding resources (clients, servers, ports, softwares).
- Always use the `AuthRequest` type for handlers that need the current user (see `backend/src/middlewares/auth.ts`).
- Frontend: central `api` wrapper handles Auth header; create service modules in `frontend/src/services/*.service.ts` (see `clients.service.ts`) and reuse types from `frontend/src/types`.
- DB safety: avoid bypassing RLS. If you need admin behavior, use service-role keys sparingly and document why.

## Dev/test/workflow (practical commands)
- Root: `npm run lint` (Biome) and `npm run format`.
- Frontend: `npm run dev` (Vite), `npm run build`, `npm run preview`.
- Backend: `npm run dev` (ts-node-dev — `backend/src/server.ts`).
- Health check: GET `/health` on backend.
- Env files: check `docs/backend.env.example` and `docs/frontend.env.example` for required variables (Supabase URL / keys, VITE_API_URL, AES keys, etc.).
- Tests: README mentions Vitest & Supertest, but there are no backend tests currently; add tests following existing patterns if you introduce core logic.

## Debugging tips
- Inspect Supabase dashboard for authentication/row-level errors and function logs.
- If you see authorization failures, check: 1) token forwarded by frontend `api` interceptor, 2) `authMiddleware` validation, 3) RLS policies in `database/migrations`.

## Files to inspect when working on a feature
- `backend/src/middlewares/auth.ts` — token validation & `AuthRequest`
- `backend/src/services/supabase.ts` — how tokens are used to create clients
- `backend/src/controllers/*.ts` and `backend/src/routes/*.ts` — add endpoints following existing patterns
- `frontend/src/services/api.ts` — axios interceptor attaching access tokens
- `frontend/src/lib/supabase.ts` — supabase client config
- `frontend/src/services/*.service.ts` — patterns for network calls
- `database/migrations/*` — RLS policies and triggers

---
If anything here is unclear or you'd like more detail (tests, deploy steps, or example PR templates), tell me what to expand and I will iterate.