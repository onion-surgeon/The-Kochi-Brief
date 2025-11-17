from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Kochi Newsletter"
    DATABASE_URL: str
    REDIS_URL: str
    MAILGUN_API_KEY: str
    MAILGUN_DOMAIN: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
