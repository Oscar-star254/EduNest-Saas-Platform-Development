# EduNest Product Specification

EduNest is an all-in-one, multi-school SaaS operating system for Kenyan schools. It combines a public marketing site, school management workspace, role-based portals, and a platform-owner dashboard in one mobile-first product.

## Delivery protocol

1. Maintain this specification and `PROGRESS.md`; only mark work complete after implementation and verification.
2. Build in coherent stages: foundation, backend, frontend, public/platform experiences, core school operations, academics, finance, portals, extended modules, HR/analytics, then tests and deployment.
3. Keep the application runnable after every stage. External integrations must support offline sandbox modes.
4. Do not ship placeholder copy, TODOs, stub routes, broken screens, or disconnected controls.
5. Keep implementation decisions in `DECISIONS.md`.

## Technology

- Frontend: React, Vite, React Router data mode, Tailwind CSS, charts, forms and validation, icons, motion, toasts, PWA/offline support.
- Backend target: Flask application factory and blueprints, JWT, PyMongo, Marshmallow, CORS, rate limiting, Celery/Redis.
- Data target: MongoDB with tenant-scoped compound indexes.
- Documents: branded report cards, receipts, statements, ID cards, and payslips.
- Integrations: Safaricom Daraja, Africa's Talking, SMTP, and a WhatsApp interface, all with sandbox operation.
- Operations target: Docker Compose, production containers, Nginx, CI, environment templates, pytest, and Vitest.

## Architecture and security

- Every tenant document carries `school_id`; authenticated context, never client input, determines tenancy.
- Central tenant enforcement must prevent cross-school reads and writes.
- Granular permissions apply to every protected action. Roles are Super Admin, School Admin, Principal, Deputy Principal, Accountant, Teacher, Class Teacher, Librarian, Nurse, Transport Manager, Parent, and Student.
- The frontend uses a `Can` permission boundary; settings provide a permission editor.
- Audit create, update, delete, login, impersonation, and sensitive approval activity with actor, time, IP, and history.
- Lists support soft deletion, timestamps, creator, pagination, search, filter, sort, and export.
- Use secure password hashing, access/refresh tokens, lockout, throttling, validated input, CORS allow lists, security headers, password reset OTP, optional admin 2FA, and encrypted integration credentials.
- REST endpoints are versioned under `/api/v1`, use consistent response envelopes, expose OpenAPI documentation, and support idempotency keys for payments.
- Plans enforce student caps and module access.

## Brand

The EduNest logo is a clean scalable mark: an open book whose pages form a protective nest/roof, with a gold rising star. The symbol uses an indigo-to-violet gradient (`#3730A3` to `#6D28D9`) and gold (`#F59E0B`). The wordmark is “EduNest” with the tagline “The operating system for your school.”

Deliver full, icon-only, and monochrome SVG marks, favicon, and PWA assets. Use the identity across login, navigation, documents, email, and splash surfaces. School branding replaces EduNest as the primary portal/document identity while retaining a “Powered by EduNest” footer.

## Design system

- Calm, modern, and trustworthy with warm educational character.
- Indigo/violet primary, gold accent, semantic success/danger/info, and slate neutrals.
- Light and dark themes persist per user; school portal accent color is configurable.
- Plus Jakarta Sans headings and Inter body typography.
- Rounded cards, layered shadows, gradient highlights, pills, avatars, drawers, dialogs, tabs, breadcrumbs, toasts, and a global command menu.
- Responsive charts share a consistent palette and restrained motion.
- Reusable primitives include Button, Input, Select, DataTable, Card, StatCard, Modal, Drawer, Tabs, Badge, Avatar, EmptyState, Skeleton, Stepper, FileUpload, and date/chart wrappers.
- Mobile screens use bottom navigation, desktop uses a collapsible sidebar, and dense rows become cards on narrow screens.
- Meet WCAG AA with keyboard focus, labels, useful empty/loading/error states, and confirmations for destructive actions.

## Public website

- Landing page with product-oriented hero, product preview, trial/demo calls to action, module grid, audience sections, M-Pesa highlight, pricing, FAQ, demo/contact form, and legal footer.
- Pricing: Starter KSh 1,500/month up to 100 students; Standard KSh 4,000 up to 500; Professional KSh 8,000 up to 1,500; Enterprise custom. Support monthly and termly views.
- Privacy, Terms, and Data Protection content align with Kenya’s Data Protection Act 2019.
- Include useful title, description, Open Graph metadata, and semantic page structure.

## Platform owner workspace

- Show active/trial/suspended school counts, students, teachers, monthly revenue, and growth.
- Manage schools, plans, subscription billing, system users, support tickets, platform settings, usage, announcements, and plan feature flags.
- Support school creation, editing, suspension, and audited impersonation.

## School product

### Authentication and onboarding

Login, password reset, and a school self-registration journey covering school details, logo, colors, academic terms, grading template, first administrator, and plan. Trials run for 14 days.

### School dashboard

Time-aware greeting, student/teacher/fee/attendance metrics, enrollment trend, fee progress, today’s attendance, events, activity, quick actions, approvals, and defaulters.

### Students

Student profiles cover overview, academics, attendance, fees, discipline, health, transport, boarding, library, and documents. Include automatic `ADM-YYYY-####` numbers, photos, guardians, sibling linking, transfers, bulk promotion, graduation, validated bulk import, and ID cards.

### Staff, HR, and payroll

Profiles, roles, subjects, workload, staff attendance, leave and approvals, payroll, and payslips.

### Classes and timetabling

Classes, streams, subjects, class teachers, teacher allocations, and a timetable builder with clash detection.

### Academics

Term exams, keyboard-friendly offline marks entry, automatic totals, averages, grade, points, positions, subject rank and class average, teacher/principal comments, polished report cards, analysis, and publication controls.

### Attendance

Daily and lesson attendance for students and staff with mobile tap-to-toggle, absentee reports, and configurable parent SMS.

### Fees

Class/term fee structures; tuition, transport, meals, activities and custom items; discounts, bursaries and scholarships; invoicing; partial payments; receipts and statements; balances and arrears; carry-forward; reminders; defaulters; cash/bank posting; and controlled cancellations.

### M-Pesa

Daraja C2B validation/confirmation and STK Push using account format `SCHOOLCODE#ADMNO`. Reconcile automatically and idempotently, provide an unmatched queue, issue receipts, update balances, and send a mockable receipt SMS. Store per-school Paybill/Till details encrypted. Provide a local simulator.

### Communication

SMS, email, in-app notifications, announcements by audience, variable templates, scheduled sends, status tracking, and SMS balance visibility.

### Role portals

- Parents switch children and view results, reports, fees/payment, attendance, timetable, assignments, notices, messages, and events.
- Students view results, timetable, assignments, notices, and library status.
- Teachers see today’s lessons, their classes, attendance, marks, assignments, lesson plans, and messages.

### Admissions

Public application, document upload, interview scheduling, decision workflow, and one-click conversion to student.

### Extended operations

- Library: catalogue, copies, ISBN/barcode, loans, due dates, fines, reminders.
- Transport: buses, drivers, routes, pickup points, allocation, and fee linkage.
- Boarding: dormitories, beds, allocations, records, and exeat requests.
- Meals: plans, meal records, cafeteria reports, and fee linkage.
- Inventory: assets, uniforms, books, equipment, stationery, stock movements, and low-stock alerts.
- Health: restricted medical records, incidents, sick bay, vaccinations, and parent notices.
- Activities: sports, clubs, competitions, events, participation, and calendar.
- Finance: income, expenses, budgets, vendors, petty cash, income statement, collections, expenses, and exports.
- Analytics: enrollment, fee target progress, attendance, performance by class/subject/teacher, demographics, filtering, and export.
- Settings/security: permissions, audit and login history, school profile, terms, grading, notifications, export, and retention.

## Seed and demonstration data

Provide a platform administrator, two Kenyan demo schools, realistic Grade 7-style classes, Mathematics/English/Kiswahili/Science, KSh fees, 300+ students, guardians, payments, marks, attendance, library books, buses, and one credential per role. Document credentials in the README.

## Deliverables

Maintain a monorepo-oriented structure with frontend and backend concerns, documentation, environment template, setup guide, decisions, specification, progress, deployment guidance, and a user-manual outline. The runnable experience must support an offline-first demo with all credentials and no external accounts.

## Acceptance checklist

- One command starts all declared services without errors.
- Seeded accounts can sign in and role access is enforced.
- Every listed module is represented by a usable workflow and is exercised.
- The M-Pesa sandbox posts, reconciles, updates a balance, issues a receipt, and records mock SMS delivery.
- Report-card and receipt documents are polished and branded.
- Tenant tests, payment tests, frontend tests, and production build pass.
- The app is usable at 375px, supports dark mode, and is installable as a PWA.
- Quick-start documentation works from a clean checkout.
