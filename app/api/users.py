from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db.session import get_db
from app.schemas.user import UserOut, UserAuth
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
    
@user_router.post("/login", response_model=UserOut)
async def login(payload:UserAuth, db:AsyncSession = Depends(get_db)):
    try:
        user = await userservice.login(payload, db)
        return user
    except Exception as e:
                raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail = str(e)
        )

    


