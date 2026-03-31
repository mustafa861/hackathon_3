---
name: fastapi-dapr-agent
description: Create FastAPI microservices with Dapr sidecar for AI agents
---

# FastAPI + Dapr Agent Service

## When to Use
- User asks to create AI agent microservice
- Setting up FastAPI with Dapr sidecar
- Building pub/sub or state management with Dapr

## Instructions
1. Generate service template: `python scripts/generate_service.py <service-name>`
2. Review generated files in `services/<service-name>/`
3. Deploy to K8s: `bash scripts/deploy-service.sh <service-name>`

## Validation
- [ ] Service starts without errors
- [ ] Dapr sidecar attached
- [ ] Health endpoint responds
- [ ] Pub/sub or state operations work

See [REFERENCE.md](./REFERENCE.md) for Dapr component configuration.
