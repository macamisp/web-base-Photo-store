import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { photosAPI, formatBytes, getStoragePercentage, STORAGE_LIMIT } from '../lib/api';
import Navbar from '../components/Navbar';
import UploadModal from '../components/UploadModal';
import PhotoGrid from '../components/PhotoGrid';
import PhotoModal from '../components/PhotoModal';
import EditPhotoModal from '../components/EditPhotoModal';
import ShareModal from '../components/ShareModal';
import { Upload, Image as ImageIcon, HardDrive } from 'lucide-react';
import './Home.css';

export default function Home() {
    const { user } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [storageUsed, setStorageUsed] = useState(0);

    useEffect(() => {
        if (user) {
            fetchPhotos();
            fetchStorageUsage();
        }
    }, [user]);

    const fetchPhotos = async () => {
        try {
            const data = await photosAPI.getPhotos();
            setPhotos(data.photos || []);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStorageUsage = async () => {
        try {
            const data = await photosAPI.getStorageUsage();
            setStorageUsed(data.storageUsed || 0);
        } catch (error) {
            console.error('Error fetching storage usage:', error);
        }
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setPhotoModalOpen(true);
    };

    const handleEdit = (photo) => {
        setSelectedPhoto(photo);
        setPhotoModalOpen(false);
        setEditModalOpen(true);
    };

    const handleShare = (photo) => {
        setSelectedPhoto(photo);
        setPhotoModalOpen(false);
        setShareModalOpen(true);
    };

    const handleDelete = async (photo) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;

        try {
            await photosAPI.deletePhoto(photo.id);

            // Update local state
            const newStorageUsed = storageUsed - photo.file_size;
            setPhotos(photos.filter(p => p.id !== photo.id));
            setStorageUsed(newStorageUsed);
            setPhotoModalOpen(false);
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('Failed to delete photo');
        }
    };

    const storagePercentage = getStoragePercentage(storageUsed);

    return (
        <div className="home-container">
            <Navbar />

            <main className="home-main container">
                {/* Header Section */}
                <div className="home-header animate-fadeIn">
                    <div>
                        <h1>My Photos</h1>
                        <p>Your memories, beautifully organized</p>
                    </div>
                    <button
                        onClick={() => setUploadModalOpen(true)}
                        className="btn btn-primary"
                    >
                        <Upload size={20} />
                        Upload Photos
                    </button>
                </div>

                {/* Storage Bar */}
                <div className="storage-card card animate-fadeIn">
                    <div className="storage-header">
                        <div className="flex items-center gap-sm">
                            <HardDrive size={20} className="text-primary" />
                            <span className="storage-title">Storage Usage</span>
                        </div>
                        <span className="storage-text">
                            {formatBytes(storageUsed)} / {formatBytes(STORAGE_LIMIT)}
                        </span>
                    </div>
                    <div className="storage-bar">
                        <div
                            className="storage-fill"
                            style={{
                                width: `${Math.min(storagePercentage, 100)}%`,
                                background: storagePercentage > 90
                                    ? 'var(--error-500)'
                                    : storagePercentage > 70
                                        ? 'var(--warning-500)'
                                        : 'linear-gradient(90deg, var(--primary-500), var(--accent-500))'
                            }}
                        ></div>
                    </div>
                    <p className="storage-percentage">{storagePercentage}% used</p>
                </div>

                {/* Photos Grid */}
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading your photos...</p>
                    </div>
                ) : photos.length === 0 ? (
                    <div className="empty-state card animate-fadeIn">
                        <ImageIcon size={64} strokeWidth={1.5} />
                        <h2>No photos yet</h2>
                        <p>Upload your first photo to get started</p>
                        <button
                            onClick={() => setUploadModalOpen(true)}
                            className="btn btn-primary"
                        >
                            <Upload size={20} />
                            Upload Now
                        </button>
                    </div>
                ) : (
                    <PhotoGrid
                        photos={photos}
                        onPhotoClick={handlePhotoClick}
                    />
                )}
            </main>

            {/* Modals */}
            {uploadModalOpen && (
                <UploadModal
                    onClose={() => setUploadModalOpen(false)}
                    onUploadComplete={() => {
                        fetchPhotos();
                        fetchStorageUsage();
                        setUploadModalOpen(false);
                    }}
                    currentStorageUsed={storageUsed}
                />
            )}

            {photoModalOpen && selectedPhoto && (
                <PhotoModal
                    photo={selectedPhoto}
                    onClose={() => setPhotoModalOpen(false)}
                    onEdit={handleEdit}
                    onShare={handleShare}
                    onDelete={handleDelete}
                />
            )}

            {editModalOpen && selectedPhoto && (
                <EditPhotoModal
                    photo={selectedPhoto}
                    onClose={() => setEditModalOpen(false)}
                    onSaveComplete={(updatedPhoto) => {
                        setPhotos(photos.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
                        setEditModalOpen(false);
                    }}
                />
            )}

            {shareModalOpen && selectedPhoto && (
                <ShareModal
                    photo={selectedPhoto}
                    onClose={() => setShareModalOpen(false)}
                />
            )}
        </div>
    );
}
