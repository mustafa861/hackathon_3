from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter(prefix="/progress", tags=["progress"])

class ProgressUpdate(BaseModel):
    user_id: str
    module_id: int
    topic: str
    score: float

class ProgressResponse(BaseModel):
    user_id: str
    module_id: int
    topic: str
    mastery_score: float
    mastery_level: str
    exercises_completed: int
    last_updated: datetime

def calculate_mastery_level(score: float) -> str:
    if score >= 91:
        return "MASTERED"
    elif score >= 71:
        return "PROFICIENT"
    elif score >= 41:
        return "LEARNING"
    else:
        return "BEGINNER"

@router.post("/update", response_model=ProgressResponse)
async def update_progress(data: ProgressUpdate):
    mastery_level = calculate_mastery_level(data.score)
    return ProgressResponse(
        user_id=data.user_id,
        module_id=data.module_id,
        topic=data.topic,
        mastery_score=data.score,
        mastery_level=mastery_level,
        exercises_completed=0,
        last_updated=datetime.utcnow(),
    )

@router.get("/{user_id}")
async def get_progress(user_id: str):
    return {
        "user_id": user_id,
        "progress": [
            {"module_id": 1, "topic": "Variables", "mastery_score": 85, "mastery_level": "PROFICIENT"},
            {"module_id": 2, "topic": "Loops", "mastery_score": 60, "mastery_level": "LEARNING"},
            {"module_id": 3, "topic": "Lists", "mastery_score": 35, "mastery_level": "BEGINNER"},
        ],
    }
