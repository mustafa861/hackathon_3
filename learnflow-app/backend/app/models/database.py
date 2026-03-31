from sqlalchemy import Column, String, Integer, Float, DateTime, Text, JSON, Enum as SAEnum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class Role(str, enum.Enum):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"
    ADMIN = "ADMIN"

class MasteryLevel(str, enum.Enum):
    BEGINNER = "BEGINNER"
    LEARNING = "LEARNING"
    PROFICIENT = "PROFICIENT"
    MASTERED = "MASTERED"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String)
    password_hash = Column(String, nullable=False)
    role = Column(SAEnum(Role), default=Role.STUDENT, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login_at = Column(DateTime)

    profile = relationship("UserProfile", back_populates="user", uselist=False)
    progress = relationship("Progress", back_populates="user")
    submissions = relationship("CodeSubmission", back_populates="user")

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True)
    avatar = Column(String)
    bio = Column(Text)
    timezone = Column(String, default="UTC")
    streak = Column(Integer, default=0)
    last_active = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="profile")

class Progress(Base):
    __tablename__ = "progress"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    module_id = Column(Integer)
    topic = Column(String)
    mastery_score = Column(Float, default=0)
    mastery_level = Column(SAEnum(MasteryLevel), default=MasteryLevel.BEGINNER)
    exercises_completed = Column(Integer, default=0)
    quiz_scores = Column(JSON)
    last_updated = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="progress")

class CodeSubmission(Base):
    __tablename__ = "code_submissions"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    code = Column(Text)
    language = Column(String, default="python")
    output = Column(Text)
    error = Column(Text)
    status = Column(String, default="pending")
    executed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="submissions")
