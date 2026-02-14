from fastapi import FastAPI
from chat import router as chat_router

app = FastAPI(title="EcoMindAI api")

app.include_router(chat_router)
@app.get("/")
def root():
    return{"message": "API is running"}