# 📝 Devnovate Blogging Platform

A **full-stack MERN blogging and article platform** where users can create and submit blogs, and admins ensure content quality through moderation.  
Features include **admin approvals, trending blogs, search, responsive UI, and secure authentication** — all built with **MongoDB, Express.js, React, and Node.js**.

---

## 🌟 Features

### 👥 User Side
- 🔐 Signup/Login with JWT authentication  
- ✍️ Create, edit, and submit blogs for approval  
- 📂 User profile to manage drafts, submitted, and published articles  
- ❤️ Like and 💬 comment on published blogs  

### 🛡️ Admin Side
- 📊 Dashboard to view pending blog submissions  
- ✅ Approve or ❌ reject blogs with feedback  
- 👁️ Hide or 🗑️ delete published articles  
- 📈 Basic analytics (views, likes, comments)  

### 📰 Core Platform
- 🏠 Homepage with latest blogs  
- 🔍 Search & filter by title, tags, or author  
- 📱 Responsive design (mobile & desktop)  
- 📢 Trending section powered by likes + comments
- 
---

## 🚀 Tech Stack

- **Frontend:** React, React Router, React Query, Tailwind/MUI (flexible)  
- **Backend:** Node.js, Express.js, Mongoose  
- **Database:** SQL  
- **Authentication:** Supabase  

---

## 📂 Project Structure (Suggested)

```

devnovate-blogging-platform/
├── backend/                # Express
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, validation
│   ├── utils/              # Helpers (email, file upload, etc.)
│   └── server.js
│
├── frontend/               # React client app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Routes: Home, Blog, Profile, Admin
│   │   ├── hooks/          # React Query, auth
│   │   ├── context/        # Auth/Theme context
│   │   └── App.js
│   └── vite.config.js
│
├── docker-compose.yml      # For containerized setup
├── README.md
└── package.json

````

---

## ⚡ API Highlights

| Method | Endpoint                     | Description                          | Auth Required |
|--------|-------------------------------|--------------------------------------|---------------|
| POST   | `/auth/signup`                | Register a new user                  | No            |
| POST   | `/auth/login`                 | User login & receive JWT             | No            |
| GET    | `/blogs`                      | List published blogs                 | No            |
| POST   | `/blogs`                      | Create draft blog                    | User          |
| POST   | `/blogs/:id/submit`           | Submit draft for review              | User (Owner)  |
| POST   | `/admin/blogs/:id/approve`    | Approve blog                         | Admin         |
| POST   | `/admin/blogs/:id/reject`     | Reject blog with reason              | Admin         |
| POST   | `/blogs/:id/like`             | Like/Unlike a blog                   | User          |
| POST   | `/blogs/:id/comments`         | Add comment to blog                  | User          |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/devnovate-blogging-platform.git
cd devnovate-blogging-platform
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # Add MongoDB URI, JWT secrets, etc.
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # Add API base URL
npm run dev
```

---

## 🔐 Environment Variables

Backend `.env` example:

```

---

## 🌍 Deployment

* **Frontend:** Vercel 
* **Backend:** Supabase
* **Database:** MongoDB Atlas
* **Storage (optional):** Cloudinary or AWS S3
* **CI/CD:** GitHub Actions

---

## 📊 Roadmap

* ✅ MVP with moderation + trending blogs
* 🚧 Email notifications + markdown editor
* 🚧 Advanced analytics dashboards
* 🚧 Community features (follows, personalized feed)
* 🚧 Mobile app (React Native / Flutter)

---

## 🧑‍💻 Contributing

Contributions are welcome! 🙌

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push and open a PR

---

## 📜 License

MIT License © 2025 [Devnovate](https://devnovate.app)

---

✨ This README is professional yet developer-friendly, showcasing features, setup, tech stack, and roadmap.  

Would you like me to also **add badges (build status, license, PRs welcome, etc.) and a project logo/banner** at the top for extra polish?
```

