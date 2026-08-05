from app.rag.indexer import build_index
from app.rag.search import semantic_search


def retrieve_relevant_files(repo_path, question):

    index, metadata = build_index(repo_path)

    return semantic_search(
        index,
        metadata,
        question,
        k=5,
    )