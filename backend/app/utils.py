import os
import bs4
from langchain import hub
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv 

load_dotenv() 

gemini_embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro-latest",
                 temperature=0.7, top_p=0.85)

def pdf_reader(file_path: str): 
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    return pages 


def chunk_document(docs_pages, chunk_size = 1000, chunk_overlap = 100):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = chunk_size, chunk_overlap= chunk_overlap)
    docs_split = text_splitter.split_documents(docs_pages)
    return docs_split 


def store_docs_embeddings(docs_split, embedding): 
    faiss_index = FAISS.from_documents(docs_split, embedding)
    return faiss_index

def query_seaarch(faiss_index, text):
    query_embedding = embedding_model.embed(text)
    similar_documents = faiss_index.search(query_embedding, k=5)


def create_chain(llm, prompt, retriever):
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    return rag_chain 
    