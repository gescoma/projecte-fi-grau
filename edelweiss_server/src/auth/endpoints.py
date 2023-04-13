from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from src.user import crud, schema

from edelweiss_server.src.auth.schema import Token


auth = APIRouter()


@auth.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@auth.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


# @auth.get("/users/me/items/")
# async def read_own_items(current_user: User = Depends(get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]


# @auth.post("/users/", response_model=User)
# async def sign_up(user: UserIn):
#     hashed_password = get_password_hash(user.password)
#     query = users.insert().values(
#         username=user.username, hashed_password=hashed_password
#     )
#     last_record_id = await database.execute(query)
#     return {"username": user.username, "id": last_record_id}
