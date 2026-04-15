from fastapi import APIRouter

from . import auth, users, articles, admin

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(articles.router, prefix="/articles", tags=["articles"])
router.include_router(admin.router, prefix="/admin", tags=["admin"])
