#!/bin/bash

# Directory containing your markdown files
contents_dir="./content"

# URL to be removed
base_url="https:\/\/aritang.github.io"

# Iterate over Markdown files in the contents directory
find "$contents_dir" -type f -name "*.md" | while read -r file; do
  # Use sed to replace absolute URLs with relative paths
  sed -i '' -E "s/(\[[^]]+\]\()$base_url([^)]+\))/\1\2/g" "$file"
done

echo "Conversion completed for contents folder."

contents_dir="./content/posts"

# URL to be removed
base_url="https:\/\/aritang.github.io"

# Iterate over Markdown files in the contents directory
find "$contents_dir" -type f -name "*.md" | while read -r file; do
  # Use sed to replace absolute URLs with relative paths
  sed -i '' -E "s/(\[[^]]+\]\()$base_url([^)]+\))/\1\2/g" "$file"
done

echo "Conversion completed for contents/posts folder."

