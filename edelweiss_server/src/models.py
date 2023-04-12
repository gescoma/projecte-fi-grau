"""modules to use sql types"""
from sqlalchemy import Column, ForeignKey, Integer, String, Date, Boolean
# from sqlalchemy.orm import relationship

from .database import Base

class Client(Base):
    __tablename__ = "cliente"

    dni_usuario = Column(Integer, primary_key=True, index=True)
    nacionalidad = Column(String)
    personaFisica = Column(Boolean)

    # campains = relationship("Campain", back_populates="client")


class Campain(Base):
    __tablename__ = "campain"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Date)
    documento = Column(String)
    tipoCampain = Column(String)
    responsable = Column(String)
    cliente = Column(String)

    # cliente = relationship("User", back_populates="campains")
