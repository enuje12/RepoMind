import os
import uuid
import shutil
from git import Repo

UPLOAD_FOLDER = "uploads"


def clone_repository(github_url: str):

    repo_id = str(uuid.uuid4())

    clone_path = os.path.join(
        UPLOAD_FOLDER,
        repo_id,
    )

    if os.path.exists(clone_path):
        shutil.rmtree(clone_path)

    Repo.clone_from(
        github_url,
        clone_path,
    )

    return repo_id, clone_path