# PhotoStore - MySQL Backend Setup

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** 16+ installed
- **MySQL** server running on localhost
- MySQL credentials: **Username:** `root`, **Password:** `1234`

### 2. Backend Setup

```bash
cd backend

# Copy environment file (already has correct values)
cp .env.example .env

# Start the backend server
npm start
```

The backend will:
- ✅ Connect to MySQL (root/1234)
- ✅ Create `photostore` database
- ✅ Create tables (users, photos)
- ✅ Start server on http://localhost:5000

### 3. Frontend Setup

```bash
# In a new terminal, from the project root
npm run dev
```

The frontend will run on http://localhost:5173

## 📊 Database Info

**Database Name:** `photostore`

**Connection:**
- Host: localhost
- User: root
- Password: 1234

The database and tables will be created automatically when you start the backend!

## 🎯 Testing

1. **Start Backend:** `cd backend && npm start`
2. **Start Frontend:** `npm run dev` (from project root)
3. **Open:** http://localhost:5173
4. **Register** a new account
5. **Upload** some photos
6. **Enjoy!** 🎉

## 🔧 Troubleshooting

### "Cannot connect to MySQL"
- Make sure MySQL is running
- Check username/password (root/1234)
- Verify MySQL is on localhost:3306

### "Port 5000 already in use"
- Change PORT in `backend/.env`
- Update API_URL in `src/lib/api.js`

### Database Issues
The server automatically creates the database and tables.
If you want to reset everything:

```sql
DROP DATABASE photostore;
```

Then restart the backend server.

## 📁 File Storage

Photos are stored in: `backend/uploads/`

Each upload is saved with a unique filename.

## 🌟 Features

- ✅ User Registration & Login (JWT Auth)
- ✅ Photo Upload (up to 50MB per file)
- ✅ Storage Tracking (500MB per user)
- ✅ Photo Management (view, edit, delete)
- ✅ Local file storage
- ✅ MySQL database

---

**Everything is ready to go! Just run the commands above.** 🚀
