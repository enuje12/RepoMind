import os
import pickle
import faiss

from app.rag.search import semantic_search


def retrieve_relevant_files(repo_path, question):

    index = faiss.read_index(
        os.path.join(repo_path, "index.faiss")
    )

    with open(
        os.path.join(repo_path, "metadata.pkl"),
        "rb",
    ) as f:
        metadata = pickle.load(f)

    return semantic_search(
        index,
        metadata,
        question,
        k=5,
    )