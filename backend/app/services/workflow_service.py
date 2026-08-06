import os

from dotenv import load_dotenv
from openai import OpenAI

from app.retriever.retriever import retrieve_relevant_files

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def explain_workflow(repo_path: str, workflow: str):

    files = retrieve_relevant_files(
        repo_path,
        workflow,
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
You are a senior software architect.

Using ONLY the retrieved repository context, explain the requested workflow.

Workflow:
{workflow}

Repository Context:
{context}

Rules:
- Do not invent functionality.
- If the workflow does not exist, clearly state that.
- Keep the response under 300 words.
- Use markdown.
- Structure the answer using these headings:

## Summary

## Files Involved

## Workflow Steps

## Conclusion

"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b:free",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return {
        "answer": response.choices[0].message.content
    }

