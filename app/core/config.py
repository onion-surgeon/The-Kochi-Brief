from datetime import timedelta
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Kochi Newsletter"
    BASE_URL:str
    DATABASE_URL: str
    #REDIS_URL: str
    MAILGUN_API_KEY: str
    MAILGUN_DOMAIN: str
    MAIL_FROM_NAME: str
    MAIL_FROM_ADDRESS: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: timedelta = timedelta(minutes=30)
    EMAIL_VERIFY_TOKEN_EXPIRE_MINUTES : timedelta = timedelta(minutes=10)
    EMAIL_VERIFY_COOLDOWN_MINUTES : timedelta = timedelta(minutes=10)

    class Config:
        env_file = ".env"

settings = Settings()
