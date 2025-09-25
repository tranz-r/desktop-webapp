---
description: Analyze Current Product & Install Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Analyze Product — Agent OS (Next.js, apps/web)

Use this to install/bootstrap Agent OS for the web app only.

## 1) Install (CLI optional)
- If CLI exists in your registry, install locally in apps/web:
```bash
pnpm add -D @agent-os/cli
```
- If not available, proceed docs-first.

## 2) Scripts (apps/web/package.json)
Add:
```json
{
  "scripts": {
    "agent-os": "agent-os"
  }
}
```

## 3) Files
Keep all docs under `apps/web/.agent-os/instructions/core/*` so rule refs like `@.agent-os/instructions/core/analyze-product.md` resolve.

## 4) Verify
- `apps/web/.agent-os/instructions/core/analyze-product.md` exists
- Cursor rules referencing Agent OS resolve in apps/web

## 5) Next steps
- Add `create-spec.md`, `create-tasks.md`, `execute-tasks.md`, `plan-product.md` as needed.
