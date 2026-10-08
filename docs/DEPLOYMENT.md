# Deployment guide

## Domain and TLS

Point the school or platform domain to the host running the Compose stack. Put a managed load balancer, Caddy, or an Nginx TLS virtual host in front of port 8080. Redirect HTTP to HTTPS, use an automatically renewed certificate, and set `CORS_ORIGINS` to the exact HTTPS origin.

## Secrets

Generate a long random `JWT_SECRET_KEY`. Keep Daraja, Africa's Talking, SMTP, database, and monitoring credentials in the deployment secret manager rather than image layers or source control. Rotate integration credentials after staff changes and after any suspected exposure.

## MongoDB Atlas

Replace the local Mongo URI with an Atlas connection string restricted to the application network. Enable a replica set, point-in-time recovery, daily snapshots, and monthly restore drills. Use a distinct database user with access only to EduNest’s database.

## Redis and workers

Use managed Redis with TLS and authentication in production. Run worker processes separately from the API and configure restart, memory, and retry policies. Dead-letter integration jobs after bounded retries and surface them in platform operations.

## Monitoring

Configure Sentry DSNs separately for browser, API, and worker services. Remove secrets and student health/financial details from event payloads. Alert on API error rate, login failures, callback failures, payment reconciliation mismatch, queue depth, and backup age.

## Release check

1. Run frontend tests and production build.
2. Run backend pytest, including tenant and payment tests.
3. Apply indexes and seed only the intended environment.
4. Verify health endpoints, login, one tenant-isolation scenario, and one sandbox payment.
5. Verify CSP, CORS, secure cookies, HTTPS redirects, and rate limits.
6. Confirm backup freshness before and after migration.
