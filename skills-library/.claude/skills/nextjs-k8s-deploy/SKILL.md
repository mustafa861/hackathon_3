---
name: nextjs-k8s-deploy
description: Build and deploy Next.js applications to Kubernetes
---

# Next.js Kubernetes Deploy

## When to Use
- User asks to deploy Next.js to Kubernetes
- Containerizing a Next.js frontend
- Setting up ingress for web applications

## Instructions
1. Generate Dockerfile: `python scripts/generate_dockerfile.py <app-path>`
2. Build image: `bash scripts/build-image.sh <app-path> <image-name>`
3. Deploy to K8s: `bash scripts/deploy.sh <image-name> <namespace>`
4. Verify: `python scripts/verify.py <namespace>`

## Validation
- [ ] Docker image builds successfully
- [ ] Pod in Running state
- [ ] Health endpoint responds
- [ ] Ingress routes traffic correctly

See [REFERENCE.md](./REFERENCE.md) for optimization and production settings.
