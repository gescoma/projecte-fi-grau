from typing import Dict

import jwt
from decouple import config

from src.schemas import UserJWT

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")


def token_response(token: str):
    return {
        "access_token": token
    }


def signJWT(user_id: str, role: str) -> Dict[str, str]:
    payload: UserJWT = {
        "user_id": user_id,
        "user_role": role,
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def decodeJWT(token: str) -> UserJWT:
    try:
        decoded_token = jwt.decode(
            token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["user_id"] and decoded_token["user_role"] else None
    except jwt.ExpiredSignatureError:
        return {}
