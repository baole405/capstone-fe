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

## Dev Bypass For UI Review

Nếu chỉ muốn xem dashboard/UI mà chưa cần login thật, thêm vào `.env.local`:

```env
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
```

Sau đó chạy lại `pnpm dev` và mở `http://localhost:3001/admin`.

## OpenAPI Direction

Ưu tiên tích hợp API bằng Swagger/OpenAPI là hợp lý.

- OpenAPI là contract mô tả endpoint, request, response, auth
- Swagger UI chỉ là màn hình để xem contract đó
- FE nên generate typed client từ spec BE thay vì viết tay mọi DTO
- Với repo này, hướng phù hợp nhất là `typescript-fetch` rồi bọc lại bằng adapter + React Query

Ghi chú chi tiết hơn nằm ở [frontend-platform-notes.md](/c:/Users/thinkbook/Documents/code/capstone/capstone-fe/docs-local/frontend-platform-notes.md).

## Docker

Repo đã có [Dockerfile](/c:/Users/thinkbook/Documents/code/capstone/capstone-fe/Dockerfile) và [.dockerignore](/c:/Users/thinkbook/Documents/code/capstone/capstone-fe/.dockerignore) cho FE.

Build image:

```bash
docker build -t capstone-fe .
```

Chạy local:

```bash
docker run --rm -p 3001:3000 \
  -e BE_API_URL=http://host.docker.internal:3000 \
  capstone-fe
```

Lưu ý:

- `BE_API_URL` có thể đổi ở runtime khi chạy container
- các biến `NEXT_PUBLIC_*` là build-time cho Next.js, nên nếu đổi chúng thì cần build image lại

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
- `proxy.ts` -> request gate cho `/admin` và `/login`
