
# 🚀 TaskSync – Real-time Collaborative Task Manager

TaskSync is a modern, full-stack Kanban-style task management application that allows users and teams to collaborate in real-time. Organize your tasks visually, communicate via live chat, and boost productivity with a beautiful interface and responsive experience.

---

## 🖼️ Preview

_Add preview images or screen recordings here_

---

## ✨ Features

- 🔐 User authentication with JWT (Login & Register)
- 🗂️ Create custom boards and drag & drop tasks
- 🧠 Task states: To Do, In Progress, Done
- ✍️ Edit/delete tasks via modal
- 💬 Real-time chat per board using Socket.IO
- 🎨 Dark mode toggle & responsive UI
- 🌈 Framer Motion animations for UI smoothness

---

## 💻 Tech Stack

### Frontend
- **React + Vite**
- Tailwind CSS
- Redux Toolkit
- Axios
- Framer Motion
- @hello-pangea/dnd
- React Toastify

### Backend
- **Node.js + Express**
- MongoDB + Mongoose
- JWT for auth
- Socket.IO for real-time communication

---

## 📦 Project Structure

```
tasksync/
├── frontend/   # React + Tailwind App
└── backend/    # Express + Socket.IO API
```

---

## 🚀 Setup & Run Locally

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Add your MongoDB URI and JWT_SECRET
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # Add VITE_API_URL pointing to your backend
npm run dev
```

---

## 🌐 Deployment

- 🔹 **Frontend** deployed on [Vercel](https://vercel.com/)
- 🔹 **Backend** hosted on [Render](https://render.com/)

---

## 📷 Screenshots

_Add screenshots here once UI is finalized_

---

## 🙌 Author

Made with 💛 by **Marían Molina López**  

---

## 📄 License

MIT License. Use freely and contribute back 🌍
