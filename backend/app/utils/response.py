from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Generic, Optional,TypeVar

from app.exceptions.types import ArticleParsingException

T = TypeVar("T")

class SuccessResponse(BaseModel, Generic[T]):
    message: str
    data: Optional[T] = None

def success_response(message: str, data: Optional[T] = None):
    return SuccessResponse(message=message, data = data)

def error_response(code :int, message: str):
    return JSONResponse(
        status_code= code,
        content= {
            "detail": message
        }
    )

def validate_required_fields(data: dict, required_fields: list[str]):
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        raise ArticleParsingException(
            f"Missing fields: {', '.join(missing_fields)}"
        )