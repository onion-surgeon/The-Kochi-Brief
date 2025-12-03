from datetime import timedelta
from sqlalchemy import select, update
from app.core.config import settings
from app.schemas.user import UserAuth
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user import UserAuth
from app.core.security.hashing import hash_password, verify_password
from app.core.security.jwt import create_token, decode_token
from app.mail.sender import MailSender

mail_sender = MailSender()
class UserService:
    def __init__(self):
        # TODO: Initialize database connection
        pass

    async def create_user(self, user_data:UserAuth, db:AsyncSession):
        existing_user = await self.check_existing_email(user_data.email, db)

        if existing_user:
            raise ValueError("Email already registered")
        
        new_user = User(
                email = user_data.email,
                password_hash = hash_password(user_data.password)
                )
        db.add(new_user)
        await db.commit()
        return new_user
    
    
    async def login(self, user_data:UserAuth, db:AsyncSession):
        req_user = await self.check_existing_email(user_data.email, db)

        if req_user and verify_password(user_data.password, req_user.password_hash):
            to_encode = {"sub": str(req_user.id),"email":user_data.email,"type":"access"}
            token = create_token(to_encode,settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            return {"id":req_user.id,
                    "type":"access",
                    "email":req_user.email,
                    "token":token}
        raise ValueError("Incorrect Email or password")
        
    
    async def check_existing_email(self, email:str, db:AsyncSession)-> User | None:
        stmt = select(User).where(User.email == email)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def email_verification(self, email:str, db:AsyncSession):
        user = await self.check_existing_email(email,db)
        if not user:
            raise ValueError("User not found")
        elif user.is_verified:
            raise ValueError("User is already verified")
        else:            
            to_encode = {"sub":str(user.id),"type":"email_verify"}
            token = create_token(to_encode,settings.EMAIL_VERIFY_TOKEN_EXPIRE_MINUTES)
            response = await mail_sender.send_email(email,subject= "Email Verification",
                       text = "Click on the below link to verify your email",
                       html = f"{settings.BASE_URL}/verify?token={token}"
                       )
            if response.status_code != 200:
                raise Exception(f"Error:{response.text}")
            return {"message":"Verification email sent"}
        
        
    async def update_user_verified(self, token: str, db: AsyncSession):
        data = decode_token(token)
        print(data)
        if data.get("type") != "email_verify":
            raise Exception("invalid token")

        user_id = int(data["sub"])
        user = await db.get(User, user_id)

        if not user:
            raise Exception("User not found")
        
        elif user.is_verified:
            raise Exception("User already verified")

        user.is_verified = True
        await db.commit()

        return {"message": "Email verified successfully!"}
    


    async def update_password(self, email:str, pwd:str, db:AsyncSession):
        user = await self.check_existing_email(email,db)
        if user:
            user.password_hash = hash_password(pwd)
            await db.commit()
            await db.refresh(user)
            return user

    async def select_all_users(self,db:AsyncSession):
        stmt = select(User)
        result = await db.execute(stmt)
        return result.scalars().all()
        
