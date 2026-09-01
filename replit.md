# Replit project setup

## Stack

- Frontend: React 19 with Create React App/CRACO in `frontend/`
- Backend: FastAPI with MongoDB in `backend/`

## Running the app

Use the Replit Run button. The `Project` workflow starts both services:

- `Frontend`: `cd frontend && HOST=0.0.0.0 PORT=5000 BROWSER=none npm start`
- `Backend API`: `cd backend && uvicorn server:app --host 0.0.0.0 --port 8000`

The frontend is the visible webview on port 5000. During development, relative `/api` requests are proxied by CRA to the backend on `127.0.0.1:8000`. `REACT_APP_BACKEND_URL` can still override the API origin for external production hosting.

## Required configuration

The backend requires these Replit environment values:

- Shared environment variable: `DB_NAME`
- Secrets: `MONGO_URL`, `JWT_SECRET`, `MASTER_KEY`

Do not commit these values to the repository.

## Verification

- Frontend preview should load the access-key login page.
- `GET /api/ping` through the frontend preview should return `{"status":"ok"}`.

## Known limitation

The development app runs successfully, but `cd frontend && npm run build` currently fails because CRA 5 reports that `warnOnce` is not exported from `motion-utils`. This is a production-build/toolchain compatibility issue and is not required for the Replit development workflow.