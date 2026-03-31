# Skill Development Guide

## Overview

This guide explains how to create reusable Skills for AI coding agents (Claude Code, Goose, Codex) using the MCP Code Execution pattern.

## Skill Anatomy

Every skill consists of:

```
.claude/skills/<skill-name>/
├── SKILL.md          # Instructions (~100 tokens)
├── REFERENCE.md      # Deep docs (loaded on-demand, 0 tokens until needed)
└── scripts/          # Executable code (0 tokens - never loaded into context)
    ├── deploy.sh
    ├── verify.py
    └── ...
```

## The Token Problem

Direct MCP tool calls consume massive context windows:
- 5 MCP servers = ~50,000 tokens before conversation starts
- Every intermediate result flows through context twice

## The Solution: Skills + Code Execution

| Component | Tokens | Notes |
|-----------|--------|-------|
| SKILL.md | ~100 | Loaded when triggered |
| REFERENCE.md | 0 | Loaded only if needed |
| scripts/*.py | 0 | Executed, never loaded |
| Final output | ~10 | Minimal result only |

**Result: 99%+ token reduction**

## Creating a New Skill

### Step 1: Define the Skill (SKILL.md)

```markdown
---
name: my-skill
description: What this skill does in one line
---

# My Skill

## When to Use
- Specific trigger conditions

## Instructions
1. Run: `bash scripts/deploy.sh`
2. Verify: `python scripts/verify.py`

## Validation
- [ ] Checklist item 1
- [ ] Checklist item 2
```

### Step 2: Write the Scripts

Scripts do the heavy lifting outside the context window:

```python
#!/usr/bin/env python3
"""Execute task and return minimal result."""
import subprocess, sys

result = subprocess.run([...], capture_output=True, text=True)

# Only this enters context
if result.returncode == 0:
    print("OK: task completed")
    sys.exit(0)
else:
    print(f"Error: {result.stderr}")
    sys.exit(1)
```

### Step 3: Add Reference Docs (REFERENCE.md)

Put detailed configuration, troubleshooting, and examples here. Only loaded when the agent needs deep information.

## Best Practices

1. **Keep SKILL.md minimal** — under 100 tokens
2. **Scripts return minimal output** — status + key data only
3. **Validate with checklists** — clear success criteria
4. **Handle errors gracefully** — scripts should exit with proper codes
5. **Test with both Claude Code and Goose** — ensure cross-agent compatibility

## Testing Your Skill

```bash
# Test with Claude Code
claude "Use my-skill to deploy Kafka"

# Test with Goose
goose "Use my-skill to deploy Kafka"

# Verify both produce the same result
```

## Available Skills

| Skill | Purpose | Scripts |
|-------|---------|---------|
| agents-md-gen | Generate AGENTS.md files | Python |
| kafka-k8s-setup | Deploy Kafka on K8s | Bash + Python |
| postgres-k8s-setup | Deploy PostgreSQL on K8s | Bash + Python |
| fastapi-dapr-agent | Create AI agent microservices | Python + Bash |
| mcp-code-execution | Wrap MCP servers as Skills | Python |
| nextjs-k8s-deploy | Deploy Next.js to K8s | Python + Bash |
| docusaurus-deploy | Deploy documentation site | Bash + Python |
