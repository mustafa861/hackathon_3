#!/usr/bin/env python3
"""Verify Next.js deployment status."""
import subprocess
import json
import sys

def check_pods(namespace: str):
    result = subprocess.run(
        ["kubectl", "get", "pods", "-n", namespace, "-l", "app=frontend", "-o", "json"],
        capture_output=True, text=True
    )
    pods = json.loads(result.stdout)["items"]
    running = sum(1 for p in pods if p["status"]["phase"] == "Running")
    total = len(pods)
    return running, total

def check_service(namespace: str):
    result = subprocess.run(
        ["kubectl", "get", "svc", "-n", namespace, "frontend", "-o", "json"],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        svc = json.loads(result.stdout)
        return svc["spec"]["clusterIP"]
    return None

if __name__ == "__main__":
    namespace = sys.argv[1] if len(sys.argv) > 1 else "learnflow"
    running, total = check_pods(namespace)
    cluster_ip = check_service(namespace)

    if running == total and total > 0:
        print(f"Frontend: {total} pod(s) running")
        if cluster_ip:
            print(f"Service IP: {cluster_ip}")
        sys.exit(0)
    else:
        print(f"Frontend: {running}/{total} pods running")
        sys.exit(1)
