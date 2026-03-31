#!/bin/bash
set -e

echo "Creating Kafka topics for LearnFlow..."

KAFKA_POD=$(kubectl get pods -n kafka -l app.kubernetes.io/name=kafka -o jsonpath='{.items[0].metadata.name}')

TOPICS=(
  "learning.events"
  "code.events"
  "exercise.events"
  "struggle.events"
)

for topic in "${TOPICS[@]}"; do
  echo "Creating topic: $topic"
  kubectl exec -n kafka $KAFKA_POD -- \
    kafka-topics.sh --create \
    --bootstrap-server localhost:9092 \
    --topic "$topic" \
    --partitions 3 \
    --replication-factor 1 \
    --if-not-exists
done

echo "All topics created"
kubectl exec -n kafka $KAFKA_POD -- \
  kafka-topics.sh --list --bootstrap-server localhost:9092
