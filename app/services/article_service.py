import asyncio
from datetime import datetime

from sqlalchemy import select
from app.models.article import Article, Status
from app.schemas.article import ArticleAIOutput, ArticleScraped, ProcessResult
from app.scrapers import newindian_scraper, toi_scraper
from app.utils.summarizer import summarize_news
from sqlalchemy.ext.asyncio import AsyncSession
from aiolimiter import AsyncLimiter



class ArticleService:
    def __init__(self):
        self.limiter = AsyncLimiter(15, 60)

    async def scrape_articles(self, date: datetime):
        tasks = [
            toi_scraper.scrape_toi(date),
            newindian_scraper.scrape_newindian(date)
        ]

        results = await asyncio.gather(*tasks, return_exceptions=True)

        articles = []

        for result in results:
            if isinstance(result, Exception):
                continue

            articles.extend(result or [])

        return articles
    
    async def store_articles(self, db: AsyncSession, articles: list[ArticleScraped]):
        if not articles:
            return

        for article in articles:
            try:
                db_article = Article(
                    title=article.headline,
                    content=article.content,
                    url=article.url,
                    created_at=article.published,
                    source=article.source,
                    status = Status.SCRAPED
                )
            
                existing = await db.execute(
                    select(Article).where(Article.url == article.url)
                        )

                if existing.scalar():
                    continue
                
                db.add(db_article)

            except Exception as e:
                continue

        try:
            await db.commit()
        except Exception as e:
            await db.rollback()


    async def summarize_store_articles(self, db: AsyncSession):
        articles = await self.get_articles_by_status(db, Status.SCRAPED)

        if not articles:
            return []
        
        for article in articles:
            article.status = Status.PROCESSING

        await db.commit()

        results = await asyncio.gather(
            *(self.process_article(article) for article in articles),return_exceptions=True
        )

        self.apply_results_to_articles(articles, results)

        await db.commit()      

        return articles
    def get_articles(self):
        # TODO: Implement logic to get articles
        return []

    def get_article(self, article_id: int):
        # TODO: Implement logic to get a single article
        return None

    def approve_article(self, article_id: int):
        # TODO: Implement logic to approve an article
        pass

    async def get_articles_by_status(self, db: AsyncSession, status: Status):
        result = await db.execute(
            select(Article).where(Article.status == status)
        )
        return result.scalars().all()

    async def summarize_with_limit(self, content: str) -> ArticleAIOutput:
        
        async with self.limiter:
            return summarize_news(content)
    
    async def process_article(self, article: Article) -> ProcessResult:
        try:
            if not article.content:
                return ProcessResult(
                    id = article.id,
                    status = Status.FAILED
                )

            aioutput = await self.summarize_with_limit(article.content)

            return ProcessResult(
                id= article.id,
                status= Status.SUMMARISED,
                output= aioutput
            )

        except Exception:
            return ProcessResult(
                id= article.id,
                status= Status.FAILED
            )
        
    def apply_results_to_articles(self, articles: list[Article], results: list[ProcessResult]):
        for article_obj, result in zip(articles, results):
            if isinstance(result, Exception):
                article_obj.status = Status.FAILED
                continue
             
            article_obj.status = result.status

            if result.status == Status.SUMMARISED:
                article_obj.summary = result.output.summary
                article_obj.category = result.output.category
                article_obj.tags = result.output.tags
        #return None



       
    