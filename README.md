# Task Manager

A full-stack Task Manager web app built with **Django REST Framework** (backend) and **React + TypeScript** (frontend).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Django 6, Django REST Framework, SQLite |
| Frontend | React 19, TypeScript, Vite, MUI (Material UI), Axios, TanStack Query |

---

## Repository Structure

```
task-manager/
├── backend/        # Django project
│   ├── backend/    # Project settings & root URLs
│   ├── tasks/      # Tasks app (model, views, serializer, URLs)
│   ├── manage.py
│   └── requirements.txt
├── frontend/       # React + Vite project
│   ├── src/
│   │   ├── api/        # Axios client & task service calls
│   │   ├── components/ # UI components (TaskCard, TaskForm, etc.)
│   │   ├── hooks/      # React Query hooks
│   │   └── types/      # TypeScript interfaces
│   └── package.json
└── README.md
```

---

## Backend Setup

### Prerequisites
- Python 3.11+

### Steps

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv .venv

# Windows
.\.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run database migrations
python manage.py migrate

# 5. Start the development server
python manage.py runserver
```

The API will be available at **http://localhost:8000/api/**

---

## Frontend Setup

### Prerequisites
- Node.js 18+

### Steps

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. (Optional) Configure the API base URL
#    By default it points to http://localhost:8000/api
#    Create a .env.local file to override:
echo "VITE_API_URL=http://localhost:8000/api" > .env.local

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## API Endpoints

Base URL: `http://localhost:8000/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks/` | List all tasks |
| `POST` | `/tasks/` | Create a new task |
| `GET` | `/tasks/{id}/` | Retrieve a task by ID |
| `PUT` | `/tasks/{id}/` | Update a task's title and description |
| `PATCH` | `/tasks/{id}/` | Toggle the task's completed status |
| `DELETE` | `/tasks/{id}/` | Delete a task |

### Request / Response Examples

**POST /tasks/** — Create a task
```json
// Request body
{ "title": "Buy groceries", "description": "Milk, eggs, bread" }

// Response (201 Created)
{ "id": 1, "title": "Buy groceries", "description": "Milk, eggs, bread", "completed": false, "created_at": "2026-09-30T06:00:00Z" }
```

**PATCH /tasks/{id}/** — Toggle completed (no body required)
```json
// Response (200 OK)
{ "id": 1, "title": "Buy groceries", "description": "Milk, eggs, bread", "completed": true, "created_at": "2026-09-30T06:00:00Z" }
```

---

## Notes & Assumptions

- **CORS** is pre-configured to allow requests from `http://localhost:5173` (Vite dev server). If you run the frontend on a different port, update `CORS_ALLOWED_ORIGINS` in `backend/backend/settings.py`.
- **`PATCH /tasks/{id}/`** does not accept a request body — it always toggles the `completed` field (i.e., `true → false`, `false → true`). This matches the spec requirement: *"Toggle task completed status only"*.
- **`PUT /tasks/{id}/`** accepts only `title` and `description`. The `completed` field cannot be changed via PUT.
- Tasks are ordered by **newest first** (`-created_at`) by default.
- The frontend uses **TanStack Query** for server state management and cache invalidation after every mutation.
- A 1-second artificial delay is applied to API calls in development (`taskService.ts`) to keep loading states visible during testing. Set `DELAY_MS = 0` to disable it.
