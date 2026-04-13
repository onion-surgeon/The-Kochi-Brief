from datetime import datetime, timezone

from sqlalchemy import Date, func, or_, select, update

from app.models.article import Article, Status
from app.models.user import User
from app.mail.sender import MailSender
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.time_utils import format_ist

class NewsletterService:

    def __init__(self, mail_sender: MailSender):
        self.mail_sender = mail_sender 

    async def send_daily_digest(self, db: AsyncSession, today: datetime):
        users = await self.get_unsent_mail_users(db,today)
        articles = await self.get_unsent_articles(db)

        if not articles:
            return

        html, text = self.build_digest_email(articles)
        
        subject = "Kochi Brief Daily Digest"

        for user in users:
            await self.mail_sender.send_email(
                to=user.email,
                subject=subject,
                text=text,
                html=html
            )

        await self.mark_articles_sent(db, [article.id for article in articles])
        await self.mark_users_last_sent(db, [user.id for user in users])

    async def get_unsent_mail_users(self,db,today) -> list[User]:
        print("insdie unsetmailusers")
        query = select(User).where(
            User.is_verified == True, 
            User.is_subscribed == True,
            or_(
                User.last_article_sent_at == None,
                User.last_article_sent_at < today
            )
         )
        result = await db.execute(query)
        print("done")
        return result.scalars().all()
    
    async def get_unsent_articles(self,db) -> list[Article]:
        query = select(Article).where(
            Article.status == Status.SUMMARISED, 
            Article.is_distributed == False
                ) 
            
        result = await db.execute(query)
        return result.scalars().all()

    async def mark_articles_sent(self,db: AsyncSession, article_ids: list[int]):
        if not article_ids:
            return

        stmt = (
            update(Article)
            .where(Article.id.in_(article_ids))
            .values(
                is_distributed=True,
                distributed_at=datetime.now(timezone.utc)
            )
        )

        await db.execute(stmt)
        await db.commit()


    async def mark_users_last_sent(self,db: AsyncSession, user_ids: list[int]):
        if not user_ids:
            return

        stmt = (
            update(User)
            .where(User.id.in_(user_ids))
            .values(
                last_article_sent_at=datetime.now(timezone.utc)
            )
        )

        await db.execute(stmt)
        await db.commit()

    def build_digest_email(self, articles: list[Article]) -> tuple[str, str]:
        html_parts = []
        text_parts = []

        for article in articles:
            html_parts.append(f"""
                <h3>{article.title}</h3>
                <p><strong>Published: </strong>{format_ist(article.created_at)}</p>
                <p>{article.summary}</p>
                <p><a href="{article.url}" target="_blank">Read more →</a></p>
                <hr>
            """)

            text_parts.append(
                f"{article.title}\n"
                f"Published: {format_ist(article.created_at)}\n"
                f"{article.summary}\n"
                f"Read more: {article.url}\n"
                f"{'-'*40}"
            )

        html = f"""
            <h2>📰 Kochi Brief</h2>
            <p>Today's top stories:</p>
            {''.join(html_parts)}
        """

        text = "\n\n".join(text_parts)

        return html, text