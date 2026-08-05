import os

IMPORTANT_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".java",
    ".cs",
    ".csproj",
    ".cpp",
    ".c",
    ".go",
    ".rs",
    ".php",
    ".html",
    ".css",
    ".json",
    ".md",
    ".xml",
    ".config",
    ".yml",
    ".yaml",
}

SKIP_FOLDERS = {
    "bin",
    "obj",
    "node_modules",
    ".git",
    ".vs",
    "__pycache__",
    ".idea",
    ".vscode",
    "dist",
    "build",
}

SKIP_PREFIXES = (
    "staticwebassets",
)

SKIP_SUFFIXES = (
    ".min.js",
    ".min.css",
    ".dll",
    ".exe",
    ".cache",
    ".pdb",
    ".ico",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
)

IMPORTANT_FILES = {
    "program.cs": 120,
    "startup.cs": 120,
    "package.json": 110,
    "package-lock.json": 100,
    "requirements.txt": 110,
    "readme.md": 100,
    "dockerfile": 100,
    "docker-compose.yml": 100,
    "docker-compose.yaml": 100,
    "appsettings.json": 90,
    "appsettings.development.json": 90,
}


def retrieve_relevant_files(repo_path: str, question: str, limit: int = 5):

    keywords = [
        word.lower()
        for word in question.split()
        if len(word) > 2
    ]

    results = []

    for root, dirs, files in os.walk(repo_path):

        dirs[:] = [
            d for d in dirs
            if d not in SKIP_FOLDERS
        ]

        for file in files:

            filename = file.lower()

            if filename.startswith(SKIP_PREFIXES):
                continue

            if filename.endswith(SKIP_SUFFIXES):
                continue

            extension = os.path.splitext(filename)[1]

            if extension not in IMPORTANT_EXTENSIONS:
                continue

            path = os.path.join(root, file)

            try:
                with open(
                    path,
                    "r",
                    encoding="utf-8",
                    errors="ignore",
                ) as f:
                    content = f.read()
            except Exception:
                continue

            score = 0

            score += IMPORTANT_FILES.get(filename, 0)

            content_lower = content.lower()

            for keyword in keywords:

                score += filename.count(keyword) * 10

                score += content_lower.count(keyword)

            if "framework" in keywords or "technology" in keywords:

                if filename.endswith(".csproj"):
                    score += 200

                if filename == "package.json":
                    score += 200

                if filename == "requirements.txt":
                    score += 200

            if "authentication" in keywords or "identity" in keywords:

                if "identity" in filename:
                    score += 150

                if filename == "program.cs":
                    score += 120

            if "database" in keywords or "entity" in keywords:

                if "dbcontext" in filename:
                    score += 180

                if "context" in filename:
                    score += 100

            if "controller" in keywords:

                if "controller" in filename:
                    score += 150

            if score > 0:

                results.append(
                    {
                        "path": path,
                        "content": content,
                        "score": score,
                    }
                )

    results.sort(
        key=lambda x: x["score"],
        reverse=True,
    )

    return results[:limit]