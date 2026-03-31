#!/bin/bash
set -e

DOCS_PATH="${1:-./docs-site}"

echo "Initializing Docusaurus at $DOCS_PATH..."

mkdir -p "$DOCS_PATH"
cd "$DOCS_PATH"

cat > package.json <<'EOF'
{
  "name": "learnflow-docs",
  "version": "1.0.0",
  "scripts": {
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve"
  },
  "dependencies": {
    "@docusaurus/core": "^3.0.0",
    "@docusaurus/preset-classic": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "clsx": "^2.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
EOF

npx create-docusaurus@latest . classic --skip-install

mkdir -p docs
cat > docs/intro.md <<'EOF'
# LearnFlow Documentation

Welcome to the LearnFlow documentation.

## Getting Started

LearnFlow is an AI-powered Python tutoring platform.

## Architecture

- **Frontend**: Next.js + Monaco Editor
- **Backend**: FastAPI + Dapr microservices
- **Database**: PostgreSQL on Kubernetes
- **Messaging**: Kafka for event-driven communication
- **AI Agents**: Specialized tutoring agents

## Python Curriculum

LearnFlow covers 8 modules of Python programming:
1. Basics
2. Control Flow
3. Data Structures
4. Functions
5. OOP
6. Files
7. Errors
8. Libraries
EOF

npm install

echo "Docusaurus initialized at $DOCS_PATH"
