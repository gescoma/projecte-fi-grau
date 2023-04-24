from fastapi import Depends

from src.schemas import UserJWT

from helpers.auth_bearer import decodeJWT

from helpers.auth_bearer import JWTBearer


def get_current_active_user(token: str = Depends(JWTBearer())) -> UserJWT:
    return decodeJWT(token)


def get_session_id(token: str = Depends(JWTBearer())) -> str:
    return decodeJWT(token)["user_id"]
