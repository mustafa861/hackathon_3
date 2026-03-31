#!/usr/bin/env python3
"""Verify Kafka deployment status."""
import subprocess
import json
import sys

def check_pods():
    result = subprocess.run(
        ["kubectl", "get", "pods", "-n", "kafka", "-o", "json"],
        capture_output=True, text=True
    )
    pods = json.loads(result.stdout)["items"]
    running = sum(1 for p in pods if p["status"]["phase"] == "Running")
    total = len(pods)
    return running, total

def check_services():
    result = subprocess.run(
        ["kubectl", "get", "svc", "-n", "kafka", "-o", "json"],
        capture_output=True, text=True
    )
    services = json.loads(result.stdout)["items"]
    return [s["metadata"]["name"] for s in services]

if __name__ == "__main__":
    running, total = check_pods()
    services = check_services()

    if running == total and total > 0:
        print(f"All {total} pods running")
        print(f"Services: {', '.join(services)}")
        sys.exit(0)
    else:
        print(f"{running}/{total} pods running")
        sys.exit(1)
