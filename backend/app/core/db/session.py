from contextlib import asynccontextmanager

from sqlalchemy import NullPool
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=True, pool_pre_ping=True)

engine_celery = create_async_engine(DATABASE_URL, echo=True, pool_pre_ping=True, poolclass=NullPool)

AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False, autoflush=False, autocommit=False
)

AsyncSessionLocalCelery = async_sessionmaker(
    engine_celery, expire_on_commit=False, autoflush=False, autocommit=False
)


async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            #await session.commit()
        except:
            #await session.rollback()
            raise

@asynccontextmanager
async def get_async_session():
    async with AsyncSessionLocalCelery() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()