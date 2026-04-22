# GlowScan Admin Frontend

Frontend scaffold cho `capstone-fe`, tập trung vào admin portal với Next.js 16, App Router, Tailwind v4, shadcn/ui và TanStack Query.

## Stack

- Next.js 16 + React 19
- TypeScript + App Router + typed routes
- Tailwind CSS v4 + shadcn/ui
- TanStack Query cho session và data layer
- Husky + commitlint + lint-staged + strict CI

## Local Setup

1. Tạo file env:

```bash
cp .env.example .env.local
```

2. Chạy frontend:

```bash
pnpm install
pnpm dev
```

Frontend mặc định chạy tại `http://localhost:3001`.

## Backend Alignment

Frontend dùng cùng-origin proxy tại `/api/be/*`, nên cần backend cập nhật các biến sau:

```env
FRONTEND_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001
KEYCLOAK_REDIRECT_URI=http://localhost:3001/api/be/auth/callback
```

Backend upstream mặc định là `http://localhost:3000` và được cấu hình qua `BE_API_URL`.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
pnpm ci:verify
```

## Routing Primer

- `src/app/(auth)/login/page.tsx` -> `/login`
- `src/app/(auth)/auth/error/page.tsx` -> `/auth/error`
- `src/app/(admin)/admin/layout.tsx` -> shell dùng chung cho admin
- `src/app/(admin)/admin/page.tsx` -> dashboard landing
- `src/app/(admin)/admin/[section]/page.tsx` -> placeholder cho từng module admin
- `src/app/api/be/[...path]/route.ts` -> proxy từ Next sang NestJS
