import asyncio
from datetime import datetime, timedelta, timezone

from app.mail.sender import MailSender

from .celery import celery_app
from app.services.article_service import ArticleService
from app.services.newsletter_service import NewsletterService
from app.utils.celery_runner import run_async_with_db


@celery_app.task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_kwargs={"max_retries": 3},
)
def scraper_orchestrator_task(self):
    articleservice = ArticleService()
    today_date = datetime.now().date()
    try:
        run_async_with_db(articleservice.scrape_and_store,today_date)
    except Exception as e:
        raise self.retry(exc=e)

@celery_app.task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_kwargs={"max_retries": 1},
)
def summarizer_orchestrator_task(self):
    articleservice = ArticleService()
    try:
        run_async_with_db(articleservice.summarize_store_articles)
    except Exception as e:
        raise self.retry(exc=e)
    
@celery_app.task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_kwargs={"max_retries": 1},
)
def run_mail_sender_task(self):
    mail_sender = MailSender()
    newsletter_service = NewsletterService(mail_sender)
    now = datetime.now(timezone.utc)
    start_of_today = now.replace(
    hour=0, minute=0, second=0, microsecond=0
)
    try:
        run_async_with_db(newsletter_service.send_daily_digest,start_of_today)
    except Exception as e:
        print(repr(e))
   
