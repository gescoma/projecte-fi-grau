"""User CRUD operations."""
from src.schemas import UserDB
from src.fake_info import fake_db_user


def get_user(email) -> UserDB:
    for user in fake_db_user:
        if user["email"] == email:
            return user
    return None


def get_user_by_id(id) -> UserDB:
    for user in fake_db_user:
        if user["uid"] == id:
            return user
    return None
