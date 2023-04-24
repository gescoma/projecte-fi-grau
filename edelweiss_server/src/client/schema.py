"""pydantic to create types for tables"""
from pydantic import BaseModel


class Client(BaseModel):
    """Client model"""
    dni_usuario: int
    nacionaliad: str
    personaFisica: bool

    class Config:
        """pydantic to create types for tables"""
        orm_mode = True
    # campains: list[Campain]
