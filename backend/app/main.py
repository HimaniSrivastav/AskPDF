from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import pdf_reader, chunk_document, store_docs_embeddings
from utils import gemini_embeddings
from utils import llm
from prompts import prompt 
from utils import create_chain 

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


class Sentence(BaseModel):
    sentence: str

sentences = [] 
app.qa_chain = None  


@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@app.post("/messages")
async def collect_message(sentence: Sentence):
    sentences.append(sentence)
    response = app.qa_chain.invoke({"input": str(sentence.sentence)})
    return {"message": str(response['answer'])}

@app.get("/messages")
async def get_messages():
    return sentences

@app.post("/upload-pdf")
async def upload_pdf(pdf: UploadFile = File(...)):
    try:
        file_location = f"tmp/{pdf.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(pdf.file.read())

        pages = pdf_reader(file_location)
        document_chunks = chunk_document(pages)


        vectorstore = store_docs_embeddings(document_chunks, gemini_embeddings)
        retriever = vectorstore.as_retriever()
        app.qa_chain = create_chain(llm, prompt, retriever)

        return JSONResponse(content={"message": "PDF uploaded successfully"})
    except Exception as e:
        return JSONResponse(content={"message": "Failed to upload PDF", "error": str(e)}, status_code=500)