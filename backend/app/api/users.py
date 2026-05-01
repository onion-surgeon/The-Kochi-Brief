from typing import List
from fastapi import APIRouter, BackgroundTasks, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db.session import get_db
from app.core.security.dependency import get_current_user
from app.models.user import User
from app.schemas.user import UserBase, UserHome, UserOut, UserAuth, UserToken
from app.services.user_service import UserService
from app.utils.response import SuccessResponse, success_response

user_router = APIRouter()

userservice = UserService()

@user_router.post("/signup", response_model=SuccessResponse,status_code=201)
async def sign_up(payload:UserAuth, db:AsyncSession = Depends(get_db)):
        new_user = await userservice.create_user(payload, db)
        return success_response(message = "User created successfully")

    
@user_router.post("/login", response_model=SuccessResponse[UserToken], status_code=200)
async def login(payload:UserAuth, db:AsyncSession = Depends(get_db)):
        user = await userservice.login(payload, db)
        return success_response(
          message = "User logged in successfully",
          data =  user
        )


@user_router.get("/users", response_model=SuccessResponse[List[UserBase]])
async def get_all_users(db:AsyncSession = Depends(get_db),curr_user:User = Depends(get_current_user)):
     return await userservice.select_all_users(db)
     
@user_router.post("/verify",response_model=SuccessResponse, status_code=202)
async def send_verification_mail(background_tasks: BackgroundTasks, db:AsyncSession = Depends(get_db),curr_user:User = Depends(get_current_user)):
     check = await userservice.check_email_verification_possible(background_tasks, curr_user.email, db)
     if check:
           return success_response(message= "Verification Email queued for sending")
     
@user_router.get("/verify", response_model=SuccessResponse, status_code=200)
async def update_verification_status(token:str, db:AsyncSession = Depends(get_db)):
     res = await userservice.update_user_verified(token,db)
     if res:
           return success_response(message= "User successfully verified")


@user_router.get("/home", response_model=SuccessResponse[UserHome], status_code=200)
async def get_user_home(db:AsyncSession = Depends(get_db),curr_user:User = Depends(get_current_user)):
      result = await userservice.compose_home_results(db, curr_user)
      if result:
        return success_response(message="successfully retrieved",
                                data = result)


@user_router.post("/subscribe", response_model=SuccessResponse, status_code=200)
async def subscribe_user(db: AsyncSession = Depends(get_db), curr_user: User = Depends(get_current_user)):
     result = await userservice.subscribe_user(db, curr_user.id)
     if result:
          return success_response(message="You have been subscribed successfully.")


@user_router.post("/unsubscribe", response_model=SuccessResponse, status_code=200)
async def unsubscribe_user(db: AsyncSession = Depends(get_db), curr_user: User = Depends(get_current_user)):
     result = await userservice.unsubscribe_user(db, curr_user.id)
     if result:
          return success_response(message="You have been unsubscribed successfully.")
