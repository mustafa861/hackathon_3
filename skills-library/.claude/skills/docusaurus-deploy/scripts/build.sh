#!/bin/bash
set -e

DOCS_PATH="${1:-./docs-site}"

echo "Building Docusaurus site..."

cd "$DOCS_PATH" || exit 1

npm run build

echo "Build complete. Output in build/ directory"
ls -la build/
