from datetime import date

from fastapi import APIRouter, Depends


from app.services.article_service import ArticleService
from app.core.db.session import get_db
from app.schemas.article import ArticleHome
from app.utils.response import SuccessResponse, success_response
from app.core.security.dependency import get_current_user


article_router = APIRouter()

article_service = ArticleService()

@article_router.get("/{day}", response_model=SuccessResponse[list[ArticleHome]], status_code=200)
async def get_articles_by_date(day: date, db=Depends(get_db), curr_user=Depends(get_current_user)):
    articles = await article_service.get_news_on_day(db, day)
    return success_response(message="Articles retrieved successfully", data=articles)

