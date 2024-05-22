from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",  # React development server
    "http://localhost:5173",  # Vite development server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

class Sentence(BaseModel):
    sentence: str

sentences = []

@app.post("/messages")
async def collect_message(sentence: Sentence):
    sentences.append(sentence)
    print("This is the ", sentences)
    return {"message": "Message received"}

@app.get("/messages")
async def get_messages():
    return sentences

@app.post("/upload-pdf")
async def upload_pdf(pdf: UploadFile = File(...)):
    try:
        with open(pdf.filename, "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)
        print(pdf.filename)
        return JSONResponse(content={"message": "PDF uploaded successfully"})
    except Exception as e:
        return JSONResponse(content={"message": "Failed to upload PDF", "error": str(e)}, status_code=500)