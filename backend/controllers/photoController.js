import pool from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';

const STORAGE_LIMIT = 500 * 1024 * 1024; // 500MB

// Get all photos for user
export async function getPhotos(req, res) {
    try {
        const [photos] = await pool.query(
            'SELECT * FROM photos WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );

        // Add URL to each photo
        const photosWithUrls = photos.map(photo => ({
            ...photo,
            url: `http://localhost:${process.env.PORT || 5000}/uploads/${photo.filename}`
        }));

        res.json({ photos: photosWithUrls });
    } catch (error) {
        console.error('Get photos error:', error);
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
}

// Upload photo
export async function uploadPhoto(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { title } = req.body;
        const file = req.file;

        // Check storage limit
        const [users] = await pool.query(
            'SELECT storage_used FROM users WHERE id = ?',
            [req.user.id]
        );

        const currentStorage = users[0].storage_used;
        if (currentStorage + file.size > STORAGE_LIMIT) {
            // Delete uploaded file
            await fs.unlink(file.path);
            return res.status(400).json({
                error: 'Storage limit exceeded',
                available: STORAGE_LIMIT - currentStorage
            });
        }

        // Save photo record
        const [result] = await pool.query(
            'INSERT INTO photos (user_id, title, filename, file_path, file_size, mime_type) VALUES (?, ?, ?, ?, ?, ?)',
            [req.user.id, title || file.originalname, file.filename, file.path, file.size, file.mimetype]
        );

        // Update user storage
        await pool.query(
            'UPDATE users SET storage_used = storage_used + ? WHERE id = ?',
            [file.size, req.user.id]
        );

        res.status(201).json({
            message: 'Photo uploaded successfully',
            photo: {
                id: result.insertId,
                title: title || file.originalname,
                filename: file.filename,
                url: `http://localhost:${process.env.PORT || 5000}/uploads/${file.filename}`,
                file_size: file.size,
                created_at: new Date()
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
}

// Update photo
export async function updatePhoto(req, res) {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Check ownership
        const [photos] = await pool.query(
            'SELECT * FROM photos WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (photos.length === 0) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Update photo
        await pool.query(
            'UPDATE photos SET title = ? WHERE id = ?',
            [title, id]
        );

        res.json({ message: 'Photo updated successfully' });
    } catch (error) {
        console.error('Update photo error:', error);
        res.status(500).json({ error: 'Failed to update photo' });
    }
}

// Delete photo
export async function deletePhoto(req, res) {
    try {
        const { id } = req.params;

        // Check ownership and get file info
        const [photos] = await pool.query(
            'SELECT * FROM photos WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (photos.length === 0) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        const photo = photos[0];

        // Delete file from disk
        try {
            await fs.unlink(photo.file_path);
        } catch (err) {
            console.error('File deletion error:', err);
        }

        // Delete from database
        await pool.query('DELETE FROM photos WHERE id = ?', [id]);

        // Update user storage
        await pool.query(
            'UPDATE users SET storage_used = storage_used - ? WHERE id = ?',
            [photo.file_size, req.user.id]
        );

        res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
        console.error('Delete photo error:', error);
        res.status(500).json({ error: 'Failed to delete photo' });
    }
}

// Get storage usage
export async function getStorageUsage(req, res) {
    try {
        const [users] = await pool.query(
            'SELECT storage_used FROM users WHERE id = ?',
            [req.user.id]
        );

        res.json({
            storageUsed: users[0].storage_used,
            storageLimit: STORAGE_LIMIT,
            percentage: Math.round((users[0].storage_used / STORAGE_LIMIT) * 100)
        });
    } catch (error) {
        console.error('Get storage error:', error);
        res.status(500).json({ error: 'Failed to get storage usage' });
    }
}
