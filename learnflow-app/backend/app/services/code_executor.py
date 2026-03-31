import subprocess
import json
import sys
import time
from pydantic import BaseModel

class CodeExecutionRequest(BaseModel):
    code: str
    language: str = "python"
    timeout: int = 5
    memory_limit: int = 50

def execute_python(code: str, timeout: int = 5) -> dict:
    try:
        result = subprocess.run(
            [sys.executable, "-c", code],
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        return {
            "output": result.stdout if result.stdout else None,
            "error": result.stderr if result.stderr else None,
            "status": "success" if result.returncode == 0 else "error",
            "return_code": result.returncode,
        }
    except subprocess.TimeoutExpired:
        return {
            "output": None,
            "error": f"Execution timed out after {timeout} seconds",
            "status": "error",
            "return_code": -1,
        }
    except Exception as e:
        return {
            "output": None,
            "error": str(e),
            "status": "error",
            "return_code": -1,
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: execute_code.py <code>")
        sys.exit(1)

    code = sys.argv[1]
    result = execute_python(code)
    print(json.dumps(result))
    sys.exit(0 if result["status"] == "success" else 1)
