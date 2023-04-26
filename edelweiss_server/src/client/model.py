"""modules to use sql types"""
from sqlalchemy import Column, Integer, String, Boolean
# from sqlalchemy.orm import relationship

from ..database import Base


class Client(Base):
    """Client model"""
    __tablename__ = "cliente"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    apellido1 = Column(String)
    apellido2 = Column(String)
    correo = Column(String)
    nacionalidad = Column(String)
    personaFisica = Column(Boolean)
