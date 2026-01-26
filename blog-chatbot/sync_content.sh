#!/bin/bash

# Safety check: only run if we're in blog-chatbot folder
if [[ "$(basename $(pwd))" != "blog-chatbot" ]]; then
    echo "Error: Must run from blog-chatbot folder!"
    exit 1
fi

rm -rf ./content
cp -r ../content ./content
echo "Content synced!"
