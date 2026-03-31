#!/bin/bash
set -e

IMAGE_NAME="${1:?Usage: deploy.sh <image-name> <namespace>}"
NAMESPACE="${2:-learnflow}"

echo "Deploying $IMAGE_NAME to namespace $NAMESPACE..."

kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: $NAMESPACE
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: $IMAGE_NAME:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: 256Mi
            cpu: 200m
          limits:
            memory: 512Mi
            cpu: 500m
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: $NAMESPACE
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
EOF

echo "Waiting for deployment..."
kubectl wait --for=condition=available deployment/frontend -n "$NAMESPACE" --timeout=120s

echo "Frontend deployed successfully"
