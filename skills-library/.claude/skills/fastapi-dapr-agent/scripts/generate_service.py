#!/usr/bin/env python3
"""Generate FastAPI + Dapr AI agent microservice template."""
import os
import sys
from pathlib import Path

SERVICE_TEMPLATE = '''from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import dapr.ext.grpc
import json

app = FastAPI(
    title="{service_name}",
    description="AI-powered {agent_type} agent for LearnFlow",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {{"status": "healthy", "service": "{service_name}"}}

@app.post("/api/v1/{agent_type}/process")
async def process_request(request: dict):
    """Process incoming {agent_type} request."""
    # TODO: Implement agent logic
    return {{"status": "processed", "agent": "{agent_type}"}}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
'''

DOCKERFILE_TEMPLATE = '''FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000 3500

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
'''

K8S_TEMPLATE = '''apiVersion: apps/v1
kind: Deployment
metadata:
  name: {service_name}
  namespace: learnflow
  labels:
    app: {service_name}
    dapr.io/enabled: "true"
    dapr.io/app-id: {service_name}
    dapr.io/app-port: "8000"
spec:
  replicas: 1
  selector:
    matchLabels:
      app: {service_name}
  template:
    metadata:
      labels:
        app: {service_name}
      annotations:
        dapr.io/enabled: "true"
        dapr.io/app-id: {service_name}
        dapr.io/app-port: "8000"
    spec:
      containers:
      - name: {service_name}
        image: {service_name}:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: 128Mi
            cpu: 100m
          limits:
            memory: 256Mi
            cpu: 250m
---
apiVersion: v1
kind: Service
metadata:
  name: {service_name}
  namespace: learnflow
spec:
  selector:
    app: {service_name}
  ports:
  - port: 80
    targetPort: 8000
  type: ClusterIP
'''

REQUIREMENTS = '''fastapi>=0.104.0
uvicorn>=0.24.0
dapr>=1.11.0
dapr-ext-grpc>=1.11.0
pydantic>=2.5.0
httpx>=0.25.0
openai>=1.0.0
'''

AGENT_TYPES = {
    "triage": "Routes queries to specialist agents",
    "concepts": "Explains Python concepts with examples",
    "code-review": "Analyzes code for correctness and style",
    "debug": "Parses errors and provides hints",
    "exercise": "Generates and grades coding challenges",
    "progress": "Tracks mastery scores and progress",
}

def generate_service(service_name: str, agent_type: str):
    """Generate complete service template."""
    base_dir = Path(f"services/{service_name}")
    base_dir.mkdir(parents=True, exist_ok=True)

    files = {
        "main.py": SERVICE_TEMPLATE.format(service_name=service_name, agent_type=agent_type),
        "Dockerfile": DOCKERFILE_TEMPLATE,
        "requirements.txt": REQUIREMENTS,
        "k8s-deployment.yaml": K8S_TEMPLATE.format(service_name=service_name),
    }

    for filename, content in files.items():
        filepath = base_dir / filename
        with open(filepath, "w") as f:
            f.write(content)
        print(f"Created: {filepath}")

    print(f"\nService '{service_name}' ({agent_type} agent) generated successfully")
    print(f"Description: {AGENT_TYPES.get(agent_type, 'Custom agent')}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: generate_service.py <service-name> [agent-type]")
        print(f"Agent types: {', '.join(AGENT_TYPES.keys())}")
        sys.exit(1)

    service_name = sys.argv[1]
    agent_type = sys.argv[2] if len(sys.argv) > 2 else "triage"

    if agent_type not in AGENT_TYPES:
        print(f"Unknown agent type: {agent_type}")
        print(f"Valid types: {', '.join(AGENT_TYPES.keys())}")
        sys.exit(1)

    generate_service(service_name, agent_type)
