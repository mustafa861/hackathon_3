from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter(prefix="/teacher", tags=["teacher"])

class StudentResponse(BaseModel):
    id: str
    name: str
    email: str
    module: str
    mastery_score: float
    last_active: str

class StruggleAlert(BaseModel):
    id: str
    student_name: str
    student_id: str
    type: str
    module: str
    topic: str
    timestamp: datetime
    details: str

@router.get("/students", response_model=list[StudentResponse])
async def get_students():
    return [
        StudentResponse(id="1", name="Maya Johnson", email="maya@school.edu", module="Control Flow", mastery_score=68, last_active="2 min ago"),
        StudentResponse(id="2", name="James Chen", email="james@school.edu", module="Data Structures", mastery_score=35, last_active="5 min ago"),
        StudentResponse(id="3", name="Sara Williams", email="sara@school.edu", module="Functions", mastery_score=82, last_active="15 min ago"),
    ]

@router.get("/alerts", response_model=list[StruggleAlert])
async def get_alerts():
    return [
        StruggleAlert(
            id="1",
            student_name="James Chen",
            student_id="2",
            type="repeated_error",
            module="Data Structures",
            topic="List Comprehensions",
            timestamp=datetime.utcnow(),
            details="Got the same error 3 times on list comprehension exercise",
        ),
    ]
