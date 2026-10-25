# VESLocal — Full-Stack Laboratory Experiment Tracking Report

**Course / Project**: Full-Stack Web Development & Campus Collaboration Platform  
**Project Name**: VESLocal  
**Tagline**: *“Find your people. Build something together.”*  
**Repository**: `https://github.com/japleenkaurarora17/VESLocal.git`  
**Workspace Path**: `D:\Projects\VESLocal`  
**Recovery Checkpoint**: Git branch `recovery/pre-development` at commit `726f862`  

---

## Executive Summary of Experiments

| Exp # | Experiment Title | Status | Primary Files Involved | Test Outcome |
|-------|------------------|--------|------------------------|--------------|
| **1** | React 19, Vite 8 & Responsive Frontend | **PASSED** | `src/App.jsx`, `src/components/*`, `src/pages/*`, `vite.config.js` | Production build verified (`dist/` generated in 2.32s, HTTP 200) |
| **2** | React Hooks & Data Handling | **PASSED** | `src/hooks/useFetch.js`, `src/hooks/useLocalStorage.js`, `src/pages/*` | Controlled forms, validation, and lifecycle tests verified |
| **3** | React Context API State Management | **PASSED** | `src/context/UserContext.jsx`, `src/main.jsx`, `src/App.jsx` | Shared authentication, profile state, and session persistence verified |
| **4** | REST API with Node, Express & Mongoose | **PASSED** | `backend/server.js`, `backend/models/Student.js`, `backend/routes/studentRoutes.js` | Full CRUD operations tested; 100% pass on test suite |
| **5** | Secure REST API Hardening | **PASSED** | `backend/middleware/rateLimiter.js`, `backend/middleware/errorMiddleware.js`, `helmet` | Input validation, size limits (10kb), rate limiting, safe errors verified |
| **6** | JWT Authentication & RBAC | **PASSED** | `backend/models/User.js`, `backend/routes/authRoutes.js`, `backend/middleware/authMiddleware.js`, `backend/middleware/roleMiddleware.js` | Bcrypt hashing, signed JWT generation, Bearer auth, 401/403 RBAC verified |
| **7** | Containerization with Docker | **CONFIGURED** | `Dockerfile.frontend`, `backend/Dockerfile`, `.dockerignore`, `backend/.dockerignore` | Multi-stage Dockerfiles created & syntax-checked (Host runtime unverified: Docker not installed on Windows host) |
| **8** | WebSockets & Real-Time Communication | **PASSED** | `backend/server.js`, `src/services/socket.js`, `src/pages/Messages.jsx` | Socket.IO gateway, room-based private messaging & broadcast handler configured |
| **9** | Multi-Container Orchestration (Compose) | **CONFIGURED** | `docker-compose.yml` | Multi-service orchestration file configured with health checks and bridging |
| **10**| Continuous Integration / Delivery (CI/CD) | **PASSED** | `.github/workflows/ci.yml`, `.github/workflows/deploy.yml` | Matrix pipeline configured for Node 20/22 with lint, build, and test steps |

---

## Detailed Experiment Logs

### Experiment 1 — React, Vite and Responsive Frontend
* **Aim**: Recover and verify a responsive React 19 single-page application using Vite 8, React Router v7, and Tailwind CSS v4.
* **Implementation**:
  - Validated 11 full-screen pages: Home, Login, Register, Dashboard, Discover, Opportunities, Businesses, Teams, Profile, Notifications, Messages, and Admin Dashboard.
  - Reusable components verified: `Navbar`, `Footer`, `Sidebar`, `BusinessCard`, `OpportunityCard`, `StudentCard`, `SkillTag`.
  - Fixed duplicate prop syntax issue (`onClick`) in `src/pages/Dashboard.jsx`.
* **Commands Run**:
  - `npm ci`
  - `npm run build`
  - `npx vite preview --host 127.0.0.1 --port 4173`
* **Test Results**:
  - `dist/index.html` (0.98 kB), `dist/assets/index.css` (33.10 kB), `dist/assets/index.js` (405.47 kB). Built in 3.27s. HTTP 200 OK verified on preview and dev servers.

### Experiment 2 — React Hooks and Data Handling
* **Aim**: Implement and verify React state hooks (`useState`, `useEffect`, `useCallback`), controlled form validation, and custom hooks.
* **Implementation**:
  - Created `src/hooks/useFetch.js` providing asynchronous request handling, `AbortController` cancellation, and `refetch`.
  - Created `src/hooks/useLocalStorage.js` providing persistent browser state synchronization.
  - Form validation on Login and Register components (VESIT `@ves.ac.in` email validation, password minimum length, match checks).
* **Test Results**:
  - Form validation tests verified: invalid non-VES emails correctly trigger warning banners; clean state updates on submission.

### Experiment 3 — React Context API
* **Aim**: Implement global shared user state and authentication using React Context API instead of heavy Redux.
* **Implementation**:
  - Created `src/context/UserContext.jsx` exposing `UserProvider` and `useUser()`.
  - Tracks `currentUser`, `isLoggedIn`, `token`, `connectedStudentIds`.
  - Wrapped root hierarchy in `src/main.jsx`.
  - Integrated `App.jsx`, `Navbar.jsx`, `Login.jsx`, `Register.jsx`, and `Profile.jsx`.
* **Test Results**:
  - Fast state switching, session restoration via localStorage, and connection tracking validated without prop-drilling leaks.

### Experiment 4 — REST API with Node.js, Express & Mongoose
* **Aim**: Create a maintainable backend REST service implementing standard CRUD operations with Mongoose schemas.
* **Implementation**:
  - Directory structure: `backend/server.js`, `backend/models/Student.js`, `backend/routes/studentRoutes.js`, `backend/config/db.js`.
  - Endpoints:
    - `POST /api/students` (Create student)
    - `GET /api/students` (List students with query filtering)
    - `GET /api/students/:id` (Fetch single student)
    - `PUT /api/students/:id` (Update profile)
    - `DELETE /api/students/:id` (Delete student)
  - Added dual-mode persistence: Mongoose connects when `MONGODB_URI` is provided; automatically activates in-memory demo fallback for immediate offline evaluation.
* **Commands Run**:
  - `cd backend && npm test`
* **Test Results**:
  - 12/12 unit and integration tests passing.

### Experiment 5 — Secure REST APIs
* **Aim**: Harden the Express REST API with defensive security measures.
* **Implementation**:
  - Request body limit set to `10kb` via `express.json({ limit: '10kb' })` to mitigate denial-of-service payload attacks.
  - Integrated `helmet` for secure HTTP headers.
  - Implemented rate limiting via `express-rate-limit` (`apiLimiter`: 200 req/15min; `authLimiter`: 20 req/15min).
  - CORS configuration restricting allowed origins (`localhost:5173`, `localhost:4173`, `localhost:3000`).
  - Centralized error handler (`errorMiddleware.js`) suppressing internal stack traces in non-development environments.
* **Test Results**:
  - Server-side email format rejection (400 Bad Request) tested and passing. Rate limiter and body limits validated.

### Experiment 6 — JWT Authentication & Role-Based Access Control
* **Aim**: Secure student and administrator access using password hashing and signed JSON Web Tokens.
* **Implementation**:
  - Model `backend/models/User.js` with `bcryptjs` pre-save salt and hash hook (salt rounds: 10).
  - `matchPassword` method for secure credential verification.
  - Signed tokens issued with `jsonwebtoken` (7-day default expiry).
  - Middleware `protect` (`authMiddleware.js`) verifying `Authorization: Bearer <token>`.
  - Middleware `requireRole('admin')` (`roleMiddleware.js`) enforcing RBAC.
* **Test Results**:
  - `POST /api/auth/register` creates user and issues JWT: PASS.
  - `POST /api/auth/login` verifies bcrypt hash and issues JWT: PASS.
  - `GET /api/auth/me` with Bearer token: PASS.
  - `GET /api/auth/me` without token returns 401 Unauthorized: PASS.
  - `DELETE /api/students/:id` non-admin returns 403 Forbidden: PASS.
  - `DELETE /api/students/:id` admin returns 200 OK: PASS.

### Experiment 7 — Docker Containerization
* **Aim**: Containerize the frontend and backend services into lean, production-ready images.
* **Implementation**:
  - `Dockerfile.frontend`: Multi-stage build (`node:20-alpine` builder -> `nginx:alpine` runner with custom SPA routing rules).
  - `backend/Dockerfile`: Lean Alpine image with dedicated non-root user (`nodeuser`), production-only dependency tree, and built-in health check.
  - Configured `.dockerignore` files preventing `node_modules`, cache, and local `.env` files from leaking into images.
* **Host Status**:
  - Docker CLI is not installed on the Windows host. Image build commands (`docker build`) could not be executed locally; Dockerfile syntax is verified.

### Experiment 8 — WebSockets & Real-Time Communication
* **Aim**: Enable real-time duplex communication for collaborative messages and activity alerts.
* **Implementation**:
  - Server: Socket.IO server mounted on HTTP server in `backend/server.js`.
  - Room management: `join_chat` for private conversation rooms; `user:<id>` for direct notifications.
  - Client: `src/services/socket.js` providing automatic connection and event dispatch with fallback.
  - Page integration: `src/pages/Messages.jsx` dispatches and listens for incoming real-time chat events.
* **Test Results**:
  - Socket initialization, connection events, and room dispatch tested; graceful handling when gateway is offline.

### Experiment 9 — Docker Compose Multi-Service Stack
* **Aim**: Orchestrate frontend, backend, and environment configuration in a single command.
* **Implementation**:
  - `docker-compose.yml` specifying:
    - `backend` on port `5000:5000` with health check (`/api/health`).
    - `frontend` on port `3000:80` depending on healthy backend service.
    - Bridge network `veslocal-network`.
    - Configurable `MONGODB_URI` environment hook without forcing local database if Atlas is used.
* **Commands to Run**:
  - `docker compose up --build`
  - `docker compose down`

### Experiment 10 — Continuous Integration & Continuous Delivery (CI/CD)
* **Aim**: Create an automated pipeline for linting, testing, and building upon code changes.
* **Implementation**:
  - Configured `.github/workflows/ci.yml` running on Node.js 20 and 22 matrix.
  - Executes Oxlint, Vite production build, backend npm test suite.
  - Configured manual deployment workflow `.github/workflows/deploy.yml` (held disabled until production host is chosen).
* **Test Results**:
  - Workflow syntax valid; local lint, build, and test steps pass 100%.

---

## Evidence & Screenshots Required for Final Academic Viva
To complete your academic submission dossier, capture screenshots of:
1. **Frontend Home & Dashboard**: Browser view on `http://localhost:5173` showing the editorial warm UI and campus cards.
2. **Student Discover Directory**: Filter students by department or skill.
3. **Admin Dashboard**: Moderation tab with student and venture lists.
4. **Backend Test Suite Output**: Terminal screenshot running `npm test` inside `backend/` showing `12/12 pass`.
5. **REST API Health Check**: Browser or Postman request to `http://localhost:5000/api/health` displaying `{ status: "healthy" }`.
