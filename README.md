# TTP CRM — AI-Powered Sales CRM

A full-stack Customer Relationship Management platform built with the **MERN stack** and enhanced with **Google Gemini AI**. Manage leads, contacts, tasks, and notes — while leveraging AI to generate lead summaries, draft sales emails, and surface pipeline insights automatically.

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini-3.6--flash-4285F4?logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

---

## ✨ Features

### Core CRM
- **Lead Management** — Create, update, filter, and search leads with status tracking (New → Qualified → Proposal → Won/Lost)
- **Kanban Pipeline** — Drag-and-drop pipeline board with bulk reorder support
- **Contact Book** — Full contact management with favorites, tags, and search
- **Notes** — Rich notes linked to leads or contacts, with pin support
- **Task Tracker** — Task management with priorities, due dates, and auto-completion timestamps
- **Authentication** — JWT-based auth with registration, login, profile updates, and protected routes

### Analytics
- **Dashboard Overview** — Real-time stats: revenue won, pipeline value, total leads/contacts, open tasks, and conversion rate
- **Pipeline Breakdown** — Lead count and value across every stage (New → Won/Lost)
- **Monthly Trend** — 6-month rolling chart of new leads created and revenue won
- **Recent Activity** — Latest 6 updated leads at a glance

### AI-Powered (Gemini)
- **Lead Summary** — Generates executive summaries, risk scores (0–100), and next-best-action recommendations
- **Email Drafting** — AI-composed sales emails with customizable tone and purpose
- **Sales Insights** — Pipeline health analysis with data-driven observations and actionable recommendations

---

## 🏗️ Architecture

```
CRM/
├── client/                   # React 19 + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ai/           # AI feature components
│   │   │   ├── common/       # Shared components
│   │   │   ├── dashboard/    # Dashboard widgets
│   │   │   ├── layout/       # AppLayout, ProtectedRoute
│   │   │   ├── leads/        # Lead-specific components
│   │   │   └── ui/           # Base UI primitives
│   │   ├── context/          # AuthContext (React Context)
│   │   ├── lib/              # API client, services, utilities
│   │   ├── pages/            # Route-level page components
│   │   │   ├── auth/         # Login, Register
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Leads.jsx
│   │   │   ├── Contacts.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Settings.jsx
│   │   └── App.jsx           # Route table
│   └── package.json
│
├── server/                   # Express 5 backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── lead.controller.js
│   │   ├── contact.controller.js
│   │   ├── note.controller.js
│   │   ├── task.controller.js
│   │   ├── ai.controller.js
│   │   └── analytics.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js  # JWT protect middleware
│   │   └── error.middleware.js # Global error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   ├── Contact.js
│   │   ├── Note.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── lead.routes.js
│   │   ├── contact.routes.js
│   │   ├── note.routes.js
│   │   ├── task.routes.js
│   │   ├── ai.routes.js
│   │   └── analytics.routes.js
│   ├── services/
│   │   └── ai.service.js      # Gemini AI integration
│   ├── utils/
│   │   ├── ApiError.js        # Custom error class
│   │   ├── asyncHandler.js    # Express 5 async passthrough
│   │   └── generateToken.js   # JWT token generator
│   ├── server.js              # Express app entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 22.x |
| npm | ≥ 10.x |
| MongoDB Atlas | Free tier or above |
| Google Gemini API Key | [Get one here](https://aistudio.google.com/apikey) |

### 1. Clone the Repository

```bash
git clone https://github.com/samir-sah/CRM-with-AI-integration-.git
cd CRM-with-AI-integration-
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/crm?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_here       # Use: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_EXPIRES_IN=7d

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Start the dev server:

```bash
npm run dev
```

The API will be running at `http://localhost:8000`.

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The client will be running at `http://localhost:5173`.

---

## 📡 API Reference

**Base URL:** `http://localhost:8000/api`

All protected routes require the header:
```
Authorization: Bearer <jwt_token>
```

### Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | No | Server health check |

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | No | Create a new account |
| `POST` | `/auth/login` | No | Login & receive JWT |
| `GET` | `/auth/me` | Yes | Get current user profile |
| `PUT` | `/auth/profile` | Yes | Update profile (name, company, avatar, password) |

### Leads

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/leads` | Yes | List all leads (supports `?status`, `?priority`, `?source`, `?search`) |
| `GET` | `/leads/:id` | Yes | Get a single lead |
| `POST` | `/leads` | Yes | Create a new lead |
| `PUT` | `/leads/:id` | Yes | Update a lead |
| `DELETE` | `/leads/:id` | Yes | Delete a lead |
| `PATCH` | `/leads/reorder` | Yes | Bulk reorder pipeline (send `{ updates: [{ id, status, order }] }`) |

### Contacts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/contacts` | Yes | List all contacts (supports `?search`, `?tag`) |
| `GET` | `/contacts/:id` | Yes | Get a single contact |
| `POST` | `/contacts` | Yes | Create a new contact |
| `PUT` | `/contacts/:id` | Yes | Update a contact |
| `DELETE` | `/contacts/:id` | Yes | Delete a contact |

### Notes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/notes` | Yes | List all notes (supports `?lead`, `?contact`, `?search`) |
| `POST` | `/notes` | Yes | Create a note (link to lead/contact) |
| `PUT` | `/notes/:id` | Yes | Update a note |
| `DELETE` | `/notes/:id` | Yes | Delete a note |

### Tasks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/tasks` | Yes | List all tasks (supports `?status`, `?priority`, `?relatedLead`) |
| `POST` | `/tasks` | Yes | Create a task |
| `PUT` | `/tasks/:id` | Yes | Update a task (auto-sets `completedAt` on "Completed") |
| `DELETE` | `/tasks/:id` | Yes | Delete a task |

### AI (Gemini)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/ai/status` | Yes | Check if AI is configured + current model |
| `POST` | `/ai/lead-summary` | Yes | Generate AI summary, risk score & next-best-action for a lead |
| `POST` | `/ai/generate-email` | Yes | Draft a sales email for a lead |
| `POST` | `/ai/sales-insights` | Yes | Get pipeline health analysis & recommendations |

### Analytics

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/analytics/overview` | Yes | Dashboard stats, pipeline breakdown, 6-month trend, and recent leads |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Express 5** | REST API framework with native async error handling |
| **Mongoose 9** | MongoDB ODM with schema validation |
| **jsonwebtoken** | JWT-based authentication |
| **bcryptjs** | Password hashing (bcrypt, 10 salt rounds) |
| **@google/genai** | Gemini AI SDK for structured JSON generation |
| **morgan** | HTTP request logging (dev mode) |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library with hooks |
| **Vite 8** | Build tool & dev server |
| **React Router 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first styling |
| **Recharts** | Data visualization & charts |
| **@dnd-kit** | Drag-and-drop for Kanban pipeline |
| **Lucide React** | Icon library |
| **React Hook Form** | Form state management |
| **Axios** | HTTP client |
| **Sonner** | Toast notifications |
| **date-fns** | Date formatting utilities |

---

## 🔒 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret for signing JWTs (64+ bytes recommended) |
| `JWT_EXPIRES_IN` | ❌ | Token expiry duration (default: `7d`) |
| `GEMINI_API_KEY` | ❌ | Google Gemini API key (AI features disabled without it) |
| `GEMINI_MODEL` | ❌ | Gemini model name (default: `gemini-3.6-flash`) |
| `CLIENT_URL` | ❌ | Allowed CORS origin (default: `http://localhost:5173`) |
| `PORT` | ❌ | Server port (default: `8000`) |
| `NODE_ENV` | ❌ | Set to `production` to disable morgan logging & stack traces |

---

## 📋 Data Models

### User
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, min 6 chars, bcrypt hashed, excluded from queries by default |
| `role` | Enum | `Owner` (default), `Member` |
| `company` | String | Optional |
| `avatar` | String | Optional URL |

### Lead
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email`, `phone`, `company` | String | Optional |
| `status` | Enum | `New`, `Qualified`, `Proposal`, `Won`, `Lost` |
| `priority` | Enum | `Low`, `Medium`, `High` |
| `source` | Enum | `Website`, `Referral`, `Cold Outreach`, `Social`, `Event`, `Other` |
| `value` | Number | Deal value (min: 0) |
| `tags` | [String] | Arbitrary tags |
| `aiSummary` | String | Auto-populated by AI |
| `aiRiskScore` | Number | 0–100, auto-populated by AI |
| `order` | Number | Pipeline ordering |

### Contact
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email`, `phone`, `company`, `title` | String | Optional |
| `tags` | [String] | Arbitrary tags |
| `notes` | String | Freeform notes |
| `favorite` | Boolean | Default: false |

### Note
| Field | Type | Notes |
|-------|------|-------|
| `content` | String | Required |
| `lead` | ObjectId ref | Optional link to a Lead |
| `contact` | ObjectId ref | Optional link to a Contact |
| `pinned` | Boolean | Default: false |

### Task
| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required |
| `description` | String | Optional |
| `dueDate` | Date | Optional |
| `status` | Enum | `Pending`, `In Progress`, `Completed` |
| `priority` | Enum | `Low`, `Medium`, `High` |
| `relatedLead` | ObjectId ref | Optional link to a Lead |
| `relatedContact` | ObjectId ref | Optional link to a Contact |
| `completedAt` | Date | Auto-set when status becomes "Completed" |

---

## 🧪 Endpoint Test Results

All **26 endpoints** have been tested against a live server with MongoDB Atlas.

```
 ✅ GET    /api/health                 200
 ✅ POST   /api/auth/register          201
 ✅ POST   /api/auth/login             200
 ✅ GET    /api/auth/me                200
 ✅ PUT    /api/auth/profile           200
 ✅ POST   /api/leads                  201
 ✅ GET    /api/leads                  200
 ✅ GET    /api/leads/:id              200
 ✅ PUT    /api/leads/:id              200
 ✅ DELETE /api/leads/:id              200
 ✅ PATCH  /api/leads/reorder          200
 ✅ POST   /api/contacts               201
 ✅ GET    /api/contacts               200
 ✅ GET    /api/contacts/:id           200
 ✅ PUT    /api/contacts/:id           200
 ✅ DELETE /api/contacts/:id           200
 ✅ POST   /api/notes                  201
 ✅ GET    /api/notes                  200
 ✅ PUT    /api/notes/:id              200
 ✅ DELETE /api/notes/:id              200
 ✅ POST   /api/tasks                  201
 ✅ GET    /api/tasks                  200
 ✅ PUT    /api/tasks/:id              200
 ✅ DELETE /api/tasks/:id              200
 ✅ GET    /api/ai/status              200
 ✅ POST   /api/ai/lead-summary        200
 ✅ POST   /api/ai/generate-email      200
 ✅ POST   /api/ai/sales-insights      200
 ✅ GET    /api/analytics/overview     200
```

**Server logs:** Zero errors, zero deprecation warnings.

---

## 👤 Author

**Samir Sah**

---

## 📄 License

This project is licensed under the **ISC License**.
