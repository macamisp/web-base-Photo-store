<div align="center">

# 📸 PhotoStore - Google Photos Clone

### A Modern, Full-Featured Photo Storage & Management Web Application

![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=for-the-badge&logo=supabase&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Store, organize, edit, and share your precious memories with a beautiful, intuitive interface**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## ✨ Features

PhotoStore is a production-ready photo management application with **dual backend architecture** - choose between cloud-based Supabase or self-hosted MySQL backend.

### 🔐 **Authentication & Security**
- Secure user registration and login (Supabase Auth or JWT)
- Row-level security for data isolation
- Protected routes with automatic redirect
- Password reset and session management

### 📤 **Intuitive Photo Upload**
- 🎯 Drag & drop interface
- 📦 Batch upload support
- 💾 Real-time storage tracking (500MB per user)
- ✅ Automatic file validation (JPG, PNG, GIF, WebP)

### 🖼️ **Beautiful Photo Gallery**
- Responsive masonry grid layout
- Lazy loading for optimal performance
- Smooth animations and hover effects
- Chronological sorting

### ✏️ **Professional Photo Editing**
- 🔆 Brightness adjustment (0-200%)
- 🎨 Contrast control (0-200%)
- 🌈 Saturation tuning (0-200%)
- 🔄 90° rotation
- 📝 Title editing
- ⚡ Real-time preview with HTML5 Canvas

### 🔗 **Smart Sharing**
- 📋 One-click copy to clipboard
- 📧 Email sharing integration
- 💬 WhatsApp direct sharing
- 🌐 Public URL generation

### 💾 **Storage Management**
- Visual progress bar with color-coded warnings
  - 🟢 Green (0-70%): Safe
  - 🟠 Orange (70-90%): Warning
  - 🔴 Red (90-100%): Critical
- Automatic storage reclamation on delete
- Human-readable size formatting

### 🎨 **Premium UI/UX**
- Modern glassmorphism design
- Eye-friendly dark theme
- Animated gradient backgrounds
- Smooth micro-interactions
- Fully responsive (mobile, tablet, desktop)

> **📖 For detailed feature documentation, see [FEATURES.md](FEATURES.md)**

---

## 🏗️ Architecture Overview

PhotoStore offers **two backend options** to suit different deployment needs:
                      ┌─────────────────┐
                      │  React Frontend │
                      │   (Vite + React)│
                      └────────┬────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
    ┌───────────▼──────────┐      ┌──────────▼──────────┐
    │  Supabase Backend    │      │   MySQL Backend     │
    │   (Cloud-Hosted)     │      │   (Self-Hosted)     │
    └───────────┬──────────┘      └──────────┬──────────┘
                │                             │
    ┌───────────┼───────────┐     ┌──────────┼──────────┐
    │           │           │     │          │          │
┌────▼───┐ ┌───▼────┐ ┌──▼──┐ ┌─▼──┐ ┌───▼───┐ ┌───▼───┐
│Postgres│ │Supabase│ │Auth │ │MySQL│ │ Local │ │ JWT │
│ DB │ │Storage │ │ │ │ DB │ │Storage│ │ Auth │
└────────┘ └────────┘ └─────┘ └─────┘ └───────┘ └───────┘


### When to Use Each Backend

| Feature | Supabase (Cloud) | MySQL (Self-Hosted) |
|---------|------------------|---------------------|
| **Setup Time** | ⚡ Fast (5 min) | ⏱️ Moderate (15 min) |
| **Hosting** | ☁️ Cloud-managed | 🖥️ Your server |
| **Scaling** | 📈 Auto-scaling | 🔧 Manual |
| **Cost** | 💰 Free tier available | 💵 Server costs |
| **Best For** | Quick demos, production apps | Full control, local dev |

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19 with Vite
- **Routing:** React Router DOM v7
- **State Management:** Context API
- **Styling:** Vanilla CSS with CSS Variables
- **Icons:** Lucide React
- **Image Editing:** HTML5 Canvas API

### Backend Options

#### Option A: Supabase (Cloud)
- **Database:** PostgreSQL
- **Storage:** Supabase Storage (S3-compatible)
- **Authentication:** Supabase Auth
- **Real-time:** Supabase Subscriptions

#### Option B: MySQL (Self-Hosted)
- **Server:** Node.js + Express
- **Database:** MySQL 8.0+
- **Storage:** Local filesystem
- **Authentication:** JWT + bcrypt
- **File Uploads:** Multer

---

## 📋 Prerequisites

- **Node.js** 16+ and npm
- **Git** for version control

**For Supabase Backend:**
- Supabase account ([Sign up here](https://supabase.com))

**For MySQL Backend:**
- MySQL 8.0+ installed locally or on server
- MySQL credentials (host, user, password, database)

---

## ⚡ Quick Start

### Option A: Supabase Backend (Recommended for Quick Start)

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/macamisp/web-base-Photo-store.git
cd "Photo store"
npm install
# Copy the example file
cp .env.example .env

# Edit .env and add your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
npm run dev
git clone https://github.com/macamisp/web-base-Photo-store.git
cd "Photo store"

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
-- Create database
CREATE DATABASE photostore;

-- Run schema (see MYSQL_SETUP.md for full schema)
cd backend
cp .env.example .env

# Edit backend/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=photostore
DB_PORT=3306
JWT_SECRET=your_super_secret_key_here
PORT=5000

# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd ..
npm run dev

Photo store/
├── 📂 src/                         # Frontend source
│   ├── 📂 components/              # React components
│   │   ├── EditPhotoModal.jsx     # Photo editing interface
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── PhotoGrid.jsx          # Photo gallery grid
│   │   ├── PhotoModal.jsx         # Photo viewer
│   │   ├── ProtectedRoute.jsx     # Auth guard
│   │   ├── ShareModal.jsx         # Sharing interface
│   │   └── UploadModal.jsx        # Upload interface
│   ├── 📂 contexts/
│   │   └── AuthContext.jsx        # Authentication state
│   ├── 📂 lib/
│   │   └── supabase.js            # Supabase client config
│   ├── 📂 pages/
│   │   ├── Auth.css               # Auth pages styling
│   │   ├── Home.jsx               # Main dashboard
│   │   ├── Login.jsx              # Login page
│   │   └── Register.jsx           # Registration page
│   ├── App.jsx                    # Root component
│   ├── index.css                  # Global styles & design system
│   └── main.jsx                   # App entry point
│
├── 📂 backend/                     # MySQL backend (optional)
│   ├── 📂 config/
│   │   ├── database.js            # MySQL connection
│   │   └── init-db.js             # Database initialization
│   ├── 📂 controllers/
│   │   ├── authController.js      # Auth logic
│   │   └── photoController.js     # Photo operations
│   ├── 📂 middleware/
│   │   └── auth.js                # JWT authentication
│   ├── 📂 routes/
│   │   ├── authRoutes.js          # Auth endpoints
│   │   └── photoRoutes.js         # Photo endpoints
│   ├── server.js                  # Express server
│   └── package.json               # Backend dependencies
│
├── 📄 .env.example                 # Environment template
├── 📄 FEATURES.md                  # Detailed feature guide
├── 📄 MYSQL_SETUP.md              # MySQL setup instructions
├── 📄 SETUP_GUIDE.md              # Comprehensive setup guide
├── 📄 SUPABASE_SCHEMA.md          # Supabase database schema
├── 📄 README.md                    # This file
└── 📄 package.json                 # Frontend dependencies

/* Primary Colors */
--primary: hsl(250, 84%, 54%);      /* Purple/Blue */
--accent: hsl(280, 100%, 70%);      /* Magenta */

/* Background Layers */
--bg-primary: hsl(240, 10%, 8%);    /* Dark base */
--bg-secondary: hsl(240, 10%, 12%); /* Elevated surfaces */

/* Text Hierarchy */
--text-primary: hsl(0, 0%, 95%);    /* Main text */
--text-secondary: hsl(0, 0%, 70%);  /* Secondary text */
--text-tertiary: hsl(0, 0%, 50%);   /* Muted text */












    
