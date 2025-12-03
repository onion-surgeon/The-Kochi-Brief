import httpx

from app.core.config import settings

class MailSender:
    def __init__(self):
        self.api_key = settings.MAILGUN_API_KEY
        self.domain = settings.MAILGUN_DOMAIN

    async def send_email(self, to: str, subject: str, text:str, html: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
            f"https://api.mailgun.net/v3/{self.domain}/messages",
            auth=("api", self.api_key),
            data={
                "from": f"Kochi Newsletter <mailgun@{self.domain}>",
                "to": [to],
                "subject": subject,
                "text": text,
                "html": html,
            },
        )
        return response
