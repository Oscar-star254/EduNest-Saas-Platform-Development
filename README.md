# EduNest

EduNest is a calm, mobile-first operating system for Kenyan schools. This repository contains a polished React application, an offline-capable PWA shell, and a Flask sandbox API demonstrating central tenant isolation, granular permissions, audit logging, and idempotent M-Pesa reconciliation.

## Quick start

The Figma Make development server is managed automatically. For a full local stack:

```bash
cp .env.example .env
docker compose up --build
```

- Web application: `http://localhost:8080`
- API health: `http://localhost:5000/api/v1/health`
- Login screen: `http://localhost:8080/login`

The browser demo can also be built and tested independently:

```bash
pnpm install
pnpm test
pnpm build
```

Backend tests run inside its container:

```bash
docker compose run --rm --no-deps backend pytest -q tests
```

## Demo accounts

All seeded accounts use password `Demo@2025`.

| Role | Email |
| --- | --- |
| Platform admin | `super@edunest.africa` |
| Brookfield school admin | `admin@brookfield.ac.ke` |
| Brookfield teacher | `teacher@brookfield.ac.ke` |
| Brookfield accountant | `accounts@brookfield.ac.ke` |
| Highlands school admin | `admin@highlands.ac.ke` |

The browser login is prefilled with the Brookfield administrator account. The Flask API’s two school accounts are used by isolation tests to prove that a token from one school cannot list or retrieve the other school’s learner records.

## Product routes

- `/app` — administrator overview and school insights
- `/app/students` — searchable learner list and working admission flow
- `/app/:module` — operational workspaces for attendance, academics, fees, communication, admissions, library, transport, boarding, meals, inventory, health, activities, finance, analytics, reports, audit, and settings
- `/login` — branded login flow

Use `Ctrl/Cmd + K` to open global search. Theme preference persists locally. On a production build, the service worker caches the application shell and the attendance/marks operation queue persists unsent changes.

## API examples

Authenticate:

```bash
curl -s http://localhost:5000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@brookfield.ac.ke","password":"Demo@2025"}'
```

The returned token is required for tenant routes. Sandbox STK requests additionally require `Idempotency-Key`:

```bash
curl -s http://localhost:5000/api/v1/payments/stk-push \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: demo-payment-001' \
  -d '{"admission_no":"ADM-2024-0182","amount":10000,"phone":"254712345678"}'
```

The sandbox reconciles the payment to the seeded invoice, updates the balance, records an audit event, creates a receipt URL, and stores a mock-delivered SMS. Retrying the same idempotency key returns the original payment without posting twice.

## Architecture

- React 19, Vite 8, React Router data mode, Tailwind CSS v4
- TanStack Query, Recharts, Framer Motion, Lucide, React Hook Form and Zod foundations
- Vitest and Testing Library
- Flask application factory with JWT, CORS, central authenticated tenant context, permission decorators, and a zero-configuration in-memory sandbox
- Docker Compose topology for web, API, worker, MongoDB, and Redis

The current API memory store intentionally makes local sandbox behavior deterministic. `MONGO_URI` and `REDIS_URL` are reserved in `.env.example` for production persistence adapters.

## Verification

Verified in the Figma Make workspace:

- `pnpm test` — 2 files, 3 tests passing
- `pnpm build` — successful production build with route splitting and no chunk-size warnings
- PWA icons — valid 192×192 and 512×512 PNG files

Backend tests are included under `backend/tests`. The current host has neither `pip`/`ensurepip` nor a reachable Docker daemon, so those tests could not be executed in this session; use the container command above in a normal Docker environment.
