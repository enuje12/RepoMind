from pydantic import BaseModel

class RepositoryAnalysis(BaseModel):
    repository: str
    score: int
    overview: str
    languages: list[str]
    frameworks: list[str]
    architecture: str
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]
    resume_summary: str
    analysis: str