# 🧑‍💼 HRMS Lite – Full Stack Application

HRMS Lite is a lightweight Human Resource Management System built as part of a full-stack coding assignment.  
The application allows an admin to manage employee records and track daily attendance using a clean, simple, and production-ready interface.

---

## 🚀 Features

### Employee Management
- Add a new employee
  - Employee ID (unique)
  - Full Name
  - Email Address (validated)
  - Department
- View all employees
- Delete an employee
- View employee-specific attendance details

### Attendance Management
- Mark attendance (Present / Absent)
- Attendance date defaults to today
- View attendance records per employee
- Filter attendance by date range (From / To)
- Display total present days per employee

### UI & UX
- Clean landing page with navigation
- Loading, empty, and error states
- Reusable UI components
- Simple, professional layout
- No authentication (single admin assumption)

---

## 🛠 Tech Stack

### Backend
- Django
- Django REST Framework
- SQLite (can be replaced with PostgreSQL/MySQL)
- RESTful APIs
- Server-side validations and error handling

### Frontend
- React 18 (via CDN)
- Babel (in-browser transpilation)
- Plain HTML, CSS, JavaScript
- No bundlers or build tools

### Deployment
- Backend: Render / Railway
- Frontend: Static hosting (Vercel / Netlify / local HTTP server)

---

## 🔌 Backend API Endpoints

### Employee APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/employees/` | List all employees |
| POST | `/api/employees/` | Create a new employee |
| DELETE | `/api/employees/{id}/` | Delete an employee |
| GET | `/api/employees/options/` | Employee list for dropdown |

### Attendance APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/attendance/` | Mark attendance |
| GET | `/api/employees/{id}/attendance/` | Attendance records for employee |
| GET | `/api/employees/{id}/attendance/summary/` | Attendance summary |

All APIs return proper HTTP status codes and meaningful error messages.

---

## ✅ Validations

### Backend
- Required field validation
- Unique employee ID enforcement
- Email format validation
- Duplicate employee handling
- Graceful error responses

### Frontend
- Required field validation
- Email format validation
- Inline error messages on forms
- Safe handling of loading and empty states

---

## ▶️ Running the Project Locally

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
