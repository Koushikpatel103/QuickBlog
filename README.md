<div align="center">

<img src="./client/src/assets/logo.svg" alt="QuickBlog Logo" width="180"/>

# QuickBlog

### AI-Powered Full-Stack Blog Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

<br/>

**[🚀 Live Demo](https://quickblog.vercel.app)** &nbsp;|&nbsp; **[🖥️ Backend API](https://quickblog-server.vercel.app)** &nbsp;|&nbsp; **[📂 GitHub](https://github.com/yourusername/quickblog)**

<br/>

![QuickBlog Demo](https://via.placeholder.com/900x480.png?text=QuickBlog+Screenshot)

</div>

---

## ✨ Features

- 📝 **Rich-Text Editor** — Full blog writing experience powered by Quill.js
- 🔐 **JWT Authentication** — Secure admin login with bcrypt password hashing
- 🖼️ **ImageKit CDN** — Auto WebP optimization with ~30% faster page loads
- 📊 **Admin Dashboard** — Manage blogs, comments, and analytics in one place
- 💬 **Comment Moderation** — Approve or delete comments from the dashboard
- 📱 **Fully Responsive** — Mobile-first design with Tailwind CSS
- ⚡ **REST API** — 13 clean endpoints for all blog and admin operations
- 🌐 **Deployed on Vercel** — Lightning-fast serverless deployment

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Vite, Tailwind CSS, Quill.js |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Auth** | JWT, Bcrypt |
| **Media** | ImageKit CDN |
| **Deployment** | Vercel (client + server) |

---

## 📁 Project Structure

```
QuickBlog/
├── client/                   # React frontend (Vite)
│   ├── src/
│   │   ├── Components/       # Reusable UI components
│   │   │   └── admin/        # Admin-specific components
│   │   ├── Pages/            # Route-level pages
│   │   │   └── admin/        # Admin dashboard pages
│   │   ├── context/          # Global state (AppContext)
│   │   └── assets/           # Images, icons, styles
│   ├── vercel.json           # SPA routing fix for Vercel
│   └── .env                  # VITE_BASE_URL
│
└── Server/                   # Express backend
    ├── controllers/          # Route logic
    ├── models/               # Mongoose schemas
    ├── Routes/               # API route definitions
    ├── Middleware/           # Auth middleware
    ├── configs/              # DB & ImageKit config
    ├── vercel.json           # Serverless config for Vercel
    └── .env                  # Server environment variables
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- ImageKit account

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/quickblog.git
cd quickblog
```

### 2. Setup the Server

```bash
cd Server
npm install
```

Create a `.env` file in the `Server` folder:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` folder:

```env
VITE_BASE_URL=http://localhost:4000
```

```bash
npm run dev
```

> Client runs on `http://localhost:5173`  
> Server runs on `http://localhost:4000`

---

## 🔑 Admin Access

Navigate to `/admin` to access the admin panel.

| Field | Value |
|-------|-------|
| URL | `http://localhost:5173/admin` |
| Email | *(as set in your `.env`)* |
| Password | *(as set in your `.env`)* |

---

## 📡 API Endpoints

### Blog Routes — `/api/blog`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/all` | Get all published blogs |
| `GET` | `/:id` | Get single blog by ID |
| `POST` | `/add` | Add a new blog *(auth)* |
| `POST` | `/toggle-publish` | Toggle publish status *(auth)* |
| `DELETE` | `/delete` | Delete a blog *(auth)* |

### Admin Routes — `/api/admin`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/login` | Admin login |
| `GET` | `/dashboard` | Get dashboard stats *(auth)* |
| `GET` | `/blogs` | Get all blogs *(auth)* |
| `GET` | `/comments` | Get all comments *(auth)* |
| `POST` | `/approve-comment` | Approve a comment *(auth)* |
| `POST` | `/delete-comment` | Delete a comment *(auth)* |

---

## ☁️ Deployment (Vercel)

### Deploy Server

1. Import repo on [Vercel](https://vercel.com), set root directory to `Server`
2. Add all environment variables from `.env`
3. Deploy → copy the server URL

### Deploy Client

1. Import same repo, set root directory to `client`
2. Set `VITE_BASE_URL` to your deployed server URL
3. Deploy → copy the client URL
4. Update CORS in `server.js` with the client URL and redeploy server

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "feat: add your feature"

# Push and open a PR
git push origin feature/your-feature
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Made with ❤️ by [Koushik Bonala](https://github.com/yourusername)

[![GitHub stars](https://img.shields.io/github/stars/yourusername/quickblog?style=social)](https://github.com/yourusername/quickblog)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/quickblog?style=social)](https://github.com/yourusername/quickblog/fork)

</div>
