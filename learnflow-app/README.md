# LearnFlow - AI Python Tutoring Platform

LearnFlow helps students learn Python programming through conversational AI agents. Students can chat with tutors, write and run code, take quizzes, and track their progress. Teachers can monitor class performance and generate custom exercises.

## Architecture

- **Frontend**: Next.js 14 + React + TypeScript + TailwindCSS
- **Authentication**: Better Auth + Prisma
- **Backend**: FastAPI + Dapr (microservices)
- **Database**: PostgreSQL (Neon)
- **Messaging**: Kafka on Kubernetes
- **Orchestration**: Kubernetes + Helm
- **AI Agents**: Claude Code + Goose with custom Skills

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL
- Docker & Minikube (for K8s deployment)

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Project Structure

```
learnflow-app/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── auth/        # Login/Register pages
│   │   │   ├── dashboard/   # User dashboard
│   │   │   └── api/auth/    # Auth API routes
│   │   ├── components/      # React components
│   │   ├── lib/             # Auth config, utilities
│   │   └── types/           # TypeScript types
│   └── prisma/              # Database schema
├── backend/                  # FastAPI backend
│   └── app/
│       ├── api/v1/          # API endpoints
│       ├── core/            # Config, security
│       ├── models/          # Database models
│       └── schemas/         # Pydantic schemas
├── k8s/                     # Kubernetes manifests
├── .claude/skills/          # AI agent skills
└── docs/                    # Documentation
```

## Python Curriculum

| Module | Topics |
|--------|--------|
| 1. Basics | Variables, Data Types, Input/Output, Operators |
| 2. Control Flow | Conditionals, For/While Loops, Break/Continue |
| 3. Data Structures | Lists, Tuples, Dictionaries, Sets |
| 4. Functions | Defining Functions, Parameters, Return Values |
| 5. OOP | Classes, Inheritance, Encapsulation |
| 6. Files | File I/O, CSV, JSON |
| 7. Errors | Try/Except, Custom Exceptions |
| 8. Libraries | Packages, APIs, Virtual Environments |

## Authentication

- Email/password with Better Auth
- Role-based access (Student, Teacher, Admin)
- Session management with secure cookies
- Protected routes via Next.js middleware

## AI Agent System

| Agent | Purpose |
|-------|---------|
| Triage Agent | Routes queries to specialists |
| Concepts Agent | Explains Python concepts |
| Code Review Agent | Analyzes code quality |
| Debug Agent | Parses errors, provides hints |
| Exercise Agent | Generates coding challenges |
| Progress Agent | Tracks mastery scores |

## Development

Built using Spec-Kit Plus methodology with AI agents (Claude Code / Goose) executing custom Skills with MCP Code Execution pattern.
