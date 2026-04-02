from datetime import datetime
from app.core.db.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, JSON, DateTime, Boolean, Text, Enum as SQENUM, func
from enum import Enum

class Category(str, Enum):
    TECH = "tech"
    SPORTS = "sports"
    HEALTH = "health"
    ENTERTAINMENT = "entertainment"
    ART = "art"
    PUBLIC = "public"

class Status(str, Enum):
    SCRAPED = "scraped"
    SUMMARISED = "summarised"
    FAILED = "failed"
    PROCESSING = "processing"

class Article(Base):
    __tablename__ = "articles"
    
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )

    source: Mapped[str] = mapped_column(
        String(100), index = True, nullable= False
    )

    title: Mapped[str] = mapped_column(
        String(255), nullable=False, index=True
    )

    url: Mapped[str] = mapped_column(
        String(2048), nullable=False, unique=True
    )

    summary: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )

    content: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )

    tags: Mapped[list[str]] = mapped_column(
        JSON, default=list
    )

    category: Mapped[Category] = mapped_column(
        SQENUM(Category), nullable=True
    )

    status: Mapped[Status] = mapped_column(
        SQENUM(Status), nullable=False
    )

    is_distributed: Mapped[bool] = mapped_column(
        Boolean, default=False
    )

    distributed_at: Mapped[datetime | None] = mapped_column(
        DateTime, nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )
