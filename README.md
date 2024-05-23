
# RAG Application AIPlanet




## Overview

React.js-based RAG application with a FastAPI backend and LangChain integration. It allows users to upload PDF files, converts them to vector data, and uses a chatbot interface to answer user queries by searching the uploaded PDFs with FAISS, providing accurate responses based on the document content.




## Table of contents

- [Features](#Features)
- [PreRequisites](#Prerequisites)
- [Installation](#Installation)
- [Usage](#usage)
- [Project_Structure](#Project_Structure)
- [API_Endpoints](#API_Endpoints)
- [Liscence](#Liscence)
## Features

- **PDF Document Processing**: Upload and process PDF documents.
- **Document Chunking**: Split documents into smaller, manageable chunks.
- **FAISS Indexing**: Store and retrieve document embeddings using FAISS.
- **Query Search**: Retrieve relevant documents based on user queries.
- **RAG Chain**: Combine document retrieval and language generation for enhanced responses.


## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.8+
- npm 6+

## Installation

To install RAG Application AIPlanet , follow these steps:

#### Clone the github repository
```bash
  https://github.com/SahuAyush05/AIplanet.git
```
## Backend
### 1->To backend files:
```bash
  cd backend
```
### 2->Create a virtual environment:
```bash
 python -m venv env
 source env/bin/activate   # On Windows use `env\Scripts\activate`
```
### 3->Install dependencies:
```bash
  pip install -r requirements.txt
```
### 4->Set up environment variables:
```bash
  GEMINI_MODEL="models/embedding-001"
  LLM_MODEL="gemini-1.5-pro-latest"

```
### 5->Run the FastAPI server:
```bash
  uvicorn main:app --reload

```
## Frontend
### 1-> To Frontend file
```bash
  cd chatbot
```
### 2-> To install dependencies
```bash
  npm i
```
### 3->Run the development Server
```bash
  npm run dev
```
### The development server will start running on "localhost:5173"
## Usage

- **Upload PDF Documents**: Use the frontend interface to upload PDF documents.
- **Query the Documents**: Enter a query to retrieve relevant information from the uploaded documents.
- **View Results**: The application retrieves relevant document chunks and generates a contextually appropriate response using the RAG model.
