from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False, autoflush=False, autocommit=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            #await session.commit()
        except:
            #await session.rollback()
            raise
