import express from 'express';
import multer from 'multer';
import path from 'path';
import {
    getPhotos,
    uploadPhoto,
    updatePhoto,
    deletePhoto,
    getStorageUsage
} from '../controllers/photoController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max per file
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// All routes require authentication
router.use(authenticateToken);

router.get('/', getPhotos);
router.post('/upload', upload.single('photo'), uploadPhoto);
router.put('/:id', updatePhoto);
router.delete('/:id', deletePhoto);
router.get('/storage', getStorageUsage);

export default router;
