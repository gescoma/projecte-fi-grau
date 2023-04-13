"""import fast_API nedeed files"""
from fastapi import FastAPI, HTTPException, status, Depends

# from . import crud, models, schemas
from src.database import SessionLocal, engine, get_db

from src import schemas

from src.client.endpoints import client_router
from src.user.endpoints import user_router

app = FastAPI()
app.include_router(client_router, tags=['Clients'], prefix='/clients')
app.include_router(user_router, tags=['User'], prefix='/user')

@app.get("/")
def root():
    return {"message": "Hello World"}
