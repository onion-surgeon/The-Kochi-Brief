from fastapi import FastAPI
import app.exceptions.types as exc 
import app.exceptions.handler as handler
from app.api.users import user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Kochi Newsletter",
    description="A local-news aggregator and newsletter for Kochi, India.",
    version="0.1.0",
)

app.add_exception_handler(exc.UserAlreadyActed, handler.user_already_acted_handler)
app.add_exception_handler(exc.UserNotFound, handler.user_not_found_handler)
app.add_exception_handler(exc.IncorrectCredentials, handler.incorrect_credentials_handler)
app.add_exception_handler(exc.APIException, handler.external_api_handler)
app.add_exception_handler(exc.CooldownException, handler.cooldown_handler)
app.add_exception_handler(exc.TokenException, handler.token_exception)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Kochi Newsletter API"}

app.include_router(
    user_router,
    prefix = "/api",
    tags = ["Users"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)