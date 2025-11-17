from .celery import celery_app

@celery_app.task
def ingest_sources():
    # TODO: Implement source ingestion logic
    print("Ingesting sources...")

@celery_app.task
def send_newsletter():
    # TODO: Implement newsletter sending logic
    print("Sending newsletter...")
