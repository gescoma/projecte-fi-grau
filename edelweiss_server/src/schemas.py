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
