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
    "main.tsx"
}


def read_important_files(root_path):
    files_data = []

    for root, _, files in os.walk(root_path):
        for file in files:
            if file in IMPORTANT_FILES:
                path = os.path.join(root, file)

                try:
                    with open(path, "r", encoding="utf-8") as f:
                        content = f.read(2000)

                    files_data.append(
                        f"""
FILE: {file}

{content}

{'='*80}
"""
                    )

                except Exception:
                    pass

    return "\n".join(files_data)