#!/bin/bash
set -e

SERVICE_NAME="${1:?Usage: deploy-service.sh <service-name>}"

echo "Deploying $SERVICE_NAME to Kubernetes..."

cd "services/$SERVICE_NAME" || exit 1

kubectl create namespace learnflow --dry-run=client -o yaml | kubectl apply -f -

docker build -t "$SERVICE_NAME:latest" .
minikube image load "$SERVICE_NAME:latest"

kubectl apply -f k8s-deployment.yaml -n learnflow

echo "Waiting for deployment..."
kubectl wait --for=condition=available deployment/"$SERVICE_NAME" -n learnflow --timeout=120s

echo "Service $SERVICE_NAME deployed successfully"
kubectl get pods -n learnflow -l app="$SERVICE_NAME"
