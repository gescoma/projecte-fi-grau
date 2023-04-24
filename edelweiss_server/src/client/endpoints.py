from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.client.crud import get_clients, get_client

from helpers.has_access import has_access

client_router = APIRouter()


@client_router.get("/")
def get_all_clients(db: Session = Depends(get_db), _=Depends(has_access("admin"))):
    """Get all clients"""
    clients = get_clients(db=db)
    return clients


@client_router.post("/")
def create_new_client(db: Session = Depends(get_db)):
    """Create new client"""
    return db


@client_router.get("/{user_id}")
def get_client_by_id(user_id: int, db: Session = Depends(get_db)):
    """Get client by id"""

    client = get_client(db=db, client_id=user_id)
    if client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No existe el usuario",
        )
    return client
