"""pydantic to create types for tables"""
from pydantic import BaseModel

class UserData(BaseModel):
    email: str
    password: str
    csrfToken: str
    callbackUrl: str
    bearer: str

class UserDB(BaseModel):
    name: str
    avatar: str
    password: str
    role: str
    email: str
    uid: str
