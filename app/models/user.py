from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr

class UserDB(BaseModel):
    id: int
    email: EmailStr
    is_verified: bool
    created_at: datetime
