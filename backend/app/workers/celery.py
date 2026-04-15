from celery import Celery
from celery.schedules import crontab

from app.core.config import settings

celery_app = Celery(
    "kochi-newsletter",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["app.workers.tasks"],
)

celery_app.conf.beat_schedule = {
    "night-scrape-summarize": {
        "task": "app.workers.tasks.run_scrape_summarise_mail_pipeline",
        "schedule": crontab(hour=17, minute=30),
    },
}
