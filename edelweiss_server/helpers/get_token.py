import typing as t

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette import status

get_bearer_token = HTTPBearer(auto_error=True)

# get token from header on fastapi


def get_token(auth: t.Optional[HTTPAuthorizationCredentials] = Depends(get_bearer_token)) -> str:
    if auth is None or (token := auth.credentials) is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )
    return token
