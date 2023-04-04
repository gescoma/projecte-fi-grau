from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/user/login")
async def login(data):
    if (data.username == "admin" and data.password == "admin"):
        return {"connected": True}
    print(data)
    return {"connected": False}
    