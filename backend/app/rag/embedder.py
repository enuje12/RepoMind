from fastembed import TextEmbedding

model = TextEmbedding(
    model_name="BAAI/bge-small-en-v1.5"
)


def get_embedding(texts):

    if isinstance(texts, str):
        texts = [texts]

    return [embedding for embedding in model.embed(texts)]