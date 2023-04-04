from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/user/login")
async def login(data):
    print(data)
    return {"connected": True}
    