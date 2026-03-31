#!/usr/bin/env python3
"""Generate optimized Dockerfile for Next.js application."""
import os
import sys
from pathlib import Path

DOCKERFILE_STANDALONE = '''# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
'''

K8S_DEPLOYMENT = '''apiVersion: apps/v1
kind: Deployment
metadata:
  name: {app_name}
  namespace: {namespace}
spec:
  replicas: {replicas}
  selector:
    matchLabels:
      app: {app_name}
  template:
    metadata:
      labels:
        app: {app_name}
    spec:
      containers:
      - name: {app_name}
        image: {image_name}
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: 256Mi
            cpu: 200m
          limits:
            memory: 512Mi
            cpu: 500m
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: {app_name}
  namespace: {namespace}
spec:
  selector:
    app: {app_name}
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
'''

INGRESS_TEMPLATE = '''apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {app_name}-ingress
  namespace: {namespace}
spec:
  rules:
  - host: {host}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: {app_name}
            port:
              number: 80
'''

def generate_dockerfile(app_path: str):
    """Generate Dockerfile for Next.js app."""
    app = Path(app_path)
    if not (app / "package.json").exists():
        print(f"Error: No package.json found in {app_path}")
        sys.exit(1)

    dockerfile_path = app / "Dockerfile"
    with open(dockerfile_path, "w") as f:
        f.write(DOCKERFILE_STANDALONE)

    # Update next.config.js for standalone output
    next_config = app / "next.config.js"
    if next_config.exists():
        with open(next_config) as f:
            content = f.read()
        if "output: 'standalone'" not in content:
            print("Note: Add output: 'standalone' to next.config.js")

    print(f"Created: {dockerfile_path}")
    return str(dockerfile_path)

def generate_k8s(app_name: str, image_name: str, namespace: str = "learnflow", replicas: int = 2):
    """Generate K8s manifests."""
    deployment = K8S_DEPLOYMENT.format(
        app_name=app_name,
        image_name=image_name,
        namespace=namespace,
        replicas=replicas,
    )

    ingress = INGRESS_TEMPLATE.format(
        app_name=app_name,
        namespace=namespace,
        host=f"{app_name}.learnflow.local",
    )

    print(deployment)
    print("\n---\n")
    print(ingress)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: generate_dockerfile.py <app-path>")
        sys.exit(1)

    generate_dockerfile(sys.argv[1])
