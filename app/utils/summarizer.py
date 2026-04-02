from google import genai
from google.genai import types
from app.schemas.article import ArticleAIOutput

client = genai.Client()

def summarize_news(article_text) -> ArticleAIOutput:
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=f"Summarize this news article concisely in 2-4 sentences. Categorise it. Add 3 or lesser tags also related to the news content topic : {article_text}",
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ArticleAIOutput,
        ),
    )

    result = response.parsed
    return result