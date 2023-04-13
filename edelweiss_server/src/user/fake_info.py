"""Fake info for testing purposes"""
from src.user.schema import UserDB

fake_db_user: list[UserDB] = [{
    "name": "Gerard Escolies",
    "image": "https://unavatar.io/gescoma",
    "password": "password",
    "role": "admin",
    "email": "gerard@edelweiss.com",
    "uid": "ff5d87a9-6ada-4248-9901-14d2d983b958"
},
    {
    "name": "Example user",
    "image": "https://unavatar.io/example",
    "password": "password",
    "role": "user",
    "email": "user@edelweiss.com",
    "uid": "ff5d87a9-6ada-4248-9901-14d2d983b958"
}]
