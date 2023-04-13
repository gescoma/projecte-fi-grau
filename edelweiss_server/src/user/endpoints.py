from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from . import crud, schema

user_router = APIRouter()


@user_router.post("/login")
def login(data: schema.UserData):
    if data.bearer != "koUdVf6kazhwoOkjXh65CrDHwW4IYtkatZ3uFEOnob4=":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    user = crud.get_user(data.email)
    if (user is None or user["email"] != data.email or user["password"] != data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    return user
