from typing import Annotated
from fastapi import Depends, Cookie
from sqlalchemy.orm import Session

from .database import get_db


def get_current_active_user():
    """function to get current active user"""
    user = get_current_user()
    return None


def get_current_user(next_auth_csrf_token: Annotated[str | None, Cookie()] = None):
    """function to get current user"""
    print(next_auth_csrf_token)
    # user = get_user(username)
    return None


def get_user(username: str, db: Session = Depends(get_db)):
    """function to get user"""
    print(username)
    return
