"""Auth endpoints."""
from fastapi import APIRouter, HTTPException, status, Depends
from helpers.auth_handler import signJWT
from src.schemas import UserDB, UserData, UserJWT
from helpers.users import get_session_id
from .crud import get_user, get_user_by_id

auth_router = APIRouter()


@auth_router.post("/login")
def login(data: UserData):
    """Login function"""
    if data.bearer != "koUdVf6kazhwoOkjXh65CrDHwW4IYtkatZ3uFEOnob4=":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    user: UserDB = get_user(data.email)
    if (user is None or user["email"] != data.email or user["password"] != data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    bearer = signJWT(user["uid"], user["role"])
    return UserDB(
        name=user["name"],
        image=user["image"],
        password=user["password"],
        role=user["role"] or "standard",
        email=user["email"],
        uid=user["uid"],
        client_id=bearer["access_token"]
    )


@auth_router.post("/signup")
def create_user(data: UserDB):
    return signJWT(data.uid, data.role)


@auth_router.get("/me")
def me(user_id: str = Depends(get_session_id)):
    """Me function"""
    return get_user_by_id(user_id)
