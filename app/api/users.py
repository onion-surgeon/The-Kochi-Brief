from fastapi import APIRouter, Depends

from app.models.user import UserDB
from app.services.user_service import UserService

router = APIRouter()

@router.delete("/account")
async def delete_account(user_service: UserService = Depends()):
    # TODO: Implement account deletion logic
    return {"message": "Account deleted successfully."}
