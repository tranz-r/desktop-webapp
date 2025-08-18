# Tranzr Monorepo

This is a Turborepo-based monorepo.

- apps/web: Next.js customer-facing web app
- apps/admin: (planned) Admin app
- packages/*: (planned) Shared packages (ui, config, tsconfig, tailwind-config, utils)

## Commands

- npm run dev: Run all apps in dev (parallel)
- npm run build: Build all apps
- npm run start: Start all apps

## Environment variables in a Turborepo

Each app manages its own env files. Next.js loads env files from the app directory in this order:

- .env.local (git-ignored)
- .env.development.local, .env.production.local (git-ignored)
- .env, .env.development, .env.production (checked in if needed)

For browser exposure, prefix variables with `NEXT_PUBLIC_`. Server-only keys (like Stripe secrets) must not have that prefix and remain on the server side (API routes, server actions, or backend services).

Per-app examples:

- apps/web/.env.example → copy to apps/web/.env.local and fill values
- apps/admin/.env.example → copy to apps/admin/.env.local and fill values

CI/CD: Provide env via your deploy platform. Turbo is configured (see turbo.json) to pass through `NEXT_PUBLIC_*`, `STRIPE_*`, and `SUPABASE_*` to build/dev tasks. Adjust as needed.

Tips:

- Keep secrets out of git: use .env.local for local dev and your CI secret store for builds.
- If you need shared values across apps, prefer CI-level variables or a root `.env` only for non-secrets; override per app with `.env.local`.

