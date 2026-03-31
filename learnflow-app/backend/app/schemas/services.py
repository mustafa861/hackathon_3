from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CodeExecuteRequest(BaseModel):
    code: str
    language: str = "python"
    timeout: int = 5

class CodeExecuteResponse(BaseModel):
    output: Optional[str] = None
    error: Optional[str] = None
    status: str
    execution_time: Optional[float] = None

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_id: Optional[str] = None
    agent: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    agent: str
    intent: str

class QuizSubmit(BaseModel):
    user_id: str
    module_id: int
    answers: List[int]

class QuizResult(BaseModel):
    score: int
    total: int
    percentage: float
    mastery_level: str

class ExerciseGenerate(BaseModel):
    topic: str
    difficulty: str = "easy"
    module_id: int = 1

class ExerciseData(BaseModel):
    title: str
    description: str
    module_id: int
    difficulty: str
    starter_code: str
    test_cases: Optional[list] = None

class ProgressUpdate(BaseModel):
    user_id: str
    module_id: int
    topic: str
    score: float

class StruggleAlert(BaseModel):
    student_id: str
    alert_type: str
    module: str
    topic: str
    details: str
    timestamp: datetime
