from pydantic import BaseModel, HttpUrl, Field
from datetime import datetime

class ArticleCreate(BaseModel):
    title: str
    url: HttpUrl
    source: str
    published_at: datetime | None = None
    summary: str | None = None
    content: str | None = None
    tags: list[str] = Field(default_factory=list)

class ArticleDB(ArticleCreate):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
