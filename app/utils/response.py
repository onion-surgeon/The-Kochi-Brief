from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Generic, Optional,TypeVar

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

