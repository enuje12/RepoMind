import os

IMPORTANT_FILES = {
    "README.md",
    "requirements.txt",
    "package.json",
    "pyproject.toml",
    "Dockerfile",
    "docker-compose.yml",
    "vite.config.ts",
    "vite.config.js",
    "main.py",
    "app.py",
    "App.tsx",
    "main.tsx",
}

MAX_FILES = 10
MAX_CHARS = 800


def read_important_files(root_path):
    files_data = []

    for root, _, files in os.walk(root_path):
        for file in files:

            if len(files_data) >= MAX_FILES:
                break

            if file not in IMPORTANT_FILES:
                continue

            path = os.path.join(root, file)

            try:
                with open(
                    path,
                    "r",
                    encoding="utf-8",
                    errors="ignore",
                ) as f:
                    content = f.read(MAX_CHARS)

                files_data.append(
                    f"""
FILE: {file}

{content}

{'=' * 80}
"""
                )

            except Exception:
                continue

        if len(files_data) >= MAX_FILES:
            break

    return "\n".join(files_data)