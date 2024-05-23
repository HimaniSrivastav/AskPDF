import os
import bs4  # Importing BeautifulSoup, but it's not used in this code snippet
from langchain import hub
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Initialize Google Generative AI embeddings model
gemini_embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# Initialize the language model with specific parameters
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro-latest",
                             temperature=0.7, top_p=0.85)

# Function to read and split PDF into pages
def pdf_reader(file_path: str):
    loader = PyPDFLoader(file_path)  # Initialize the PDF loader
    pages = loader.load_and_split()  # Load and split the PDF into pages
    return pages

# Function to chunk the document into smaller parts for better processing
def chunk_document(docs_pages, chunk_size=1000, chunk_overlap=100):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    docs_split = text_splitter.split_documents(docs_pages)  # Split the document pages into chunks
    return docs_split

# Function to store document embeddings in a FAISS index for fast retrieval
def store_docs_embeddings(docs_split, embedding):
    faiss_index = FAISS.from_documents(docs_split, embedding)  # Create FAISS index from document chunks
    return faiss_index

# Function to search the FAISS index for documents similar to the query text
def query_search(faiss_index, text):
    query_embedding = gemini_embeddings.embed(text)  # Get the embedding for the query text
    similar_documents = faiss_index.search(query_embedding, k=5)  # Search for top 5 similar documents
    return similar_documents

# Function to create a retrieval-augmented generation (RAG) chain
def create_chain(llm, prompt, retriever):
    question_answer_chain = create_stuff_documents_chain(llm, prompt)  # Create a QA chain
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)  # Create the RAG chain
    return rag_chain
