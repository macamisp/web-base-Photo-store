<![CDATA[<div align="center">

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

```
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
   ┌────▼───┐  ┌───▼────┐  ┌──▼──┐ ┌─▼──┐  ┌───▼───┐  ┌───▼───┐
   │Postgres│  │Supabase│  │Auth │ │MySQL│  │ Local │  │  JWT  │
   │   DB   │  │Storage │  │     │ │ DB  │  │Storage│  │ Auth  │
   └────────┘  └────────┘  └─────┘ └─────┘  └───────┘  └───────┘
```

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
```

#### 2️⃣ Install Frontend Dependencies
```bash
npm install
```

#### 3️⃣ Set Up Supabase

1. **Create a Supabase Project** at [supabase.com](https://supabase.com)

2. **Set Up Database Schema**
   - Go to SQL Editor in your Supabase dashboard
   - Run the SQL commands from [`SUPABASE_SCHEMA.md`](SUPABASE_SCHEMA.md)

3. **Create Storage Bucket**
   - Navigate to Storage → Create bucket
   - Name: `photos`
   - Make it **public**
   - Apply storage policies from [`SUPABASE_SCHEMA.md`](SUPABASE_SCHEMA.md)

4. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy `Project URL` and `anon/public` key

#### 4️⃣ Configure Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 5️⃣ Start Development Server
```bash
npm run dev
```

🎉 **Open [http://localhost:5173](http://localhost:5173)** - You're ready to go!

---

### Option B: MySQL Backend (Self-Hosted)

#### 1️⃣ Clone & Install
```bash
git clone https://github.com/macamisp/web-base-Photo-store.git
cd "Photo store"

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

#### 2️⃣ Set Up MySQL Database

```sql
-- Create database
CREATE DATABASE photostore;

-- Run schema (see MYSQL_SETUP.md for full schema)
```

> **📖 See [`MYSQL_SETUP.md`](MYSQL_SETUP.md) for complete database setup instructions**

#### 3️⃣ Configure Backend Environment

```bash
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
```

#### 4️⃣ Start Both Servers

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd ..
npm run dev
```

🎉 **Open [http://localhost:5173](http://localhost:5173)** - Backend runs on port 5000!

---

## 📱 Usage Guide

### Getting Started

1. **Create Account** → Click "Create Account" and register
2. **Upload Photos** → Click "Upload Photos" and drag & drop files
3. **View Gallery** → Browse your photos in the responsive grid
4. **Edit Photos** → Click any photo → "Edit" button
5. **Share Photos** → Click any photo → "Share" button
6. **Manage Storage** → Monitor the storage bar at the top

### Photo Editing Workflow

1. Click on a photo to open viewer
2. Click **Edit** button
3. Adjust sliders:
   - 🔆 Brightness
   - 🎨 Contrast
   - 🌈 Saturation
4. Click **Rotate** to rotate 90°
5. Edit title if desired
6. Click **Save Changes**

### Sharing Photos

1. Click on a photo
2. Click **Share** button
3. Choose:
   - 📋 **Copy Link** - Copy to clipboard
   - 📧 **Email** - Opens email client
   - 💬 **WhatsApp** - Direct share

---

## 📁 Project Structure

```
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
```

---

## 🎨 Design System

### Color Palette
```css
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
```

### Design Principles
- **Glassmorphism:** Translucent surfaces with backdrop blur
- **Dark Theme:** Eye-friendly with high contrast
- **Micro-animations:** Smooth transitions (200-300ms)
- **Mobile-First:** Responsive breakpoints at 768px, 1024px
- **Accessibility:** WCAG AA compliant contrast ratios

---

## 🔧 Advanced Configuration

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

#### Deploy Frontend (Vercel/Netlify)

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Deploy MySQL Backend

- Use PM2 for process management
- Set up nginx as reverse proxy
- Configure SSL with Let's Encrypt
- Use environment variables for production

> **📖 See [`SETUP_GUIDE.md`](SETUP_GUIDE.md) for detailed deployment instructions**

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: `VITE_SUPABASE_URL is not defined`
**Solution:** Ensure `.env` file exists in root directory with correct variables.

```bash
# Check if .env exists
ls -la .env

# If not, create from example
cp .env.example .env

# Add your Supabase credentials
```

#### Issue: MySQL connection error
**Solution:** Verify MySQL is running and credentials are correct.

```bash
# Test MySQL connection
mysql -u root -p -h localhost

# Check if database exists
SHOW DATABASES;
```

#### Issue: Photos not uploading
**Solution:** 
- **Supabase:** Check storage bucket is public and policies are set
- **MySQL:** Verify `backend/uploads` folder has write permissions

```bash
# For MySQL backend
chmod 755 backend/uploads
```

#### Issue: Build fails with dependency errors
**Solution:** Clear cache and reinstall dependencies.

```bash
# Remove node_modules and lock files
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Debug Mode

Enable detailed logging:

```javascript
// In src/lib/supabase.js
const supabase = createClient(url, key, {
  auth: {
    debug: true  // Add this for auth debugging
  }
});
```

### Still Having Issues?

1. Check [GitHub Issues](https://github.com/macamisp/web-base-Photo-store/issues)
2. Review [`SETUP_GUIDE.md`](SETUP_GUIDE.md) for detailed setup
3. Ensure all prerequisites are installed
4. Verify environment variables are set correctly

---

## 🚧 Roadmap & Future Features

- [ ] **Albums/Collections** - Organize photos into albums
- [ ] **Advanced Filters** - Blur, vignette, sepia effects
- [ ] **Image Cropping** - Crop and resize tools
- [ ] **Search & Tags** - Find photos by tags and metadata
- [ ] **Bulk Operations** - Select and manage multiple photos
- [ ] **EXIF Data Viewer** - Display camera metadata
- [ ] **Trash/Recycle Bin** - Recover deleted photos (30-day retention)
- [ ] **Activity Timeline** - Track all photo changes
- [ ] **Face Detection** - Auto-tag people in photos
- [ ] **RAW Format Support** - Professional photography formats
- [ ] **Video Support** - Store and play video files
- [ ] **Progressive Web App** - Install as native app
- [ ] **Social Features** - Comments, likes, collaborative albums

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation if needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 🙏 Acknowledgments

### Technologies
- **[React](https://react.dev/)** - The library for web and native user interfaces
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Supabase](https://supabase.com/)** - The open source Firebase alternative
- **[MySQL](https://www.mysql.com/)** - The world's most popular open source database
- **[Lucide](https://lucide.dev/)** - Beautiful & consistent icon toolkit

### Inspiration
- Google Photos - For the user experience inspiration
- Unsplash - For demonstrating beautiful photo galleries
- Modern web design trends in glassmorphism and dark themes

---

## 📧 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/macamisp/web-base-Photo-store/issues)
- **Discussions:** [GitHub Discussions](https://github.com/macamisp/web-base-Photo-store/discussions)
- **Email:** Create an issue for support

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ using React, Supabase, and MySQL**

---

[![GitHub](https://img.shields.io/badge/GitHub-macamisp-181717?style=for-the-badge&logo=github)](https://github.com/macamisp)

</div>]]>
