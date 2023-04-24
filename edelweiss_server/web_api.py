"""import fast_API nedeed files"""
from fastapi import FastAPI, Depends

# import routers from endpoints
from src.client.endpoints import client_router
from src.user.endpoints import user_router
from src.auth.endpoints import auth_router

from helpers.auth_bearer import JWTBearer

app = FastAPI()
app.include_router(auth_router, tags=["Auth"], prefix='/auth')
app.include_router(client_router, tags=[
                   'Clients'], prefix='/clients', dependencies=[Depends(JWTBearer())])
app.include_router(user_router, tags=['User'], prefix='/user')


@ app.get("/")
def root():
    """Root function"""
    return {"message": "Hello World"}
