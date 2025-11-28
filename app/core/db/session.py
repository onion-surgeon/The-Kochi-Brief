from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import os

from dotenv import load_dotenv
load_dotenv() 

DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL not set in environment")


engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False, autoflush=False, autocommit=False
)
