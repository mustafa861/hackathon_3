#!/bin/bash
set -e

MIGRATION_DIR="${1:-./migrations}"

if [ ! -d "$MIGRATION_DIR" ]; then
  echo "Error: Migration directory '$MIGRATION_DIR' not found"
  exit 1
fi

echo "Running migrations from $MIGRATION_DIR..."

for migration in "$MIGRATION_DIR"/*.sql; do
  if [ -f "$migration" ]; then
    echo "Applying: $(basename $migration)"
    kubectl exec -n database postgres-0 -- \
      psql -U postgres -d learnflow -f /dev/stdin < "$migration"
  fi
done

echo "All migrations applied"
