# Task Manager Application (PERN Stack)

A full-stack Task Manager application built using the **PERN stack (PostgreSQL, Express, React, Node.js)**.  
The application supports secure authentication, protected routes, and user-specific task management with a clean and premium light/dark themed UI.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes on both backend and frontend

### 📝 Task Management
- Create, update, and delete tasks
- Mark tasks as completed
- Task status support (`todo`, `in_progress`, `done`)
- Priority levels (1–4)
- User-specific task ownership enforced

### 🎨 Frontend UI
- Built with React + Vite
- Premium light and dark theme with persistence
- Protected routes using React Router
- Centralized authentication state using React Context
- Modal-based task creation and editing
- Responsive and modern UI (no UI libraries)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js (ES Modules)
- PostgreSQL
- JWT (Authentication)
- bcrypt (Password hashing)
- pg (Database client)
- dotenv (Environment variables)

### Frontend
- React
- Vite
- React Router v6
- Axios
- Context API (Auth state management)
- Custom CSS (no UI libraries)

---

## 📁 Project Structure

task-manager/
├── server/
│ ├── src/
│ │ ├── app.js
│ │ ├── config/
│ │ │ └── db.js
│ │ ├── controllers/
│ │ │ ├── auth.controller.js
│ │ │ └── task.controller.js
│ │ ├── routes/
│ │ │ ├── auth.routes.js
│ │ │ └── task.routes.js
│ │ ├── middlewares/
│ │ │ └── auth.middleware.js
│ ├── .env
│ └── package.json
│
├── client/
│ ├── src/
│ │ ├── api/
│ │ │ └── axios.js
│ │ ├── auth/
│ │ │ ├── AuthContext.jsx
│ │ │ ├── PrivateRoute.jsx
│ │ │ └── useAuth.js
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── package.json
│
└── README.md

---

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt
3. User logs in and receives a JWT
4. JWT is stored on the client
5. Requests include `Authorization: Bearer <token>`
6. Backend middleware validates the token
7. User-specific access control is enforced

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks (Protected)
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd task-manager
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
```
- Create a .env file:
```bash
PORT=3137
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

- Start the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

- Frontend runs on:
```bash
http://localhost:5173
```

- Backend runs on:
```bash
http://localhost:3137
```

### 🚀 Future Improvements

1. Task search and filtering
2. Drag-and-drop task ordering
3. UI micro-interactions and animations
4. Performance optimizations

### 👨‍💻 Author

**Chenna Sai Charan**
Second-year CSE student, NIT Andhra Pradesh
Focused on building scalable and maintainable full-stack applications.
