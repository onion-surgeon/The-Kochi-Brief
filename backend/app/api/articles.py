from fastapi import APIRouter, Depends
from typing import List

from app.models.article import ArticleDB
from app.services.article_service import ArticleService

router = APIRouter()

@router.get("/", response_model=List[ArticleDB])
async def read_articles(article_service: ArticleService = Depends()):
    # TODO: Implement logic to get articles
    return []

@router.get("/{article_id}", response_model=ArticleDB)
async def read_article(article_id: int, article_service: ArticleService = Depends()):
    # TODO: Implement logic to get a single article
    return {}
