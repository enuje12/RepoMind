import os

from dotenv import load_dotenv
from openai import OpenAI

from app.rag.faiss_retriever import retrieve_relevant_files

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def chat_with_repository(repo_path: str, question: str):

    files = retrieve_relevant_files(
        repo_path,
        question
    )

    context = ""

    for file in files:

        context += f"""

FILE:
{os.path.basename(file["path"])}

CONTENT:
{file["content"]}

"""

    prompt = f"""
You are an expert software engineer.

Answer ONLY from the repository context.

If the answer cannot be found,
say that the repository does not contain enough information.

Repository Context

{context}

Question

{question}
"""

    response = client.chat.completions.create(
        model="openrouter/free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "answer": response.choices[0].message.content,
        "sources": [
            os.path.basename(file["path"])
            for file in files
        ]
    }