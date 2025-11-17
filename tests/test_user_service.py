import pytest

from app.services.user_service import UserService
from app.models.user import UserCreate

def test_create_user():
    user_service = UserService()
    user = UserCreate(email="test@example.com")
    # TODO: Mock database and test user creation
    # created_user = user_service.create_user(user)
    # assert created_user.email == user.email
    pass
