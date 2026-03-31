# Next.js K8s Deploy Reference

## Dockerfile Optimization

### Standalone Output
Add to `next.config.js`:
```js
module.exports = {
  output: 'standalone',
}
```

This creates a minimal production build (~100MB vs ~1GB).

### Multi-stage Build Benefits
- Build stage: All dev dependencies, full source
- Runner stage: Only production artifacts
- Final image: ~150MB vs ~1.2GB

## Resource Recommendations

| Environment | Replicas | Memory | CPU |
|-------------|----------|--------|-----|
| Development | 1 | 256Mi | 200m |
| Staging | 2 | 512Mi | 500m |
| Production | 3+ | 1Gi | 1 |

## Environment Variables

```yaml
env:
- name: DATABASE_URL
  valueFrom:
    secretKeyRef:
      name: app-secrets
      key: database-url
- name: NEXT_PUBLIC_API_URL
  value: "http://api.learnflow.svc.cluster.local"
```

## Ingress Configuration

For production with TLS:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - learnflow.example.com
    secretName: learnflow-tls
  rules:
  - host: learnflow.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
```

## Troubleshooting

### Image pull errors
- Verify image loaded: `minikube image ls`
- Check imagePullPolicy: `Never` for local images

### Health check failures
- Increase initialDelaySeconds for slow builds
- Verify health endpoint exists
- Check logs: `kubectl logs -n learnflow deployment/frontend`
