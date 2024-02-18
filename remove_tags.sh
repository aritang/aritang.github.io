#!/bin/bash

# Navigate to the directory containing your blog posts
cd content/posts

# Iterate over all Markdown files
for file in *.md; do
    # Use sed to delete the line containing the tags field
    sed -i '' '/^tags: \[.*\]$/d' "$file"
done

