from pydantic import BaseModel


class WorkflowRequest(BaseModel):
    repo_id: str
    workflow: str