---
name: postgres-k8s-setup
description: Deploy PostgreSQL on Kubernetes with migrations
---

# PostgreSQL Kubernetes Setup

## When to Use
- User asks to deploy PostgreSQL on Kubernetes
- Setting up persistent database for microservices
- Running database migrations

## Instructions
1. Run deployment: `bash scripts/deploy.sh`
2. Verify status: `python scripts/verify.py`
3. Run migrations: `bash scripts/run-migrations.sh <migration-dir>`
4. Confirm schema exists before proceeding

## Validation
- [ ] PostgreSQL pod in Running state
- [ ] Service accessible via ClusterIP
- [ ] Database created
- [ ] Migrations applied successfully
- [ ] Can connect with psql

See [REFERENCE.md](./REFERENCE.md) for configuration options.
