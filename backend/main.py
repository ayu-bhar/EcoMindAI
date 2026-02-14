from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat import router as chat_router

app = FastAPI(title="EcoMindAI api")

# --- CORS Configuration ---
# List the origins that are allowed to make requests to this API
origins = [
    "http://localhost:3000",          # Local Next.js development
    "https://eco-mind-ai-two.vercel.app/",    # Your production Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],              # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],              # Allows all headers
)

app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "API is running"}