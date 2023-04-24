import logging

from fastapi import HTTPException, Depends

from src.schemas import UserJWT

from helpers.users import get_current_active_user

logger = logging.getLogger("Has Access")


class has_access:
    def __init__(self, allowed_roles: list):
        self.allowed_roles = allowed_roles

    def __call__(self, user: UserJWT = Depends(get_current_active_user)):
        if not user or user["user_role"] not in self.allowed_roles:
            logger.debug(
                "User with role %(user.role) not in %(self.allowed_roles)")
            raise HTTPException(
                status_code=403, detail="Operation not permitted")
