from sqlalchemy import select
from app.schemas.user import UserAuth
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user import UserAuth
from app.core.security.hashing import hash_password, verify_password
from app.core.security.jwt import create_access_token

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
            to_encode = {"sub": str(req_user.id)}
            token = create_access_token(to_encode)
            return {"id":req_user.id,
                    "email":req_user.email,
                    "token":token}
        raise ValueError("Incorrect Email or password")  

        
    
    async def check_existing_email(self, email:str, db:AsyncSession):
        stmt = select(User).where(User.email == email)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def update_password(self, email:str, pwd:str, db:AsyncSession):
        user = await self.check_existing_email(email,db)
        if user:
            user.password_hash = pwd
            await db.commit()
            await db.refresh(user)
            return user
        
