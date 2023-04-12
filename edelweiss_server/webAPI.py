"""import fast_API nedeed files"""
from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy.orm import Session
# from . import crud, models, schemas
from src.database import SessionLocal, engine

from src import schemas

from src.client import schema
from src import fake_info
from src.client.crud import get_clients

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
async def root():
    return {"message": "Hello World"}

@app.post("/user/login/")
async def login(data: schemas.UserData):
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

@app.get("/clients", response_model=list[schema.Client])
def get_all_clients(db: Session = Depends(get_db)):
    clients = get_clients(db = db)
