# VESLocal — Campus Networking & Collaboration Platform

> *“Find your people. Build something together.”*

VESLocal is a campus-exclusive professional networking, talent discovery, and collaboration ecosystem designed specifically for students of **VESIT (Vivekananda Education Society's Institute of Technology)**.

Instead of navigating fragmented WhatsApp groups or ad-hoc social channels, VESLocal provides a centralized hub where students discover peers with complementary skills, broadcast project requirements, showcase entrepreneurial ventures, form hackathon squads, and communicate in real time.

---

## Table of Contents

1. [Features Overview](#features-overview)
2. [Full-Stack Architecture & Technology Stack](#full-stack-architecture--technology-stack)
3. [Project Directory Structure](#project-directory-structure)
4. [Prerequisites](#prerequisites)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [REST API Documentation & Samples](#rest-api-documentation--samples)
9. [Authentication & Security Model](#authentication--security-model)
10. [Real-Time WebSocket Gateway](#real-time-websocket-gateway)
11. [Docker & Container Orchestration](#docker--container-orchestration)
12. [CI/CD Pipelines](#cicd-pipelines)
13. [Testing & Verification Results](#testing--verification-results)
14. [Academic Experiment Index](#academic-experiment-index)
15. [Limitations & Manual Steps](#limitations--manual-steps)

---

## Features Overview

* **Campus Student Authentication**: Verified registration and login restricted to official `@ves.ac.in` email accounts.
* **Student Discovery & Profiles**: Filter classmates by department, skills (React, AI/ML, Hardware, Video Editing), or academic year with dynamic portfolio showcases.
* **Opportunity & Collaboration Board**: Broadcast project needs, hackathon teammate requests, startup co-founder searches, or freelance gigs. Students can express interest with 1-click toggling.
* **Student Micro-Ventures & Freelance Directory**: Showcase campus businesses, design agencies, tech consultancy, and event photography services.
* **Direct Real-Time Messaging**: Built-in messaging interface backed by WebSocket / Socket.IO rooms for student communication.
* **Activity & Notification Feed**: Centralized updates for connection requests, interest expressions, and venture bookmarks.
* **Role-Based Moderation Portal**: Dedicated administrator view for moderating inappropriate listings and managing student records.

---

## Full-Stack Architecture & Technology Stack

```mermaid
graph TD
  UserBrowser["Student Browser (SPA)"] --> |HTTP / REST| ExpressServer["Express API Server (Port 5000)"]
  UserBrowser --> |WebSocket (Socket.IO)| ExpressServer
  ExpressServer --> |Mongoose ODM| MongoAtlas["MongoDB Atlas / Local DB"]
  ExpressServer --> |Fallback Store| InMemStore["In-Memory Mock Store"]
  UserBrowser --> |State Management| ReactContext["React Context (UserContext)"]
```

* **Frontend**:
  - React 19 + Vite 8
  - React Router DOM v7
  - Tailwind CSS v4 (with warm editorial palette)
  - Lucide React Icons
  - React Context API
  - Socket.IO Client
* **Backend**:
  - Node.js (v20+ / v22+) & Express 4
  - Mongoose 8 (MongoDB ODM with dual-mode in-memory fallback)
  - Bcrypt.js (Password hashing)
  - JSON Web Tokens (`jsonwebtoken`)
  - Helmet (HTTP security headers)
  - Express Rate Limit (DDoS / brute-force mitigation)
  - Socket.IO (Real-time duplex gateway)
* **DevOps & Tooling**:
  - Oxlint (Fast linter)
  - Docker & Docker Compose
  - GitHub Actions CI/CD workflows

---

## Project Directory Structure

```
VESLocal/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated CI matrix pipeline (Node 20/22)
│       └── deploy.yml             # Manual deployment workflow
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB Atlas connection & fallback handler
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT Bearer token verification
│   │   ├── errorMiddleware.js     # Centralized error handler
│   │   ├── rateLimiter.js         # API & Auth rate limiting
│   │   └── roleMiddleware.js      # Role-based access control (Admin/Student)
│   ├── models/
│   │   ├── Message.js             # Conversation & direct message schema
│   │   ├── Opportunity.js         # Opportunity board schema
│   │   ├── Student.js             # Student portfolio schema
│   │   └── User.js                # Auth credentials with bcrypt hashing
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth endpoints (register, login, me)
│   │   ├── messageRoutes.js       # /api/messages endpoints
│   │   ├── opportunityRoutes.js   # /api/opportunities endpoints
│   │   └── studentRoutes.js       # /api/students CRUD endpoints
│   ├── test/
│   │   └── api.test.js            # Node native test runner test suite
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile                 # Production backend container definition
│   ├── package.json
│   └── server.js                  # Main Express & Socket.IO entry point
├── public/                        # Static assets & icons
├── src/
│   ├── assets/                    # Media & SVG graphics
│   ├── components/                # Reusable UI components
│   │   ├── BusinessCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── OpportunityCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SkillTag.jsx
│   │   └── StudentCard.jsx
│   ├── context/
│   │   └── UserContext.jsx        # Global shared user & session context
│   ├── data/
│   │   └── mockData.js            # Seed data for campus students & ventures
│   ├── hooks/
│   │   ├── useFetch.js            # Reusable fetch & cancellation hook
│   │   └── useLocalStorage.js     # Browser persistence hook
│   ├── pages/                     # Full-page route views
│   │   ├── AdminDashboard.jsx
│   │   ├── Businesses.jsx
│   │   ├── Collaboration.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Discover.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Messages.jsx
│   │   ├── Notifications.jsx
│   │   ├── Opportunities.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   ├── api.js                 # Centralized REST client with auth injection
│   │   └── socket.js              # Real-time Socket.IO client gateway
│   ├── App.jsx                    # Primary application router & state wiring
│   ├── index.css                  # Tailwind CSS theme & editorial style rules
│   └── main.jsx                   # React root entry point with UserProvider
├── .dockerignore
├── .env.example                   # Frontend environment template
├── .gitignore
├── .oxlintrc.json
├── docker-compose.yml             # Multi-service container orchestration
├── Dockerfile.frontend            # Multi-stage React + Nginx container
├── EXPERIMENTS.md                 # Full-stack academic experiments documentation
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Prerequisites

* **Node.js**: `v20.19.0+` or `v22.12.0+` recommended (tested on `v22.9.0`)
* **npm**: `v10.0.0+`
* **Git**: `2.40+`
* **MongoDB**: A MongoDB Atlas connection URI or local instance (optional; fallback in-memory mode operates automatically if no database is connected)
* **Docker & Docker Compose**: (Optional, for containerized execution)

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/japleenkaurarora17/VESLocal.git
   cd VESLocal
   ```

2. **Install frontend dependencies**:
   ```bash
   npm ci
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

---

## Environment Variables

### Backend Configuration (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:
```env
# Server Port
PORT=5000
NODE_ENV=development

# MongoDB Atlas URI (leave empty to use in-memory demo mode)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/veslocal?retryWrites=true&w=majority

# JWT Signing Secret (replace with your secure secret in production)
JWT_SECRET=your_jwt_secret_key_here_veslocal_2026
JWT_EXPIRES_IN=7d

# Allowed Frontend URL for CORS
CLIENT_URL=http://localhost:5173
```

### Frontend Configuration (`.env`)
Copy `.env.example` to `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## Running the Application

### Running Both Services Concurrently
1. **Terminal 1 — Backend API**:
   ```bash
   cd backend
   npm start
   # Server listens on http://localhost:5000
   ```

2. **Terminal 2 — Frontend Application**:
   ```bash
   npm run dev
   # Vite dev server loads on http://localhost:5173
   ```

---

## REST API Documentation & Samples

Base URL: `http://localhost:5000/api`

### 1. Health Check
* **Endpoint**: `GET /api/health`
* **Response `(200 OK)`**:
  ```json
  {
    "status": "healthy",
    "uptime": 142.3,
    "timestamp": "2026-10-25T12:00:00.000Z",
    "database": {
      "connected": false,
      "state": 0,
      "statusText": "disconnected"
    }
  }
  ```

### 2. User Registration
* **Endpoint**: `POST /api/auth/register`
* **Request Body**:
  ```json
  {
    "name": "Simran Singh",
    "email": "simran.singh@ves.ac.in",
    "password": "Password123!",
    "department": "Information Technology",
    "year": "Third Year"
  }
  ```
* **Response `(201 Created)`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-12345",
      "name": "Simran Singh",
      "email": "simran.singh@ves.ac.in",
      "role": "student"
    }
  }
  ```

### 3. User Login
* **Endpoint**: `POST /api/auth/login`
* **Request Body**:
  ```json
  {
    "email": "japleen.kaur@ves.ac.in",
    "password": "Password123!"
  }
  ```
* **Response `(200 OK)`**: Returns signed JWT token and user profile.

### 4. Students Directory CRUD
* `GET /api/students` — Retrieve all students (query params: `?department=...&skill=...&search=...`)
* `GET /api/students/:id` — Retrieve student profile by ID
* `POST /api/students` — Create new student profile
* `PUT /api/students/:id` — Update student profile *(Protected: owner or admin)*
* `DELETE /api/students/:id` — Delete student profile *(Protected: Admin only, 403 otherwise)*

---

## Authentication & Security Model

1. **Password Encryption**: Stored passwords use `bcryptjs` salted with 10 salt rounds. Plaintext passwords never touch logs or databases.
2. **Stateless Authorization**: Client authenticates via `Authorization: Bearer <token>` in HTTP headers.
3. **Role-Based Access Control (RBAC)**: Student accounts can only edit their own listings; administrative routes (e.g. `DELETE /api/students/:id`) are guarded on the server via `requireRole('admin')`.
4. **Input Sanitization**: Email must match official regex `^[\w.-]+@ves\.ac\.in$`.
5. **Rate Limiting**:
   - General API: 200 requests per 15-minute window.
   - Auth endpoints: 20 requests per 15-minute window.
6. **Payload Size Guard**: Body parser limit locked to `10kb` to thwart DOS memory exhaustion attacks.

---

## Real-Time WebSocket Gateway

VESLocal incorporates Socket.IO on the Express server:
* `join_chat`: Subscribes a user to a specific conversation room.
* `send_message`: Broadcasts a chat message payload to room members.
* `send_notification`: Emits immediate notifications to targeted student rooms (`user:<userId>`).
* **Offline Resilience**: The client-side hook gracefully falls back to local demo messaging if the backend WebSocket gateway is offline.

---

## Docker & Container Orchestration

### Multi-Container Deployment via Docker Compose
To run frontend and backend together:
```bash
docker compose up --build
```
* Frontend will be accessible at: `http://localhost:3000`
* Backend API will be accessible at: `http://localhost:5000`

To stop the containers:
```bash
docker compose down
```

---

## CI/CD Pipelines

GitHub Actions workflows are configured in `.github/workflows/`:
1. `ci.yml`: Runs on pushes and PRs to `main`:
   - Matrix testing across Node.js 20 and 22.
   - Clean dependency installation (`npm ci`).
   - Static analysis via `oxlint`.
   - Frontend production build (`vite build`).
   - Backend automated unit and integration tests (`npm test`).
2. `deploy.yml`: Manual trigger workflow for production deployment.

---

## Testing & Verification Results

All automated checks were executed directly on the workspace:

| Test Target | Command Executed | Result |
|-------------|------------------|--------|
| Frontend Build | `npm run build` | **PASSED** (0 errors, 1863 modules transformed in 3.27s) |
| Frontend Lint | `npm run lint` | **PASSED** (0 errors, Oxlint checked 43 files) |
| Backend Test Suite | `npm test` (inside `backend/`) | **PASSED** (12/12 tests passing, 0 failures) |
| Local Server Probe | Dev & preview HTTP probe | **PASSED** (HTTP 200 OK returned on both endpoints) |

---

## Academic Experiment Index

Refer to [EXPERIMENTS.md](EXPERIMENTS.md) for detailed descriptions, code references, and test outputs for Experiments 1 through 10.

---

## Limitations & Manual Steps

* **MongoDB Atlas Connection**: By default, the backend activates in-memory demo persistence. To connect your live cloud database, supply your connection string in `backend/.env` under `MONGODB_URI`.
* **Docker Host Runtime**: Dockerfiles and Compose configurations have been prepared and syntax-checked. If running locally on Windows, ensure Docker Desktop is installed and running.
