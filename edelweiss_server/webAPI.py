"""import fastAPI nedeed files"""
from fastapi import FastAPI, HTTPException, status
from .src import schemas
from src import fake_info

def get_user(email):
    for user in fake_info.fake_db_user:
        if user["email"] == email:
            return user
    return None

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/user/login/")
async def login(data: schemas.UserData):
    if (data.bearer != "koUdVf6kazhwoOkjXh65CrDHwW4IYtkatZ3uFEOnob4="):
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

