from datetime import datetime, timedelta, timezone
from typing import Any
from jose import jwt

from app.core.config import settings

secret = settings.SECRET_KEY
algorithm = settings.ALGORITHM
expiry_time = settings.ACCESS_TOKEN_EXPIRE_MINUTES

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=expiry_time)
    
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, secret, algorithm)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, secret, algorithm)
        return payload
    except jwt.JWTError:
        return None