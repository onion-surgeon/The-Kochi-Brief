# Kochi Newsletter — spec.md

> Reference spec for an AI coding tool to scaffold a modular FastAPI repository that builds a local-news aggregator / newsletter for Kochi, India.

---

## Table of contents

1. Overview
2. Goals & non-goals
3. High-level architecture
4. Tech stack
5. Modules & responsibilities
6. Data models (Pydantic examples)
7. API surface (important endpoints)
8. Background jobs & scheduling
9. Auth & onboarding flows (email + verification)
10. Packaging, dev workflow & deployment
11. Observability, security & compliance
12. Testing strategy
13. Repo layout (scaffold blueprint)
14. Roadmap & MVP scope
15. Contribution notes & coding standards

---

## 1. Overview

Kochi Newsletter is a lightweight, modular service that aggregates local news, events, and curated highlights for Kochi, India, then sends a periodic newsletter (email and optional WhatsApp later). The service exposes a REST API built with **FastAPI**, uses **Pydantic** for models, and runs background processing for scraping/ingestion, summarization, and delivery.

The spec is written so an AI coding tool can scaffold the repository, wiring modules, stubbed tasks, and sample tests.

## 2. Goals & non-goals

**Goals (MVP):**

* Allow users to sign up with email and complete a verification step.
* Aggregate local news from configured sources and social feeds.
* Generate short human-readable summaries for each item (AI-powered summarization optional in scaffold).
* Compose a weekly newsletter and send to subscribers.
* Provide admin UI or API to approve/curate content before send.

**Non-goals (initial):**

* Full personalization / large-scale user segmentation.

## 3. High-level architecture

* **FastAPI** backend (ASGI) — core API, auth, admin.
* **Worker processes** — Celery (or RQ/Prefect) + Redis for task queue; alternative: just FastAPI `BackgroundTasks` for low-volume or prototype.
* **Database** — PostgreSQL for structured data; optional vector DB (e.g. Milvus/Weaviate/pgvector) for semantic search and AI features.
* **Email delivery** — transactional provider (SendGrid/Mailgun/Postmark) via provider adapter.
* **Scheduler** — Celery beat or APScheduler for periodic scraping and newsletter send.
* **Containerization** — Docker + Docker Compose for local dev; Kubernetes for prod if needed.
* **Packaging & local dev** — `uv` as the preferred modern Python package & project manager (per project requirement), `uvicorn` for running the ASGI server.

## 4. Tech stack

* Language: Python 3.11+
* Framework: FastAPI
* Models: Pydantic v2
* ASGI server: Uvicorn
* Package & project manager: `uv` (project-level tooling)
* Task queue: Celery + Redis (or RQ for simplicity)
* DB: PostgreSQL
* ORM: SQLModel or SQLAlchemy + Pydantic models
* Migrations: Alembic
* Container: Docker & Docker Compose
* CI: GitHub Actions
* Tests: Pytest
* Lint/format: Ruff / Black / Pre-commit
* Observability: Prometheus + Grafana (metrics), Sentry (errors)
* Optional: OpenAI/Gemini or local LLM for summarization

## 5. Modules & responsibilities

* `app/core` — app config, settings (pydantic BaseSettings), dependency overrides
* `app/api` — route definitions (v1), routers for users, auth, content, admin
* `app/models` — DB models + Pydantic schemas
* `app/services` — business logic: ingestion, summarization, dedup, ranking
* `app/workers` — Celery tasks and task definitions
* `app/mail` — provider adapter for transactional email
* `app/scrapers` — scrapers/parsers for each source (RSS, Twitter/X, FB public pages, Eventbrite, local blogs)
* `app/cli` — management CLI for initial setup, seeds, and admin tasks
* `tests` — unit & integration tests

## 6. Data models (Pydantic examples)

Use Pydantic v2 models (schemas separate from ORM models). Example schema for an article:

```python
from pydantic import BaseModel, HttpUrl, Field
from datetime import datetime

class ArticleCreate(BaseModel):
    title: str
    url: HttpUrl
    source: str
    published_at: datetime | None = None
    summary: str | None = None
    content: str | None = None
    tags: list[str] = Field(default_factory=list)

class ArticleDB(ArticleCreate):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
```

User signup/verification schema:

```python
class UserCreate(BaseModel):
    email: EmailStr

class UserDB(BaseModel):
    id: int
    email: EmailStr
    is_verified: bool
    created_at: datetime
```

## 7. API surface (important endpoints)

* `POST /api/v1/signup` — create account (email only) -> triggers verification email
* `GET  /api/v1/verify?token=...` — verify email link
* `POST /api/v1/auth/login` — token-based login (optional)
* `GET  /api/v1/articles` — public list of aggregated items
* `GET  /api/v1/articles/{id}` — read article
* `GET  /api/v1/admin/queue` — admin-only content queue
* `POST /api/v1/admin/approve/{id}` — approve item for next newsletter
* `POST /api/v1/webhook/source` — source-specific ingest webhook (e.g., socials)

Auth: JWT tokens for API actions; email verification via signed timed tokens.

## 8. Background jobs & scheduling

Key jobs:

* **Ingestion job** — poll configured RSS/feeds/X/APIs every X minutes.
* **Dedup & normalization** — normalize text, strip tracking params, canonicalize URLs.
* **Summarization** — produce 1–2 sentence summaries (LLM or local rule-based fallback).
* **Newsletter composer** — generate newsletter HTML and plain-text versions for send.
* **Delivery job** — call transactional email provider (batched send with retry and throttling).

Implementation choices:

* For small scale prototyping, rely on FastAPI `BackgroundTasks` and an internal scheduler (APScheduler).
* For production reliability and retries, use Celery + Redis and Celery Beat.

## 9. Auth & onboarding flows (email + verification)

* Signup: user posts email → create user record with `is_verified=false` → send verification email.
* Verification email: contains a signed time-bound token (e.g., using `itsdangerous` or `fastapi_users` style token) and verification route.
* Completed: `is_verified=true`, user receives welcome email.

Anti-abuse: rate-limit signup attempts, require double opt-in.

## 10. Packaging, dev workflow & deployment

* Use `uv` for local project management, dependency resolution, lockfiles, and `uv build` for packaging distribution.
* Running locally:

  * `uv init` (scaffold)
  * `uv add -d -r requirements.txt` (or prefer `pyproject.toml` created by uv)
  * `uv run uvicorn app.main:app --reload`
* Dockerfile: multi-stage build using official Python image; include `uv build` / `pip wheel` step.
* CI/CD: GitHub Actions for lint/test; deploy to Cloud Run / AWS ECS / DigitalOcean App Platform or Kubernetes.

## 11. Observability, security & compliance

* Metrics: instrument key endpoints and worker tasks (Prometheus client); expose `/metrics`.
* Errors: integrate Sentry.
* Secrets: store in environment variables / secret manager.
* GDPR/Privacy: respect user data deletion requests (provide `DELETE /api/v1/account`).
* Security: sanitize incoming HTML, validate external content, use CSP for newsletter HTML.

## 12. Testing strategy

* Unit tests for services and scrapers (mock network calls).
* Integration tests for DB operations (use ephemeral Postgres via Docker in CI).
* E2E tests for signup & verify flows (can use HTTPX + test database).

## 13. Repo layout (scaffold blueprint)

```
/ (root)
├─ app/
│  ├─ api/
│  ├─ core/
│  ├─ models/
│  ├─ services/
│  ├─ scrapers/
│  ├─ workers/
│  ├─ mail/
│  └─ main.py
├─ tests/
├─ docker/
├─ infra/   # terraform / k8s manifests if needed
├─ pyproject.toml
├─ uv.lock
├─ Makefile
└─ README.md
```

## 14. Roadmap & MVP scope

**Phase 1 (MVP, 2–4 weeks):**

* Signup, email verification, DB schema, ingestion from 3 sources (RSS + 1 local blog + X/Twitter public feeds), weekly newsletter composer, send via transactional email.

**Phase 2:**

* Admin curation UI, daily digests, WhatsApp broadcast integration (via Twilio or WhatsApp Business API), unsubscribe management.

**Phase 3:**

* Personalization, paid tiers, mobile push, richer analytics.

## 15. Contribution notes & coding standards

* Use Pydantic v2 for schemas; keep schema/ORM separation clear.
* Follow 12-factor app principles.
* Pre-commit hooks: Ruff, isort, Black.
* Keep functions small and testable; write tests for every service.

---

### Appendix: Quick dev commands

```bash
# run dev server
uv run uvicorn app.main:app --reload

# run tests
uv run pytest -q

# start workers
docker compose up -d redis db
uv run celery -A app.workers worker --loglevel=info
uv run celery -A app.workers beat --loglevel=info
```

---

*End of spec.*

---
