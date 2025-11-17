from fastapi import APIRouter, Depends

from app.services.article_service import ArticleService

router = APIRouter()

@router.get("/queue")
async def get_content_queue(article_service: ArticleService = Depends()):
    # TODO: Implement logic to get the content queue
    return []

@router.post("/approve/{article_id}")
async def approve_content(article_id: int, article_service: ArticleService = Depends()):
    # TODO: Implement logic to approve content
    return {"message": f"Article {article_id} approved."}

@router.post("/webhook/source")
async def source_webhook():
    # TODO: Implement webhook logic for a source
    return {"message": "Webhook received."}
