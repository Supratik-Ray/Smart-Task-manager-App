# 📱 Smart Task Manager

A full-stack **TypeScript-based task management application** built with a modern mobile-first architecture. The app enables users to efficiently manage tasks, track daily productivity, and organize work using powerful filtering and search capabilities.

---

## 📦 Download APK

Download the latest Android build from GitHub Releases:

👉 **[Download APK](../../releases)**

*(Upload your APK file in the Releases section for this link to work)*

---

## 🚀 Tech Stack

### Frontend (Mobile)
- Expo + React Native
- TypeScript
- NativeWind
- Expo Router
- Custom Hooks + Modular Architecture

### Backend
- Node.js + Express
- TypeScript
- Drizzle ORM
- NeonDB (PostgreSQL)
- Zod Validation
- JWT Authentication
- REST API Architecture
- Monorepo setup with shared packages

---

## ✨ Features

- 🔐 Authentication (Signup, Login, Profile)
- 📝 Full Task CRUD
- 📊 Daily progress tracking on Home screen
- 📅 Calendar view for task planning
- 🔎 Search tasks instantly
- 🎯 Filter tasks by:
  - Status
  - Priority
- 🧩 Scalable modular architecture
- ⚡ End-to-end TypeScript (frontend + backend)

---

## 📲 Screens

- Auth Screens (Login / Signup)
- Home Dashboard
- Calendar View
- Profile Screen
- Create Task Modal

---

## 🌐 Backend Deployment

**Base URL**

```
https://smart-task-manager-app-2.onrender.com
```

---

## 🔐 Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/me` | Get current authenticated user |

---

## 📌 Task Routes

**Base:** `/api/v1/tasks`

### Get All Tasks
```
GET /
```
Returns all tasks belonging to the authenticated user.

---

### Get Task Buckets (Home Screen Data)
```
GET /home-buckets
```
Returns grouped task data used for dashboard progress analytics.

---

### Get Single Task
```
GET /:id
```
Fetch a task by ID.

---

### Create Task
```
POST /
```
**Validation:** `createTaskSchema`  
Creates a new task.

---

### Update Task
```
PATCH /:id
```
**Validation:** `updateTaskSchema`  
Updates selected task fields.

---

### Delete Task
```
DELETE /:id
```
Deletes a task.

---

## 🔎 Validation System

All API inputs are validated using **Zod schemas** via a reusable middleware:

```
validate(schema, source)
```

Supported sources:
- body
- params
- query

---

## 🔑 Authentication Flow

1. User signs up or logs in  
2. Server returns JWT token  
3. Client stores token  
4. Token sent in headers for protected routes  

Header format:

```
Authorization: Bearer <token>
```

---

## 🛠 Local Development Setup

### Clone Repository
```bash
git clone https://github.com/your-username/smart-task-manager.git
cd smart-task-manager
```

---

### Backend
```bash
cd backend
npm install
npm run dev
```

---

### Mobile App
```bash
cd mobile
npm install
npx expo start
```

---

## 🧠 Architecture Highlights

- Monorepo architecture with shared packages
- Centralized validation layer
- Strongly typed API contracts
- Scalable controller-based backend
- Clean separation of concerns

---

## 📈 Future Improvements

- Push notifications
- Offline sync
- Dark mode
- Task reminders
- Collaboration / shared tasks

---

## 👤 Author

**Supratik Ray**

---

## 📄 License

MIT License — free to use and modify.
