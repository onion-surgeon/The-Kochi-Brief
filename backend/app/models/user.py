from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.db.base import Base


class User(Base):
    __tablename__ = "users"


    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )

    email: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=False, index=True
    )

    password_hash: Mapped[str] = mapped_column(
        String(255), nullable=False
    )

    username: Mapped[str] = mapped_column(
        String(100), nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean, default=False
    )

    is_subscribed: Mapped[bool] = mapped_column(
        Boolean, default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    email_verification_sent_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    last_article_sent_at : Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        index= True
    )