"""User endpoints."""
from fastapi import APIRouter

user_router = APIRouter()


@user_router.get("/")
def root():
    """Root function"""
    return {"message": "Hello World"}

# @user_router.post("/login")
# def login(data: UserData):
#     """Login function"""
#     if data.bearer != "koUdVf6kazhwoOkjXh65CrDHwW4IYtkatZ3uFEOnob4=":
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#         )
#     user = get_user(data.email)
#     if (user is None or user["email"] != data.email or user["password"] != data.password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#         )
#     return user
