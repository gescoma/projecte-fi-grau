"""pydantic to create types for tables"""
from pydantic import BaseModel


class Campain(BaseModel):
    """pydantic to create types for tables"""
    id: int
    year: str
    documento: str
    tipoCampain: str
    responsable: str
    cliente: str

    class Config:
        """pydantic to create types for tables"""
        orm_mode = True
    # cliente: Client


class UserDB(BaseModel):
    """user db model"""
    name: str
    image: str
    password: str
    role: str
    email: str
    uid: str
    client_id: str


class UserData(BaseModel):
    """user data model"""
    email: str
    password: str
    csrfToken: str
    callbackUrl: str
    bearer: str


class UserJWT(BaseModel):
    """user jwt model"""
    user_id: str
    user_role: str
