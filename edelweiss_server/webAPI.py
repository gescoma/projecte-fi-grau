"""import fast_API nedeed files"""
from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy.orm import Session
# from . import crud, models, schemas
from src.database import SessionLocal, engine

from src import schemas

from src.client import schema
from src import fake_info
from src.client.crud import get_clients, get_client

def get_user(email):
    for user in fake_info.fake_db_user:
        if user["email"] == email:
            return user
    return None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/user/login/")
def login(data: schemas.UserData):
    if data.bearer != "koUdVf6kazhwoOkjXh65CrDHwW4IYtkatZ3uFEOnob4=":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    user = get_user(data.email)
    if (user is None or user["email"] != data.email or user["password"] != data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    return user


"""
Clients crud functions
routes:

get:
/clients -> get all clients
/clients/:id -> get the client with id: id

post:
/clients -> create the client

"""

@app.get("/clients/")
def get_all_clients(db: Session = Depends(get_db)) -> list[schema.Client]:
    clients = get_clients(db = db)
    return clients

@app.get("/clients/{user_id}")
def get_client_by_id(user_id: int, db: Session = Depends(get_db)) -> schema.Client:
    client = get_client(db = db, client_id = user_id)
    if client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No existe el usuario",
        )
    return client
