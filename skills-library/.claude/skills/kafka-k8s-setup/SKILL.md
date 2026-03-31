---
name: kafka-k8s-setup
description: Deploy Apache Kafka on Kubernetes with verification
---

# Kafka Kubernetes Setup

## When to Use
- User asks to deploy Kafka on Kubernetes
- Setting up event-driven microservices
- Creating Kafka topics for pub/sub messaging

## Instructions
1. Run deployment: `bash scripts/deploy.sh`
2. Verify status: `python scripts/verify.py`
3. Create topics: `bash scripts/create-topics.sh`
4. Confirm all pods Running before proceeding

## Validation
- [ ] All pods in Running state
- [ ] Can create test topic
- [ ] Producer/consumer connectivity verified
- [ ] Topics created: learning.*, code.*, exercise.*, struggle.*

See [REFERENCE.md](./REFERENCE.md) for configuration options.
