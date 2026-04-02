import asyncio
import httpx
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
from app.exceptions.types import URLError
from app.schemas.article import ArticleScraped

SITEMAP_URL = "https://www.newindianexpress.com/news_sitemap.xml"

HEADERS = {
    "User-Agent": "Kochi Brief"
}



async def fetch_url(client, url):
    response = await client.get(url, headers=HEADERS, timeout=10)
    response.raise_for_status()
    return response.text



def parse_sitemap(xml_data, target_date):
    root = ET.fromstring(xml_data)

    ns = {
        "s": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "news": "http://www.google.com/schemas/sitemap-news/0.9"
    }

    #today = datetime.utcnow().date()  

    urls = []

    for url_elem in root.findall("s:url", ns):

        loc_elem = url_elem.find("s:loc", ns)

        pub_date_elem = url_elem.find("news:news/news:publication_date", ns)

        if loc_elem is None or pub_date_elem is None:
            continue

        try:
            pub_date = datetime.fromisoformat(pub_date_elem.text.replace("Z", "+00:00")).date()
        except Exception:
            continue

        if pub_date == target_date:
            urls.append(loc_elem.text)

    return urls


def filter_kochi_urls(urls):
    return [url for url in urls if "/cities/kochi/" in url]


def extract_newsarticle_json(html):
    soup = BeautifulSoup(html, "html.parser")

    scripts = soup.find_all("script", type="application/ld+json")

    for script in scripts:
        if not script.string:
            continue

        try:
            data = json.loads(script.string)
        except Exception:
            continue

        if isinstance(data, dict):
            if data.get("@type") == "NewsArticle":
                return data

        elif isinstance(data, list):
            for item in data:
                if isinstance(item, dict) and item.get("@type") == "NewsArticle":
                    return item

    return None

def extract_fields(news_json):
    datep = news_json.get("datePublished")
    published_dt = datetime.fromisoformat(datep.replace("Z", "+00:00"))
    
    try:
        result = ArticleScraped(
        headline =  news_json.get("headline"),
        content =  news_json.get("articleBody"),
        url = news_json.get("url"),
        published = published_dt,
        source =  "NewIndian"        
    )
    
    except Exception:
        return
    return result

async def scrape_newindian(target_date):
    async with httpx.AsyncClient(headers=HEADERS, timeout=10) as client:
        try:
            xml_data = await fetch_url(client, SITEMAP_URL)
        except Exception as e:
            raise URLError(url, e)            

        urls = parse_sitemap(xml_data, target_date)

        kochi_urls = filter_kochi_urls(urls)

        results = []

        for url in kochi_urls:
            
            try:
                html = await fetch_url(client, url)
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
