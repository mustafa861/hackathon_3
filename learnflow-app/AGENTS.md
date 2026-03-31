# LearnFlow Repository

## Overview
AI-powered Python tutoring platform built with Next.js, FastAPI, and Kubernetes.

## Tech Stack
- Frontend: Next.js 14, React 18, TypeScript, TailwindCSS
- Auth: Better Auth, Prisma ORM
- Backend: FastAPI, Pydantic, JWT
- Database: PostgreSQL
- Infra: Kubernetes, Kafka, Dapr

## Conventions
- TypeScript strict mode enabled
- Zod for runtime validation
- React Hook Form for form handling
- Prisma for database schema and migrations
- Role-based access: STUDENT, TEACHER, ADMIN
- API routes under /api/auth/*

## Key Files
- `frontend/src/lib/auth.ts` - Better Auth configuration
- `frontend/src/middleware.ts` - Route protection
- `frontend/prisma/schema.prisma` - Database schema
- `backend/app/core/security.py` - Password hashing, JWT
