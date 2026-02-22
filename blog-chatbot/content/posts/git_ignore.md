---
title: "Git Ignore | Exclude a 'Results' Folder from Git Sync and Manage It Manually"
date: 2024-11-10T09:37:01+08:00
draft: false
---

When working on projects across multiple computers, while syncing using a remote repository managed by git. you might encounter scenarios where you need to run the same code but keep certain directories, like a `results` folder, unique to each machine:

- **Machine-Specific Data**: The `results` folder may contain data that's only relevant to a particular machine.
- **Large Files**: Syncing large result files can slow down your version control system.
- **Privacy and Security**: Results might contain sensitive information that shouldn't be shared.

## step 1: add `results` to `.gitignore`

The `.gitignore` file tells Git which files or directories to ignore in a repository. So first create a `.gitignore` file:

```python
touch .gitignore
```

And, add one line to `.gitignore` telling Git to ignore the `results` directory and all of its contents.

```
results/
```

And that's it! Theoretically one still needs to `mkdir` a results folder locally if it doesn't exists, and remember to 

## step 2: (optional) remove previous `results` tracked by git

If the `results` folder was previously tracked by Git, you'll need to remove it from the repository's tracking while keeping the folder on your local filesystem.

(at the project's root directory, in terminal, run)

```bash
git rm -r --cached results/
git commit -m "Stop tracking the results folder"
git push origin main
```

## step 3: (optional) 

Making the `results` folder to point to a specific location outside your project directory:

- **On Linux/macOS**:

    ```bash
    ln -s /path/to/your/local/results results
    ```

- **On Windows (Command Prompt)**:

    ```cmd
    mklink /D "results" "C:\path\to\your\local\results"
    ```
