# Kafka K8s Setup Reference

## Helm Configuration

### Production Settings
```yaml
replicaCount: 3
zookeeper:
  replicaCount: 3
persistence:
  size: 50Gi
resources:
  requests:
    memory: 2Gi
    cpu: "1"
  limits:
    memory: 4Gi
    cpu: "2"
```

### Development Settings (default)
```yaml
replicaCount: 1
zookeeper:
  replicaCount: 1
persistence:
  size: 8Gi
```

## Topic Configuration

| Topic | Partitions | Purpose |
|-------|-----------|---------|
| learning.events | 3 | Student learning interactions |
| code.events | 3 | Code execution events |
| exercise.events | 3 | Exercise generation/completion |
| struggle.events | 1 | Student struggle alerts |

## Troubleshooting

### Pods stuck in Pending
- Increase Minikube memory: `minikube start --memory=8192`
- Check PVC: `kubectl describe pvc -n kafka`

### Cannot connect to Kafka
- Port forward: `kubectl port-forward -n kafka svc/kafka 9092:9092`
- Check logs: `kubectl logs -n kafka -l app.kubernetes.io/name=kafka`
