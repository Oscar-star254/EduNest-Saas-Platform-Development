# EduNest Delivery Progress

Items are marked complete only after implementation and relevant verification.

## A. Foundation: scaffold, design system, and brand

- [x] Preserve the Figma Make Vite scaffold and document architecture
- [x] Build responsive design tokens and reusable component primitives
- [x] Create full, icon, monochrome, favicon, and PWA brand assets
- [x] Add light/dark theming and school brand accents
- [x] Configure React Router data mode and application shells
- [x] Commit and verify foundation

## B. Backend core

- [ ] Create Flask application factory and versioned blueprints
- [ ] Add Mongo/Redis configuration with offline fallback
- [ ] Implement auth, refresh, lockout, password reset, and optional 2FA
- [ ] Enforce central tenancy and granular permission decorators
- [ ] Add audit logging, soft delete, pagination, filtering, sort, and exports
- [ ] Add OpenAPI documentation and consistent envelopes
- [ ] Prove tenant isolation with automated tests

## C. Frontend core

- [x] Add query, forms, validation, toast, motion, icon, and chart foundations
- [x] Build authenticated responsive shell with sidebar and mobile navigation
- [x] Build permission boundary, list patterns, loading, empty, and error states
- [x] Build command palette and persisted theme
- [x] Add PWA install metadata and offline operation queue

## D. Public site, onboarding, and platform admin

- [ ] Landing, features, audiences, M-Pesa, pricing, FAQ, demo form, footer
- [ ] Privacy, Terms, and Kenya Data Protection pages
- [ ] Login, recovery, and school onboarding wizard
- [ ] Platform overview, schools, plans, subscriptions, tickets, settings, usage
- [ ] Feature flags, plan enforcement, and audited impersonation

## E. Students, staff, classes, and timetable

- [ ] Student list, profile tabs, create/edit, guardians, siblings, lifecycle actions
- [ ] Student import validation and ID card generation
- [ ] Staff profiles, roles, subjects, workload, and attendance
- [ ] Classes, streams, subjects, allocations, and class teachers
- [ ] Timetable builder with clash detection

## F. Attendance, academics, and reports

- [ ] Student/staff daily and lesson attendance with mobile toggles
- [ ] Absence reporting and configurable guardian notifications
- [ ] Exams, offline marks grid, calculations, rankings, and comments
- [ ] Results analysis and publish/unpublish workflow
- [ ] Single and bulk branded report cards

## G. Fees, M-Pesa, and messaging

- [ ] Fee structures, concessions, invoices, balances, arrears, and carry-forward
- [ ] Payments, partial payments, cancellations, statements, and defaulters
- [ ] Receipt and statement documents
- [ ] Daraja C2B and STK flows with idempotency
- [ ] Automatic reconciliation, unmatched queue, and simulator
- [ ] Mock SMS receipt and reminder delivery
- [ ] Email, in-app, announcement, scheduling, templates, and status tracking

## H. Parent, student, and teacher portals

- [ ] Parent child switcher and academic/fees/attendance/timetable views
- [ ] Parent STK payment, reports, messages, notices, and events
- [ ] Student results, timetable, assignments, notices, and library status
- [ ] Teacher lessons, classes, attendance, marks, plans, and messages

## I. Admissions and extended school operations

- [ ] Admissions applications, documents, interviews, decisions, conversion
- [ ] Library catalogue, copies, loans, fines, and overdue communication
- [ ] Transport vehicles, drivers, routes, stops, allocations, and fees
- [ ] Boarding dormitories, beds, allocations, records, and exeats
- [ ] Meals plans, records, reports, and fee linkage
- [ ] Inventory catalogue, movements, and low-stock alerts
- [ ] Restricted health records, incidents, vaccinations, and notices
- [ ] Activities, clubs, sports, competitions, participation, and calendar

## J. HR, finance, analytics, communication, and settings

- [ ] Leave requests and approval
- [ ] Payroll and payslips
- [ ] Income, expenses, budgets, vendors, petty cash, reports, and export
- [ ] Enrollment, fee, attendance, performance, and demographic analytics
- [ ] Permission editor, audit log, login history, and school configuration

## K. Seed, tests, hardening, deployment, and docs

- [ ] Seed two schools, 300+ learners, operational records, and every role
- [x] Add backend and frontend test suites
- [ ] Add security hardening and integration sandbox configuration
- [ ] Add Docker, Compose, worker, proxy, CI, and environment template
- [x] Add quick start, credentials, deployment guide, and user manual
- [ ] Complete clean-start verification

## Final verification

- [ ] `docker compose up` starts frontend, backend, Mongo, Redis, and worker
- [ ] Seed data loads and every role can authenticate
- [ ] Every product module is implemented and manually exercised
- [ ] STK and C2B simulator completes payment, reconciliation, receipt, and mock SMS
- [ ] Branded report cards and receipts generate successfully
- [ ] Tenant isolation, pytest, Vitest, and production build pass
- [ ] 375px layout, dark theme, and PWA installation verified
- [ ] README quick start works from a clean clone
