# FastAPI + Dapr Agent Reference

## Dapr Components

### State Store (Redis)
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.redis
  version: v1
  metadata:
  - name: redisHost
    value: redis:6379
  - name: redisPassword
    value: ""
```

### Pub/Sub (Kafka)
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: pubsub
spec:
  type: pubsub.kafka
  version: v1
  metadata:
  - name: brokers
    value: kafka.kafka:9092
  - name: consumerGroup
    value: learnflow-agents
```

## Agent Types

| Agent | Purpose | Endpoints |
|-------|---------|-----------|
| triage | Route queries | POST /api/v1/triage/process |
| concepts | Explain concepts | POST /api/v1/concepts/process |
| code-review | Review code | POST /api/v1/code-review/process |
| debug | Debug errors | POST /api/v1/debug/process |
| exercise | Generate exercises | POST /api/v1/exercise/process |
| progress | Track mastery | POST /api/v1/progress/process |

## Dapr Sidecar Annotations

```yaml
annotations:
  dapr.io/enabled: "true"
  dapr.io/app-id: my-service
  dapr.io/app-port: "8000"
  dapr.io/app-protocol: "http"
```

## Troubleshooting

### Sidecar not starting
- Check Dapr installation: `dapr --version`
- Verify components: `kubectl get components -n learnflow`

### Service discovery fails
- Check Dapr service: `kubectl get svc -n learnflow`
- Test Dapr invoke: `dapr invoke --app-id my-service --method /health`
