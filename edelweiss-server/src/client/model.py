"""modules to use sql types"""
from sqlalchemy import Column, Integer, String, Boolean
# from sqlalchemy.orm import relationship

from ..database import Base

class Client(Base):
    __tablename__ = "cliente"

    dni_usuario = Column(Integer, primary_key=True, index=True)
    nacionalidad = Column(String)
    personaFisica = Column(Boolean)
