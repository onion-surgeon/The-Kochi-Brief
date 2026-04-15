from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(pwd: str):
    return pwd_context.hash(pwd)

def verify_password(pwd: str, hashed: str):
    return pwd_context.verify(pwd, hashed)
