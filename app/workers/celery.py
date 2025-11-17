from celery import Celery

from app.core.config import settings

celery_app = Celery(
    "kochi-newsletter",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["app.workers.tasks"],
)

celery_app.conf.beat_schedule = {
    "ingest-every-30-minutes": {
        "task": "app.workers.tasks.ingest_sources",
        "schedule": 1800.0,  # 30 minutes
    },
    "send-newsletter-weekly": {
        "task": "app.workers.tasks.send_newsletter",
        "schedule": 604800.0,  # 7 days
    },
}
