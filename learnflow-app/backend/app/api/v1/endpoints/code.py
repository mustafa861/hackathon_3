from fastapi import APIRouter
from pydantic import BaseModel
from app.services.code_executor import execute_python

router = APIRouter(prefix="/code", tags=["code execution"])

class CodeRequest(BaseModel):
    code: str
    language: str = "python"
    timeout: int = 30

class CodeResponse(BaseModel):
    output: str | None = None
    error: str | None = None
    status: str
    execution_time: float | None = None

@router.post("/execute", response_model=CodeResponse)
async def execute_code(request: CodeRequest):
    import time
    start = time.time()
    result = execute_python(request.code, timeout=request.timeout)
    elapsed = time.time() - start
    return CodeResponse(
        output=result.get("output"),
        error=result.get("error"),
        status=result["status"],
        execution_time=round(elapsed * 1000, 2),
    )
