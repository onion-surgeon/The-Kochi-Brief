from datetime import datetime
from pydantic import BaseModel, Field
from app.models.article import Category, Status

class ArticleAIOutput(BaseModel):
    summary: str
    category: Category 
    tags: list[str] = Field(max_items = 3)

class ArticleScraped(BaseModel):
    headline: str
    content: str
    url: str
    published: datetime
    source: str

class ProcessResult(BaseModel):
    id: int
    status: Status
    output: ArticleAIOutput | None

class ArticleHome(BaseModel):
    title: str
    source: str
    url: str
    published:datetime