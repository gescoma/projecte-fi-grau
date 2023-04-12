"""pydantic to create types for tables"""
from pydantic import BaseModel


class Campain(BaseModel):
    id: int
    year: str
    documento: str
    tipoCampain: str
    responsable: str
    cliente: str

    class Config:
        orm_mode = True
    # cliente: Client

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