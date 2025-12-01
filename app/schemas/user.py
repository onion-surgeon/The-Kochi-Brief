from pydantic import BaseModel, EmailStr


class UserAuth(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id:int
    email:EmailStr
    token:str

    
