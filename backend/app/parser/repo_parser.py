import os

IGNORE = {
    ".git",
    "__pycache__",
    "node_modules",
    ".venv",
    "venv",
    ".idea",
    ".vscode"
}

def generate_tree(root_path):
    tree = []

    for root, dirs, files in os.walk(root_path):
        dirs[:] = [d for d in dirs if d not in IGNORE]

        level = root.replace(root_path, "").count(os.sep)
        indent = "    " * level

        tree.append(f"{indent}{os.path.basename(root)}/")

        sub_indent = "    " * (level + 1)

        for file in files:
            tree.append(f"{sub_indent}{file}")

    return "\n".join(tree)