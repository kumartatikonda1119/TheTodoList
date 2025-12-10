# 📝 ToDo List – MERN Stack Productivity App

A clean, responsive, and user-friendly **ToDo List** application built using the **MERN stack** (MongoDB, Express, React, Node.js). Users can register, log in, and manage their daily tasks efficiently with a minimal and intuitive UI.

---

## 🚀 Features

### 👤 Authentication
- User registration & login
- Password hashing using **bcrypt**
- **JWT-based authentication**
- Auth token stored in **HTTP-only cookies**
- Protected backend routes

### ✅ Task Management
- Add new tasks
- Mark tasks completed/pending
- Edit existing tasks
- Delete tasks
- Filter tasks: **All / Completed / Pending**
- Timestamps for tasks

### 🖥 Frontend Experience
- Clean & minimal UI
- Fully responsive design
- Smooth interactions and subtle animations

### 🛠 Developer Experience
- Proper MERN structure
- Modular backend routes and controllers
- Reusable React components
- Environment-based config for dev and production

---

## 🧱 Tech Stack

**Frontend:** React, React Router, Axios, CSS / Tailwind  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser, cors

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/kumartatikonda/TheTodoList
cd TheTodoList


### 2️⃣ Install Backend Dependencies

cd backend
npm install

shell
Copy code

### 3️⃣ Install Frontend Dependencies

cd ../client
npm install

yaml
Copy code

---

## 🔐 Environment Variables

Create a `.env` file inside **backend**:

PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development

yaml
Copy code

Replace values according to your setup.

---

## ▶️ Running the App Locally

### Backend

cd backend
npm run dev

shell
Copy code

### Frontend

cd client
npm run dev

markdown
Copy code

Default URLs:
- Frontend → `http://localhost:5173`
- Backend → `http://localhost:5001`

---



## 🚢 Deployment Guide

### If Hosting Frontend & Backend Separately

- Frontend → Vercel / Netlify  
- Backend → Render / Railway / DigitalOcean

Update your frontend API base URL:

```js
axios.defaults.baseURL = "https://your-backend-domain/api";
Enable CORS with credentials in backend and set:

ini
Copy code
CLIENT_URL=https://your-frontend-domain
🎯 Future Enhancements
Categories for tasks

Due dates & reminders

Search & sorting

Drag-and-drop task ordering

User profile page

Dark mode toggle

📸 Screenshots
Add screenshots here after deployment.

🤝 Contributing
Contributions are welcome. You can:

Fork the repo

Create issues

Submit pull requests

📬 Contact
Developer: Your Name
GitHub: https:github.com/kumartatikonda1119
LinkedIn: your-linkedin-profile

Made with ❤️ using the MERN Stack.