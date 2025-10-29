# Habit Tracker — Backend

This README describes the backend for the Habit Tracker project (located in `d:\Habit-Tracker\src\backend`). It covers the purpose and features of the project, backend enhancements, architecture, setup, environment variables, API endpoints, running locally, and notes for contributors.

---

## Table of contents

- [Project overview](#project-overview)
- [Features](#features)
- [Backend enhancements & improvements](#backend-enhancements--improvements)
- [Project structure](#project-structure)
- [Tech stack](#tech-stack)
- [API overview (routes & controllers)](#api-overview-routes--controllers)
- [Data models (summary)](#data-models-summary)
- [Contract (inputs / outputs / error modes)](#contract-inputs--outputs--error-modes)
- [Edge cases & operational notes](#edge-cases--operational-notes)
- [Local setup & run instructions](#local-setup--run-instructions)
- [Environment variables (sample)](#environment-variables-sample)
- [Testing & verification](#testing--verification)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)
- [TODO / Suggested improvements](#todo--suggested-improvements)
- [License & contact](#license--contact)

---

## Project overview

Habit Tracker is a full-featured application for tracking habits, goals, progress, rewards, and related user interactions. This repository contains the backend API built with Express and Node.js. The backend provides REST endpoints for client apps (web/mobile), supports user authentication (Clerk), push notifications (Firebase Cloud Messaging), email (mailer), logging, and utilities for domain logic (streaks, validators, etc.).

---

## Features

- User authentication and protected routes via Clerk.
- CRUD endpoints for habits, goals, categories, rewards, tools, tool usage, and progress.
- Chat message persistence and endpoints suitable for real-time clients.
- Notification system with Firebase Cloud Messaging (FCM) integration and a test page.
- Email support via the `config/mailer.js` wrapper.
- Centralized error handling with `middleware/errorMiddleware.js`.
- Utilities: `streak.js`, `validators.js`, `asyncHandler.js`, `logger.js`, and `jwt.js`.
- Modular HTTP handlers: controllers and routes separated for maintainability.
- MongoDB models in `models/` using Mongoose.
- `fcm-test/` assets to assist in client-side FCM setup and verification.

---

## Backend enhancements & improvements

Key architectural choices and improvements:

- Modular routing and controllers for each resource to improve clarity and reduce coupling.
- Centralized configuration (`config/db.js`, `config/firebaseConfig.js`, `config/mailer.js`).
- Clerk middleware registered in `server.js` (`ClerkExpressWithAuth()`) to secure routes.
- Centralized error handling and logging for consistent error shapes and easier debugging.
- `asyncHandler.js` used to reduce try/catch boilerplate in async handlers.
- Notification and mailer implementations are written to be swapped into background workers later (queue-friendly).
- Utilities encapsulate domain logic (streak calculation, validation), making them easier to test.
- FCM test assets are included (`fcm-test/fcm-test.html`, `fcm-test/firebase-messaging-sw.js`) for quick manual verification.

---

## Project structure (important files/folders)

- `server.js` — Application entrypoint, middleware registration, and route mounting.
- `config/`
  - `db.js` — MongoDB connection logic.
  - `firebaseConfig.js` — Firebase/FCM setup.
  - `mailer.js` — Email sending helper.
- `controllers/` — Resource controllers (e.g., `habit.controller.js`, `goal.controller.js`).
- `routes/` — Express routers (e.g., `habit.routes.js`, `goal.routes.js`).
- `models/` — Mongoose models (`Habit.js`, `Goal.js`, `User.js`, etc.).
- `middleware/` — `authMiddleware.js`, `errorMiddleware.js`.
- `utils/` — Helpers: `asyncHandler.js`, `validators.js`, `streak.js`, `logger.js`, `aiService.js`.
- `fcm-test/` — Client test assets for Firebase messaging.

---

## Tech stack

- Node.js (ES Modules)
- Express
- MongoDB (Mongoose)
- Clerk (authentication)
- Firebase Cloud Messaging (FCM)
- Nodemailer or SMTP wrapper for email
- Utilities and small AI helper for optional features

---

## API overview (routes & controllers)

Routes are grouped under `/api`. Summary of primary resource routes (consult route files for exact request/response shapes):

- Authentication
  - `POST /api/auth/*` — Authentication and user-related actions (`routes/auth.routes.js`).
- Habits
  - `GET /api/habits` — List habits
  - `POST /api/habits` — Create habit
  - `GET /api/habits/:id` — Get habit
  - `PUT /api/habits/:id` — Update habit
  - `DELETE /api/habits/:id` — Delete habit
- Goals
  - CRUD under `/api/goals` (`controllers/goal.controller.js`).
- Progress
  - Manage progress entries under `/api/progress` (`controllers/progress.controller.js`).
- Chat
  - `/api/chat` — Chat message storage and retrieval (`controllers/chatMessage.controller.js`).
- Tool Usage
  - `/api/tool-usage` — Track tool usage (`controllers/toolUsage.controller.js`).
- Notifications
  - `/api/notification` — Create and list notifications; triggers FCM sends (`controllers/notification.controller.js`).
- Categories
  - `/api/categories` — Category CRUD (`controllers/category.controller.js`).
- Rewards
  - `/api/rewards` — Reward CRUD (`controllers/reward.controller.js`).
- Tools
  - `/api/tools` — Tools resource endpoints (`controllers/tool.controller.js`).
- User Preferences
  - `/api/user-preferences` — Get/update user settings (`controllers/userPreferences.controller.js`).
- User Profile
  - `controllers/userProfile.controller.js` — profile endpoints (likely under auth or users).

Notes:
- Authentication is enforced through Clerk middleware. Protected endpoints should use `req.auth.userId`.
- Validation is centralized in `utils/validators.js`.

---

## Data models (summary)

Models in `models/` represent the core domain:

- `User.js` — user profile and metadata (FCM tokens, preferences).
- `Habit.js` — habit definition and scheduling, metadata, streaks.
- `Goal.js` — longer-term objectives linked to habits.
- `Progress.js` — records of habit completions and progress points.
- `Notification.js` — queued and sent notifications.
- `Reward.js` — reward definitions and redemption history.
- `ToolUsage.js` — logs of tool usage.
- `ChatMessage.js` — chat persistence.
- `Category.js` — categories for organizing habits/goals.
- `UserPreferences.js` — per-user preferences and toggles.

---

## Contract: Inputs / Outputs / Error modes

- Inputs:
  - JSON payloads for POST/PUT.
  - URL params and querystrings for resource lookup.
  - Authentication handled by Clerk; `req.auth.userId` used to identify the user.
- Outputs:
  - 2xx responses on success with JSON payloads.
  - 4xx for client errors with `{ error: "message", details?: [...] }`.
  - 5xx for server errors handled by `errorMiddleware`.
- Error modes:
  - 400 — validation errors.
  - 401/403 — auth/permission failures.
  - 404 — resource not found.
  - 500 — unexpected server/database errors.
- Success criteria:
  - Endpoints use proper status codes and consistent JSON shapes.
  - Auth-protected endpoints require `req.auth.userId`.
  - DB operations log errors via `logger.js` for diagnostics.

---

## Edge cases & operational notes

- Empty collections should return `[]`, not `null`.
- Add pagination for large collections (chat, habits, progress).
- Handle FCM token rotation/expiry and store tokens in the `User` model.
- Consider optimistic concurrency control (timestamps or version fields) for resource updates.
- Rate-limit sensitive endpoints (auth, chat) to prevent abuse.
- Move email and notification sends to background workers in production to avoid request blocking.

---

## Local setup & run instructions

Commands below assume PowerShell and that your current working directory is the backend root (`d:\Habit-Tracker\src\backend`).

1. Install dependencies
```powershell
npm install
```
2. Create a .env file in the backend root (see sample below for required keys).
3. Run the server
```powershell
# Development with nodemon (if available)
npm run dev [server.js]
```
- Server listens on process.env.PORT (default 3000). CORS in server.js is set to allow http://localhost:3000 by default.
---
## Environment variables (sample .env)
Create .env at the backend root and populate:
```
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/habit-tracker

# Clerk
CLERK_API_KEY=your_clerk_api_key
CLERK_JWT_KEY=your_clerk_jwt_key

# Firebase / FCM
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email@project.iam.gserviceaccount.com

# Mailer (SMTP)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_smtp_user
MAIL_PASS=your_smtp_password
MAIL_FROM="Habit Tracker <no-reply@example.com>"

# Other
JWT_SECRET=replace_with_secure_secret
LOG_LEVEL=info
```
Important: never commit .env to version control. Use environment secret stores in production.
## 🧪 Testing & Verification

### ✅ Manual Checks

- **Confirm DB connection:**  
  Start the server and look for `connectDB()` success logs in the console.

- **Test protected route:**  
  Send a request to `/protected` (as defined in `server.js`) to confirm that Clerk authentication middleware is applied correctly.

- **FCM test:**  
  Open `fcm-test/fcm-test.html` in a browser configured with the app’s Firebase credentials to verify push notification reception.

- **Mailer test:**  
  Trigger an API endpoint or small script that sends an email to confirm SMTP delivery and configuration.

---

### 🧰 Suggested Automated Tooling

- Add **Jest + Supertest** tests for key endpoints (e.g., habits, progress, notifications).
- Add **ESLint + Prettier** for consistent code formatting and linting across the project.

---

## 🚀 Deployment Notes

- Use **secret management** for sensitive credentials (Clerk, Firebase, mailer, etc.).
- Preserve **newline formatting** for `FIREBASE_PRIVATE_KEY` in environment variable ingestion.
- Offload **notifications and email** to background workers (e.g., Bull + Redis) for better scalability.
- Use **PM2** or **Docker** for process management and reliable deployments.
- Configure **CORS** to allow only trusted frontend origins in production.

---

## 🤝 Contributing

- Follow the existing **project code style** and structure.
- Add **tests** for any new features introduced.
- When changing models or database structure, open a **Pull Request (PR)** with migration notes.
- Keep **secrets out of commits** — store them in `.env` or use platform secret management.

### ✅ PR Checklist

- [ ] Build passes and lints successfully  
- [ ] Tests added or updated where applicable  
- [ ] README updated with new environment variables or endpoints  

---

## 🧩 TODO / Suggested Improvements

- [ ] Add **API documentation** (OpenAPI / Swagger) for automatic endpoint documentation.  
- [ ] Implement **background workers** for notifications and email tasks.  
- [ ] Add **pagination and filtering** to large list endpoints (habits, progress, chat).  
- [ ] Implement **rate limiting** for chat and authentication routes.  
- [ ] Add **migration tooling** for smooth schema evolution.  
- [ ] Consider **migrating to TypeScript** for better type safety and maintainability.

---

## ⚖️ License & Contact

- Add a `LICENSE` file (e.g., **MIT License**) for open-source distribution.  
- For questions, improvements, or contributions:  
  Open an **issue** or contact the **repository maintainers**.

---

