#!/usr/bin/env python3
"""Verify Docusaurus deployment status."""
import subprocess
import json
import sys

def check_pods(namespace: str):
    result = subprocess.run(
        ["kubectl", "get", "pods", "-n", namespace, "-l", "app=docs", "-o", "json"],
        capture_output=True, text=True
    )
    pods = json.loads(result.stdout)["items"]
    running = sum(1 for p in pods if p["status"]["phase"] == "Running")
    total = len(pods)
    return running, total

def check_configmap(namespace: str):
    result = subprocess.run(
        ["kubectl", "get", "configmap", "docs-content", "-n", namespace],
        capture_output=True, text=True
    )
    return result.returncode == 0

if __name__ == "__main__":
    namespace = sys.argv[1] if len(sys.argv) > 1 else "learnflow"
    running, total = check_pods(namespace)
    cm_ok = check_configmap(namespace)

    if running == total and total > 0 and cm_ok:
        print(f"Docs: {total} pod(s) running, configmap OK")
        sys.exit(0)
    else:
        print(f"Docs: {running}/{total} pods running, configmap={'OK' if cm_ok else 'MISSING'}")
        sys.exit(1)
