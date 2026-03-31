# LearnFlow - Quick Start

## Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL (local or connection string)
- Docker (optional, for containerized run)

## 1. Setup Environment

```bash
cd learnflow-app
cp .env.example .env
```

Edit `.env` and set:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/learnflow"
BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
BACKEND_URL="http://localhost:8000"
```

## 2. Frontend

```bash
cd frontend
npm install
npx prisma generate
npm run dev
```

Open http://localhost:3000

## 3. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

## 4. Run Both (concurrently)

From the root `learnflow-app/` directory:

```bash
npm install
npm run dev
```

## 5. Database

```bash
cd frontend
npx prisma migrate dev
npx prisma studio
```

## 6. Kubernetes (optional)

```bash
minikube start --cpus=4 --memory=8192
kubectl apply -f k8s/base/
```
