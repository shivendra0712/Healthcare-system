# Healthcare System - MERN Stack Application

A full-stack healthcare management system built with MongoDB, Express.js, React.js, and Node.js. Features role-based authentication, content management, and user administration.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Healthcare-system
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://shivendra:Shivendra123@patient-dashboard.9yngvv4.mongodb.net/Patient-Dashboard-mongodb
JWT_SECRET=healthcare-system
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Create `.env` file in Frontend directory:
```env
 VITE_BACKEND_URL=http://localhost:5000/api/
```


### Running the Application

1. **Start MongoDB**
```bash
mongod
```

2. **Start Backend Server**
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:5000`

3. **Start Frontend**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 📁 Project Structure

```
Healthcare-system/
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   └── TherapyGroup.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── posts.js
│   │   │   └── users.js
│   │   └── app.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── store/
    │   └── App.jsx
    └── package.json
```

## ✨ Features

### Core Features ✅
- **Role-Based Authentication**: Admin, Editor, User roles with different permissions
- **User Management**: Admin can view and delete users
- **Content Management**: Editors can create, update, delete posts
- **JWT Authentication**: Secure login/signup with httpOnly cookies
- **RESTful APIs**: Complete CRUD operations
- **MongoDB Integration**: Atlas connection with Mongoose ODM
- **Middleware Protection**: Route-level authentication and authorization

### Advanced Features ✅
- **Cookie-Based Auth**: Secure httpOnly cookies for token storage
- **Role Authorization**: Different access levels for different user types
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts (Editor Only)
- `GET /api/posts` - Get all posts (Public)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (Editor only)
- `PUT /api/posts/:id` - Update post (Editor only)
- `DELETE /api/posts/:id` - Delete post (Editor only)

### Users (Admin Only)
- `GET /api/users` - Get all users (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Redux Toolkit** (State management)
- **TailwindCSS** (Styling)
- **React Router** (Navigation)
- **Axios** (HTTP client)

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **CORS** (Cross-origin requests)
- **Cookie Parser** (Cookie handling)
- **Express Validator** (Input validation)

## 📖 Usage

### User Roles
- **Admin**: Full access - manage users, view all content
- **Editor**: Content management - create, edit, delete posts
- **User**: Basic access - view public content

### Workflow
1. **Register/Login**: Create account with role assignment
2. **Role-Based Access**: Different features based on user role
3. **Content Management**: Editors can manage posts
4. **User Administration**: Admins can manage users
5. **Secure Authentication**: JWT tokens with httpOnly cookies

## 🔧 Development Notes

- Role-based middleware protects sensitive routes
- JWT tokens stored as httpOnly cookies for security
- Password hashing with bcryptjs before database storage
- CORS configured for frontend-backend communication
- ES modules used throughout the backend
- Mongoose ODM for MongoDB operations

