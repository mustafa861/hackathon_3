---
name: docusaurus-deploy
description: Deploy Docusaurus documentation site to Kubernetes
---

# Docusaurus Deploy

## When to Use
- User asks to create documentation site
- Deploying Docusaurus to Kubernetes
- Setting up auto-generated docs

## Instructions
1. Initialize Docusaurus: `bash scripts/init.sh <docs-path>`
2. Build static site: `bash scripts/build.sh <docs-path>`
3. Deploy to K8s: `bash scripts/deploy.sh <docs-path> <namespace>`
4. Verify: `python scripts/verify.py <namespace>`

## Validation
- [ ] Docusaurus site builds without errors
- [ ] Pod serving static content
- [ ] Documentation accessible via browser
- [ ] Search functionality works

See [REFERENCE.md](./REFERENCE.md) for configuration and theming.
