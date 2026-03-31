# PostgreSQL K8s Setup Reference

## Connection String

```
postgresql://postgres:learnflow-dev-password@postgres.database.svc.cluster.local:5432/learnflow
```

## Production Settings

For production, use Helm instead of raw manifests:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql \
  --namespace database \
  --set auth.postgresPassword=<secure-password> \
  --set primary.persistence.size=50Gi \
  --set primary.resources.requests.memory=1Gi
```

## Backup & Restore

### Backup
```bash
kubectl exec -n database postgres-0 -- pg_dump -U postgres learnflow > backup.sql
```

### Restore
```bash
kubectl exec -i -n database postgres-0 -- psql -U postgres learnflow < backup.sql
```

## Troubleshooting

### Pod won't start
- Check PVC: `kubectl describe pvc -n database`
- Check events: `kubectl describe pod postgres-0 -n database`

### Connection refused
- Verify service: `kubectl get svc -n database`
- Test connectivity: `kubectl run -it --rm test-pg --image=postgres:16 --restart=Never -- psql -h postgres.database -U postgres -d learnflow`
