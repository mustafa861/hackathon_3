# MCP Code Execution Reference

## The Token Problem

Direct MCP calls consume massive context:
- Tool definitions: ~10,000 tokens per server
- Intermediate results: full data flows through context
- 5 servers = ~50,000 tokens before conversation starts

## The Solution: Skills + Scripts

| Component | Tokens | Notes |
|-----------|--------|-------|
| SKILL.md | ~100 | Loaded when triggered |
| REFERENCE.md | 0 | Loaded only if needed |
| scripts/*.py | 0 | Executed, never loaded |
| Final output | ~10 | Minimal result only |

**Total: ~110 tokens vs 50,000+ with direct MCP**

## Pattern: Before vs After

### Before (Inefficient)
```
TOOL CALL: gdrive.getSheet(sheetId: 'abc123')
  → returns 10,000 rows in context
```

### After (Efficient)
```python
all_rows = await gdrive.getSheet({sheetId: 'abc123'})
pending = [r for r in all_rows if r['Status'] == 'pending']
print(pending[:5])  # Only 5 rows reach context
```

## Supported MCP Servers

| Server | Script Pattern | Use Case |
|--------|---------------|----------|
| Kubernetes | kubectl wrapper | Pod management, logs, deployments |
| Database | SQL client | Queries, migrations, backups |
| Filesystem | Python file ops | Read/write, search, transform |
| Git | Git wrapper | Status, diff, commit, push |

## Token Savings Formula

```
Savings = 1 - (skill_tokens + output_tokens) / (mcp_definitions + raw_data)
Typical: 1 - (110) / (50000) = 99.8% reduction
```
