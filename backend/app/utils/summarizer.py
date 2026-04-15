from google import genai
from google.genai import types
from app.schemas.article import ArticleAIOutput


from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from google.api_core import exceptions

client = genai.Client()

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((exceptions.InternalServerError, exceptions.ResourceExhausted))
)
async def summarize_news(article_text) -> ArticleAIOutput:
    response = await client.aio.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=f"Summarize this news article concisely in 2-4 sentences. Categorise it. Add 3 or lesser tags also related to the news content topic : {article_text}",
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ArticleAIOutput,
        ),
    )

    result = response.parsed
    return result