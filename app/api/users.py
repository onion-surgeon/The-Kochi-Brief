from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db.session import get_db
from app.core.security.dependency import get_current_user
from app.models.user import User
from app.schemas.user import UserBase, UserOut, UserAuth, UserToken
from app.services.user_service import UserService

user_router = APIRouter()

userservice = UserService()

@user_router.post("/signup", response_model=str,status_code=201)
async def sign_up(payload:UserAuth, db:AsyncSession = Depends(get_db)):
    try:
        new_user = await userservice.create_user(payload, db)
        return "User created successfully"
    except ValueError as e:
        raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail = str(e)
        )
    
@user_router.post("/login", response_model=UserToken)
async def login(payload:UserAuth, db:AsyncSession = Depends(get_db)):
    try:
        user = await userservice.login(payload, db)
        return user
    except Exception as e:
                raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail = str(e)
        )

@user_router.get("/users", response_model=List[UserBase])
async def get_all_users(db:AsyncSession = Depends(get_db),curr_user:User = Depends(get_current_user)):
     return await userservice.select_all_users(db)
     
@user_router.post("/verify")
async def send_verification_mail(db:AsyncSession = Depends(get_db),curr_user:User = Depends(get_current_user)):
     return await userservice.email_verification(curr_user.email,db)

@user_router.get("/verify")
async def update_verification_status(token:str, db:AsyncSession = Depends(get_db)):
     return await userservice.update_user_verified(token,db)


