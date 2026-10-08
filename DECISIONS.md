# EduNest Decisions

## 2025-02-14

1. **Progressive runnable delivery.** The supplied repository is an existing Figma Make React 19 scaffold rather than an empty monorepo. Work preserves that host-compatible scaffold and adds capabilities incrementally.
2. **Local design system.** No packaged design system is present. EduNest therefore uses a small token-driven component layer in the application, built with Tailwind v4 and semantic CSS variables.
3. **React Router data mode.** Navigation uses `react-router` with `RouterProvider` and a route object in `src/app/routes.tsx`.
4. **Offline demo first.** The browser experience uses seeded local state and mock integration behavior so it remains demonstrable without credentials. External-service adapters are configuration-driven.
5. **Typography.** Public Google fonts Plus Jakarta Sans and Inter are loaded through CSS and backed by system fallbacks.
6. **Visual direction.** Deep ink surfaces, warm cloud backgrounds, indigo/violet brand highlights, gold accents, generous rounded geometry, and restrained chart/motion treatments create a distinctive education SaaS product without looking like a generic admin template.
7. **Tenant sandbox.** The Flask core uses a deterministic thread-safe memory repository for zero-account local use while preserving the same central tenant and permission boundaries expected of the Mongo adapter.
8. **Payment simulation.** Sandbox STK requests complete synchronously, but still enforce idempotency, invoice allocation, audit history, receipt metadata, and mock SMS delivery.
9. **Verification honesty.** Frontend tests and builds run directly in this workspace. Backend tests run through the backend image because the host Python intentionally lacks a package manager; when the local Docker daemon is unavailable this is reported as an environment blocker rather than marked complete.
