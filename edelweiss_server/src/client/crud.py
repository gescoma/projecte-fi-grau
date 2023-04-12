from sqlalchemy.orm import Session

from . import model, schema

def get_clients(db: Session, skip: int = 0, limit: int = 20):
    """Get all clients"""
    return db.query(model.Client).offset(skip).limit(limit).all()

def get_client(db: Session, client_id: int):
    """Get client with id == client_id"""
    return db.query(model.Client).filter(model.Client.dni_usuario == client_id).first()

def create_client(db: Session, client: schema.Client):
    """Create client"""
    db_client = model.Client(dni_usuario = client.dni_usuario, nacionalidad = client.nacionaliad, personaFisica = client.personaFisica)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client
