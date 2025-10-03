# Tech Stack

## Context

Global tech stack defaults for Agent OS projects, overridable in project-specific `.agent-os/product/tech-stack.md`.

- App Framework: Next.js 14+ (App Router)
- Language: TypeScript (latest stable)
- Primary Database: PostgreSQL 17+
- ORM / DB Toolkit: Prisma ORM (with migrations)
- JavaScript Runtime: Node.js 22 LTS
- Build Tool: Built-in Next.js (uses Turbopack)
- Import Strategy: ES Modules (ECMAScript imports)
- Package Manager: pnpm (preferred for monorepos)
- CSS Framework: TailwindCSS 4.0+
- UI Components: shadcn/ui (Radix + Tailwind-based)
- UI Installation: Via pnpm package + CLI
- Font Provider: Google Fonts (via next/font)
- Font Loading: Self-hosted with next/font for performance
- Icons: Lucide React components (lucide-react)
- Application Hosting: Vercel (native for Next.js)
- Hosting Region: Closest to primary user base
- Database Hosting: Supabase for managed DB + auth
- Authentication: Supabase
- Database Backups: Daily automated (provider-managed or custom cron)
- Asset Storage: Amazon S3 (or R2/Supabase Storage for lower cost)
- CDN: CloudFront (or Vercel Edge CDN if hosted on Vercel)
- Asset Access: Private with signed URLs (S3 presigned URLs or Supabase policies)
- CI/CD Platform: GitHub Actions (with Vercel or DO deploy step)
- CI/CD Trigger: Push to main / staging branches
- Tests: Run before deployment (unit + integration + e2e with Playwright/Vitest)
- Production Environment: main branch → deploy to Production
- Staging Environment: staging branch → deploy to Staging