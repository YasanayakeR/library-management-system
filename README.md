# Library Management System

A full stack web based Library Management System developed using React (TypeScript) for the frontend and ASP.NET Core Web API for the backend.

The system enables administrators to manage books and categories efficiently while ensuring secure authentication using JWT and BCrypt password hashing.

## Features

- Secure User Authentication (JWT Based Login)

- BCrypt Password Hashing

- Add / Edit / Delete Books

- Category Management

- Role-Based Access (Admin)

- Responsive UI using Tailwind CSS

- SQLite Database Integration

- Automatic Database Creation & Seeding

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS
- Axios
- React Toastify
- JWT Authentication

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQLite Database
- BCrypt Password Hashing
- JWT Authentication

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YasanayakeR/library-management-system.git
cd library-management-system
```

### 2. Backend Setup
1. **Navigate to the Backend folder:**
   ```bash
   cd backend
   ```
2. **Restore dependencies:**
   ```bash
   dotnet restore
   ```
3. **Run the Backend server:**
   ```bash
   dotnet run
   ```

### 3. Frontend Setup
1. **Navigate to the Frontend folder:**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the Frontend application:**
   ```bash
   npm start
   ```

---

## Application Access

| Service | URL |
| :--- | :--- |
| **Frontend UI** | [http://localhost:3000](http://localhost:3000) |
| **Backend API** | [http://localhost:5186](http://localhost:5186) |
| **Swagger UI** | [http://localhost:5186/swagger](http://localhost:5186/swagger) |

### Default Admin Login
- **Username:** `admin`
- **Password:** `123456`

---

## Database Configuration

The system uses **SQLite** with **Entity Framework Core**. When the backend is started for the first time:
- The `library.db` file will be automatically created.
- All required tables (`Users`, `Books`, `Categories`) will be generated.
- A default Admin user will be seeded.
- Default book categories will be inserted.
- **No manual database setup or SQL commands are required.**

---

## Authentication & Security

- **JWT tokens** are generated upon successful login and used for protected routes.
- **Passwords** are securely hashed using **BCrypt** before being stored.
- Protected endpoints require a valid JWT token in the Authorization header.

## Notes

- Ensure the backend server is running before starting the frontend.
- Admin credentials are auto-generated during the first application startup.

---
