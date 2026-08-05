from fastapi import FastAPI, UploadFile, File
import os
import shutil
import zipfile
import uuid
from app.services.gemini_service import analyze_repository
from app.parser.repo_parser import generate_tree
from app.parser.file_reader import read_important_files
from fastapi.middleware.cors import CORSMiddleware
from app.models.chat import ChatRequest
from app.services.chat_service import chat_with_repository
from app.models.github import GitHubRequest
from app.services.github_service import clone_repository

app = FastAPI(
    title="RepoMind AI",
    description="AI-Powered Repository Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://repo-mind-pi.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
async def home():
    return {
        "message": "RepoMind AI Backend Running"
    }


@app.post("/upload")
async def upload_repository(file: UploadFile = File(...)):
    repo_id = str(uuid.uuid4())

    zip_path = os.path.join(UPLOAD_FOLDER, f"{repo_id}.zip")
    extract_path = os.path.join(UPLOAD_FOLDER, repo_id)

    with open(zip_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(extract_path)

    tree = generate_tree(extract_path)

    files = read_important_files(extract_path)

    analysis = analyze_repository(tree, files)

    analysis["repository"] = file.filename
    analysis["repo_id"] = repo_id

    return analysis

@app.post("/github")
async def analyze_github_repository(request: GitHubRequest):

    repo_id, repo_path = clone_repository(
        request.github_url
    )

    tree = generate_tree(repo_path)

    files = read_important_files(repo_path)

    analysis = analyze_repository(
        tree,
        files,
    )

    analysis["repository"] = request.github_url.split("/")[-1]
    analysis["repo_id"] = repo_id

    return analysis

@app.post("/chat")
async def chat(request: ChatRequest):

    repo_path = os.path.join(
        UPLOAD_FOLDER,
        request.repo_id,
    )

    result = chat_with_repository(
        repo_path,
        request.question,
    )

    return result