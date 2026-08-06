import os

IMPORTANT_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".java",
    ".cs",
    ".cpp",
    ".go",
    ".php",
    ".html",
    ".css",
    ".json",
    ".md",
    ".yml",
    ".yaml",
}


def retrieve_relevant_files(repo_path: str, question: str, limit: int = 5):

    keywords = [
        word.lower()
        for word in question.split()
        if len(word) > 2
    ]

    results = []

    for root, _, files in os.walk(repo_path):

        for file in files:

            extension = os.path.splitext(file)[1].lower()

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

            lower = content.lower()

            for keyword in keywords:
                score += lower.count(keyword)
                score += file.lower().count(keyword) * 10

            if score > 0:

                results.append(
                    {
                        "path": path,
                        "content": content[:4000],
                        "score": score,
                    }
                )

    results.sort(
        key=lambda x: x["score"],
        reverse=True,
    )

    return results[:limit]