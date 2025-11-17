import requests

from app.core.config import settings

class MailSender:
    def __init__(self):
        self.api_key = settings.MAILGUN_API_KEY
        self.domain = settings.MAILGUN_DOMAIN

    def send_email(self, to: str, subject: str, html: str):
        return requests.post(
            f"https://api.mailgun.net/v3/{self.domain}/messages",
            auth=("api", self.api_key),
            data={
                "from": f"Kochi Newsletter <mailgun@{self.domain}>",
                "to": [to],
                "subject": subject,
                "html": html,
            },
        )
