# asherDn Workspace Backend API

# Overview

The asherDn Workspace Backend API is a RESTful backend service developed using Node.js, Express.js, MongoDB, and JWT Authentication. The system enables users to register, authenticate, manage personal tasks, and track work progress securely.

The application follows a structured backend architecture with authentication, middleware protection, database integration, and ownership-based authorization.

# Base URL

http://localhost:3000

Authentication

Protected routes require a valid JWT access token.

### Authorization Header

```http
Authorization: Bearer <access_token>
```

---

# Authentication APIs

## Register User

Creates a new user account.

### Endpoint

```http
POST /auth/register
```

### Request Body

| Field        | Type   | Required | Description          |
| ------------ | ------ | -------- | -------------------- |
| userName     | String | Yes      | User's name          |
| userEmail    | String | Yes      | User's email address |
| userPassword | String | Yes      | User password        |

### Example Request

```json
{
    "userName": "Aadhith",
    "userEmail": "aadhith@gmail.com",
    "userPassword": "123456"
}
```

### Success Response

**201 Created**

```json
{
    "id": "685f1a9c5d3a2f4b6c9d1e01",
    "userName": "Aadhith",
    "userEmail": "aadhith@gmail.com"
}
```

### Error Responses

**400 Bad Request**

```json
{
    "message": "Fill all the required input"
}
```

```json
{
    "message": "Email already used"
}
```

---

## Login User

Authenticates an existing user and generates a JWT access token.

### Endpoint

```http
POST /auth/login
```

### Request Body

| Field        | Type   | Required |
| ------------ | ------ | -------- |
| userEmail    | String | Yes      |
| userPassword | String | Yes      |

### Example Request

```json
{
    "userEmail": "aadhith@gmail.com",
    "userPassword": "123456"
}
```

### Success Response

**200 OK**

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Error Responses

**401 Unauthorized**

```json
{
    "message": "User not found"
}
```

```json
{
    "message": "Email and password not matched"
}
```

---

## Get User Profile

Returns information about the currently authenticated user.

### Endpoint

```http
GET /auth/profile
```

### Authentication

Required

### Success Response

**200 OK**

```json
{
    "id": "685f1a9c5d3a2f4b6c9d1e01",
    "name": "Aadhith",
    "email": "aadhith@gmail.com"
}
```

---

# Task Management APIs

## Create Task

Creates a new task associated with the authenticated user.

### Endpoint

```http
POST /tasks
```

### Authentication

Required

### Request Body

| Field       | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| title       | String | Yes      | Task title                      |
| description | String | No       | Task description                |
| status      | String | No       | pending, in-progress, completed |
| priority    | String | No       | low, medium, high               |

### Example Request

```json
{
    "title": "Complete API Documentation",
    "description": "Prepare README and API docs",
    "status": "pending",
    "priority": "high"
}
```

### Success Response

**201 Created**

```json
{
    "_id": "6860ab1234567890",
    "title": "Complete API Documentation",
    "description": "Prepare README and API docs",
    "status": "pending",
    "priority": "high",
    "user": "685f1a9c5d3a2f4b6c9d1e01",
    "createdAt": "2026-05-25T10:00:00.000Z",
    "updatedAt": "2026-05-25T10:00:00.000Z"
}
```

---

## Get All Tasks

Returns all tasks belonging to the authenticated user.

### Endpoint

```http
GET /tasks
```

### Authentication

Required

### Success Response

**200 OK**

```json
[
    {
        "_id": "6860ab1234567890",
        "title": "Complete API Documentation",
        "description": "Prepare README and API docs",
        "status": "pending",
        "priority": "high"
    }
]
```

---

## Get Task By ID

Returns a specific task owned by the authenticated user.

### Endpoint

```http
GET /tasks/:id
```

### Authentication

Required

### Success Response

**200 OK**

```json
{
    "_id": "6860ab1234567890",
    "title": "Complete API Documentation",
    "description": "Prepare README and API docs",
    "status": "pending",
    "priority": "high"
}
```

### Error Responses

**404 Not Found**

```json
{
    "message": "Task not found"
}
```

**403 Forbidden**

```json
{
    "message": "Access denied"
}
```

---

## Update Task

Updates an existing task owned by the authenticated user.

### Endpoint

```http
PUT /tasks/:id
```

### Authentication

Required

### Example Request

```json
{
    "status": "completed",
    "priority": "medium"
}
```

### Success Response

**200 OK**

```json
{
    "_id": "6860ab1234567890",
    "title": "Complete API Documentation",
    "description": "Prepare README and API docs",
    "status": "completed",
    "priority": "medium"
}
```

---

## Delete Task

Deletes a task owned by the authenticated user.

### Endpoint

```http
DELETE /tasks/:id
```

### Authentication

Required

### Success Response

**200 OK**

```json
{
    "message": "Task deleted successfully"
}
```

---

## Task Statistics

Returns dashboard statistics for the authenticated user.

### Endpoint

```http
GET /tasks/stats
```

### Authentication

Required

### Success Response

**200 OK**

```json
{
    "totalTasks": 12,
    "completedTasks": 5,
    "pendingTasks": 4,
    "inProgressTasks": 3
}
```

---

# Task Status Values

| Value       |
| ----------- |
| pending     |
| in-progress |
| completed   |

---

# Task Priority Values

| Value  |
| ------ |
| low    |
| medium |
| high   |

---

# Ownership & Authorization

The application enforces ownership-based authorization.

Users can:

* Create their own tasks
* View their own tasks
* Update their own tasks
* Delete their own tasks

Users cannot access or modify tasks belonging to other users.

---

# Technology Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt
* express-async-handler

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=your_port

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_secret_key
```

---

# Running the Application

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node app.js
```

