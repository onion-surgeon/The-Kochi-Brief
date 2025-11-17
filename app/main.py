from fastapi import FastAPI

app = FastAPI(
    title="Kochi Newsletter",
    description="A local-news aggregator and newsletter for Kochi, India.",
    version="0.1.0",
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Kochi Newsletter API"}
