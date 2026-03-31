#!/usr/bin/env python3
"""Generate AGENTS.md file for AI agent context."""
import os
import sys
from pathlib import Path

def analyze_repo(repo_path: str) -> dict:
    """Analyze repository structure and contents."""
    repo = Path(repo_path)
    if not repo.exists():
        print(f"Error: Path {repo_path} does not exist")
        sys.exit(1)

    has_package_json = (repo / "package.json").exists()
    has_requirements_txt = (repo / "requirements.txt").exists()
    has_pyproject = (repo / "pyproject.toml").exists()
    has_prisma = (repo / "prisma").exists()
    has_dockerfile = (repo / "Dockerfile").exists()
    has_k8s = (repo / "k8s").exists() or (repo / "kubernetes").exists()
    has_helm = (repo / "Chart.yaml").exists()
    has_nextjs = (repo / "next.config.js").exists() or (repo / "next.config.mjs").exists()
    has_fastapi = False
    has_dapr = False

    if has_requirements_txt:
        with open(repo / "requirements.txt") as f:
            content = f.read().lower()
            has_fastapi = "fastapi" in content
            has_dapr = "dapr" in content

    tech_stack = []
    if has_nextjs:
        tech_stack.extend(["Next.js", "React", "TypeScript"])
    if has_fastapi:
        tech_stack.extend(["FastAPI", "Python"])
    if has_prisma:
        tech_stack.append("Prisma")
    if has_dapr:
        tech_stack.append("Dapr")
    if has_k8s:
        tech_stack.append("Kubernetes")
    if has_helm:
        tech_stack.append("Helm")
    if has_dockerfile:
        tech_stack.append("Docker")

    key_files = []
    for root, dirs, files in os.walk(repo):
        dirs[:] = [d for d in dirs if d not in ["node_modules", ".git", "__pycache__", ".next"]]
        for f in files:
            rel = os.path.relpath(os.path.join(root, f), repo)
            if any(rel.endswith(ext) for ext in [".ts", ".tsx", ".py", ".prisma", ".yaml", ".yml"]):
                if "/" in rel:
                    key_files.append(rel)
            if len(key_files) >= 20:
                break

    return {
        "tech_stack": tech_stack,
        "key_files": key_files[:15],
        "has_fastapi": has_fastapi,
        "has_dapr": has_dapr,
        "has_k8s": has_k8s,
    }

def generate_agents_md(repo_path: str) -> str:
    """Generate AGENTS.md content."""
    info = analyze_repo(repo_path)
    repo_name = os.path.basename(os.path.abspath(repo_path))

    tech_stack_str = "\n".join(f"- {t}" for t in info["tech_stack"])
    key_files_str = "\n".join(f"- `{f}`" for f in info["key_files"])

    conventions = []
    if info["has_fastapi"]:
        conventions.extend([
            "- FastAPI with Pydantic schemas",
            "- Async endpoints",
            "- Dependency injection via Depends()",
        ])
    if any(t in info["tech_stack"] for t in ["Next.js", "React"]):
        conventions.extend([
            "- TypeScript strict mode",
            "- React Server Components",
            "- App Router convention",
        ])
    if info["has_dapr"]:
        conventions.append("- Dapr sidecar pattern for microservices")
    if info["has_k8s"]:
        conventions.append("- Kubernetes manifests in k8s/ directory")

    conventions_str = "\n".join(conventions) if conventions else "- Follow existing code style"

    return f"""# {repo_name} Repository

## Overview
Auto-generated AGENTS.md for AI agent context.

## Tech Stack
{tech_stack_str}

## Conventions
{conventions_str}

## Key Files
{key_files_str}
"""

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: generate_agents_md.py <repo-path>")
        sys.exit(1)

    repo_path = sys.argv[1]
    content = generate_agents_md(repo_path)
    output_path = os.path.join(repo_path, "AGENTS.md")

    with open(output_path, "w") as f:
        f.write(content)

    print(f"AGENTS.md generated at {output_path}")
