#!/usr/bin/env python3
"""Create MCP code execution skill wrapper."""
import os
import sys
from pathlib import Path

SKILL_TEMPLATE = '''---
name: {name}
description: {description}
---

# {title}

## When to Use
- User needs to {purpose}

## Instructions
1. Run: `python scripts/{name}_client.py`
2. Verify result

## Validation
- [ ] Script executed successfully
- [ ] Minimal output in context
'''

CLIENT_TEMPLATE = '''#!/usr/bin/env python3
"""MCP client for {name} - executes outside context window."""
import subprocess
import json
import sys

def main():
    """Execute MCP tool call and return minimal result."""
    # TODO: Replace with actual MCP server interaction
    # Example pattern:
    # from mcp_client import MCPClient
    # client = MCPClient("server-name")
    # result = client.call_tool("tool-name", params)
    
    result = {{"status": "success", "data": []}}
    
    # Only minimal result enters context
    if result["status"] == "success":
        print(f"OK: {{len(result['data'])}} items returned")
        sys.exit(0)
    else:
        print(f"Error: {{result.get('error', 'unknown')}}")
        sys.exit(1)

if __name__ == "__main__":
    main()
'''

MCP_SERVERS = {
    "kubernetes": {
        "description": "Kubernetes operations via kubectl scripts",
        "purpose": "perform K8s operations",
        "tools": ["get_pods", "get_logs", "apply_manifest"],
    },
    "database": {
        "description": "Database operations via SQL scripts",
        "purpose": "query and manage databases",
        "tools": ["query", "migrate", "backup"],
    },
    "filesystem": {
        "description": "Filesystem operations via Python scripts",
        "purpose": "read and write files",
        "tools": ["read_file", "write_file", "list_dir"],
    },
}

def create_skill(name: str):
    """Create MCP code execution skill."""
    server_info = MCP_SERVERS.get(name, {
        "description": f"{name} operations via scripts",
        "purpose": f"use {name}",
        "tools": ["default"],
    })

    skill_dir = Path(f"skills/{name}")
    scripts_dir = skill_dir / "scripts"
    scripts_dir.mkdir(parents=True, exist_ok=True)

    # SKILL.md
    skill_content = SKILL_TEMPLATE.format(
        name=name,
        title=name.replace("-", " ").title(),
        description=server_info["description"],
        purpose=server_info["purpose"],
    )
    with open(skill_dir / "SKILL.md", "w") as f:
        f.write(skill_content)

    # Client script
    client_content = CLIENT_TEMPLATE.format(name=name.replace("-", "_"))
    client_path = scripts_dir / f"{name.replace('-', '_')}_client.py"
    with open(client_path, "w") as f:
        f.write(client_content)
    os.chmod(client_path, 0o755)

    print(f"Created skill: {skill_dir}/SKILL.md")
    print(f"Created client: {client_path}")
    print(f"Available tools: {', '.join(server_info['tools'])}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: create_mcp_skill.py <server-name>")
        print(f"Known servers: {', '.join(MCP_SERVERS.keys())}")
        sys.exit(1)

    create_skill(sys.argv[1])
