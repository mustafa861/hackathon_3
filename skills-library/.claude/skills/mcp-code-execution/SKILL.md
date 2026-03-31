---
name: mcp-code-execution
description: MCP servers as Skills with code execution pattern
---

# MCP Code Execution Pattern

## When to Use
- User wants to wrap MCP server calls in Skills
- Reducing context window token consumption
- Converting direct MCP tool calls to script execution

## Instructions
1. Identify MCP server to wrap
2. Create client script: `python scripts/create_mcp_skill.py <server-name> <tool-name>`
3. Test execution: `python scripts/<server_name>_client.py`
4. Verify token reduction

## Validation
- [ ] Script executes without loading MCP into context
- [ ] Only final result enters context (~10 tokens)
- [ ] Token reduction > 80% vs direct MCP calls
- [ ] Error handling for failed MCP calls

See [REFERENCE.md](./REFERENCE.md) for MCP server integration patterns.
