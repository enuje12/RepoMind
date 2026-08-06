import os
import faiss
import numpy as np
import pickle

from app.rag.embedder import get_embedding

IMPORTANT_EXTENSIONS = {
    ".py", ".js", ".ts", ".tsx", ".jsx",
    ".java", ".cs", ".csproj", ".cpp", ".c",
    ".go", ".rs", ".php", ".html", ".css",
    ".json", ".md", ".xml", ".config",
    ".yml", ".yaml",
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

CHUNK_SIZE = 1000
OVERLAP = 100
MAX_FILE_SIZE = 200000
MAX_FILE_CHARS = 12000


def chunk_text(text):
    chunks = []

    start = 0

    while start < len(text):

        end = start + CHUNK_SIZE

        chunks.append(text[start:end])

        start += CHUNK_SIZE - OVERLAP

    return chunks


def build_index(repo_path):

    index_file = os.path.join(repo_path, "index.faiss")
    metadata_file = os.path.join(repo_path, "metadata.pkl")

    if os.path.exists(index_file) and os.path.exists(metadata_file):

        index = faiss.read_index(index_file)

        with open(metadata_file, "rb") as f:
            metadata = pickle.load(f)

        return index, metadata

    all_chunks = []

    for root, dirs, files in os.walk(repo_path):

        dirs[:] = [
            d for d in dirs
            if d not in IGNORE_DIRS
        ]

        for file in files:

            if file in IGNORE_FILES:
                continue

            if file.endswith(".min.js") or file.endswith(".min.css"):
                continue

            ext = os.path.splitext(file)[1].lower()

            if ext not in IMPORTANT_EXTENSIONS:
                continue

            path = os.path.join(root, file)

            try:

                if os.path.getsize(path) > MAX_FILE_SIZE:
                    continue

                with open(
                    path,
                    "r",
                    encoding="utf-8",
                    errors="ignore",
                ) as f:

                    content = f.read(MAX_FILE_CHARS)

            except Exception:
                continue

            if len(content.strip()) < 20:
                continue

            for chunk in chunk_text(content):

                all_chunks.append(
                    {
                        "path": path,
                        "content": chunk,
                    }
                )

    if not all_chunks:
        raise ValueError("No files found to index.")

    vectors = get_embedding(
        [c["content"] for c in all_chunks]
    )

    embeddings = np.array(
        vectors,
        dtype="float32",
    )

    metadata = all_chunks

    index = faiss.IndexFlatIP(
        embeddings.shape[1]
    )

    index.add(embeddings)

    faiss.write_index(
        index,
        index_file,
    )

    with open(
        metadata_file,
        "wb",
    ) as f:

        pickle.dump(
            metadata,
            f,
        )

    return index, metadata