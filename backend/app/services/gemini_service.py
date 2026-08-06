import os
import json
import time

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()



client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def analyze_repository(tree, files):

    prompt = f"""
You are a senior software architect and code reviewer.

Analyze ONLY the repository content provided below.

Repository Tree:
{tree}

Important Files:
{files}

Return ONLY valid JSON.

Do NOT return markdown fences.
Do NOT return explanations.
Do NOT return any text outside the JSON object.

The JSON MUST exactly follow this schema:

{{
  "score": 0,
  "overview": "",
  "languages": [],
  "frameworks": [],
  "architecture": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "resume_summary": "",
  "analysis": ""
}}

GENERAL RULES

- Score must be an integer between 0 and 100.
- Base every conclusion ONLY on the provided repository tree and file contents.
- Never invent technologies, files, APIs, databases, or implementations.
- Never assume a file exists unless it appears in the repository.
- Never state that a file is incomplete, truncated, or missing unless the provided content explicitly proves it.
- If there is insufficient evidence for a conclusion, explicitly state:
  "Not enough evidence in the retrieved repository files."
- Distinguish observations from recommendations.
- Do not speculate.

CONFIDENCE RULES

High confidence:
- Directly supported by code or configuration.

Medium confidence:
- Supported by multiple related files.

Low confidence:
- Requires assumptions.

Never include low-confidence conclusions.

FIELD RULES

score

- Evaluate architecture, code organization, maintainability, documentation, testing, deployment readiness, and production quality.
- Do not deduct points for features that cannot be verified.

overview

- 2–4 sentences explaining the repository's purpose.

languages

- Programming languages only.
- Do NOT include frameworks, markup languages, databases, or tools.

frameworks

Include frameworks, libraries, SDKs, ORMs, cloud platforms, deployment tools, and major technologies.

Examples:

- React
- FastAPI
- Spring Boot
- Express
- TensorFlow
- PyTorch
- Pandas
- Docker
- Kubernetes
- PostgreSQL
- Redis

Do NOT include programming languages.

architecture

Describe:

- architectural style
- frontend/backend organization
- API structure
- AI/ML pipeline if present
- deployment architecture if visible

strengths

Return 3–5 concise observations.

Every strength MUST be directly supported by the repository.

weaknesses

Return 3–5 concise observations.

Only include weaknesses supported by the repository.

Never assume missing features.

If there is insufficient evidence to identify repository weaknesses,
return an empty weaknesses list.

Do not invent recommendations.

Recommendations must be based ONLY on identified weaknesses.

suggestions

Return 3–5 practical improvements.

Every suggestion must correspond to one of the identified weaknesses.

resume_summary

Write a concise resume-ready project description in 2–3 sentences.

Mention:

- project purpose
- architecture
- major technologies
- AI capabilities (if present)

analysis

Generate a professional GitHub-style Markdown report.

Requirements:

- Use valid GitHub-Flavored Markdown.
- Use "#" for major headings.
- Use "##" for subsections.
- Use "-" for bullet lists.
- Use numbered lists for recommendations.
- Keep paragraphs concise.
- Do not use HTML.
- Do not speculate.
- Only include information directly supported by the repository.

Structure:

# Project Overview

Brief overview of the project.

# Architecture

Describe the overall architecture and interaction between components.

# Technology Stack

## Backend

## Frontend

## AI / ML

## Database

## DevOps

Only include subsections that are supported by the repository.

# Strengths

List 3–5 strengths.

# Weaknesses

For each weakness include:

- **Observation**
- **Evidence**
- **Potential Impact**

If there is insufficient evidence, write:

> Not enough evidence in the retrieved repository files.

# Recommendations

Provide a numbered list of practical improvements.

# Overall Assessment

Provide a concise evaluation of the repository's architecture, maintainability, production readiness, and portfolio quality.
"""

    print("Tree length:", len(tree))
    print("Files length:", len(files))
    print("Prompt length:", len(prompt))

    start = time.time()

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b:free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    print("OpenRouter took:", round(time.time() - start, 2), "seconds")

    result = response.choices[0].message.content

    if result is None:
     raise Exception("Model returned no content.")

    result = result.replace("```json", "")
    result = result.replace("```", "")
    result = result.strip()

    try:
        data = json.loads(result)
    except json.JSONDecodeError:
        print("========== RAW MODEL RESPONSE ==========")
        print(result)
        print("========================================")
        raise

    return data