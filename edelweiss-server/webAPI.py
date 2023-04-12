from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

class UserData(BaseModel):
    email: str
    password: str
    csrfToken: str
    callbackUrl: str
    bearer: str

class UserDB(BaseModel):
    name: str
    avatar: str
    password: str
    role: str
    email: str
    uid: str

fake_db_user:[UserDB] = [{
    "name": "Gerard Escolies",
    "image": "https://unavatar.io/gescoma",
    "password": "password",
    "role": "admin",
    "email": "gerard@edelweiss.com",
    "uid": "ff5d87a9-6ada-4248-9901-14d2d983b958"
},
{
    "name": "Example user",
    "image": "https://unavatar.io/example",
    "password": "password",
    "role": "user",
    "email": "user@edelweiss.com",
    "uid": "ff5d87a9-6ada-4248-9901-14d2d983b958"
}]

def get_user(email):
    for user in fake_db_user:
        if user["email"] == email:
            return user
    return None

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/user/login/")
async def login(data: UserData):
    if (data.bearer != "koUdVf6kazhwoOkjXh65CrDHwW4IYtkatZ3uFEOnob4="): 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    user = get_user(data.email)
    if (user == None or user["email"] != data.email or user["password"] != data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    return user

    