import os
import pickle
import faiss

from app.rag.search import semantic_search


def retrieve_relevant_files(repo_path, question):

    index_path = os.path.join(repo_path, "index.faiss")
    metadata_path = os.path.join(repo_path, "metadata.pkl")

    if not os.path.exists(index_path):
        raise Exception("Repository indexing is still in progress.")

    index = faiss.read_index(index_path)

    with open(metadata_path, "rb") as f:
        metadata = pickle.load(f)

    return semantic_search(
        index,
        metadata,
        question,
        k=5,
    )