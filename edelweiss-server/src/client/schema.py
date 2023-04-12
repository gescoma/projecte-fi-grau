"""pydantic to create types for tables"""
from pydantic import BaseModel

class Client(BaseModel):
    dni_usuario: int
    nacionaliad: str
    personaFisica: bool

    class Config:
        orm_mode = True
    # campains: list[Campain]