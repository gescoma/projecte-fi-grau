"""User CRUD operations."""
from src.fake_info import fake_db_user


def get_user(email):
    for user in fake_db_user:
        if user["email"] == email:
            return user
    return None
