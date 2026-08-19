# Chopute

Automatic leads. Real growth. Business lead-generation platform: search real
businesses by type + location, manage leads, track status, export CSV, and
purchase one-time unlimited access.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, PostgreSQL + Prisma,
Auth.js (Google + email/password), Apify (real business data), Paystack
(one-time $25 unlimited access).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values (see below).
3. `npm run prisma:migrate` — creates the database schema.
4. `npm run dev` — starts the app at http://localhost:3000.

## Required environment variables

See `.env.example` for the full list with descriptions. At minimum for a
working local setup you need:

- `DATABASE_URL` — PostgreSQL connection string.
- `AUTH_SECRET` — random 32-byte secret (`npx auth secret`).
- `APIFY_API_TOKEN` / `APIFY_ACTOR_ID` — required for real business search to
  work. Without this, search requests return a 503 with a clear message
  rather than falling back to fake data.
- `PAYSTACK_SECRET_KEY` / `PAYSTACK_PUBLIC_KEY` — required for the $25
  unlimited-access purchase to work. Without this, payment requests return a
  503 with a clear message.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — required for "Continue with
  Google". Email/password sign-in works without them.

## Brand assets

Place the official logo files (supplied by the client) at:

- `public/brand/chopute-logo.png` — full lockup with tagline.
- `public/brand/chopute-icon.png` — icon-only mark.

See `public/brand/README.md` for details.

## How search works

Because retrieving live business data can take longer than a typical request,
`POST /api/search` starts an Apify actor run and returns immediately with a
`PROCESSING` search. The client polls `GET /api/search/:id`, which lazily
finalizes the run (persists deduplicated results, updates status) once Apify
finishes — no separate worker process required.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` / `npm run typecheck`
- `npm test` — unit tests (Vitest)
- `npm run test:e2e` — Playwright end-to-end tests
- `npm run prisma:migrate` / `npm run prisma:studio`
