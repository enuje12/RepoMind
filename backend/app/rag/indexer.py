import os
import faiss
import numpy as np

from app.rag.embedder import get_embedding

IMPORTANT_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".java",
    ".cs",
    ".csproj",
    ".cpp",
    ".c",
    ".go",
    ".rs",
    ".php",
    ".html",
    ".css",
    ".json",
    ".md",
    ".xml",
    ".config",
    ".yml",
    ".yaml",
}

IGNORE_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    "dist",
    "build",
    "bin",
    "obj",
    ".venv",
    "venv",
    ".next",
}

IGNORE_FILES = {
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
}

CHUNK_SIZE = 800
OVERLAP = 150


def chunk_text(text: str):
    chunks = []

    start = 0

    while start < len(text):
        end = start + CHUNK_SIZE
        chunks.append(text[start:end])
        start += CHUNK_SIZE - OVERLAP

    return chunks


def build_index(repo_path):

    embeddings = []
    metadata = []

    for root, dirs, files in os.walk(repo_path):

        dirs[:] = [
            d for d in dirs
            if d not in IGNORE_DIRS
        ]

        for file in files:

            if file in IGNORE_FILES:
                continue

            if file.endswith(".min.js"):
                continue

            if file.endswith(".min.css"):
                continue

            ext = os.path.splitext(file)[1].lower()

            if ext not in IMPORTANT_EXTENSIONS:
                continue

            path = os.path.join(root, file)

            try:
                with open(
                    path,
                    "r",
                    encoding="utf-8",
                    errors="ignore",
                ) as f:
                    content = f.read()
            except Exception:
                continue

            if len(content.strip()) < 20:
                continue

            chunks = chunk_text(content)

            for chunk in chunks:

                embedding = get_embedding(chunk)

                embeddings.append(embedding)

                metadata.append(
                    {
                        "path": path,
                        "content": chunk,
                    }
                )

    if len(embeddings) == 0:
        raise ValueError("No files found to index.")

    embeddings = np.array(
        embeddings,
        dtype="float32",
    )

    index = faiss.IndexFlatIP(
        embeddings.shape[1]
    )

    index.add(embeddings)

    return index, metadata