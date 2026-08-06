import numpy as np

from app.rag.embedder import get_embedding


def semantic_search(
    index,
    metadata,
    question,
    k=5,
):

    query_embedding = np.array(
        get_embedding(question),
        dtype="float32",
    )

    scores, indices = index.search(
        query_embedding,
        k,
    )

    results = []

    for idx in indices[0]:

        if idx == -1:
            continue

        results.append(metadata[idx])

    return results