from pydantic import BaseModel, EmailStr
from app.schemas.article import ArticleHome

class UserBase(BaseModel):
    email: EmailStr
    userid : str| None

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

class UserHome(BaseModel):
    user: UserBase
    is_verified: bool
    articles: list[ArticleHome]