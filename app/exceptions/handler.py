from fastapi import Request
from app.utils.response import error_response

async def user_already_acted_handler(request: Request, exc: Exception):
    return error_response(409, exc.args[0])

async def user_not_found_handler(requst: Request, exc: Exception):
    return error_response(404, exc.args[0])

async def incorrect_credentials_handler(request: Request, exc: Exception):
    return error_response(401, exc.args[0])

async def external_api_handler(request: Request, exc: Exception):
    return error_response(502, exc.args[0])

async def cooldown_handler(request: Request, exc: Exception):
    return error_response(429, exc.args[0])

async def token_exception(request: Request, exc: Exception):
    return error_response(422, exc.args[0])

