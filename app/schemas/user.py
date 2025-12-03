from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr

class UserAuth(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id:int
    type:str
    email:EmailStr
    token:str

class UserToken(BaseModel):
    email:EmailStr
    token:str    
