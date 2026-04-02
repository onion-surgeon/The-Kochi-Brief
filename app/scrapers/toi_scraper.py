import asyncio
from datetime import datetime
import httpx, requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import json
import time
from app.schemas.article import ArticleScraped
from app.exceptions.types import URLError, ArticleParsingException
from app.utils.response import validate_required_fields 

SITEMAP_URL = "https://timesofindia.indiatimes.com/staticsitemap/toi/news/sitemap-today-1.xml"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; NewsScraper/1.0)"
}


async def fetch_url(client, url):
    response = await client.get(url)   
    response.raise_for_status()
    return response.text


def parse_sitemap(xml_data):
    root = ET.fromstring(xml_data)

    ns = {
        "s": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "news": "http://www.google.com/schemas/sitemap-news/0.9"
    }

    urls = []

    for url_elem in root.findall("s:url", ns):
        loc_elem = url_elem.find("s:loc", ns)
        news_elem = url_elem.find("news:news", ns)

        if loc_elem is None:
            continue

        pub_date_text = None

        if news_elem is not None:
            pub_date_elem = news_elem.find("news:publication_date", ns)
            if pub_date_elem is not None:
                pub_date_text = pub_date_elem.text

        urls.append({
            "url": loc_elem.text,
            "pub_date": pub_date_text
        })

    return urls


def filter_kochi_urls(urls, target_date):
    filtered = []

    for item in urls:
        url = item["url"]

        try:
            pub_date_str = item.get("pub_date")

        except Exception as e:
            raise ArticleParsingException("pub_date")
    
        if "/city/kochi/" not in url:
            continue

        if not pub_date_str:
            continue

        try:
            pub_dt = datetime.fromisoformat(pub_date_str.replace("Z", "+00:00"))
        except Exception:
            continue

        if pub_dt.date() == target_date:
            filtered.append(url)

    return filtered


# async def fetch_article(client, url):
#     try:
#         response = await client.get(url, headers=HEADERS, timeout=10)
#         response.raise_for_status()
#         return response.text
#     except Exception as e:
#         return None


def extract_newsarticle_json(html):
    soup = BeautifulSoup(html, "lxml")
    scripts = soup.find_all("script", type="application/ld+json")

    for script in scripts:
        try:
            data = json.loads(script.string)
        except Exception:
            continue

        if isinstance(data, dict):
            if data.get("@type") == "NewsArticle":
                return data

        elif isinstance(data, list):
            for item in data:
                if item.get("@type") == "NewsArticle":
                    return item

    return None


def extract_fields(news_json):
    try:
        data = ArticleScraped(
        headline =  news_json.get("headline"),
        content =  news_json.get("articleBody"),
        url =  news_json.get("url"),
        published = news_json.get("datePublished"),
        source = "TimesOfIndia"
    )
    except Exception:
        return

    return data


async def scrape_toi(targetdate):
    async with httpx.AsyncClient(headers=HEADERS, timeout=10) as client:
        try:
            xml_data = await fetch_url(client, SITEMAP_URL)
        except Exception as e:
            raise URLError(url, e)
        
        all_urls = parse_sitemap(xml_data)

        kochi_urls = filter_kochi_urls(all_urls,targetdate)

        results = []

        for url in kochi_urls:

            try:
                html = await fetch_url(url)
            
            except Exception as e:
                #raise URLError(url, e)
                continue

            if not html:
                continue

            news_json = extract_newsarticle_json(html)
            if not news_json:
                continue

            article_data = extract_fields(news_json)
            results.append(article_data)

            await asyncio.sleep(3) 

    return results
