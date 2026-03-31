# Skills Library

Reusable AI agent Skills with MCP Code Execution for building cloud-native applications.

## What Are Skills?

Skills teach AI coding agents (Claude Code, Goose, Codex) how to perform complex tasks autonomously. Written once, they work across all agents.

## The Pattern: Skills + Code Execution

Instead of loading MCP tools into context (~50,000 tokens), Skills use scripts that execute outside the context window (~110 tokens total).

**Result: 99%+ token reduction**

## Available Skills

| Skill | Purpose | Must Include |
|-------|---------|-------------|
| [agents-md-gen](.claude/skills/agents-md-gen/) | Generate AGENTS.md files | SKILL.md + script |
| [kafka-k8s-setup](.claude/skills/kafka-k8s-setup/) | Deploy Kafka on K8s | SKILL.md + deploy + verify scripts |
| [postgres-k8s-setup](.claude/skills/postgres-k8s-setup/) | Deploy PostgreSQL on K8s | SKILL.md + migration scripts |
| [fastapi-dapr-agent](.claude/skills/fastapi-dapr-agent/) | FastAPI + Dapr services | SKILL.md + templates |
| [mcp-code-execution](.claude/skills/mcp-code-execution/) | MCP with code execution | SKILL.md + Python scripts |
| [nextjs-k8s-deploy](.claude/skills/nextjs-k8s-deploy/) | Deploy Next.js apps | SKILL.md + Dockerfile template |
| [docusaurus-deploy](.claude/skills/docusaurus-deploy/) | Deploy documentation | SKILL.md + deploy script |

## Quick Start

```bash
# Use a skill with Claude Code
claude "Use kafka-k8s-setup to deploy Kafka"

# Use a skill with Goose
goose "Use kafka-k8s-setup to deploy Kafka"
```

## Skill Structure

```
.claude/skills/<name>/
├── SKILL.md          # Instructions (~100 tokens)
├── REFERENCE.md      # Deep docs (loaded on-demand)
└── scripts/          # Code that executes (0 tokens)
    ├── deploy.sh
    ├── verify.py
    └── ...
```

## Context Efficiency

| Component | Tokens |
|-----------|--------|
| SKILL.md | ~100 |
| REFERENCE.md | 0 (loaded only if needed) |
| scripts/* | 0 (executed, never loaded) |
| Final output | ~10 |
| **Total** | **~110** |

vs 50,000+ with direct MCP

## Development Guide

See [docs/skill-development-guide.md](docs/skill-development-guide.md) for detailed instructions on creating new skills.

## Cross-Agent Compatibility

All skills in this library work with:
- Claude Code
- Goose
- OpenAI Codex

No transpilation needed — the SKILL.md format is the industry standard.
