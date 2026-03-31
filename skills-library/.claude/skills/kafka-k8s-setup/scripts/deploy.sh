#!/bin/bash
set -e

echo "Deploying Apache Kafka to Kubernetes..."

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -

helm install kafka bitnami/kafka --namespace kafka \
  --set replicaCount=1 \
  --set zookeeper.replicaCount=1 \
  --set persistence.size=8Gi \
  --set zookeeper.persistence.size=4Gi \
  --wait --timeout 300s

echo "Kafka deployed to namespace 'kafka'"
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=kafka -n kafka --timeout=300s

echo "Kafka is ready"
