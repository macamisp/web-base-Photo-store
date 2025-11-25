import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

import { testConnection } from './config/database.js';
import { initializeDatabase } from './config/init-db.js';
import authRoutes from './routes/authRoutes.js';
import photoRoutes from './routes/photoRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
try {
    await fs.access(uploadsDir);
} catch {
    await fs.mkdir(uploadsDir, { recursive: true });
    console.log('📁 Created uploads directory');
}

// Serve static files (uploaded photos)
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'PhotoStore API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Start server
async function startServer() {
    try {
        // Test database connection
        const connected = await testConnection();
        if (!connected) {
            console.error('⚠️ Starting server without database connection');
        } else {
            // Initialize database schema
            await initializeDatabase();
        }

        app.listen(PORT, () => {
            console.log('');
            console.log('🚀 PhotoStore Backend Server Started!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📡 Server running on: http://localhost:${PORT}`);
            console.log(`🔐 API endpoints: http://localhost:${PORT}/api`);
            console.log(`📸 Uploads served at: http://localhost:${PORT}/uploads`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
