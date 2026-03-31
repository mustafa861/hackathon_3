#!/bin/bash
set -e

DOCS_PATH="${1:-./docs-site}"
NAMESPACE="${2:-learnflow}"

echo "Deploying Docusaurus to namespace $NAMESPACE..."

cd "$DOCS_PATH" || exit 1

npm run build

kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docs
  namespace: $NAMESPACE
spec:
  replicas: 1
  selector:
    matchLabels:
      app: docs
  template:
    metadata:
      labels:
        app: docs
    spec:
      containers:
      - name: docs
        image: nginx:alpine
        ports:
        - containerPort: 80
        volumeMounts:
        - name: docs-content
          mountPath: /usr/share/nginx/html
          readOnly: true
        resources:
          requests:
            memory: 64Mi
            cpu: 50m
          limits:
            memory: 128Mi
            cpu: 100m
      volumes:
      - name: docs-content
        configMap:
          name: docs-content
EOF

kubectl create configmap docs-content -n "$NAMESPACE" \
  --from-file=build/ --dry-run=client -o yaml | kubectl apply -f -

kubectl rollout restart deployment/docs -n "$NAMESPACE"

echo "Waiting for deployment..."
kubectl wait --for=condition=available deployment/docs -n "$NAMESPACE" --timeout=60s

echo "Documentation deployed successfully"
