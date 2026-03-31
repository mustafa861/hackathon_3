#!/usr/bin/env python3
"""Verify PostgreSQL deployment status."""
import subprocess
import json
import sys

def check_pods():
    result = subprocess.run(
        ["kubectl", "get", "pods", "-n", "database", "-o", "json"],
        capture_output=True, text=True
    )
    pods = json.loads(result.stdout)["items"]
    running = sum(1 for p in pods if p["status"]["phase"] == "Running")
    total = len(pods)
    return running, total

def check_database():
    result = subprocess.run(
        ["kubectl", "exec", "-n", "database", "postgres-0", "--",
         "psql", "-U", "postgres", "-d", "learnflow", "-c", "SELECT 1;"],
        capture_output=True, text=True
    )
    return result.returncode == 0

if __name__ == "__main__":
    running, total = check_pods()
    db_ok = check_database()

    if running == total and total > 0 and db_ok:
        print(f"PostgreSQL: {total} pod(s) running, database accessible")
        sys.exit(0)
    else:
        print(f"PostgreSQL: {running}/{total} pods running, db={'OK' if db_ok else 'FAIL'}")
        sys.exit(1)
