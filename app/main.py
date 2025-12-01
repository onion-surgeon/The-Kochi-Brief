from fastapi import FastAPI
from app.api.users import user_router

app = FastAPI(
    title="Kochi Newsletter",
    description="A local-news aggregator and newsletter for Kochi, India.",
    version="0.1.0",
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Kochi Newsletter API"}

app.include_router(
    user_router,
    prefix = "/api",
    tags = ["Users"]
)