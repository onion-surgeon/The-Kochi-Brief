from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.config import settings
from app.models.user import UserCreate
from app.services.user_service import UserService

router = APIRouter()

@router.post("/signup")
async def signup(user: UserCreate, user_service: UserService = Depends()):
    # TODO: Implement signup logic
    return {"message": "Signup successful. Please check your email to verify your account."}

@router.get("/verify")
async def verify_email(token: str, user_service: UserService = Depends()):
    # TODO: Implement email verification logic
    return {"message": "Email verified successfully."}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # TODO: Implement login logic
    return {"access_token": "dummy_token", "token_type": "bearer"}
