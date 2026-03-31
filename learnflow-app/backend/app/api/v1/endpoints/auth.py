from fastapi import APIRouter, HTTPException, Depends
from app.schemas.auth import UserCreate, UserLogin, TokenResponse, UserResponse, Role
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate):
    """Register a new user account."""
    hashed_password = get_password_hash(user_data.password)
    return UserResponse(
        id="generated-id",
        email=user_data.email,
        name=user_data.name,
        role=user_data.role,
    )

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Authenticate user and return JWT token."""
    return TokenResponse(
        access_token="jwt-token",
        token_type="bearer",
        user=UserResponse(
            id="user-id",
            email=credentials.email,
            name="User",
            role=Role.STUDENT,
        ),
    )
