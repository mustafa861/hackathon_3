from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import json
import time

router = APIRouter(prefix="/agents", tags=["ai agents"])

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    response: str
    agent: str
    intent: str
    confidence: float = 0.0

class ExerciseRequest(BaseModel):
    topic: str
    difficulty: str = "easy"
    module_id: int = 1

class ExerciseResponse(BaseModel):
    title: str
    description: str
    module_id: int
    difficulty: str
    starter_code: str
    test_cases: list = []

INTENT_KEYWORDS = {
    "error": ["error", "bug", "wrong", "doesn't work", "not working", "exception", "traceback"],
    "review": ["review", "check my code", "improve", "feedback", "better way"],
    "exercise": ["exercise", "practice", "challenge", "quiz", "test me"],
    "progress": ["progress", "how am i doing", "score", "mastery", "level"],
}

def detect_intent(message: str) -> str:
    lower = message.lower()
    for intent, keywords in INTENT_KEYWORDS.items():
        if any(kw in lower for kw in keywords):
            return intent
    return "explain"

AGENT_MAP = {
    "explain": "Concepts Agent",
    "error": "Debug Agent",
    "review": "Code Review Agent",
    "exercise": "Exercise Agent",
    "progress": "Progress Agent",
}

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    intent = detect_intent(request.message)
    agent = AGENT_MAP.get(intent, "Triage Agent")

    return ChatResponse(
        response=f"[{agent}] Processing your request about: {request.message}",
        agent=agent,
        intent=intent,
        confidence=0.85,
    )

@router.post("/exercise/generate", response_model=ExerciseResponse)
async def generate_exercise(request: ExerciseRequest):
    exercises = {
        "for loops": ExerciseResponse(
            title="Sum of Numbers",
            description="Write a function that calculates the sum of all numbers from 1 to n using a for loop.",
            module_id=2,
            difficulty="easy",
            starter_code="def sum_to_n(n):\n    total = 0\n    # Your code here\n    return total",
            test_cases=[{"input": 10, "expected": 55}],
        ),
    }

    return exercises.get(
        request.topic.lower(),
        ExerciseResponse(
            title=f"Practice: {request.topic}",
            description=f"Write code to demonstrate your understanding of {request.topic}.",
            module_id=request.module_id,
            difficulty=request.difficulty,
            starter_code=f"# Exercise: {request.topic}\n# Write your solution below\n",
        ),
    )
