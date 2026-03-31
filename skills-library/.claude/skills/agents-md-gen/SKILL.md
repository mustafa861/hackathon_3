---
name: agents-md-gen
description: Generate AGENTS.md files for AI agent context
---

# AGENTS.md Generator

## When to Use
- User asks to create AGENTS.md for a repository
- Setting up a new project for AI agent access
- Updating repository context for Claude Code or Goose

## Instructions
1. Run: `python scripts/generate_agents_md.py <repo-path>`
2. Review the generated AGENTS.md
3. Place it in the repository root

## Validation
- [ ] AGENTS.md exists in repository root
- [ ] Contains tech stack, conventions, and key files
- [ ] Under 500 tokens for efficient context loading

See [REFERENCE.md](./REFERENCE.md) for customization options.
